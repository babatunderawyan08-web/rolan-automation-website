import type { Metadata } from "next";
import Image from "next/image";
import { siFacebook, siTelegram, siTiktok, siWhatsapp } from "simple-icons";
import photo from "./background.jpg";
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
      <div className={styles.frame} aria-hidden="true">
        <div className={styles.frameTrack} />
      </div>

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
