import { useEffect, useState } from "react";

import {
  FileText,
  Database,
  MessageSquare,
  HardDrive,
  RefreshCw,
} from "lucide-react";

import {
  getDashboard,
  type DashboardResponse,
} from "../services/api";

import StatsCard from "./StatsCard";
import RecentDocuments from "./RecentDocuments";
import ActivityChart from "./ActivityChart";
import UsageCard from "./UsageCard";
import QuickActions from "./QuickActions";

interface DashboardProps {
  onUpload?: () => void;
  onPaste?: () => void;
  onAsk?: () => void;
  onSearch?: () => void;
  onDocuments?: () => void;
  onDashboard?: () => void;
  onSelectDocument?: (
    documentId: string
  ) => void;
}

export default function Dashboard({
  onUpload,
  onPaste,
  onAsk,
  onSearch,
  onDocuments,
  onDashboard,
  onSelectDocument,
}: DashboardProps) {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getDashboard();

      setDashboard(data);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function formatStorage(
    bytes: number
  ) {
    if (bytes < 1024)
      return `${bytes} B`;

    if (
      bytes <
      1024 * 1024
    ) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    if (
      bytes <
      1024 *
        1024 *
        1024
    ) {
      return `${(
        bytes /
        1024 /
        1024
      ).toFixed(1)} MB`;
    }

    return `${(
      bytes /
      1024 /
      1024 /
      1024
    ).toFixed(2)} GB`;
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        Loading dashboard...
      </div>
    );
  }

  if (
    error ||
    !dashboard
  ) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950">
        <p className="text-red-700 dark:text-red-300">
          {error}
        </p>

        <button
          onClick={
            loadDashboard
          }
          className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back,
            {" "}
            {
              dashboard.user.name
            }
            !
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your AI
            documents, ask
            questions and monitor
            your workspace.
          </p>
        </div>

        <button
          onClick={
            loadDashboard
          }
          className="flex items-center gap-2 self-start rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <RefreshCw
            size={18}
          />

          Refresh
        </button>
      </div>

      {/* Quick Actions */}

      <QuickActions
        onUpload={onUpload}
        onPaste={onPaste}
        onAsk={onAsk}
        onSearch={onSearch}
        onDocuments={
          onDocuments
        }
        onDashboard={
          onDashboard
        }
      />

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Documents"
          value={
            dashboard.stats
              .documents
          }
          subtitle="Uploaded documents"
          icon={
            <FileText
              size={26}
            />
          }
        />

        <StatsCard
          title="Chunks"
          value={
            dashboard.stats
              .chunks
          }
          subtitle="Indexed chunks"
          icon={
            <Database
              size={26}
            />
          }
        />

        <StatsCard
          title="Questions"
          value={
            dashboard.stats
              .questions
          }
          subtitle="Questions asked"
          icon={
            <MessageSquare
              size={26}
            />
          }
        />

        <StatsCard
          title="Storage"
          value={formatStorage(
            dashboard.stats
              .storage
          )}
          subtitle="Storage used"
          icon={
            <HardDrive
              size={26}
            />
          }
        />
      </div>

      {/* Analytics */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <ActivityChart
            title="Questions This Week"
            metric="questions"
            data={
              dashboard.activity
            }
          />

          <ActivityChart
            title="Uploads This Week"
            metric="uploads"
            data={
              dashboard.activity
            }
          />
        </div>

        <UsageCard
          usedBytes={
            dashboard.limits
              .storageUsed
          }
          limitBytes={
            dashboard.limits
              .storageLimit
          }
        />
      </div>

      {/* Recent Documents */}

      <RecentDocuments
        documents={
          dashboard.recentDocuments
        }
        onSelect={
          onSelectDocument
        }
      />
    </div>
  );
}
