import { BarChart3 } from "lucide-react";

export interface ActivityPoint {
  label: string;
  uploads: number;
  questions: number;
}

interface ActivityChartProps {
  title: string;
  data: ActivityPoint[];
  metric: "uploads" | "questions";
}

export default function ActivityChart({
  title,
  data,
  metric,
}: ActivityChartProps) {
  const max = Math.max(
    ...data.map(
      (item) => item[metric]
    ),
    1
  );

  const metricLabel =
    metric === "uploads"
      ? "Uploads"
      : "Questions";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 size={24} />

        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            Last 7 days
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 py-12 text-center text-slate-500 dark:border-slate-700">
          No activity recorded yet.
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">
                  {item.label}
                </span>

                <span className="text-slate-500">
                  {item[metric]}{" "}
                  {metricLabel}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${
                      (item[
                        metric
                      ] /
                        max) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
