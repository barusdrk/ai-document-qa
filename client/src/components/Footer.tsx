import {
  FileText,
  Globe,
  Heart,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-600 md:flex-row dark:text-gray-400">
        <div className="flex items-center gap-2">
          <FileText
            size={18}
          />

          <span>
            AI Document Q&amp;A
          </span>
        </div>

        <p className="flex items-center gap-1 text-center">
          Built with
          <Heart
            size={16}
            className="text-red-500"
          />
          using React, Express, TypeScript &amp; OpenAI
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/barusdrk/ai-document-qa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-blue-600"
          >
            <Globe
              size={18}
            />
            <span>GitHub</span>
          </a>

          <a
            href="mailto:barusdrk@gmail.com"
            className="flex items-center gap-2 transition hover:text-blue-600"
          >
            <Mail
              size={18}
            />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
