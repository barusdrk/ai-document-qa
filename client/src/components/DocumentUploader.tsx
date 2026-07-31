import {
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";

import {
  Upload,
  FileText,
} from "lucide-react";

interface DocumentUploaderProps {
  onFileSelect: (
    file: File
  ) => void;
}

export default function DocumentUploader({
  onFileSelect,
}: DocumentUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [dragging,
    setDragging] =
    useState(false);

  const [fileName,
    setFileName] =
    useState("");

  function handleFile(
    file: File
  ) {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (
      !allowed.includes(file.type)
    ) {
      alert(
        "Please upload a PDF, DOCX or TXT file."
      );
      return;
    }

    setFileName(file.name);

    onFileSelect(file);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  }

  function handleDrop(
    e: DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setDragging(false);

    const file =
      e.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">
        Upload Document
      </h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={handleDrop}
        onClick={() =>
          inputRef.current?.click()
        }
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition

${
  dragging
    ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
    : "border-slate-300 dark:border-slate-700"
}`}
      >
        <Upload
          className="mx-auto mb-4"
          size={40}
        />

        <p className="font-medium">
          Drag & drop a file
        </p>

        <p className="mt-2 text-sm text-slate-500">
          or click to browse
        </p>

        <p className="mt-4 text-xs text-slate-400">
          PDF • DOCX • TXT
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {fileName && (
        <div className="mt-5 flex items-center gap-3 rounded-lg bg-green-100 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <FileText
            size={18}
          />

          {fileName}
        </div>
      )}
    </div>
  );
}
