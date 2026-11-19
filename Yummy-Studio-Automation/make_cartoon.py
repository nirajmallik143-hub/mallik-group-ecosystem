# ©Nirajmallik@hub
import asyncio
import os
import subprocess
import urllib.parse
import requests
import edge_tts

# Scenes from "Leo and the Lost Lemonade Stand" (US Kids Cartoon)
SCENES = [
    {
        "prompt": "3D Pixar animation style, sunny American suburban backyard, green grass, white picket fence, 7-year-old boy in red cap and blue t-shirt and 6-year-old girl in yellow overalls looking excitedly at a shiny red bicycle catalog, bright lighting, 4k",
        "voice": "en-US-AriaNeural",
        "text": "It was a bright, sunny Saturday in Maplewood, and Leo had a giant idea!"
    },
    {
        "prompt": "3D Pixar animation style, 7-year-old boy in red baseball cap pointing excitedly at a shiny red bicycle picture, bright colorful cartoon, expressive face, sunny backyard",
        "voice": "en-US-JustinNeural",
        "text": "Look, Maya! The Turbo-Blaster 3000! If we sell enough lemonade today, we can finally buy it!"
    },
    {
        "prompt": "3D Pixar animation style, 6-year-old girl with pigtails in yellow overalls smiling and clapping hands happily in a colorful American kitchen, bright warm lighting",
        "voice": "en-US-AnaNeural",
        "text": "Ooh! With shiny streamers on the handlebars? Count me in!"
    },
    {
        "prompt": "3D Pixar animation style, colorful American kitchen, boy squeezing bright yellow lemons into a glass pitcher while little sister spills a tiny bit of sugar and laughs, cute golden retriever puppy watching",
        "voice": "en-US-AriaNeural",
        "text": "Together, Leo and Maya got to work. They squeezed fresh yellow lemons, added sweet sugar, and stirred it all with ice."
    },
    {
        "prompt": "3D Pixar animation style, front yard sidewalk in a cozy US neighborhood, wooden lemonade stand decorated with colorful hand-drawn signs saying FRESH LEMONADE, golden retriever puppy sitting beside it, sunny day",
        "voice": "en-US-JustinNeural",
        "text": "Open for business! Get your ice-cold lemonade right here!"
    }
]

OUTPUT_DIR = "build"
os.makedirs(OUTPUT_DIR, exist_ok=True)


async def generate_audio(text: str, voice: str, out_path: str):
    communicate = edge_tts.Communicate(text, voice, rate="+2%")
    await communicate.save(out_path)


def generate_image(prompt: str, out_path: str, seed: int):
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1280&height=720&seed={seed}&nologo=true"
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    with open(out_path, "wb") as f:
        f.write(resp.content)


def get_audio_duration(audio_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        audio_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(result.stdout.strip())


def build_scene_clip(img_path: str, audio_path: str, out_clip: str):
    duration = get_audio_duration(audio_path) + 0.6  # slight pause between lines
    frames = int(duration * 25)
    # Smooth zoom-in animation (Ken Burns effect) + sync audio
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", img_path,
        "-i", audio_path,
        "-vf", f"scale=1920:1080,zoompan=z='min(zoom+0.0012,1.15)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=25",
        "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-t", str(duration),
        out_clip
    ]
    subprocess.run(cmd, check=True)


async def main():
    clip_paths = []
    for idx, scene in enumerate(SCENES):
        print(f"[*] Building Scene {idx + 1}/{len(SCENES)}...")
        img_file = f"{OUTPUT_DIR}/scene_{idx}.jpg"
        aud_file = f"{OUTPUT_DIR}/scene_{idx}.mp3"
        vid_file = f"{OUTPUT_DIR}/scene_{idx}.mp4"

        generate_image(scene["prompt"], img_file, seed=100 + idx)
        await generate_audio(scene["text"], scene["voice"], aud_file)
        build_scene_clip(img_file, aud_file, vid_file)
        clip_paths.append(vid_file)

    # Create concat list for FFmpeg
    list_file = f"{OUTPUT_DIR}/clips.txt"
    with open(list_file, "w") as f:
        for clip in clip_paths:
            f.write(f"file '{os.path.abspath(clip)}'\n")

    final_output = "/sdcard/Download/USA_Kids_Cartoon.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", list_file, "-c", "copy", final_output
    ], check=True)
    print(f"\n[DONE] Video saved to: {final_output}")


if __name__ == "__main__":
    asyncio.run(main())
