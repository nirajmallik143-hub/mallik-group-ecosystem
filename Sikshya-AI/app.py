# Copyright (c) 2026 Niraj Mallik (Mallik Group / nirajmallik143-hub)
# Licensed under the MIT License.

import os
import sys
import subprocess
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(BASE_DIR)
sys.path.insert(0, os.path.join(REPO_ROOT, "Mallik-Core-Agents"))

load_dotenv(os.path.join(REPO_ROOT, ".env"))

from mallik_key_gateway import MallikGroupKeyGateway

app = Flask(__name__, static_folder="public", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/verify-key", methods=["POST"])
def verify_key():
    client_key = request.headers.get("X-Mallik-Key", "")
    gw = MallikGroupKeyGateway(client_key)
    if not gw.validate():
        return jsonify({"valid": False, "error": "Invalid 18-digit Mallik Group key"}), 401
    return jsonify({"valid": True, "providers": gw.active_providers()})

@app.route("/api/git-status", methods=["GET"])
def git_status():
    client_key = request.headers.get("X-Mallik-Key", "")
    gw = MallikGroupKeyGateway(client_key)
    if not gw.validate():
        return jsonify({"error": "Unauthorized 18-digit key"}), 401
    try:
        branch = subprocess.check_output(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=REPO_ROOT).decode().strip()
        commit = subprocess.check_output(["git", "log", "-1", "--pretty=%h - %s"], cwd=REPO_ROOT).decode().strip()
        return jsonify({"status": f"Branch: {branch} | Latest Commit: {commit}"})
    except Exception as e:
        return jsonify({"status": f"Repository active ({str(e)})"})

@app.route("/api/ask", methods=["POST"])
def ask():
    client_key = request.headers.get("X-Mallik-Key", "")
    gw = MallikGroupKeyGateway(client_key)
    if not gw.validate():
        return jsonify({"error": "Access denied: Valid 18-digit Mallik Group API Key required."}), 401

    data = request.get_json(force=True)
    prompt = data.get("prompt", "").strip()
    mode = data.get("mode", "tutor")

    system_prompts = {
        "tutor": "You are Sikshya Global AI by Mallik Group. Give clear, structured educational answers.",
        "medical": "You are LiveLife OS Medical & Respiratory Triage. Provide structured educational triage guidance and advise consulting a licensed clinician for emergencies.",
        "quantum": "You are Mallik Group Quantum & Code Sandbox. Provide clean, production-ready code and scientific explanations."
    }

    try:
        gemini_key = gw.get_provider_key("gemini")
        from google import genai
        client = genai.Client(api_key=gemini_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{system_prompts.get(mode, system_prompts['tutor'])}\n\nUser: {prompt}"
        )
        return jsonify({"reply": response.text, "provider": "Mallik-Gemini-Core"})
    except Exception as e:
        return jsonify({"reply": f"Gateway authenticated via 18-digit key. Backend notice: {str(e)}", "provider": "Mallik-Gateway"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=False)
