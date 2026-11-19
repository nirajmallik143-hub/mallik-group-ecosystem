# Copyright (c) 2026 Niraj Mallik (Mallik Group / nirajmallik143-hub)
# Proprietary SaaS Payment Webhook — All Rights Reserved.

from http.server import BaseHTTPRequestHandler
import json
import os
import secrets
import urllib.request

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN", "").strip()
VERCEL_PROJECT_ID = os.getenv("VERCEL_PROJECT_ID", "").strip()

def generate_18_digit_license() -> str:
    return "".join(str(secrets.randbelow(10)) for _ in range(18))

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_len = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(content_len).decode("utf-8") if content_len else "{}"
        event = json.loads(raw)

        # Supports both Stripe (checkout.session.completed) & Lemon Squeezy (order_created)
        event_type = event.get("type") or event.get("meta", {}).get("event_name", "")
        customer_email = (
            event.get("data", {}).get("object", {}).get("customer_details", {}).get("email")
            or event.get("data", {}).get("attributes", {}).get("user_email")
            or "subscriber@mallikgroup.com"
        )

        new_license_key = generate_18_digit_license()

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({
            "received": True,
            "event": event_type,
            "customer_email": customer_email,
            "issued_18_digit_key": new_license_key,
            "settlement_bank": "Mbank UAE (AE90...0001)"
        }).encode("utf-8"))
