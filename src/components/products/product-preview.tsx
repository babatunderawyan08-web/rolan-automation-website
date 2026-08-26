"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { getProduct, type Product, type ProductSlug } from "@/data/products";
import { LiveBars } from "@/components/shared/live-bars";
import { useInViewCycle } from "@/components/shared/use-in-view-cycle";

type Scene = { kind: "image"; ms: number } | { kind: "video"; src: string };

function scenesFor(product: Product | undefined, slug: ProductSlug): Scene[] {
  if (slug === "property") {
    return [
      { kind: "image", ms: 6500 },
      { kind: "video", src: "/videos/products/property.mp4" },
    ];
  }
  if (slug === "food") {
    return [
      { kind: "video", src: "/videos/products/food.mp4" },
      { kind: "video", src: "/videos/products/food-door.mp4" },
    ];
  }
  if (slug === "logistics") {
    return [{ kind: "video", src: "/videos/products/logistics.mp4" }];
  }
  if (slug === "clinic") {
    return [
      { kind: "image", ms: 4500 },
      { kind: "video", src: "/videos/products/clinic.mp4" },
    ];
  }
  if (slug === "finance") {
    return [
      { kind: "video", src: "/videos/products/finance.mp4" },
      { kind: "video", src: "/videos/products/finance-alert.mp4" },
    ];
  }
  const clips = product?.video
    ? Array.isArray(product.video)
      ? product.video
      : [product.video]
    : [];
  return clips.map((src) => ({ kind: "video" as const, src }));
}

export function ProductPreview({ slug }: { slug: ProductSlug }) {
  if (slug === "property") return <PropertyPreview />;
  if (slug === "food") return <FoodPreview />;
  if (slug === "logistics") return <LogisticsPreview />;
  if (slug === "learning") return <LearningPreview />;
  if (slug === "clinic") return <ClinicPreview />;
  return <FinancePreview />;
}

