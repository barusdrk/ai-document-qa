import {
  SendHorizonal,
} from "lucide-react";

interface QuestionInputProps {
  question: string;

  onChange: (
    value: string
  ) => void;

  onAsk: () => void;

  loading: boolean;
}

export default function QuestionInput({
  question,
  onChange,
  onAsk,
  loading,
}: QuestionInputProps) {
  function handleSubmit() {
    if (
      loading ||
      !question.trim()
    ) {
      return;
    }

    onAsk();
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">
        Ask a Question
      </h2>

      <textarea
        rows={4}
        value={question}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();

            handleSubmit();
          }
        }}
        placeholder="Ask anything about the uploaded document..."
        className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800"
      />

      <div className="mt-5 flex justify-end">
        <button
          onClick={
            handleSubmit
          }
          disabled={
            loading ||
            !question.trim()
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizonal
            size={18}
          />

          {loading
            ? "Thinking..."
            : "Ask AI"}
        </button>
      </div>
    </div>
  );
}
