"use client";

import { useEffect, useState } from "react";
import { QuizQuestion } from "@/lib/content";

export const QUIZ_COMPLETED_EVENT = "brainy-bit:quiz-completed";

const RESULTS = [
  { label: "Rookie", icon: "🌱" },
  { label: "Explorer", icon: "🧭" },
  { label: "Sharp Mind", icon: "🧠" },
  { label: "Brainy Bit Pro", icon: "🏆" },
];

export function ArticleQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) window.dispatchEvent(new Event(QUIZ_COMPLETED_EVENT));
  }, [done]);

  if (!questions.length) return null;

  function selectAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[current].correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  }

  function retry() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const result = RESULTS[score] ?? RESULTS[0];
    return (
      <div className="rounded-3xl bg-violet-50 p-6 text-center sm:p-8">
        <p className="text-xs font-bold tracking-wide text-violet-700 uppercase">Your result</p>
        <p className="mt-2 text-5xl" aria-hidden>
          {result.icon}
        </p>
        <h3 className="mt-2 text-xl font-extrabold text-gray-900">{result.label}</h3>
        <p className="mt-1 text-sm text-gray-600">
          You got {score} out of {questions.length} right.
        </p>
        <button
          onClick={retry}
          className="mt-4 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
        >
          Try again
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="rounded-3xl bg-gray-50 p-6 sm:p-8">
      <p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
        Quick quiz · Question {current + 1} of {questions.length}
      </p>
      <h3 className="mt-2 text-lg font-bold text-gray-900">{q.question}</h3>
      <div className="mt-4 flex flex-col gap-2">
        {q.options.map((option, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selected;

          let optionClass = "border-gray-200 bg-white hover:border-violet-300";
          if (selected !== null) {
            if (isCorrect) {
              optionClass = "border-emerald-400 bg-emerald-100";
            } else if (isSelected) {
              optionClass = "border-rose-400 bg-rose-100";
            } else {
              optionClass = "border-gray-200 bg-white opacity-60";
            }
          }

          return (
            <button
              key={option}
              onClick={() => selectAnswer(i)}
              disabled={selected !== null}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium text-gray-800 transition ${optionClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null ? (
        <button
          onClick={next}
          className="mt-4 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-95"
        >
          {current + 1 < questions.length ? "Next question" : "See my result"}
        </button>
      ) : null}
    </div>
  );
}
