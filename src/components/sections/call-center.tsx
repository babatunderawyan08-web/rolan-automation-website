"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { callCenterServices } from "@/data/site-data";
import { SectionHeader } from "@/components/shared/section-header";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { BrandLogo } from "@/components/shared/brand-logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { Badge } from "@/components/ui/badge";
import { hasBrandLogo, SERVICE_BRAND } from "@/lib/brand-icons";
import { SoftwareShowcase, type ShowcaseSlide } from "@/components/features/software-showcase";

/** Brand marks for list icons — 3CX may appear in the list, never in the showcase */

/** Call-center product screens — no 3CX (has its own landing page) */
const CALL_CENTER_SLIDES: ShowcaseSlide[] = [
  { src: "/screenshots/call-center/vicidial-admin.png", title: "VICIdial Admin Dashboard" },
  { src: "/screenshots/call-center/vicidial-agent.png", title: "VICIdial Agent Interface" },
  { src: "/screenshots/call-center/freepbx-dashboard.png", title: "FreePBX Dashboard" },
  { src: "/screenshots/call-center/asterisk-console.png", title: "Asterisk Management Console" },
  { src: "/screenshots/call-center/pbx-queue.png", title: "PBX Call Queue" },
  { src: "/screenshots/call-center/sip-trunks.png", title: "SIP Trunk Configuration" },
  { src: "/screenshots/call-center/ivr-flow.png", title: "IVR Flow Designer" },
  { src: "/screenshots/call-center/call-analytics.png", title: "Call Analytics Dashboard" },
  { src: "/screenshots/call-center/call-recording.png", title: "Call Recording Interface" },
  { src: "/screenshots/call-center/live-monitoring.png", title: "Live Agent Monitoring" },
];

export function CallCenterSection() {
  return (
    <section id="call-center" className="section-padding">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Call Center Solutions"
          title="Enterprise telephony & call center infrastructure"
          subtitle="VICIdial, FreePBX, Asterisk, IVR, queues, and CRM-integrated call flows — built and managed by specialists."
        />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["VICIdial Expert", "FreePBX Specialist", "Asterisk Developer", "VoIP Specialist"].map(
            (badge) => (
              <Badge key={badge} variant="accent">
                {badge}
              </Badge>
            )
          )}
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          {/* Left: service list */}
          <FadeIn>
            <StaggerContainer className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {callCenterServices.slice(0, 10).map((service) => {
                const brand = SERVICE_BRAND[service.id];
                const useBrand = !!(brand && hasBrandLogo(brand));
                return (
                  <StaggerItem key={service.id}>
                    <Link
                      href={`/services/${service.id}`}
                      className="group flex gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          useBrand
                            ? "overflow-hidden bg-transparent p-0"
                            : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                        }`}
                      >
                        {useBrand && brand ? (
                          <BrandLogo name={brand} size={40} className="rounded-xl" />
                        ) : (
                          <DynamicIcon name={service.icon} className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-semibold leading-snug">
                          {service.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                          {service.description}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                          View sample work <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </FadeIn>

          {/* Right: showcase — no 3CX media */}
          <FadeIn delay={0.12} direction="right" className="lg:sticky lg:top-28">
            <SoftwareShowcase slides={CALL_CENTER_SLIDES} accent="accent" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
