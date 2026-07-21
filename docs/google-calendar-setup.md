# Google Calendar appointment booking (production)

This site books appointments with a **Google Cloud service account** (server-to-server). Visitors never sign in with Google. The optional OAuth client below is only needed if you later switch to a user-delegated calendar.

## 1. Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project (e.g. `rolan-automation-website`).
3. Enable **Google Calendar API**:
   - APIs & Services → Library → search “Google Calendar API” → Enable.

## 2. Service account (required for this app)

1. APIs & Services → Credentials → **Create credentials** → **Service account**.
2. Name it (e.g. `rolan-booking`) → Create → Done.
3. Open the service account → **Keys** → **Add key** → **Create new key** → JSON → download.
4. From the JSON file, copy:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (keep `\n` escapes as a single-line string in Vercel, or paste the full key with real newlines in `.env.local`)

## 3. Share your calendar with the service account

1. Open [Google Calendar](https://calendar.google.com/) on the account that owns the business calendar.
2. Settings → select the calendar → **Share with specific people**.
3. Add the service account email (`…@….iam.gserviceaccount.com`).
4. Permission: **Make changes to events**.
5. Copy the calendar ID (Settings → Integrate calendar → Calendar ID) → `GOOGLE_CALENDAR_ID`  
   - Often your email, or an ID like `abc123@group.calendar.google.com`.

## 4. Google Meet for video calls

- Meet links are created via Calendar `conferenceData` when the visitor chooses **Video Call**.
- For reliable Meet generation, use a **Google Workspace** calendar (or a personal Google account calendar that supports Meet).
- If Meet is not available on the calendar, the event still creates; the Meet link may be missing.

## 5. Vercel environment variables

Set these for **Production** (and Preview if you test bookings there), then redeploy:

```
GOOGLE_CLIENT_EMAIL=…@….iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n…\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=your-calendar-id
BOOKING_TIMEZONE=Africa/Lagos
BOOKING_START_HOUR=9
BOOKING_END_HOUR=17
```

Also keep existing SMTP + Telegram vars for confirmation emails and owner notifications.

### Private key tips (Vercel)

- Paste the key in quotes.
- If auth fails, replace literal newlines with `\n` in one line.
- Do not commit the JSON key file to git.

## 6. Optional: OAuth client (future / admin tooling)

Only needed if you want a human Google account to authorize calendar access instead of a service account:

1. Credentials → **Create credentials** → **OAuth client ID**.
2. Application type: **Web application**.
3. Authorized redirect URIs (examples):
   - `https://www.rolanautomation.com/api/auth/google/callback`
   - `http://localhost:3000/api/auth/google/callback`
4. Store (if you add OAuth later):

```
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_REDIRECT_URI=https://www.rolanautomation.com/api/auth/google/callback
```

The current production booking path uses the **service account** vars above, not OAuth.

## 7. Verify

1. Open `/book-appointment`.
2. Confirm available dates/times load (not “calendar is not configured”).
3. Book a test video slot → check Google Calendar for the event + Meet link.
4. Confirm client email (.ics), business email, and Telegram notification.
5. Try booking the same slot again → should be rejected (double-booking prevention).

## Business hours

Slots are generated in the visitor’s selected time zone, but only within `BOOKING_START_HOUR`–`BOOKING_END_HOUR` as interpreted for each wall-clock slot. Adjust those env vars to match your working hours.
