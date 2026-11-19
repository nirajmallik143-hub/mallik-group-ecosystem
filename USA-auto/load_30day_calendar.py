# ©Nirajmallik@hub
#!/usr/bin/env python3
# Copyright (c) 2026 Nirajmallik@-hub (Niraj Mallik / Mallik Group)
# Licensed under the MIT License.

import os, json

BASE_DIR = os.path.expanduser("~/usa-viral-cartoon")
CAL_PATH = os.path.join(BASE_DIR, "calendar_30d.json")

TOPICS_30D = [
    ("Space & Planets", "Why does it rain real diamonds on Neptune?", "Blast Off to the Ice Giants: Uranus and Neptune", "Which planet is hot enough to melt lead?", "Surviving the Wild Weather of Our Solar System"),
    ("Ocean Superpowers", "This ocean creature has 3 hearts and blue blood!", "Deep Sea Mysteries: Inside the Midnight Zone", "Why do sea otters hold hands while sleeping?", "Coral Reef Rescue: How Sea Animals Help Each Other"),
    ("How Machines Work", "How does a 300-ton airplane stay up in the sky?", "Inside a Giant Jet Engine: Science of Flight", "Why dont tall skyscrapers fall over in the wind?", "Building Mega Bridges and Towers with Professor Leo"),
    ("Visual Math Magic", "Can you solve Pips 5-second pizza fraction trick?", "The Great Galaxy Bakery: Fractions Made Easy", "Why is zero the most powerful number in math?", "Secret Patterns in Nature: Counting and Symmetry"),
    ("Dinosaur Science", "Why did T-Rex have tiny arms and how strong were they?", "Time-Travel Safari: Meet the Cretaceous Giants", "Which dinosaur had a built-in trumpet on its head?", "How Fossils Tell Stories from 65 Million Years Ago"),
    ("Space & Planets", "What happens if you try to stand on Jupiter?", "Journey Through Jupiters Giant Red Storm", "Why does the Moon change shape every night?", "Moon Base Mission: Gravity, Craters and Phases"),
    ("Animal Mysteries", "How can a chameleon change colors in 2 seconds?", "Masters of Disguise: Rain Forest Camouflage", "Which bird can fly backwards like a helicopter?", "Tiny Flyers: How Bees and Hummingbirds Navigate"),
    ("How Machines Work", "Where does electricity go when you flip a switch?", "Pips Power Lab: Circuits, Batteries and Light", "How do giant submarines breathe underwater?", "Undersea Explorers: How Submarines Dive and Rise"),
    ("Visual Math Magic", "How many triangles are hidden in this star puzzle?", "Shape Detectives: Geometry in the Real World", "Can you double a penny to a million dollars?", "Magic Multiplication: Fast Tricks with Pip"),
    ("Dinosaur Science", "Which flying reptile was as big as a fighter jet?", "Skies of the Dinosaurs: Pterosaurs in Action", "Why did Stegosaurus have giant plates on its back?", "Herbivore Heroes: How Plant-Eating Dinos Stayed Safe"),
    ("Space & Planets", "Why are Saturns rings disappearing slowly?", "Ring World Explorer: Ice and Rock Around Saturn", "How fast does a shooting star actually travel?", "Comets, Asteroids and Meteor Showers Explained"),
    ("Ocean Superpowers", "How do whales talk across an entire ocean?", "Songs of the Blue Whale: Ocean Communication", "Why do pufferfish blow up like spiky balloons?", "Clever Sea Defenses: Octopuses, Crabs and Rays"),
    ("How Machines Work", "How does a rocket escape Earths gravity?", "Countdown to Orbit: How Space Rockets Work", "Why do magnets push away and snap together?", "Invisible Forces: Magnetism and Gravity Lab"),
    ("Visual Math Magic", "What is a googol and is it bigger than space?", "Big Numbers Adventure: From 100 to Infinity", "Can you split 12 space cookies equally 4 ways?", "Division and Sharing Fairly at Pips Space Cafe"),
    ("Dinosaur Science", "How fast could a Velociraptor really run?", "Dino Trackers: Clues from Ancient Footprints", "Which ocean reptile ruled the Jurassic seas?", "Monsters of the Ancient Ocean: Plesiosaurs"),
    ("Space & Planets", "Why is Mars bright red like rusty iron?", "Rover Mission Mars: Searching for Ancient Water", "How hot is the center of our Sun?", "Solar Powerhouse: How the Sun Keeps Earth Alive"),
    ("Animal Mysteries", "How do bats see in total darkness with sound?", "Night Shift Nature: Owls, Bats and Fireflies", "Why do penguins wear built-in tuxedos?", "Polar Survival: Life in Antarctica and the Arctic"),
    ("How Machines Work", "How does a roller coaster loop without falling?", "Physics at the Theme Park: Loops and Speed", "How do satellites beam maps to your phone?", "Eyes in the Sky: How Satellites Help Earth"),
    ("Visual Math Magic", "What clock time is it when both hands overlap?", "Time Travelers: Mastering Clocks and Minutes", "Can you spot the missing number in Pips vault?", "Code Breakers: Number Sequences and Logic"),
    ("Dinosaur Science", "What caused the dinosaurs to vanish 66M years ago?", "The Asteroid Mystery and How Birds Survived", "Which dinosaur had 500 replaceable teeth?", "Dino Dentists: What Teeth Tell Us About Dino Diets"),
    ("Space & Planets", "Why does one day on Venus last longer than its year?", "Twin Planets Gone Wild: Earth vs Venus", "What is a black hole and can light escape it?", "Gravity Giants: Stars, Nebulas and Black Holes"),
    ("Ocean Superpowers", "How can an electric eel shock its prey?", "Glow-in-the-Dark Ocean: Bioluminescent Creatures", "Why is ocean water salty while rivers are fresh?", "The Water Cycle Express: From Cloud to Ocean"),
    ("How Machines Work", "How do giant wind turbines turn breeze into power?", "Clean Energy Island: Wind, Sun and Water Power", "Why do trains stay on metal tracks around curves?", "Wheels, Gears and Simple Machines with Leo"),
    ("Visual Math Magic", "How do honeybees build perfect hexagons?", "Natures Architects: Why Hexagons Are Strongest", "Can you measure a tall tree using its shadow?", "Measurement Quest: Inches, Feet and Miles"),
    ("Dinosaur Science", "Which armored dinosaur had a club tail like a hammer?", "Tank Dinosaurs: Ankylosaurus and Triceratops", "How big was a baby Brachiosaurus when it hatched?", "Gentle Giants: Growing Up in a Sauropod Herd"),
    ("Space & Planets", "How do astronauts sleep and brush teeth in space?", "A Day Aboard the International Space Station", "Why is Pluto called a dwarf planet today?", "Edge of the Solar System: Pluto and Kuiper Belt"),
    ("Animal Mysteries", "How can ants lift 50 times their own body weight?", "Tiny Teamwork: Inside an Underground Ant City", "Why do monarch butterflies migrate 3000 miles?", "Great Animal Migrations Across North America"),
    ("How Machines Work", "How does a 3D printer build toys layer by layer?", "Future Makers Lab: Robots and 3D Printing", "Why do boats made of heavy steel float on water?", "Sink or Float? Buoyancy Experiments with Pip"),
    ("Visual Math Magic", "What happens when you fold a paper 42 times?", "Exponential Power: How Things Grow Super Fast", "Can you balance Leos mystery weight scale?", "Algebra for Kids: Solving Mystery Boxes"),
    ("Mega Finale", "Top 3 Mind-Blowing Science Facts from Month 1!", "Grand Science Quiz Championship with Leo and Pip", "Can you guess the secret Season 2 planet?", "Graduation Celebration: Young Explorer Awards"),
]