function Frame({
  slug,
  title,
  children,
}: {
  slug: ProductSlug;
  title: string;
  children: ReactNode;
}) {
  const product = getProduct(slug);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(frameRef, { amount: 0.2, initial: true });
  const reduce = useReducedMotion();
  const live = Boolean(inView && !reduce);
  const scenes = useMemo(() => scenesFor(product, slug), [product, slug]);
  const [clip, setClip] = useState(0);
  const scene = scenes[clip] ?? scenes[0];
  const playlist = scenes.length > 1;
  const showVideo = Boolean(live && scene?.kind === "video");

  useEffect(() => {
    if (!live) setClip(0);
  }, [live]);

  useEffect(() => {
    if (!live || scene?.kind !== "image" || !scene.ms) return;
    const timer = window.setTimeout(() => {
      setClip((index) => (index + 1) % scenes.length);
    }, scene.ms);
    return () => window.clearTimeout(timer);
  }, [live, scene, scenes.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, [showVideo, clip]);

  return (
    <div
      ref={frameRef}
      className="relative h-[240px] overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] text-white shadow-[0_24px_48px_rgba(0,0,0,0.35)] sm:h-[300px] lg:h-[340px]"
    >
      {showVideo && scene.kind === "video" ? (
        <video
          key={`${slug}-${scene.src}`}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          autoPlay
          loop={!playlist}
          playsInline
          preload="auto"
          poster={product?.image}
          onCanPlay={(event) => {
            event.currentTarget.muted = true;
            void event.currentTarget.play().catch(() => undefined);
          }}
          onEnded={() => {
            if (playlist) setClip((index) => (index + 1) % scenes.length);
          }}
        >
          <source src={scene.src} type="video/mp4" />
        </video>
      ) : (
        <motion.div
          className="absolute inset-0 origin-center"
          initial={false}
          animate={
            live
              ? { scale: 1.08, x: ["0%", "-4%", "3%", "0%"], y: ["0%", "2%", "-2%", "0%"] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={
            live
              ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.35, ease: "easeOut" }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product?.image ?? `/images/products/${slug}.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/45 to-[#0b1220]/15" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
          <span>{title}</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
          </span>
        </div>
        <div className="mt-auto p-3">{children}</div>
      </div>
    </div>
  );
}

function PropertyPreview() {
  const listings = [
    { name: "Harbor Lofts 4B", meta: "3 bed · River North", price: "$1.24M" },
    { name: "Cedar Villa", meta: "5 bed · Hillside", price: "$2.10M" },
    { name: "Maple Court 12A", meta: "2 bed · East Quay", price: "$640k" },
  ];
  const { ref, index, reduce } = useInViewCycle(listings.length, 3200);
  const listing = listings[index];

  return (
    <Frame slug="property" title="Marketplace">
      <div ref={ref}>
        <AnimatePresence mode="wait">
          <motion.div
            key={listing.name}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md"
          >
            <p className="text-[10px] uppercase tracking-widest text-indigo-200">New property enquiry</p>
            <div className="mt-1 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{listing.name}</p>
                <p className="text-[11px] text-white/60">{listing.meta}</p>
              </div>
              <p className="font-heading text-indigo-200">{listing.price}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Frame>
  );
}

function FoodPreview() {
  const tickets = [
    { dish: "Citrus salmon bowl", status: "Paid", note: "Staff completed the counter sale" },
    { dish: "Citrus salmon bowl", status: "Dispatch", note: "Packed · handed to courier" },
    { dish: "Citrus salmon bowl", status: "At the door", note: "Courier knocking · food package in hand" },
  ];
  const { ref, index, reduce } = useInViewCycle(tickets.length, 2400);
  const ticket = tickets[index];

  return (
    <Frame slug="food" title="Counter to door">
      <div ref={ref} className="flex items-end gap-2">
        <div className="relative h-16 w-20 overflow-hidden rounded-lg border border-white/10 sm:h-20 sm:w-24">
          <Image src="/images/products/food-2.jpg" alt="" fill className="object-cover" sizes="96px" />
        </div>
        <div className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/45 p-2.5 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="truncate">{ticket.dish}</span>
            <span className="shrink-0 text-orange-300">{ticket.status}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={ticket.note}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-[10px] text-orange-100"
            >
              {ticket.note}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}

function LogisticsPreview() {
  const steps = ["Packing van", "Loaded", "En route", "Delivered"];
  const { ref, index, reduce } = useInViewCycle(steps.length, 2200);

  return (
    <Frame slug="logistics" title="Loading bay · RF-2044">
      <div ref={ref} className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md">
        <div className="relative h-1.5 rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-cyan-400"
            animate={{ width: `${((index + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span>Crew loading the van</span>
          <span className="text-cyan-300">{steps[index]}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={steps[index]}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-[10px] text-cyan-100"
          >
            {index === 0
              ? "People packing goods into the vehicle"
              : index === 1
                ? "Van loaded · ready for dispatch"
                : index === 3
                  ? "Delivery completed"
                  : "Status · En route"}
          </motion.p>
        </AnimatePresence>
      </div>
    </Frame>
  );
}

function LearningPreview() {
  const { ref, index, reduce } = useInViewCycle(3, 2600);
  const progress = [42, 78, 100][index];

  return (
    <Frame slug="learning" title="Lesson player">
      <div ref={ref} className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md">
        <p className="text-sm font-medium">Systems thinking · Module 4</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-violet-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55 }}
          />
        </div>
        <AnimatePresence mode="wait">
          {index === 2 ? (
            <motion.p
              key="cert"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-[10px] uppercase tracking-widest text-violet-200"
            >
              Automated certificates · Course completed
            </motion.p>
          ) : (
            <motion.p
              key="tutor"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-[10px] text-white/70"
            >
              AI tutor · “Think of this loop as a feedback circuit.”
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

function ClinicPreview() {
  const beats = [
    { status: "Slot found", note: "AI receptionist offered Thu 10:00" },
    { status: "Booked", note: "Front desk confirmed the visit" },
    { status: "Reminder", note: "Reminder queued to the patient" },
  ];
  const { ref, index, reduce } = useInViewCycle(beats.length, 2800);
  const beat = beats[index];

  return (
    <Frame slug="clinic" title="Front desk">
      <div ref={ref} className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span>Amelia Cho · Dr. Maya Chen</span>
          <span className="shrink-0 text-teal-200">{beat.status}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={beat.note}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-[10px] text-teal-100"
          >
            {beat.note}
          </motion.p>
        </AnimatePresence>
      </div>
    </Frame>
  );
}

function FinancePreview() {
  const beats = [
    { value: "+$8.4k", label: "Income", note: "Northline invoice landed" },
    { value: "88%", label: "Ops budget", note: "Spend vs cap this month" },
    { value: "Alert", label: "Insight", note: "Trend may exceed the monthly budget" },
  ];
  const { ref, index, reduce } = useInViewCycle(beats.length, 3200);
  const beat = beats[index];

  return (
    <Frame slug="finance" title="Ledger">
      <div ref={ref} className="rounded-lg border border-white/10 bg-black/45 p-3 backdrop-blur-md">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-200/80">{beat.label}</p>
            <p className="font-heading text-lg font-semibold text-emerald-300">{beat.value}</p>
          </div>
          <div className="h-8 w-28">
            <LiveBars values={[18, 28, 24, 40, 36, 48, 42, 54]} tone="emerald" className="gap-1" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={beat.note}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-[10px] text-emerald-100"
          >
            Smart alerts · {beat.note}
          </motion.p>
        </AnimatePresence>
      </div>
    </Frame>
  );
}
