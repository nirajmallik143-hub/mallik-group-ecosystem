# ©Nirajmallik@hub
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
            os.environ[k.strip()] = v.strip().strip('"').strip("'").strip()

load_env(os.path.join(REPO_ROOT, ".env"))
from mallik_key_gateway import MallikGroupKeyGateway

def ask_ai(prompt: str, gw: MallikGroupKeyGateway) -> str:
    active = gw.active_providers()
    system_instruction = (
        "You are Mallik Group Termux AI Agent built by Niraj Mallik (nirajmallik143-hub). "
        "Give concise, accurate terminal answers, Python/Bash scripts, and GitHub repo guidance."
    )

    if "gemini" in active:
        gemini_key = gw.get_provider_key("gemini")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={gemini_key}"
        payload = json.dumps({
            "contents": [{"parts": [{"text": f"{system_instruction}\n\nUser: {prompt}"}]}]
        }).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return "[Gemini] " + data["candidates"][0]["content"]["parts"][0]["text"]

    if "deepseek" in active:
        ds_key = gw.get_provider_key("deepseek")
        ds_payload = json.dumps({
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": prompt}
            ]
        }).encode("utf-8")
        ds_req = urllib.request.Request(
            "https://api.deepseek.com/chat/completions",
            data=ds_payload,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {ds_key}"}
        )
        with urllib.request.urlopen(ds_req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return "[DeepSeek] " + data["choices"][0]["message"]["content"]

    if "anthropic" in active:
        ant_key = gw.get_provider_key("anthropic")
        ant_payload = json.dumps({
            "model": "claude-sonnet-4-5",
            "max_tokens": 1024,
            "system": system_instruction,
            "messages": [{"role": "user", "content": prompt}]
        }).encode("utf-8")
        ant_req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=ant_payload,
            headers={
                "Content-Type": "application/json",
                "x-api-key": ant_key,
                "anthropic-version": "2023-06-01"
            }
        )
        with urllib.request.urlopen(ant_req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return "[Claude] " + data["content"][0]["text"]

    raise EnvironmentError("No AI provider key configured in .env (set GEMINI_API_KEY, DEEPSEEK_API_KEY, or ANTHROPIC_API_KEY).")

def main():
    print("====================================================")
    print("  MALLIK GROUP TERMUX AI BOT | Copyright (c) 2026 MIT")
    print("====================================================")

    key = os.getenv("MALLIK_GROUP_API_KEY", "").strip() or input("Enter 18-Digit Mallik Group Key: ").strip()
    gw = MallikGroupKeyGateway(key)
    if not gw.validate():
        print("[X] Invalid 18-digit Mallik Group Master Key.")
        sys.exit(1)

    print(f"[✓] Authenticated via 18-Digit Key | Providers: {', '.join(gw.active_providers())}")
    print("Commands: ask anything, '!repos' to list GitHub repos, '!run <cmd>' for shell, 'exit' to quit.\n")

    while True:
        try:
            user_input = input("Mallik-AI > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ("exit", "quit"):
                break
            if user_input.lower() in ("!repos", "search all repo", "list repos"):
                subprocess.run("gh repo list nirajmallik143-hub --limit 100", shell=True)
                print()
                continue
            if user_input.startswith("!run "):
                subprocess.run(user_input[5:].strip(), shell=True)
                print()
                continue

            print(f"\n{ask_ai(user_input, gw)}\n")
        except KeyboardInterrupt:
            print("\nExiting Mallik AI Bot.")
            break
        except Exception as e:
            print(f"\n[!] Error: {e}\n")

if __name__ == "__main__":
    main()
