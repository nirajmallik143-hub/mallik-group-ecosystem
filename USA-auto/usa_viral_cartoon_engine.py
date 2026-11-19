#!/usr/bin/env python3
# Copyright (c) 2026 Nirajmallik@-hub (Niraj Mallik / Mallik Group)
# Licensed under the MIT License. See LICENSE file for details.

import os
import re
import sys
import json
import time
import random
import shutil
import sqlite3
import subprocess
import urllib.parse
import urllib.request
import urllib.error
from datetime import datetime

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(BASE_DIR, "build")
OUT_DIR = os.path.join(BASE_DIR, "output")
DB_PATH = os.path.join(OUT_DIR, "ledger.db")
SECRET_ENV = os.path.expanduser("~/secret/.env")
CLIENT_SECRETS = os.path.join(BASE_DIR, "client_secrets.json")
TOKEN_FILE = os.path.join(BASE_DIR, "token.json")

# Automatic 503/429 resilient Gemini 3.x chain
GEMINI_MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite"]

YOUTUBE_SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly",
]

# High-RPM, high-retention US Kids Educational Niches (2026 Algorithm Clusters)
VIRAL_USA_NICHES = [
    {
        "niche": "Mind-Blowing Space & Planets for Kids",
        "example_hook": "Did you know it rains real diamonds on Neptune?!",
        "tags": ["space for kids", "planets cartoon", "science for kids", "educational cartoon", "kids learning"],
    },
    {
        "niche": "How Everyday Machines & Science Work",
        "example_hook": "How does a giant metal airplane stay up in the sky without falling?",
        "tags": ["how things work for kids", "stem for kids", "science cartoon", "curious kids", "usa kids learning"],
    },
    {
        "niche": "Superpower Animal Facts & Nature Mysteries",
        "example_hook": "This tiny ocean creature has THREE hearts and blue blood!",
        "tags": ["animal facts for kids", "ocean animals cartoon", "nature for kids", "kids science", "preschool learning"],
    },
    {
        "niche": "Visual Math & Number Magic Adventures",
        "example_hook": "Can you solve Professor Leo's 5-second pizza fraction mystery?",
        "tags": ["math for kids", "numbers cartoon", "counting for kids", "kindergarten learning", "educational animation"],
    },
    {
        "niche": "Dinosaur Time-Travel Science",
        "example_hook": "Why did T-Rex have such tiny arms—and how strong were they really?",
        "tags": ["dinosaurs for kids", "t rex cartoon", "dinosaur facts", "kids education", "animated learning"],
    },
]

# 2 Shorts + 2 Long Videos per day (4 total/day = safe inside YouTube API daily limits)
DAILY_SCHEDULE = [
    {"slot": "slot_1_morning_short",   "format": "shorts", "scenes": 5,  "label": "08:30 AM ET Short"},
    {"slot": "slot_2_midday_long",     "format": "long",   "scenes": 12, "label": "11:30 AM ET Long"},
    {"slot": "slot_3_afternoon_short", "format": "shorts", "scenes": 5,  "label": "03:30 PM ET Short"},
    {"slot": "slot_4_evening_long",    "format": "long",   "scenes": 12, "label": "07:00 PM ET Long"},
]


def load_env(path):
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip().strip('"').strip("'")


load_env(SECRET_ENV)
load_env(os.path.join(BASE_DIR, ".env"))
API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
if not API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in ~/secret/.env")


def init_db():
    os.makedirs(OUT_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """CREATE TABLE IF NOT EXISTS uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_date TEXT,
            slot TEXT,
            format TEXT,
            title TEXT,
            video_id TEXT,
            created_at TEXT
        )"""
    )
    conn.commit()
    return conn


def call_gemini_resilient(prompt: str, use_search: bool = False) -> str:
    """Calls Gemini 3.x with automatic fallback across 503/429 spikes."""
    last_err = None
    for model_id in GEMINI_MODELS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_id}:generateContent?key={API_KEY}"
        payload = {
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {"temperature": 0.75, "maxOutputTokens": 8192},
        }
        if use_search:
            payload["tools"] = [{"googleSearch": {}}]

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            parts = data["candidates"][0]["content"]["parts"]
            return "".join(p.get("text", "") for p in parts if not p.get("thought"))
        except (urllib.error.URLError, TimeoutError, ConnectionError) as net_e:
            last_err = net_e
            print(f'  ⚠️ Network hiccup on {model_id}, retrying next model...')
            time.sleep(2)
            continue
        except urllib.error.HTTPError as e:
            last_err = e
            if e.code in (429, 404, 500, 503):
                print(f"  ⚠️ {model_id} HTTP {e.code} -> switching to next Gemini model...")
                time.sleep(2)
                continue
            raise
    raise last_err


