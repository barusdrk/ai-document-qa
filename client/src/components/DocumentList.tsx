import { FileText } from "lucide-react";

import type { DocumentSummary } from "../services/api";

import DocumentCard from "./DocumentCard";

interface DocumentListProps {
  documents: DocumentSummary[];
  loading?: boolean;
  onOpen?: (
    documentId: string
  ) => void;
  onDelete?: (
    documentId: string
  ) => void;
}

export default function DocumentList({
  documents,
  loading = false,
  onOpen,
  onDelete,
}: DocumentListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Loading documents...
        </p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
        <FileText
          className="mx-auto mb-4 text-gray-400"
          size={48}
        />

        <h2 className="text-xl font-semibold">
          No documents yet
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Upload your first document to begin asking AI-powered
          questions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {documents.map(
        (document) => (
          <DocumentCard
            key={
              document.documentId
            }
            document={document}
            onOpen={onOpen}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
}
