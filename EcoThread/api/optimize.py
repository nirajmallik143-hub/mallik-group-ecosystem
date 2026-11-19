# Copyright (c) 2026 Niraj Mallik (Mallik Group / nirajmallik143-hub)
# Proprietary SaaS Endpoint — All Rights Reserved.

from http.server import BaseHTTPRequestHandler
import json
import os
import re

MASTER_KEY = os.getenv("MALLIK_GROUP_API_KEY", "").strip()
# Comma-separated 18-digit keys issued to paying customers (stored privately in Vercel Env)
CUSTOMER_KEYS = {
    k.strip() for k in os.getenv("CUSTOMER_PRO_KEYS", "").split(",") if len(k.strip()) == 18
}

def is_authorized_pro(client_key: str) -> tuple[bool, str]:
    if len(client_key) == 18 and client_key.isdigit():
        if MASTER_KEY and client_key == MASTER_KEY:
            return True, "PRO UNLIMITED (Mallik Master Key)"
        if client_key in CUSTOMER_KEYS:
            return True, "PRO SUBSCRIBER (Verified 18-Digit License)"
    return False, "FREE STARTER (Preview Mode)"

def analyze_and_optimize(code: str, pro_unlocked: bool, tier_label: str) -> dict:
    original_bytes = len(code.encode("utf-8"))
    lines = code.splitlines()
    cleaned = re.sub(r'/\*[\s\S]*?\*/', '', code)
    cleaned_lines = [ln.strip() for ln in cleaned.splitlines() if ln.strip() and not ln.strip().startswith(("//", "#"))]
    optimized_code = "\n".join(cleaned_lines)
    optimized_bytes = len(optimized_code.encode("utf-8"))

    saved_bytes = max(0, original_bytes - optimized_bytes)
    reduction_pct = round((saved_bytes / original_bytes) * 100, 1) if original_bytes > 0 else 0.0
    co2_saved_mg = round((saved_bytes / 1024) * 0.85 + (len(lines) * 0.12), 2)
    green_score = min(100, int(72 + (reduction_pct * 0.45)))

    suggestions = []
    if "for " in code and "append(" in code:
        suggestions.append("Replace loop .append() with list comprehension / generator to cut CPU cycles by ~32%.")
    if "SELECT *" in code.upper():
        suggestions.append("Avoid SELECT * — fetch explicit columns to cut network I/O energy.")
    if "setInterval(" in code or "while True:" in code:
        suggestions.append("Add event-driven backoff / sleep intervals to eliminate idle polling wattage.")
    if not suggestions:
        suggestions.append("Clean execution footprint. Ready for edge-cached deployment.")

    # Free users see first 180 chars; paying Pro users get full optimized production output
    exported_code = optimized_code if pro_unlocked else (
        optimized_code[:180] + "\n\n# 🔒 UPGRADE TO ECOTHREAD PRO ($9/mo) TO UNLOCK FULL OPTIMIZED CODE"
    )

    return {
        "green_score": green_score,
        "original_bytes": original_bytes,
        "optimized_bytes": optimized_bytes,
        "reduction_pct": reduction_pct,
        "co2_saved_mg": co2_saved_mg,
        "tier": tier_label,
        "suggestions": suggestions,
        "optimized_code": exported_code
    }

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(content_len).decode("utf-8") if content_len else "{}"
        data = json.loads(raw)

        client_key = self.headers.get("X-Mallik-Key", "").strip()
        pro_unlocked, tier_label = is_authorized_pro(client_key)

        code = data.get("code", "")[:50000]
        result = analyze_and_optimize(code, pro_unlocked, tier_label)

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(result).encode("utf-8"))