def generate_viral_script(video_format: str, scene_count: int, custom_topic: str = "") -> dict:
    """Engineers a high-retention US kids cartoon script with recurring characters & algorithm hooks."""
    niche_obj = random.choice(VIRAL_USA_NICHES)
    chosen_niche = custom_topic if custom_topic else niche_obj["niche"]
    aspect_desc = "9:16 vertical portrait" if video_format == "shorts" else "16:9 widescreen landscape"

    hook_rules = (
        "SHORTS ALGORITHM RULES (35-45s total): Scene 1 MUST start with an immediate 2-second mind-blowing question "
        "or visual surprise (NO 'Hello kids' intro!). Scene 5 MUST end with a seamless loop sentence that flows right "
        "back into Scene 1's opening words to boost replay rate!"
        if video_format == "shorts"
        else
        "LONG-FORM ALGORITHM RULES (2.5-4 min total): Scene 1 MUST deliver the title's promise inside the first 10 seconds. "
        "Scene 6 MUST include a fun 'Pause & Guess!' interactive brain-teaser pattern interrupt so kids stay watching. "
        "Scene 12 MUST end with a satisfying educational takeaway and tease the next adventure."
    )

    prompt = f"""
You are a top USA YouTube Kids Educational Showrunner & Algorithm Strategist.
Create an original, COPPA-compliant, high-retention animated episode starring our recurring channel mascots:
- Character 1 (Narrator/Host): "Professor Leo", a cheerful, warm golden lion wearing round blue glasses and a bow tie.
- Character 2 (Sidekick): "Pip", a cute bouncy silver-and-orange helper robot who makes fun beeps and asks curious questions.

Niche / Topic: {chosen_niche}
Example Hook Style: {niche_obj['example_hook']}
Format: {video_format.upper()} ({aspect_desc}), exactly {scene_count} scenes.
{hook_rules}

Language & Monetization Rules:
- Natural, energetic American English (US spelling, US kid-friendly vocabulary, exciting rhythm).
- 100% positive, safe, educational STEM/learning value (passes YouTube Made-for-Kids & YPP originality review).
- Every visual_prompt MUST explicitly describe Professor Leo (golden lion with blue glasses) and/or Pip (cute orange-silver robot) in consistent 3D Pixar/Disney-inspired bright cartoon style, with NO text or letters inside the image.

Return ONLY valid JSON (no markdown code fences) matching this exact schema:
{{
  "title": "High-CTR US Kids Title under 62 chars (include #Shorts if format is shorts)",
  "description": "Parent-friendly educational summary of what kids learn + hashtags",
  "tags": {json.dumps(niche_obj['tags'])},
  "scenes": [
    {{
      "scene_number": 1,
      "speaker": "leo",
      "narration": "Energetic American English line (2-3 punchy sentences).",
      "caption": "Short 6-10 word punchy subtitle for screen overlay",
      "visual_prompt": "3D Pixar-style bright colorful cartoon scene, Professor Leo the friendly golden lion with round blue glasses and Pip the cute small orange robot, vivid lighting, expressive faces, clean background, no text, {aspect_desc}"
    }}
  ]
}}
"""
    raw = call_gemini_resilient(prompt, use_search=False).strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    data = json.loads(raw)
    if video_format == "shorts" and "#shorts" not in data["title"].lower():
        data["title"] = f"{data['title'][:53]} #Shorts"
    return data