calendar = [
    {
        "day": idx,
        "niche": niche,
        "slots": {
            "slot_1_morning_short": f"{niche} — Hook: {s1}",
            "slot_2_midday_long": f"{niche} — Episode: {l1}",
            "slot_3_afternoon_short": f"{niche} — Hook: {s2}",
            "slot_4_evening_long": f"{niche} — Episode: {l2}",
        },
    }
    for idx, (niche, s1, l1, s2, l2) in enumerate(TOPICS_30D, start=1)
]

with open(CAL_PATH, "w", encoding="utf-8") as f:
    json.dump(calendar, f, indent=2)

engine_path = os.path.join(BASE_DIR, "usa_viral_cartoon_engine.py")
if os.path.exists(engine_path):
    with open(engine_path, "r", encoding="utf-8") as f:
        code = f.read()

    helper = '''def get_scheduled_topic(slot_name: str, fallback_topic: str) -> str:
    if fallback_topic:
        return fallback_topic
    cal_file = os.path.join(BASE_DIR, "calendar_30d.json")
    if os.path.exists(cal_file):
        with open(cal_file, "r", encoding="utf-8") as cf:
            cal = json.load(cf)
        day_index = (datetime.now().timetuple().tm_yday - 1) % len(cal)
        return cal[day_index]["slots"].get(slot_name, "")
    return ""
'''
    if "def get_scheduled_topic(" not in code:
        code = code.replace("def run_slot(", helper + "\n\ndef run_slot(", 1)
        code = code.replace(
            'script = generate_viral_script(slot_cfg["format"], slot_cfg["scenes"], custom_topic)',
            'resolved_topic = get_scheduled_topic(slot_cfg["slot"], custom_topic)\n    script = generate_viral_script(slot_cfg["format"], slot_cfg["scenes"], resolved_topic)'
        )
        with open(engine_path, "w", encoding="utf-8") as f:
            f.write(code)
        print("✅ Wired 30-Day Calendar into usa_viral_cartoon_engine.py!")

print(f"✅ Saved 30-day calendar (120 videos) to {CAL_PATH}")
