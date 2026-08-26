"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, BookOpen, GraduationCap, LayoutDashboard, PlayCircle } from "lucide-react";
import { DemoShell, DemoStat } from "@/components/demos/demo-shell";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

const COURSES = [
  { id: "systems", name: "Systems thinking", lessons: 16, progress: 72, instructor: "Amelia Cho" },
  { id: "product", name: "Product craft", lessons: 12, progress: 20, instructor: "Kenji Mori" },
  { id: "ops", name: "Ops dashboards", lessons: 9, progress: 0, instructor: "Sofia Lane" },
];

const QUIZ = [
  { q: "A feedback loop is best described as…", options: ["A one-way instruction", "A cycle that updates itself", "A static report"], answer: 1 },
  { q: "Progress in this demo is stored…", options: ["On a real LMS", "Locally in this prototype", "On paper"], answer: 1 },
];

export function LearningDemo({ product }: { product: Product }) {
  const [view, setView] = useState("catalog");
  const [course, setCourse] = useState(COURSES[0]);
  const [progress, setProgress] = useState(72);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [tutor, setTutor] = useState("Ask about the current lesson and the tutor will explain it in plain language.");

  const completeLesson = () => {
    const next = Math.min(progress + 14, 100);
    setProgress(next);
    if (next >= 100) setView("certificate");
  };

  const answerQuiz = (option: number) => {
    if (option === QUIZ[quizIndex].answer) setScore((value) => value + 1);
    if (quizIndex === QUIZ.length - 1) setDone(true);
    else setQuizIndex((value) => value + 1);
  };

  return (
    <DemoShell
      product={product}
      active={view}
      onChange={setView}
      items={[
        { id: "catalog", label: "Catalog", icon: BookOpen },
        { id: "player", label: "Player", icon: PlayCircle },
        { id: "quiz", label: "Quiz", icon: GraduationCap },
        { id: "instructor", label: "Instructor", icon: LayoutDashboard },
        { id: "certificate", label: "Certificate", icon: Award },
      ]}
    >
      {view === "catalog" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {COURSES.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => {
                setCourse(row);
                setProgress(row.progress);
                setView("player");
              }}
              className="rounded-2xl border border-white/8 bg-white/4 p-5 text-left"
            >
              <div className="relative mb-4 h-20 overflow-hidden rounded-xl">
                <Image src={product.image} alt="" fill className="object-cover" sizes="280px" />
              </div>
              <p className="font-medium">{row.name}</p>
              <p className="mt-1 text-sm text-slate-400">{row.lessons} lessons · {row.instructor}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${row.progress}%`, background: product.accent }} />
              </div>
            </button>
          ))}
        </div>
      )}

      {view === "player" && (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl">
              <Image src={product.image} alt="" fill className="object-cover" sizes="640px" />
              <div className="absolute inset-0 bg-black/35" />
              <PlayCircle className="relative h-12 w-12 text-white" />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-semibold">{course.name}</h2>
            <p className="mt-2 text-sm text-slate-400">Lesson 12 · Feedback circuits</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${progress}%`, background: product.accent }} />
            </div>
            <p className="mt-2 text-sm text-slate-400">{progress}% complete</p>
            <Button className="mt-5" onClick={completeLesson}>Mark lesson complete</Button>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">AI tutor</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{tutor}</p>
            <Button
              className="mt-5"
              variant="outline"
              onClick={() => setTutor("Think of this loop as a circuit: an output becomes the next input, so the system can correct itself without a new instruction each time.")}
            >
              Explain this lesson
            </Button>
          </div>
        </div>
      )}

      {view === "quiz" && (
        <div className="mx-auto max-w-xl rounded-3xl border border-white/8 bg-white/4 p-5">
          {done ? (
            <div>
              <h2 className="font-heading text-2xl font-semibold">Results</h2>
              <p className="mt-3 text-slate-400">You scored {score} / {QUIZ.length}.</p>
              <Button className="mt-6" onClick={() => setView("certificate")}>Continue</Button>
            </div>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Question {quizIndex + 1}</p>
              <h2 className="mt-2 font-heading text-xl font-semibold">{QUIZ[quizIndex].q}</h2>
              <div className="mt-5 space-y-2">
                {QUIZ[quizIndex].options.map((option, i) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answerQuiz(i)}
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm hover:border-white/20"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {view === "instructor" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <DemoStat label="Students" value="248" accent={product.accent} />
            <DemoStat label="Completion" value="64%" accent={product.accent} />
            <DemoStat label="Courses" value="3" accent={product.accent} />
          </div>
          <div className="overflow-x-auto rounded-3xl border border-white/8">
            <table className="min-w-[520px] w-full text-left text-sm">
              <thead className="bg-white/4 text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Lessons</th>
                  <th className="px-4 py-3 font-medium">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((row) => (
                  <tr key={row.id} className="border-t border-white/5">
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3 text-slate-400">{row.lessons}</td>
                    <td className="px-4 py-3">{row.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "certificate" && (
        <div className="mx-auto max-w-lg rounded-3xl border border-violet-400/25 bg-violet-500/10 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Automated certificates</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold">{course.name}</h2>
          <p className="mt-3 text-slate-300">Automated certificates are issued after course completion. A notification is queued in this prototype.</p>
          <p className="mt-6 text-sm" style={{ color: product.accent }}>{progress >= 100 ? "Course completed" : "Finish the player to unlock completion."}</p>
        </div>
      )}
    </DemoShell>
  );
}
