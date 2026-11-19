#!/usr/bin/env python3
# Copyright (c) 2026 Niraj Mallik (Mallik Group / nirajmallik143-hub)
# Licensed under the MIT License.

import os
import sys
import json
import subprocess
import urllib.request
import urllib.error

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(BASE_DIR)
sys.path.insert(0, BASE_DIR)

def load_env(env_path):
    if not os.path.exists(env_path):
        return
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

load_env(os.path.join(REPO_ROOT, ".env"))

from mallik_key_gateway import MallikGroupKeyGateway

def ask_gemini(prompt: str, api_key: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    system_instruction = (
        "You are Mallik Group Termux AI Agent built by Niraj Mallik (nirajmallik143-hub). "
        "Give concise, accurate terminal answers, Python/Bash scripts, and system commands."
    )
    payload = json.dumps({
        "contents": [{"parts": [{"text": f"{system_instruction}\n\nUser: {prompt}"}]}]
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data["candidates"][0]["content"]["parts"][0]["text"]

def main():
    print("====================================================")
    print("  MALLIK GROUP TERMUX AI BOT | Copyright (c) 2026 MIT")
    print("====================================================")

    key = os.getenv("MALLIK_GROUP_API_KEY", "").strip()
    if not key:
        key = input("Enter 18-Digit Mallik Group Key: ").strip()

    gw = MallikGroupKeyGateway(key)
    if not gw.validate():
        print("[X] Invalid 18-digit Mallik Group Master Key.")
        sys.exit(1)

    gemini_key = gw.get_provider_key("gemini")
    print(f"[✓] Authenticated via 18-Digit Key | Providers: {', '.join(gw.active_providers())}")
    print("Commands: type your question, '!run <shell_cmd>' to execute, or 'exit' to quit.\n")

    while True:
        try:
            user_input = input("Mallik-AI > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ("exit", "quit"):
                break
            if user_input.startswith("!run "):
                cmd = user_input[5:].strip()
                subprocess.run(cmd, shell=True)
                continue

            reply = ask_gemini(user_input, gemini_key)
            print(f"\n{reply}\n")
        except KeyboardInterrupt:
            print("\nExiting Mallik AI Bot.")
            break
        except Exception as e:
            print(f"\n[!] Error: {e}\n")

if __name__ == "__main__":
    main()
