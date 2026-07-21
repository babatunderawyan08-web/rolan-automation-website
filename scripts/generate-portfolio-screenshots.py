"""
Generate high-quality portfolio device mockup screenshots (PNG).
Realistic software UI layouts with blurred sensitive fields.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1280, 720

PROJECTS = [
    {
        "file": "ai-support",
        "product": "n8n · Support Triage",
        "accent": (99, 102, 241),
        "kind": "workflow",
        "nodes": ["Ticket In", "AI Classify", "Auto-Reply", "Escalate", "Slack"],
        "stats": [("Resolved", "68%"), ("First reply", "<2m"), ("Cost ↓", "40%")],
    },
    {
        "file": "real-estate",
        "product": "GoHighLevel · Lead Pipeline",
        "accent": (14, 165, 233),
        "kind": "crm",
        "columns": ["New", "Qualified", "Showing", "Offer", "Closed"],
        "stats": [("Qualified", "4.2×"), ("Response", "67% faster"), ("Revenue", "+$2.1M")],
    },
    {
        "file": "lead-gen",
        "product": "HubSpot · Lead Enrichment",
        "accent": (245, 158, 11),
        "kind": "table",
        "headers": ["Company", "Contact", "Score", "Source", "Owner"],
        "stats": [("Leads", "3×"), ("Accuracy", "90%"), ("Saved", "25h/wk")],
    },
    {
        "file": "healthcare",
        "product": "Calendly · Patient Scheduling",
        "accent": (16, 185, 129),
        "kind": "calendar",
        "stats": [("Wait ↓", "78%"), ("No-shows ↓", "52%"), ("Speed", "3×")],
    },
    {
        "file": "whatsapp",
        "product": "WhatsApp Business · Order Bot",
        "accent": (34, 197, 94),
        "kind": "chat",
        "stats": [("Auto replies", "85%"), ("Coverage", "24/7"), ("Rating", "4.8★")],
    },
    {
        "file": "email",
        "product": "Salesforce · Email Sequences",
        "accent": (59, 130, 246),
        "kind": "email",
        "stats": [("Automated", "94%"), ("Missed", "0"), ("Saved", "18h/wk")],
    },
    {
        "file": "logistics",
        "product": "Dispatch API Console",
        "accent": (100, 116, 139),
        "kind": "api",
        "stats": [("Dispatch ↓", "85%"), ("Fuel ↓", "22%"), ("On-time", "99.2%")],
    },
    {
        "file": "education",
        "product": "Enrollment Portal",
        "accent": (168, 85, 247),
        "kind": "form",
        "stats": [("Time", "3 days"), ("Satisfaction", "89%"), ("Staff ↓", "60%")],
    },
    {
        "file": "ai-voice",
        "product": "Twilio · AI Voice Agent",
        "accent": (236, 72, 153),
        "kind": "voice",
        "stats": [("Tier-1 auto", "73%"), ("Hold", "2 min"), ("CSAT", "92%")],
    },
    {
        "file": "3cx",
        "product": "3CX Management Console",
        "accent": (37, 99, 235),
        "kind": "pbx",
        "stats": [("Agents", "150"), ("Uptime", "99.9%"), ("Cost ↓", "45%")],
    },
    {
        "file": "vicidial",
        "product": "VICIdial Admin",
        "accent": (27, 79, 114),
        "kind": "dialer",
        "stats": [("Contact", "3.1×"), ("Convos/day", "+41%"), ("DNC", "100%")],
    },
    {
        "file": "freepbx",
        "product": "FreePBX Dashboard",
        "accent": (220, 38, 38),
        "kind": "pbx",
        "stats": [("Cost ↓", "70%"), ("Extensions", "40"), ("Recording", "On")],
    },
    {
        "file": "cloud-pbx",
        "product": "Cloud PBX · Multi-site",
        "accent": (8, 145, 178),
        "kind": "map",
        "stats": [("Sites", "12"), ("Reporting", "Central"), ("Cost ↓", "35%")],
    },
    {
        "file": "sip",
        "product": "SIP Trunk Monitor",
        "accent": (124, 58, 237),
        "kind": "network",
        "stats": [("MOS", "4.3"), ("Completion", "99.99%"), ("Downtime", "0")],
    },
    {
        "file": "ivr",
        "product": "IVR Flow Designer",
        "accent": (5, 150, 105),
        "kind": "flow",
        "stats": [("Transfers ↓", "30%"), ("ASA", "<30s"), ("CSAT ↑", "18%")],
    },
    {
        "file": "queue",
        "product": "Queue SLA Dashboard",
        "accent": (217, 119, 6),
        "kind": "queue",
        "stats": [("Hold ↓", "75%"), ("Abandon ↓", "40%"), ("SLA", "98%")],
    },
    {
        "file": "recording",
        "product": "Call Archive Search",
        "accent": (79, 70, 229),
        "kind": "search",
        "stats": [("Coverage", "100%"), ("Search", "Seconds"), ("Audit", "Passed")],
    },
    {
        "file": "crm-pbx",
        "product": "HubSpot · Screen Pop",
        "accent": (225, 29, 72),
        "kind": "crm",
        "columns": ["Open", "Contacted", "Demo", "Proposal", "Won"],
        "stats": [("Logged", "100%"), ("Screen-pop", "Every call"), ("Handle ↓", "22%")],
    },
    {
        "file": "outbound",
        "product": "VICIdial · Progressive Dialer",
        "accent": (13, 148, 136),
        "kind": "dialer",
        "stats": [("Calls/day", "120"), ("Conversion", "2.8×"), ("Compliance", "Full")],
    },
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def rounded(draw: ImageDraw.ImageDraw, xy, radius: int, fill):
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def blur_field(img: Image.Image, box: tuple[int, int, int, int], color=(203, 213, 225)):
    """Draw a blurred sensitive field (PII redaction)."""
    x0, y0, x1, y1 = box
    patch = Image.new("RGB", (x1 - x0, y1 - y0), color)
    noise = Image.effect_noise((x1 - x0, y1 - y0), 28).convert("RGB")
    mixed = Image.blend(patch, noise, 0.35).filter(ImageFilter.GaussianBlur(4))
    img.paste(mixed, (x0, y0))


def draw_browser_chrome(draw: ImageDraw.ImageDraw, product: str, accent):
    draw.rectangle((0, 0, W, 48), fill=(15, 23, 42))
    for i, c in enumerate([(239, 68, 68), (245, 158, 11), (34, 197, 94)]):
        draw.ellipse((18 + i * 20, 16, 30 + i * 20, 28), fill=c)
    rounded(draw, (92, 12, 520, 36), 10, (30, 41, 59))
    draw.text((108, 16), product, fill=(148, 163, 184), font=font(13))
    rounded(draw, (W - 160, 12, W - 24, 36), 8, accent)


def draw_sidebar(draw: ImageDraw.ImageDraw, accent):
    rounded(draw, (20, 64, 220, H - 20), 16, (255, 255, 255))
    rounded(draw, (40, 88, 160, 104), 6, accent)
    for i in range(6):
        y = 128 + i * 36
        rounded(draw, (40, y, 190, y + 18), 6, (226, 232, 240) if i else (241, 245, 249))


def draw_stats(draw: ImageDraw.ImageDraw, stats, accent, y=84):
    x = 244
    for label, value in stats:
        rounded(draw, (x, y, x + 200, y + 88), 14, (255, 255, 255))
        draw.text((x + 18, y + 18), label, fill=(100, 116, 139), font=font(13))
        draw.text((x + 18, y + 42), value, fill=accent, font=font(26, bold=True))
        x += 220


def draw_workflow(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    nodes = p["nodes"]
    y = 220
    x = 280
    for i, name in enumerate(nodes):
        rounded(draw, (x, y, x + 150, y + 72), 12, (255, 255, 255))
        draw.rectangle((x, y, x + 6, y + 72), fill=accent)
        draw.text((x + 18, y + 26), name, fill=(15, 23, 42), font=font(14, bold=True))
        if i < len(nodes) - 1:
            draw.line((x + 150, y + 36, x + 180, y + 36), fill=accent, width=3)
            draw.polygon(
                [(x + 180, y + 28), (x + 192, y + 36), (x + 180, y + 44)],
                fill=accent,
            )
        x += 192
    # canvas board
    rounded(draw, (244, 320, W - 24, H - 24), 16, (255, 255, 255))
    for i in range(4):
        rounded(draw, (280 + i * 180, 360, 420 + i * 180, 460), 12, (248, 250, 252))
        draw.rectangle((280 + i * 180, 360, 286 + i * 180, 460), fill=accent)
        draw.text((300 + i * 180, 400), f"Step {i+1}", fill=(71, 85, 105), font=font(14))
    # sensitive ticket fields
    blur_field(img, (300, 500, 620, 528))
    blur_field(img, (300, 548, 540, 576))
    draw.text((300, 600), "Sensitive ticket fields redacted", fill=(148, 163, 184), font=font(12))


def draw_crm(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    cols = p.get("columns", ["New", "Working", "Won"])
    x = 244
    for col in cols:
        rounded(draw, (x, 200, x + 180, H - 24), 14, (248, 250, 252))
        draw.text((x + 16, 220), col, fill=(15, 23, 42), font=font(15, bold=True))
        for r in range(3):
            y = 260 + r * 110
            rounded(draw, (x + 12, y, x + 168, y + 90), 10, (255, 255, 255))
            draw.rectangle((x + 12, y, x + 18, y + 90), fill=accent)
            if r == 1:
                blur_field(img, (x + 28, y + 20, x + 150, y + 40))
                blur_field(img, (x + 28, y + 52, x + 120, y + 68))
            else:
                draw.text((x + 28, y + 22), "Opportunity", fill=(71, 85, 105), font=font(12))
                rounded(draw, (x + 28, y + 52, x + 110, y + 68), 4, (226, 232, 240))
        x += 200


def draw_table(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    headers = p.get("headers", ["A", "B", "C", "D", "E"])
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    draw.rectangle((244, 200, W - 24, 248), fill=(248, 250, 252))
    col_w = (W - 24 - 244) // len(headers)
    for i, h in enumerate(headers):
        draw.text((260 + i * col_w, 216), h, fill=(100, 116, 139), font=font(13, bold=True))
    for r in range(6):
        y = 268 + r * 60
        draw.line((260, y - 12, W - 44, y - 12), fill=(241, 245, 249), width=1)
        for i in range(len(headers)):
            x0 = 260 + i * col_w
            if i in (1, 2) or r in (2, 4):
                blur_field(img, (x0, y, x0 + col_w - 24, y + 22))
            else:
                rounded(draw, (x0, y, x0 + 90, y + 18), 4, (226, 232, 240))
        if r == 0:
            rounded(draw, (W - 140, y - 4, W - 44, y + 24), 8, accent)


def draw_calendar(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    for i, d in enumerate(days):
        x = 280 + i * 130
        draw.text((x, 224), d, fill=(100, 116, 139), font=font(13, bold=True))
        for row in range(3):
            y = 270 + row * 120
            rounded(draw, (x - 8, y, x + 110, y + 96), 10, (248, 250, 252))
            if (i + row) % 3 == 0:
                rounded(draw, (x, y + 16, x + 94, y + 52), 8, accent)
                blur_field(img, (x + 8, y + 62, x + 86, y + 80))
            else:
                rounded(draw, (x + 8, y + 28, x + 86, y + 44), 4, (226, 232, 240))


def draw_chat(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, 560, H - 24), 16, (255, 255, 255))
    rounded(draw, (580, 200, W - 24, H - 24), 16, (255, 255, 255))
    bubbles = [
        (False, "Where is my order #••••?"),
        (True, "Your package is out for delivery."),
        (False, "Can I change the address?"),
        (True, "Sure — share the new address."),
    ]
    y = 240
    for bot, text in bubbles:
        if bot:
            rounded(draw, (268, y, 500, y + 56), 14, accent)
            draw.text((284, y + 18), text[:34], fill=(255, 255, 255), font=font(13))
        else:
            rounded(draw, (268, y, 520, y + 56), 14, (241, 245, 249))
            if "••••" in text:
                blur_field(img, (400, y + 16, 500, y + 36))
                draw.text((284, y + 18), "Where is my order", fill=(51, 65, 85), font=font(13))
            else:
                draw.text((284, y + 18), text[:36], fill=(51, 65, 85), font=font(13))
        y += 80
    # CRM panel
    draw.text((620, 236), "Customer profile", fill=(15, 23, 42), font=font(16, bold=True))
    blur_field(img, (620, 280, 900, 308))
    blur_field(img, (620, 328, 820, 352))
    rounded(draw, (620, 380, 900, 420), 10, (240, 253, 244))
    draw.text((640, 392), "Order status: In transit", fill=accent, font=font(14, bold=True))


def draw_email(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    for i, label in enumerate(["Welcome", "Docs requested", "Status update", "Reminder"]):
        y = 230 + i * 90
        rounded(draw, (270, y, W - 48, y + 72), 12, (248, 250, 252))
        draw.ellipse((290, y + 20, 326, y + 56), fill=accent)
        draw.text((350, y + 16), label, fill=(15, 23, 42), font=font(15, bold=True))
        blur_field(img, (350, y + 42, 680, y + 58))


def draw_api(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, 760, H - 24), 16, (15, 23, 42))
    draw.text((270, 230), "GET /dispatch/routes", fill=accent, font=font(14, bold=True))
    lines = [
        '{',
        '  "routeId": "••••••••",',
        '  "driver": "••••••••",',
        '  "eta": "14:32",',
        '  "status": "en_route"',
        '}',
    ]
    for i, line in enumerate(lines):
        y = 280 + i * 34
        if "••••" in line:
            blur_field(img, (290, y, 520, y + 22), color=(51, 65, 85))
        else:
            draw.text((290, y), line, fill=(226, 232, 240), font=font(14))
    rounded(draw, (788, 200, W - 24, H - 24), 16, (255, 255, 255))
    draw.text((820, 240), "Live sync", fill=(15, 23, 42), font=font(16, bold=True))
    for i, name in enumerate(["GPS", "CRM", "SMS", "Analytics"]):
        y = 300 + i * 70
        rounded(draw, (820, y, 1180, y + 52), 10, (248, 250, 252))
        draw.ellipse((840, y + 16, 868, y + 44), fill=accent)
        draw.text((890, y + 16), name, fill=(51, 65, 85), font=font(14, bold=True))


def draw_form(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    draw.text((280, 236), "Student enrollment", fill=(15, 23, 42), font=font(22, bold=True))
    fields = ["Parent name", "Student name", "Email", "Phone", "Payment"]
    for i, label in enumerate(fields):
        y = 290 + i * 60
        draw.text((280, y), label, fill=(100, 116, 139), font=font(12))
        rounded(draw, (280, y + 18, 900, y + 46), 8, (248, 250, 252))
        if i < 4:
            blur_field(img, (292, y + 24, 620, y + 40))
    rounded(draw, (280, 620, 460, 668), 10, accent)
    draw.text((320, 634), "Submit", fill=(255, 255, 255), font=font(15, bold=True))


def draw_voice(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    draw.ellipse((560, 280, 720, 440), outline=accent, width=8)
    draw.ellipse((600, 320, 680, 400), fill=accent)
    draw.text((520, 470), "AI Voice Agent · Live", fill=(15, 23, 42), font=font(18, bold=True))
    # waveform
    import math
    for i in range(40):
        h = 20 + int(30 * abs(math.sin(i / 3)))
        x = 360 + i * 14
        draw.rectangle((x, 540 - h // 2, x + 8, 540 + h // 2), fill=accent)
    blur_field(img, (420, 580, 860, 610))


def draw_pbx(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    panels = [("Extensions", "150"), ("Queues", "12"), ("Trunks", "4"), ("IVR", "3")]
    for i, (label, val) in enumerate(panels):
        x = 280 + (i % 4) * 230
        y = 240
        rounded(draw, (x, y, x + 210, y + 120), 12, (248, 250, 252))
        draw.text((x + 20, y + 28), label, fill=(100, 116, 139), font=font(13))
        draw.text((x + 20, y + 58), val, fill=accent, font=font(32, bold=True))
    rounded(draw, (280, 400, W - 48, H - 48), 12, (248, 250, 252))
    for r in range(4):
        y = 430 + r * 50
        draw.text((310, y), f"Ext {1000 + r}", fill=(51, 65, 85), font=font(14, bold=True))
        blur_field(img, (420, y, 720, y + 22))
        status = "Available" if r % 2 == 0 else "On call"
        color = (34, 197, 94) if r % 2 == 0 else accent
        rounded(draw, (980, y - 4, 1120, y + 28), 8, color)
        draw.text((1000, y + 2), status, fill=(255, 255, 255), font=font(12, bold=True))


def draw_dialer(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, 820, H - 24), 16, (255, 255, 255))
    draw.text((280, 236), "Campaign: Loan Outreach", fill=(15, 23, 42), font=font(18, bold=True))
    for i, (k, v) in enumerate([("Dialing", "Active"), ("Agents", "24"), ("Drop %", "2.1")]):
        x = 280 + i * 160
        rounded(draw, (x, 290, x + 140, 370), 10, (248, 250, 252))
        draw.text((x + 16, 310), k, fill=(100, 116, 139), font=font(12))
        draw.text((x + 16, 334), v, fill=accent, font=font(18, bold=True))
    for r in range(4):
        y = 420 + r * 50
        blur_field(img, (280, y, 560, y + 24))
        rounded(draw, (600, y - 4, 760, y + 28), 8, accent if r % 2 else (34, 197, 94))
    rounded(draw, (848, 200, W - 24, H - 24), 16, (15, 23, 42))
    draw.text((880, 260), "Live monitor", fill=(255, 255, 255), font=font(16, bold=True))
    for i in range(5):
        y = 320 + i * 55
        rounded(draw, (880, y, 1200, y + 40), 8, (30, 41, 59))
        blur_field(img, (900, y + 10, 1100, y + 28), color=(51, 65, 85))


def draw_map(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    rounded(draw, (280, 240, 980, 620), 16, (241, 245, 249))
    sites = [(340, 320), (520, 280), (700, 360), (430, 450), (620, 500), (800, 420)]
    for x, y in sites:
        draw.ellipse((x, y, x + 18, y + 18), fill=accent)
        draw.ellipse((x - 8, y - 8, x + 26, y + 26), outline=accent, width=2)
    draw.text((1020, 280), "Sites online", fill=(15, 23, 42), font=font(16, bold=True))
    for i in range(6):
        y = 330 + i * 40
        rounded(draw, (1020, y, 1220, y + 28), 6, (248, 250, 252))
        blur_field(img, (1035, y + 6, 1180, y + 22))


def draw_network(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    hubs = [(400, 360), (640, 280), (880, 360), (640, 480)]
    labels = ["PBX", "Carrier A", "Carrier B", "Agents"]
    for (x, y), label in zip(hubs, labels):
        draw.ellipse((x - 40, y - 40, x + 40, y + 40), fill=accent)
        draw.text((x - 28, y - 8), label, fill=(255, 255, 255), font=font(12, bold=True))
    draw.line((440, 360, 600, 280), fill=accent, width=4)
    draw.line((680, 280, 840, 360), fill=accent, width=4)
    draw.line((640, 320, 640, 440), fill=accent, width=4)
    blur_field(img, (500, 560, 900, 600))


def draw_flow(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    steps = ["Welcome", "Language", "Billing", "Clinical", "Schedule", "Agent"]
    for i, s in enumerate(steps):
        x = 300 + (i % 3) * 280
        y = 280 + (i // 3) * 180
        rounded(draw, (x, y, x + 220, y + 100), 14, (248, 250, 252))
        draw.rectangle((x, y, x + 8, y + 100), fill=accent)
        draw.text((x + 24, y + 38), s, fill=(15, 23, 42), font=font(16, bold=True))
    blur_field(img, (320, 560, 700, 600))


def draw_queue(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    for i, (q, wait) in enumerate([("Sales", "0:42"), ("Support", "1:05"), ("VIP", "0:18"), ("Billing", "2:10")]):
        y = 240 + i * 100
        rounded(draw, (280, y, W - 48, y + 80), 12, (248, 250, 252))
        draw.text((310, y + 28), q, fill=(15, 23, 42), font=font(16, bold=True))
        draw.text((520, y + 28), f"Wait {wait}", fill=accent, font=font(16, bold=True))
        # bar
        rounded(draw, (720, y + 30, 1100, y + 50), 6, (226, 232, 240))
        fill_w = 100 + i * 60
        rounded(draw, (720, y + 30, 720 + fill_w, y + 50), 6, accent)
        blur_field(img, (310, y + 52, 480, y + 68))


def draw_search(img: Image.Image, draw: ImageDraw.ImageDraw, p):
    accent = p["accent"]
    rounded(draw, (244, 200, W - 24, H - 24), 16, (255, 255, 255))
    rounded(draw, (280, 240, W - 60, 300), 14, (248, 250, 252))
    draw.text((310, 260), "Search recordings…", fill=(148, 163, 184), font=font(16))
    for i in range(5):
        y = 340 + i * 60
        rounded(draw, (280, y, W - 60, y + 48), 10, (248, 250, 252))
        draw.ellipse((300, y + 12, 324, y + 36), fill=accent)
        blur_field(img, (350, y + 14, 700, y + 34))
        draw.text((980, y + 14), f"0{i+1}:2{i}", fill=(100, 116, 139), font=font(13))


KINDS = {
    "workflow": draw_workflow,
    "crm": draw_crm,
    "table": draw_table,
    "calendar": draw_calendar,
    "chat": draw_chat,
    "email": draw_email,
    "api": draw_api,
    "form": draw_form,
    "voice": draw_voice,
    "pbx": draw_pbx,
    "dialer": draw_dialer,
    "map": draw_map,
    "network": draw_network,
    "flow": draw_flow,
    "queue": draw_queue,
    "search": draw_search,
}


def render(project: dict) -> None:
    accent = project["accent"]
    img = Image.new("RGB", (W, H), (241, 245, 249))
    draw = ImageDraw.Draw(img)

    # soft background wash
    wash = Image.new("RGB", (W, H), (248, 250, 252))
    img = Image.blend(img, wash, 0.5)
    draw = ImageDraw.Draw(img)

    draw_browser_chrome(draw, project["product"], accent)
    draw_sidebar(draw, accent)
    draw_stats(draw, project["stats"], accent)

    kind = project["kind"]
    KINDS[kind](img, draw, project)

    # subtle laptop bezel vignette
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    vd.rectangle((0, 0, W, H), outline=(15, 23, 42, 30), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), vignette).convert("RGB")

    out_path = OUT / f"{project['file']}.png"
    img.save(out_path, "PNG", optimize=True)
    print(f"wrote {out_path.relative_to(ROOT)}")


def main() -> None:
    for project in PROJECTS:
        render(project)
    print(f"Generated {len(PROJECTS)} portfolio mockups")


if __name__ == "__main__":
    main()
