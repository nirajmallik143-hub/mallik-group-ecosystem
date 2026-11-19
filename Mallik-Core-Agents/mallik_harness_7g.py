#!/usr/bin/env python3
# Copyright (c) 2026 Nirajmallik@-hub (Niraj Mallik / Mallik Group)
# Licensed under the MIT License.

import os
import sys
import json
import time
import subprocess
import urllib.request
import urllib.error
from datetime import datetime, timezone

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(BASE_DIR)
MEMORY_FILE = os.path.join(BASE_DIR, "harness_7g_memory.json")
sys.path.insert(0, BASE_DIR)

def load_env(env_path: str):
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


class MallikHarness7G:
    """
    7-Layer Autonomous Agent Harness for Mallik Group Ecosystem.
    Layers:
      1G: 18-Digit Master Key Security Gate
      2G: Persistent JSON Context & Session Memory
      3G: Multi-LLM Cascade Router (Gemini -> DeepSeek -> Claude -> OpenAI)
      4G: Monorepo & GitHub CLI Orchestrator (nirajmallik143-hub)
      5G: Automated Video & Web Pipeline Trigger
      6G: Local Termux Shell & File Execution Sandbox
      7G: Self-Healing Telemetry & MIT 2026 Audit Trail
    """

    SYSTEM_PROMPT = (
        "You are Mallik Harness 7G (© 2026 Nirajmallik@-hub / Mallik Group). "
        "Execute tasks across Sikshya-AI, EcoThread, USA-auto, Yummy-Studio-Automation, "
        "and Mallik-Core-Agents with concise, production-ready Termux/Python/Git commands."
    )

    def __init__(self, master_key: str):
        self.gw = MallikGroupKeyGateway(master_key)
        if not self.gw.validate():
            raise PermissionError("1G Security Gate Blocked: Invalid 18-digit Mallik Group API Key.")
        self.memory = self._load_memory()

    def _load_memory(self) -> dict:
        if os.path.exists(MEMORY_FILE):
            try:
                with open(MEMORY_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return {"owner": "Nirajmallik@-hub", "sessions": [], "notes": []}

    def _save_memory(self):
        self.memory["sessions"] = self.memory["sessions"][-30:]
        with open(MEMORY_FILE, "w", encoding="utf-8") as f:
            json.dump(self.memory, f, indent=2)

    def remember(self, note: str):
        self.memory["notes"].append({
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "note": note
        })
        self._save_memory()

    def route_llm(self, prompt: str) -> tuple[str, str]:
        active = self.gw.active_providers()
        recent_context = "\n".join(
            f"User: {s['q']} | AI: {s['a'][:180]}" for s in self.memory["sessions"][-3:]
        )
        full_prompt = f"Recent Context:\n{recent_context}\n\nCurrent Task:\n{prompt}" if recent_context else prompt

        # Layer 3G: Cascade through configured providers
        if "gemini" in active:
            key = self.gw.get_provider_key("gemini")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
            body = json.dumps({"contents": [{"parts": [{"text": f"{self.SYSTEM_PROMPT}\n\n{full_prompt}"}]}]}).encode()
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read().decode())
                return "Gemini-2.5", data["candidates"][0]["content"]["parts"][0]["text"]

        if "deepseek" in active:
            key = self.gw.get_provider_key("deepseek")
            body = json.dumps({
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": self.SYSTEM_PROMPT},
                    {"role": "user", "content": full_prompt}
                ]
            }).encode()
            req = urllib.request.Request(
                "https://api.deepseek.com/chat/completions",
                data=body,
                headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"}
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read().decode())
                return "DeepSeek-V3", data["choices"][0]["message"]["content"]

        if "anthropic" in active:
            key = self.gw.get_provider_key("anthropic")
            body = json.dumps({
                "model": "claude-sonnet-4-5",
                "max_tokens": 1024,
                "system": self.SYSTEM_PROMPT,
                "messages": [{"role": "user", "content": full_prompt}]
            }).encode()
            req = urllib.request.Request(
                "https://api.anthropic.com/v1/messages",
                data=body,
                headers={
                    "Content-Type": "application/json",
                    "x-api-key": key,
                    "anthropic-version": "2023-06-01"
                }
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read().decode())
                return "Claude-Sonnet", data["content"][0]["text"]

        if "openai" in active:
            key = self.gw.get_provider_key("openai")
            body = json.dumps({
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": self.SYSTEM_PROMPT},
                    {"role": "user", "content": full_prompt}
                ]
            }).encode()
            req = urllib.request.Request(
                "https://api.openai.com/v1/chat/completions",
                data=body,
                headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"}
            )
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.loads(r.read().decode())
                return "OpenAI-GPT", data["choices"][0]["message"]["content"]

        raise EnvironmentError("3G Router: No active LLM key found in .env.")

    def status_report(self):
        print("\n--- MALLIK HARNESS 7G TELEMETRY ---")
        print(f"1G Security Gate : VERIFIED (18-Digit Key)")
        print(f"2G Memory Store  : {len(self.memory['sessions'])} turns | {len(self.memory['notes'])} pinned notes")
        print(f"3G Active LLMs   : {', '.join(self.gw.active_providers())}")
        branch = subprocess.check_output(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=REPO_ROOT).decode().strip()
        commit = subprocess.check_output(["git", "log", "-1", "--pretty=%h (%s)"], cwd=REPO_ROOT).decode().strip()
        print(f"4G Monorepo Sync : {branch} @ {commit}")
        print("-----------------------------------\n")

    def run_cli(self):
        print("========================================================")
        print("  MALLIK HARNESS 7G | © 2026 Nirajmallik@-hub (MIT)")
        print("========================================================")
        self.status_report()
        print("Commands:")
        print("  !status         -> Show 7G layer telemetry")
        print("  !repos          -> List all GitHub repos (@nirajmallik143-hub)")
        print("  !sync           -> Git add, commit & push monorepo")
        print("  !pipeline       -> Trigger cloud YouTube workflow")
        print("  !deploy         -> Auto-deploy all repos to Vercel")
        print("  !newkey         -> Issue 18-digit Pro customer key")
        print("  !note <text>    -> Save persistent memory note")
        print("  !run <cmd>      -> Execute Termux shell command")
        print("  exit            -> Quit\n")

        while True:
            try:
                q = input("Harness-7G > ").strip()
                if not q:
                    continue
                if q.lower() in ("exit", "quit"):
                    break
                if q == "!status":
                    self.status_report()
                    continue
                if q == "!repos":
                    subprocess.run("gh repo list nirajmallik143-hub --limit 100", shell=True)
                    print()
                    continue
                if q == "!sync":
                    subprocess.run(
                        'git add . && git commit -m "Harness 7G auto-sync" || true && git push origin main',
                        cwd=REPO_ROOT, shell=True
                    )
                    print()
                    continue
                if q == "!deploy":
                    subprocess.run("python3 Mallik-Core-Agents/auto_deploy_vercel.py", cwd=REPO_ROOT, shell=True)
                    print()
                    continue
                if q == "!newkey":
                    subprocess.run("python3 Mallik-Core-Agents/issue_customer_key.py", cwd=REPO_ROOT, shell=True)
                    print()
                    continue
                if q == "!pipeline":
                    subprocess.run(
                        "gh workflow run youtube-pipelines.yml --repo nirajmallik143-hub/mallik-group-ecosystem",
                        shell=True
                    )
                    print()
                    continue
                if q.startswith("!note "):
                    self.remember(q[6:].strip())
                    print("[2G] Note saved to harness_7g_memory.json\n")
                    continue
                if q.startswith("!run "):
                    subprocess.run(q[5:].strip(), cwd=REPO_ROOT, shell=True)
                    print()
                    continue

                provider, reply = self.route_llm(q)
                self.memory["sessions"].append({
                    "ts": datetime.now(timezone.utc).isoformat(),
                    "q": q,
                    "a": reply
                })
                self._save_memory()
                print(f"\n[{provider}]\n{reply}\n")
            except KeyboardInterrupt:
                print("\nHarness 7G suspended.")
                break
            except Exception as e:
                print(f"\n[7G Fault Handler] {e}\n")


if __name__ == "__main__":
    key = os.getenv("MALLIK_GROUP_API_KEY", "").strip() or input("Enter 18-Digit Mallik Key: ").strip()
    harness = MallikHarness7G(key)
    harness.run_cli()
