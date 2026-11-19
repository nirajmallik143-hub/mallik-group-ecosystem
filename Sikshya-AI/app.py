# Copyright (c) 2026 Niraj Mallik (Mallik Group)
import json, os, requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
ENV_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL_ID = "gemini-2.5-flash"
LANGS = [
    "Nepali (नेपाली)", "Maithili (मैथिली)", "Bhojpuri (भोजपुरी)",
    "Newari (नेपाल भाषा)", "Tamang (तामाङ)", "Tharu (थारू)",
    "Limbu (लिम्बू)", "Hindi (हिन्दी)", "English"
]

def call_gemini(sys_instruction, user_text, api_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_ID}:generateContent?key={api_key}"
    payload = {
        "system_instruction": {"parts": [{"text": sys_instruction}]},
        "contents": [{"parts": [{"text": user_text}]}],
        "generationConfig": {"responseMimeType": "application/json"}
    }
    r = requests.post(url, json=payload, timeout=30)
    if r.status_code != 200:
        raise Exception(f"API Error {r.status_code}: {r.text}")
    data = r.json()
    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return json.loads(text)

@app.route("/")
def index():
    return render_template("index.html", languages=LANGS, has_key=bool(ENV_KEY))

@app.route("/v1/reason", methods=["POST"])
def reason():
    d = request.get_json(force=True)
    prompt = d.get("prompt", "")
    lang = d.get("language", "Nepali")
    domain = d.get("domain", "Civic")
    key = d.get("api_key", "").strip() or ENV_KEY
    if not key:
        return jsonify({
            "plan": "Paste your Gemini API Key in the box above.",
            "act": "Checked API key configuration.",
            "verify": "No API key found yet.",
            "deliver": "Get a free key at aistudio.google.com, paste it above, and tap Execute again.",
            "canvas_title": "API Key Required",
            "canvas_content": "1. Visit https://aistudio.google.com/apikey\n2. Create a Gemini API key\n3. Paste it into the API Key field above"
        })
    try:
        sys_msg = (
            f"You are Humanity Nepal AI (Mallik Group). Respond in {lang} on {domain}. "
            "Return ONLY JSON with keys: plan, act, verify, deliver, canvas_title, canvas_content."
        )
        return jsonify(call_gemini(sys_msg, prompt, key))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/v1/sos", methods=["POST"])
def sos():
    d = request.get_json(force=True)
    alert = d.get("alert", "")
    loc = d.get("location", "Nepal")
    lang = d.get("language", "Nepali")
    key = d.get("api_key", "").strip() or ENV_KEY
    if not key:
        return jsonify({
            "severity": "CRITICAL",
            "incident_type": "SOS",
            "guidance_local": "Alert AJS Security & Shivasatakshi Hub. (Paste API key for AI triage)",
            "broadcast_bulletin": f"[SOS - {loc}] {alert}"
        })
    try:
        sys_msg = (
            "Mallik Group SOS Triage. Return ONLY JSON with keys: "
            "severity, incident_type, guidance_local, broadcast_bulletin."
        )
        return jsonify(call_gemini(sys_msg, f"Loc: {loc}, Lang: {lang}, Alert: {alert}", key))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
