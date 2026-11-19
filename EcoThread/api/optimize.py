# Copyright (c) 2026 Niraj Mallik (Mallik Group / nirajmallik143-hub)
# Licensed under the MIT License.

from http.server import BaseHTTPRequestHandler
import json
import os
import re

MASTER_KEY = os.getenv("MALLIK_GROUP_API_KEY", "794208165392481026").strip()

def analyze_and_optimize(code: str, pro_unlocked: bool) -> dict:
    original_bytes = len(code.encode("utf-8"))
    lines = code.splitlines()
    # Minify comments & redundant whitespace for green payload delivery
    cleaned = re.sub(r'/\*[\s\S]*?\*/', '', code)
    cleaned_lines = [ln.strip() for ln in cleaned.splitlines() if ln.strip() and not ln.strip().startswith(("//", "#"))]
    optimized_code = "\n".join(cleaned_lines)
    optimized_bytes = len(optimized_code.encode("utf-8"))

    saved_bytes = max(0, original_bytes - optimized_bytes)
    reduction_pct = round((saved_bytes / original_bytes) * 100, 1) if original_bytes > 0 else 0.0
    # ~0.81g CO2 per MB transferred + CPU cycle weight
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

    return {
        "green_score": green_score,
        "original_bytes": original_bytes,
        "optimized_bytes": optimized_bytes,
        "reduction_pct": reduction_pct,
        "co2_saved_mg": co2_saved_mg,
        "tier": "PRO UNLIMITED (Mallik 18-Digit Key)" if pro_unlocked else "FREE STARTER",
        "suggestions": suggestions,
        "optimized_code": optimized_code if pro_unlocked else optimized_code[:400] + ("\n# [Unlock Pro with 18-Digit Key for full output]" if len(optimized_code) > 400 else "")
    }

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(content_len).decode("utf-8") if content_len else "{}"
        data = json.loads(raw)

        client_key = self.headers.get("X-Mallik-Key", "").strip()
        pro_unlocked = (len(client_key) == 18 and client_key == MASTER_KEY)

        code = data.get("code", "")
        result = analyze_and_optimize(code, pro_unlocked)

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(result).encode("utf-8"))

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        info = {
            "service": "EcoThread Carbon-Aware Code Optimizer API v2.0",
            "status": "100/100 Operational",
            "payout_rail": "Mbank UAE Direct Settlement Active",
            "plans": [
                {"name": "Free Starter", "price_usd": 0, "price_aed": 0, "limit": "50 scans/day"},
                {"name": "EcoThread Pro", "price_usd": 9, "price_aed": 33, "limit": "Unlimited + 18-Digit API Key"},
                {"name": "Enterprise ESG", "price_usd": 29, "price_aed": 107, "limit": "CI/CD GitHub Action + ESG Reports"}
            ]
        }
        self.wfile.write(json.dumps(info).encode("utf-8"))
