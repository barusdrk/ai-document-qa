import {
  Upload,
  ClipboardPaste,
  MessageSquare,
  Search,
  FileText,
  LayoutDashboard,
} from "lucide-react";

interface QuickActionsProps {
  onUpload?: () => void;
  onPaste?: () => void;
  onAsk?: () => void;
  onDocuments?: () => void;
  onSearch?: () => void;
  onDashboard?: () => void;
}

interface Action {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function QuickActions({
  onUpload,
  onPaste,
  onAsk,
  onDocuments,
  onSearch,
  onDashboard,
}: QuickActionsProps) {
  const actions: Action[] = [
    {
      title: "Upload Document",
      description:
        "Upload PDF, DOCX or TXT",
      icon: <Upload size={26} />,
      onClick: onUpload,
    },
    {
      title: "Paste Text",
      description:
        "Analyze copied content",
      icon: (
        <ClipboardPaste size={26} />
      ),
      onClick: onPaste,
    },
    {
      title: "Ask Question",
      description:
        "Query your document",
      icon: (
        <MessageSquare size={26} />
      ),
      onClick: onAsk,
    },
    {
      title: "Search",
      description:
        "Find text in documents",
      icon: <Search size={26} />,
      onClick: onSearch,
    },
    {
      title: "Documents",
      description:
        "Browse uploaded files",
      icon: (
        <FileText size={26} />
      ),
      onClick: onDocuments,
    },
    {
      title: "Dashboard",
      description:
        "View statistics",
      icon: (
        <LayoutDashboard
          size={26}
        />
      ),
      onClick: onDashboard,
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Jump directly to common
          tasks.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className="group rounded-xl border border-slate-200 p-5 text-left transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md dark:border-slate-700 dark:hover:border-blue-500 dark:hover:bg-slate-800"
          >
            <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400">
              {action.icon}
            </div>

            <h3 className="text-lg font-semibold">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
