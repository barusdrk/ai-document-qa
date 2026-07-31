import {
  Clipboard,
  Download,
  CheckCircle2,
  Bot,
} from "lucide-react";

import { saveAs } from "file-saver";

import type {
  Source,
} from "../services/api";

interface AnswerCardProps {
  question: string;
  answer: string;
  sources: Source[];
}

export default function AnswerCard({
  question,
  answer,
  sources,
}: AnswerCardProps) {
  function copyAnswer() {
    if (!answer) return;

    navigator.clipboard.writeText(
      answer
    );
  }

  function downloadAnswer() {
    if (!answer) return;

    const content = `Question

${question}

----------------------------------------

Answer

${answer}

----------------------------------------

Sources

${sources
  .map(
    (source) =>
      `Page ${source.page}`
  )
  .join("\n")}
`;

    const blob = new Blob(
      [content],
      {
        type: "text/plain;charset=utf-8",
      }
    );

    saveAs(
      blob,
      "answer.txt"
    );
  }

  if (!answer) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <Bot
          size={48}
          className="mx-auto mb-4 text-slate-400"
        />

        <h2 className="mb-2 text-xl font-semibold">
          AI Answer
        </h2>

        <p className="text-slate-500">
          Upload a document and ask a
          question to see the AI answer.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <Bot
            size={24}
            className="text-blue-600"
          />

          <div>
            <h2 className="text-lg font-semibold">
              AI Answer
            </h2>

            <p className="text-sm text-slate-500">
              Generated using retrieved
              document context
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={copyAnswer}
            className="rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            title="Copy answer"
          >
            <Clipboard
              size={18}
            />
          </button>

          <button
            onClick={
              downloadAnswer
            }
            className="rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            title="Download answer"
          >
            <Download
              size={18}
            />
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Question
          </h3>

          <div className="rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
            {question}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Answer
          </h3>

          <div className="whitespace-pre-wrap rounded-lg bg-blue-50 p-5 leading-7 dark:bg-blue-950/30">
            {answer}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle2
            size={18}
          />

          Retrieved from{" "}
          <strong>
            {sources.length}
          </strong>{" "}
          source
          {sources.length === 1
            ? ""
            : "s"}
        </div>
      </div>
    </div>
  );
}
