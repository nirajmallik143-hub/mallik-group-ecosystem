# ©Nirajmallik@hub
#!/usr/bin/env python3
# Copyright (c) 2026 Nirajmallik@-hub (Niraj Mallik / Mallik Group)
# Licensed under the MIT License.

import os
import subprocess
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(REPO_ROOT, ".env")

def load_env():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

load_env()

PROJECTS = [
    {"name": "EcoThread", "dir": "EcoThread", "envs": ["MALLIK_GROUP_API_KEY", "CUSTOMER_PRO_KEYS"]},
    {"name": "Sikshya-AI", "dir": "Sikshya-AI", "envs": ["MALLIK_GROUP_API_KEY", "GEMINI_API_KEY", "DEEPSEEK_API_KEY"]},
]

def deploy_all():
    token = os.getenv("VERCEL_TOKEN", "").strip()
    if not token:
        print("[X] VERCEL_TOKEN missing in .env")
        sys.exit(1)

    print("========================================================")
    print("  MALLIK HARNESS 7G — VERCEL AUTO-DEPLOY ENGINE")
    print("========================================================")

    for proj in PROJECTS:
        proj_path = os.path.join(REPO_ROOT, proj["dir"])
        if not os.path.isdir(proj_path):
            continue
        print(f"\n[>] Deploying {proj['name']} to Vercel Production...")
        for env_key in proj["envs"]:
            val = os.getenv(env_key, "").strip()
            if val:
                subprocess.run(
                    f'printf "%s" "{val}" | vercel env add {env_key} production --force --token "{token}" >/dev/null 2>&1 || true',
                    cwd=proj_path,
                    shell=True
                )
        subprocess.run(
            f'vercel --prod --yes --token "{token}"',
            cwd=proj_path,
            shell=True,
            check=False
        )

    print("\n[✓] All Mallik Group Vercel deployments completed.")

if __name__ == "__main__":
    deploy_all()
