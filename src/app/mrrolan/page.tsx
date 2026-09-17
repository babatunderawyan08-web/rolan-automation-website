import type { Metadata } from "next";
import Image from "next/image";
import { siFacebook, siTelegram, siTiktok, siWhatsapp, siX } from "simple-icons";
import photo from "./background.jpg";
import { EdgeLight } from "./edge-light";
import { HideDevBadge } from "./hide-dev-badge";
import styles from "./mrrolan.module.css";

export const metadata: Metadata = {
  title: "Start Your Online Business",
  description: "Learn in-demand digital skills and start earning online.",
  robots: { index: false, follow: false },
};

function BrandIcon({ path, title }: { path: string; title: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <title>{title}</title>
      <path d={path} fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <title>TikTok</title>
      <path d={siTiktok.path} fill="#25F4EE" transform="translate(-0.55 0.25)" />
      <path d={siTiktok.path} fill="#FE2C55" transform="translate(0.55 -0.25)" />
      <path d={siTiktok.path} fill="#ffffff" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7.2 3.75h2.18c.45 0 .84.3.96.74l.86 3.12a1 1 0 0 1-.27 1l-1.2 1.2a12.3 12.3 0 0 0 4.66 4.66l1.2-1.2a1 1 0 0 1 1-.27l3.12.86c.44.12.74.51.74.96v2.18a1.5 1.5 0 0 1-1.62 1.5C10.7 19.4 4.6 13.3 3.7 5.37a1.5 1.5 0 0 1 1.5-1.62Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.75 12h16.5M12 3.75c2.4 2.5 3.6 5.35 3.6 8.25s-1.2 5.75-3.6 8.25M12 3.75c-2.4 2.5-3.6 5.35-3.6 8.25s1.2 5.75 3.6 8.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const connections = [
  {
    href: "https://wa.me/2347034821995",
    label: "WhatsApp",
    detail: "Chat with me",
    className: styles.whatsapp,
    icon: <BrandIcon path={siWhatsapp.path} title="WhatsApp" />,
  },
  {
    href: "tel:+2347034821995",
    label: "Call Me",
    detail: "Contact me",
    className: styles.call,
    icon: <PhoneIcon />,
  },
  {
    href: "https://rolanautomation.com",
    label: "Website",
    detail: "Rolan Automation",
    className: styles.website,
    icon: <GlobeIcon />,
  },
  {
    href: "https://t.me/rolanautomation",
    label: "Telegram",
    detail: "Message me",
    className: styles.telegram,
    icon: <BrandIcon path={siTelegram.path} title="Telegram" />,
  },
  {
    href: "https://www.linkedin.com/in/babatunde-rawyan-7567a2346/",
    label: "LinkedIn",
    detail: "Connect with me",
    className: styles.linkedin,
    icon: <LinkedInIcon />,
  },
  {
    href: "https://x.com/rolanautomation",
    label: "X",
    detail: "Follow Rolan Automation",
    className: styles.x,
    icon: <BrandIcon path={siX.path} title="X" />,
  },
] as const;

const socials = [
  {
    href: "https://www.facebook.com/profile.php?id=61589999955259",
    label: "Facebook",
    className: styles.facebook,
    icon: <BrandIcon path={siFacebook.path} title="Facebook" />,
  },
  {
    href: "https://www.tiktok.com/@meyouwin",
    label: "TikTok",
    className: styles.tiktok,
    icon: <TikTokIcon />,
  },
] as const;

export default function MrRolanPage() {
  return (
    <div className={styles.page}>
      <HideDevBadge />
      <Image
        src={photo}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.photo}
      />
      <div className={styles.veil} />
      <EdgeLight />

      <main className={styles.stage}>
        <header className={styles.intro}>
          <h1 className={styles.headline}>
            <span>Start your</span>
            <span className={styles.accent}>Online</span>
            <span>Business</span>
          </h1>
          <p className={styles.subhead}>
            Learn in-demand digital skills and start earning online.
          </p>
        </header>

        <div className={styles.lower}>
          <section className={styles.skills} aria-label="Skills you can learn">
            <p className={styles.kicker}>Skills you can learn</p>
            <ul className={styles.skillList}>
              <li>Web Design</li>
              <li>Video Editing</li>
              <li>Game &amp; App Creation</li>
              <li>And More</li>
            </ul>
            <p className={styles.promise}>
              Build skills.
              <br />
              Build income.
            </p>
          </section>

          <section className={styles.connectBlock} aria-label="Connect">
            <div className={styles.actions}>
              {connections.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  className={`${styles.button} ${link.className}`}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className={styles.icon}>{link.icon}</span>
                  <span className={styles.buttonText}>
                    <span className={styles.buttonLabel}>{link.label}</span>
                    <span className={styles.buttonDetail}>{link.detail}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className={styles.followBlock} aria-label="Follow me">
            <p className={styles.follow}>Follow me</p>
            <div className={styles.socials}>
              {socials.map((link) => (
                <a
                  key={`social-${link.label}`}
                  className={`${styles.social} ${link.className}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                </a>
              ))}
            </div>
          </section>

          <p className={styles.motto}>Learn Today • Earn Tomorrow</p>
        </div>
      </main>
    </div>
  );
}
