import {
  HardDrive,
} from "lucide-react";

interface UsageCardProps {
  usedBytes: number;
  limitBytes: number;
}

function formatSize(
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

export default function UsageCard({
  usedBytes,
  limitBytes,
}: UsageCardProps) {
  const percentage =
    Math.min(
      (usedBytes /
        limitBytes) *
        100,
      100
    );

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

      <div className="mb-5 flex items-center gap-3">

        <HardDrive
          size={24}
        />

        <h2 className="text-xl font-semibold">
          Storage Usage
        </h2>

      </div>

      <div className="mb-3 flex justify-between text-sm">

        <span>
          {formatSize(
            usedBytes
          )}
        </span>

        <span>
          {formatSize(
            limitBytes
          )}
        </span>

      </div>

      <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700">

        <div
          className={`h-4 rounded-full transition-all ${
            percentage > 90
              ? "bg-red-500"
              : percentage > 70
              ? "bg-yellow-500"
              : "bg-blue-600"
          }`}
          style={{
            width:
              `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-4 text-sm text-slate-500">
        {percentage.toFixed(
          1
        )}
        % of your storage quota is used.
      </p>

    </section>
  );
}
