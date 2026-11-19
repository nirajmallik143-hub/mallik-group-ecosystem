# ©Nirajmallik@hub
#!/usr/bin/env python3
# Copyright (c) 2026 Nirajmallik@-hub (Niraj Mallik / Mallik Group)
# Licensed under the MIT License.

import os
import secrets
import subprocess

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(REPO_ROOT, ".env")

def generate_customer_key() -> str:
    new_key = "".join(str(secrets.randbelow(10)) for _ in range(18))
    existing = ""
    lines = []
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("CUSTOMER_PRO_KEYS="):
                    existing = line.split("=", 1)[1].strip().strip('"').strip("'")
                else:
                    lines.append(line.rstrip("\n"))

    keys = [k.strip() for k in existing.split(",") if len(k.strip()) == 18]
    keys.append(new_key)
    joined = ",".join(keys)
    lines.append(f'CUSTOMER_PRO_KEYS="{joined}"')

    with open(ENV_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    return new_key, joined

if __name__ == "__main__":
    key, all_keys = generate_customer_key()
    print("====================================================")
    print(f"NEW 18-DIGIT CUSTOMER PRO KEY : {key}")
    print(f"TOTAL ACTIVE CUSTOMER KEYS    : {len(all_keys.split(','))}")
    print("====================================================")
    token = os.getenv("VERCEL_TOKEN", "").strip()
    if token:
        subprocess.run(
            f'printf "{all_keys}" | vercel env add CUSTOMER_PRO_KEYS production --force --token "{token}"',
            cwd=os.path.join(REPO_ROOT, "EcoThread"),
            shell=True
        )
