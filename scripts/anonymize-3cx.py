from PIL import Image, ImageDraw, ImageFont
import os

raw = r"public/images/3cx/raw"
out = r"public/images/3cx"
os.makedirs(out, exist_ok=True)


def load_font(size):
    for path in [
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibril.ttf",
    ]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


font_sm = load_font(14)
font_md = load_font(16)
font_lg = load_font(20)
font_xs = load_font(12)

SPECS = {
    "dashboard.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (250, 150, 1000, 430, "#ffffff"),
        ],
        "texts": [
            (270, 165, "System Information", "#0f172a", font_lg),
            (270, 200, "License: PRO Edition · 24 Simultaneous Calls", "#334155", font_sm),
            (270, 225, "Expires on 1 Jan 2027", "#00a1d9", font_sm),
            (270, 250, "License Owner: admin@example.com", "#334155", font_sm),
            (270, 275, "Version: 20.0 Update 9 (Build 995)", "#334155", font_sm),
            (270, 300, "3CX FQDN: your-company.3cx.example", "#334155", font_sm),
            (270, 325, "Install Type: Hosted by 3CX", "#334155", font_sm),
            (270, 350, "IPv4: 0.0.0.0 Static    IPv6: 2001:db8::1", "#334155", font_sm),
            (270, 385, "Active Calls 0/24   Users 24/120   Audit ENABLED", "#16a34a", font_sm),
        ],
        "profile": "JD",
    },
    "voice-chat.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (250, 145, 1000, 450, "#ffffff"),
        ],
        "texts": [
            (270, 160, "Name                    Information                 DIDs                 Route to", "#64748b", font_xs),
            (270, 190, "Primary SIP Trunk       Template: Generic SIP      +1 555-010-1001      Queue (80 Support)", "#334155", font_xs),
            (270, 220, "Backup Provider         Provider Default           +1 555-010-1002      User (100 Jane Doe)", "#334155", font_xs),
            (270, 250, "Regional Gateway        custom_config.xml          +44 20 7946 0958     IVR (801 Main Menu)", "#334155", font_xs),
            (270, 280, "Office Bridge           v20_template.xml           +1 555-010-1003      Queue (81 Sales)", "#334155", font_xs),
            (270, 310, "Intl Trunk 01           Template: Generic SIP      +61 2 5550 1234      User (101 John Smith)", "#334155", font_xs),
        ],
        "profile": "JD",
    },
    "call-handling.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (250, 145, 1000, 450, "#ffffff"),
        ],
        "texts": [
            (270, 160, "Name                          Extension    Department    DIDs", "#64748b", font_xs),
            (270, 190, "Main Office IVR               801          DEFAULT       N/C", "#334155", font_xs),
            (270, 220, "Support Queue                 80           DEFAULT       N/C", "#334155", font_xs),
            (270, 250, "Sales EMEA                    81           DEFAULT       N/C", "#334155", font_xs),
            (270, 280, "Marketing Receptionist        802          DEFAULT       N/C", "#334155", font_xs),
            (270, 310, "Regional IVR - Asia           803          DEFAULT       +1 555-010-9999", "#334155", font_xs),
            (270, 340, "Partner Support               82           DEFAULT       N/C", "#334155", font_xs),
        ],
        "profile": "JD",
    },
    "panel.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (250, 90, 1000, 450, "#ffffff"),
        ],
        "texts": [
            (270, 110, "All Calls", "#0f172a", font_md),
            (270, 140, "No active calls", "#94a3b8", font_sm),
            (270, 185, "Agent Status", "#0f172a", font_md),
            (270, 215, "Ext.   Agent Name         Queue logged in to", "#64748b", font_xs),
            (270, 245, "100    Jane Doe           Support Queue", "#334155", font_xs),
            (270, 270, "101    John Smith         Sales EMEA", "#334155", font_xs),
            (270, 295, "102    Alex Rivera        —", "#334155", font_xs),
            (270, 320, "103    Sam Lee            Partner Support", "#334155", font_xs),
            (270, 345, "104    Casey Morgan       —", "#334155", font_xs),
        ],
        "profile": "JD",
    },
    "call-forwarding.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (250, 90, 780, 450, "#ffffff"),
            (780, 90, 1020, 450, "#2b2b2b"),
        ],
        "texts": [
            (270, 110, "Call Forwarding", "#0f172a", font_lg),
            (270, 140, "Configure how calls should be handled for different availability states.", "#64748b", font_xs),
            (270, 180, "Available   Away   Do Not Disturb   Lunch   Business Trip", "#00a1d9", font_sm),
            (270, 220, "No Answer Timeout: 20 sec", "#334155", font_sm),
            (270, 250, "Forward external calls to: Voicemail", "#334155", font_sm),
            (270, 280, "Forward internal calls to: Voicemail", "#334155", font_sm),
            (800, 130, "JD", "#ffffff", font_lg),
            (840, 135, "Jane Doe 101", "#ffffff", font_sm),
            (840, 155, "Available", "#22c55e", font_xs),
        ],
        "profile": "JD",
    },
    "users.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (250, 145, 1000, 450, "#ffffff"),
        ],
        "texts": [
            (270, 160, "User              Email                      Ext   Department   2FA", "#64748b", font_xs),
            (270, 190, "Jane Doe          jane.doe@example.com       100   DEFAULT      Yes", "#334155", font_xs),
            (270, 220, "John Smith        john.smith@example.com     101   DEFAULT      Yes", "#334155", font_xs),
            (270, 250, "Alex Rivera       alex.rivera@example.com    102   DEFAULT      —", "#334155", font_xs),
            (270, 280, "Sam Lee           sam.lee@example.com        103   DEFAULT      Yes", "#334155", font_xs),
            (270, 310, "Casey Morgan      casey.m@example.com        104   DEFAULT      —", "#334155", font_xs),
            (270, 340, "Taylor Brooks     taylor.b@example.com       105   DEFAULT      Yes", "#334155", font_xs),
        ],
        "profile": "JD",
    },
    "mobile-app.png": {
        "covers": [
            (960, 6, 1015, 48, "#2b2b2b"),
            (300, 80, 760, 420, "#ffffff"),
        ],
        "texts": [
            (390, 120, "Install the 3CX App!", "#0f172a", font_lg),
            (360, 150, "Voice/Video call and chat with colleagues", "#64748b", font_sm),
            (340, 190, "1. Install the iOS, Android, Windows or PWA app", "#334155", font_xs),
            (340, 220, "2. Scan the placeholder QR to provision (demo only)", "#334155", font_xs),
            (430, 270, "[ QR PLACEHOLDER ]", "#94a3b8", font_md),
            (360, 330, "Single provisioning attempt · refresh for a new code", "#64748b", font_xs),
            (520, 370, "OK", "#00a1d9", font_md),
        ],
        "profile": "JD",
    },
}

for name, spec in SPECS.items():
    src = os.path.join(raw, name)
    if not os.path.exists(src):
        print("missing", name)
        continue
    im = Image.open(src).convert("RGB")
    draw = ImageDraw.Draw(im)
    for x1, y1, x2, y2, color in spec["covers"]:
        draw.rectangle([x1, y1, x2, y2], fill=color)
    draw.ellipse([968, 10, 1008, 50], fill="#64748b")
    draw.text((976, 20), spec["profile"], fill="white", font=font_xs)
    for x, y, text, color, font in spec["texts"]:
        draw.text((x, y), text, fill=color, font=font)
    dest = os.path.join(out, name)
    im.save(dest, optimize=True)
    print("saved", dest, im.size)

print("done")
