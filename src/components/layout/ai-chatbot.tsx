"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { CHAT_WELCOME } from "@/lib/chatbot-knowledge";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/brand-logo";

type ChatRole = "user" | "assistant";

type UiMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const QUICK_ACTIONS = [
  { label: "Book Consultation", href: "/book-consultation", external: false },
  { label: "Book Appointment", href: "/book-appointment", external: false },
  {
    label: "WhatsApp",
    href: `https://wa.me/${SITE.whatsapp}`,
    external: true,
  },
  { label: "View Services", href: "/services", external: false },
] as const;

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AiChatbot() {
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([
    { id: "welcome", role: "assistant", content: CHAT_WELCOME },
  ]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open, messages, pending]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userMessage: UiMessage = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    const history = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        reply?: string;
      } | null;

      const reply =
        response.ok && data?.ok && data.reply
          ? data.reply
          : "I'd be happy to connect you with our team. Would you like to book a consultation or chat with us on WhatsApp?";

      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content:
            "I'd be happy to connect you with our team. Would you like to book a consultation or chat with us on WhatsApp?",
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="ROLAN AUTOMATION chat assistant"
            aria-modal="false"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-3 z-50 flex h-[min(560px,72dvh)] w-[min(100%-1.5rem,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-24 sm:right-6"
          >
            <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0e7490] px-4 py-3.5 text-white">
              <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" aria-hidden />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-heading text-sm font-semibold tracking-tight">
                      ROLAN Assistant
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-white/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                      Online · Automation &amp; Call Center
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-background-alt/40 px-3.5 py-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22 }}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                      message.role === "user"
                        ? "rounded-br-md bg-secondary text-white"
                        : "rounded-bl-md border border-border bg-card text-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {pending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-3 shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-card px-3 pb-2 pt-2.5">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_ACTIONS.map((action) =>
                  action.external ? (
                    <a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:border-secondary/40 hover:text-secondary"
                    >
                      {action.label === "WhatsApp" && <BrandLogo name="WhatsApp" size={12} />}
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      key={action.label}
                      href={action.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex shrink-0 items-center rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:border-secondary/40 hover:text-secondary"
                    >
                      {action.label}
                    </Link>
                  )
                )}
              </div>

              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about automation, 3CX, Zapier…"
                  maxLength={1000}
                  disabled={pending}
                  className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-3 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-accent text-white shadow-xl shadow-secondary/30 ring-4 ring-secondary/15 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 40, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -40, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
