import { NextResponse } from "next/server";
import {
  buildSystemPrompt,
  CHAT_FALLBACK,
  matchKnowledge,
} from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const msg = value as ChatMessage;
  return (
    (msg.role === "user" || msg.role === "assistant" || msg.role === "system") &&
    typeof msg.content === "string"
  );
}

async function answerWithOpenAI(messages: ChatMessage[]): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  const model = process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 320,
      messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI HTTP ${response.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  return content || null;
}

function answerFromKnowledge(question: string): string {
  const match = matchKnowledge(question);
  return match?.answer ?? CHAT_FALLBACK;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as { message?: unknown; history?: unknown };
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (message.length < 1 || message.length > 1000) {
    return NextResponse.json({ ok: false, error: "Invalid message" }, { status: 400 });
  }

  const history = Array.isArray(payload.history)
    ? payload.history.filter(isChatMessage).slice(-8).map((m) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: m.content.slice(0, 1000),
      }))
    : [];

  const messages: ChatMessage[] = [...history, { role: "user", content: message }];

  try {
    const ai = await answerWithOpenAI(messages);
    if (ai) {
      return NextResponse.json({
        ok: true,
        reply: ai,
        source: "openai",
      });
    }
  } catch {
    // Fall through to knowledge base
  }

  return NextResponse.json({
    ok: true,
    reply: answerFromKnowledge(message),
    source: "knowledge",
  });
}