def generate_us_voice(text: str, speaker: str, out_mp3: str):
    """Generates natural US English character voices using Microsoft Neural TTS."""
    # Alternate warm American female/kid-friendly voice (Ana) and upbeat American male voice (Guy)
    voice = "en-US-AnaNeural" if speaker == "pip" else "en-US-GuyNeural"
    pitch = "+8Hz" if speaker == "pip" else "+2Hz"
    rate = "+4%" if speaker == "pip" else "+2%"
    cmd = [
        "edge-tts",
        "--voice", voice,
        "--pitch", pitch,
        "--rate", rate,
        "--text", text,
        "--write-media", out_mp3,
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def get_duration(media_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        media_path,
    ]
    return float(subprocess.check_output(cmd).decode("utf-8").strip())


def fetch_cartoon_frame(visual_prompt: str, out_jpg: str, width: int, height: int, seed: int):
    # Trim prompt slightly so URL stays short and fast on mobile networks
    short_prompt = visual_prompt[:240]
    encoded = urllib.parse.quote(short_prompt)
    urls = [
        f"https://image.pollinations.ai/prompt/{encoded}?width={width}&height={height}&seed={seed}&nologo=true&model=turbo",
        f"https://image.pollinations.ai/prompt/{encoded}?width={width}&height={height}&seed={seed+7}&nologo=true",
    ]
    for attempt in range(2):
        url = urls[attempt % len(urls)]
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 MallikGroupKidsStudio/2026"})
            with urllib.request.urlopen(req, timeout=60) as resp, open(out_jpg, "wb") as f:
                shutil.copyfileobj(resp, f)
            if os.path.exists(out_jpg) and os.path.getsize(out_jpg) > 2500:
                return
        except Exception:
            wait_s = 3
            print(f"     ⏳ Art server busy (retry {attempt+1}/2 in {wait_s}s)...")
            time.sleep(wait_s)

    # Zero-fail local FFmpeg vibrant cartoon backdrop fallback so render never crashes
    palette = ["#1E88E5", "#43A047", "#FB8C00", "#8E24AA", "#00ACC1"]
    bg_hex = palette[seed % len(palette)]
    subprocess.run(
        [
            "ffmpeg", "-y", "-f", "lavfi",
            "-i", f"color=c={bg_hex}:s={width}x{height}:d=1",
            "-frames:v", "1", out_jpg,
        ],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )


def escape_drawtext(text: str) -> str:
    return re.sub(r"[^A-Za-z0-9 .,!?-]", "", text).strip()


def render_episode(script_data: dict, video_format: str) -> str:
    """Assembles multi-voice audio, animated camera zoom, and safe-zone subtitles into MP4."""
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    os.makedirs(BUILD_DIR, exist_ok=True)
    os.makedirs(OUT_DIR, exist_ok=True)

    is_short = video_format == "shorts"
    w, h = (1080, 1920) if is_short else (1920, 1080)
    seed_base = int(time.time()) % 100000
    clips = []

    for idx, sc in enumerate(script_data["scenes"], start=1):
        mp3_path = os.path.join(BUILD_DIR, f"s_{idx}.mp3")
        jpg_path = os.path.join(BUILD_DIR, f"s_{idx}.jpg")
        mp4_path = os.path.join(BUILD_DIR, f"s_{idx}.mp4")

        speaker = sc.get("speaker", "leo" if idx % 2 == 1 else "pip")
        print(f"  -> Scene {idx}/{len(script_data['scenes'])} [{speaker.upper()}]: voice + art + motion...")
        generate_us_voice(sc["narration"], speaker, mp3_path)
        dur = get_duration(mp3_path) + 0.35
        fetch_cartoon_frame(sc["visual_prompt"], jpg_path, w, h, seed=seed_base + idx)

        frames = int(dur * 30)
        caption_txt = escape_drawtext(sc.get("caption", sc["narration"][:55]))
        # Safe-zone subtitle placement (avoids YouTube Shorts bottom UI & desktop player bar)
        y_pos = "h*0.72" if is_short else "h*0.84"
        font_sz = 46 if is_short else 42

        vf = (
            f"scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h},"
            f"zoompan=z='min(zoom+0.0013,1.12)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={w}x{h}:fps=30,"
            f"drawtext=text='{caption_txt}':fontcolor=white:fontsize={font_sz}:box=1:boxcolor=black@0.65:boxborderw=14:x=(w-text_w)/2:y={y_pos},"
            f"format=yuv420p"
        )

        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", jpg_path,
            "-i", mp3_path,
            "-vf", vf,
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "22",
            "-c:a", "aac", "-b:a", "192k",
            "-t", f"{dur:.2f}",
            "-shortest",
            mp4_path,
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError:
            vf_safe = (
                f"scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h},"
                f"zoompan=z='min(zoom+0.0013,1.12)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={w}x{h}:fps=30,"
                f"format=yuv420p"
            )
            cmd_safe = [vf_safe if x == vf else x for x in cmd]
            subprocess.run(cmd_safe, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        clips.append(mp4_path)

    concat_txt = os.path.join(BUILD_DIR, "list.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for c in clips:
            f.write(f"file '{c}'\n")

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    final_mp4 = os.path.join(OUT_DIR, f"USA_{video_format}_{ts}.mp4")
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", final_mp4],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    return final_mp4


def get_youtube_client():
    if not os.path.exists(CLIENT_SECRETS):
        raise FileNotFoundError(
            f"Missing {CLIENT_SECRETS}\n"
            "Copy your OAuth Desktop JSON file to ~/usa-viral-cartoon/client_secrets.json"
        )
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, YOUTUBE_SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS, YOUTUBE_SCOPES)
            creds = flow.run_local_server(port=8080, open_browser=True)
        with open(TOKEN_FILE, "w", encoding="utf-8") as f:
            f.write(creds.to_json())
    return build("youtube", "v3", credentials=creds)


def upload_to_youtube(video_path: str, script_data: dict, privacy: str = "public") -> str:
    youtube = get_youtube_client()
    desc = (
        f"{script_data['description']}\n\n"
        "Join Professor Leo and Pip for fun, safe educational adventures designed for curious kids!\n"
        "© 2026 Mallik Group (Nirajmallik@-hub) | MIT License"
    )
    body = {
        "snippet": {
            "title": script_data["title"][:95],
            "description": desc,
            "tags": script_data.get("tags", ["kids learning", "educational cartoon"]),
            "categoryId": "27",  # Education (High US RPM & Kids Learning classification)
            "defaultLanguage": "en-US",
            "defaultAudioLanguage": "en-US",
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": True,  # Strict COPPA Kids compliance
            "embeddable": True,
        },
    }
    media = MediaFileUpload(video_path, mimetype="video/mp4", chunksize=1024 * 1024, resumable=True)
    req = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
    resp = None
    while resp is None:
        status, resp = req.next_chunk()
        if status:
            print(f"  -> Upload: {int(status.progress() * 100)}%")
    return resp["id"]


def get_scheduled_topic(slot_name: str, fallback_topic: str) -> str:
    if fallback_topic:
        return fallback_topic
    cal_file = os.path.join(BASE_DIR, "calendar_30d.json")
    if os.path.exists(cal_file):
        with open(cal_file, "r", encoding="utf-8") as cf:
            cal = json.load(cf)
        day_index = (datetime.now().timetuple().tm_yday - 1) % len(cal)
        return cal[day_index]["slots"].get(slot_name, "")
    return ""


def run_slot(slot_cfg: dict, dry_run: bool = False, custom_topic: str = ""):
    conn = init_db()
    today = datetime.now().strftime("%Y-%m-%d")
    cur = conn.execute(
        "SELECT video_id FROM uploads WHERE run_date=? AND slot=?",
        (today, slot_cfg["slot"]),
    ).fetchone()
    if cur:
        print(f"⏭️ Slot '{slot_cfg['slot']}' already completed today (ID: {cur[0]}). Skipping.")
        return

    print(f"\n🎬 Starting [{slot_cfg['label']}] ({slot_cfg['format'].upper()})...")
    resolved_topic = get_scheduled_topic(slot_cfg["slot"], custom_topic)
    script = generate_viral_script(slot_cfg["format"], slot_cfg["scenes"], resolved_topic)
    print(f"📝 Title: {script['title']}")
    mp4_path = render_episode(script, slot_cfg["format"])
    print(f"🎞️ Rendered: {mp4_path}")

    if dry_run:
        vid_id = "DRY_RUN_LOCAL_ONLY"
        print("🧪 Dry-run mode active: skipped YouTube upload.")
    else:
        vid_id = upload_to_youtube(mp4_path, script, privacy="public")
        print(f"🚀 LIVE ON YOUTUBE: https://www.youtube.com/watch?v={vid_id}")

    conn.execute(
        "INSERT INTO uploads (run_date, slot, format, title, video_id, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (today, slot_cfg["slot"], slot_cfg["format"], script["title"], vid_id, datetime.now().isoformat()),
    )
    conn.commit()


if __name__ == "__main__":
    print("=================================================================")
    print("  MALLIK GROUP USA VIRAL KIDS STUDIO | Copyright (c) 2026 MIT")
    print("  Daily Quota Plan: 2 Shorts (9:16) + 2 Long (16:9) | 1 Channel")
    print("=================================================================")
    print("1) Run FULL Daily Batch (2 Shorts + 2 Long Videos -> Auto Upload)")
    print("2) Run 1 Viral Short Now (9:16 Vertical + Auto Upload)")
    print("3) Run 1 Long Educational Episode Now (16:9 + Auto Upload)")
    print("4) Test Render 1 Short Locally (No Upload / Dry Run)")

    choice = input("\nSelect option [1-4]: ").strip()
    topic_in = input("Optional custom topic (or press Enter for auto-viral US niche): ").strip()

    if choice == "1":
        for slot in DAILY_SCHEDULE:
            run_slot(slot, dry_run=False, custom_topic=topic_in)
            time.sleep(10)
    elif choice == "2":
        run_slot({"slot": f"manual_short_{int(time.time())}", "format": "shorts", "scenes": 5, "label": "Manual Short"}, dry_run=False, custom_topic=topic_in)
    elif choice == "3":
        run_slot({"slot": f"manual_long_{int(time.time())}", "format": "long", "scenes": 12, "label": "Manual Long"}, dry_run=False, custom_topic=topic_in)
    else:
        run_slot({"slot": f"test_short_{int(time.time())}", "format": "shorts", "scenes": 5, "label": "Dry-Run Test"}, dry_run=True, custom_topic=topic_in)
