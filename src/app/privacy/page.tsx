import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "ROLAN AUTOMATION privacy policy — how we collect, use, and protect your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle={`Last updated: July 1, 2026`} />
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl px-4 prose prose-lg text-muted">
          <h2 className="font-heading text-foreground text-xl font-bold">Introduction</h2>
          <p>{SITE.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Information We Collect</h2>
          <p>We collect information you provide directly (name, email, company, project details) and automatically (cookies, analytics, device information).</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">How We Use Your Information</h2>
          <p>We use your information to respond to inquiries, deliver services, improve our website, and send relevant communications with your consent.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Data Security</h2>
          <p>We implement industry-standard security measures including encryption, access controls, and regular security audits aligned with SOC 2 practices.</p>
          <h2 className="font-heading text-foreground text-xl font-bold mt-8">Contact</h2>
          <p>For privacy inquiries, contact us at {SITE.email}.</p>
        </div>
      </section>
    </>
  );
}
