import type { Metadata } from "next";
import { getAnalyticsSummary } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatSeconds(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}m ${rest}s`;
}

function BarRow({
  label,
  value,
  max,
  suffix,
  colorClass = "bg-violet-500",
}: {
  label: string;
  value: number;
  max: number;
  suffix: string;
  colorClass?: string;
}) {
  const width = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{suffix}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const data = await getAnalyticsSummary();

  const maxPillarViews = Math.max(1, ...data.viewsByPillar.map((p) => p.views));
  const maxTime = Math.max(1, ...data.avgSecondsByPillar.map((p) => p.avgSeconds));
  const maxCountry = Math.max(1, ...data.visitorsByCountry.map((c) => c.visitors));

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12 sm:px-6">
      <div>
        <p className="text-xs font-bold tracking-wide text-violet-700 uppercase">Just for you</p>
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          All numbers here are anonymous, site-wide totals — nothing is tied to an individual
          visitor.
        </p>
      </div>

      {!data.connected ? (
        <div className="rounded-3xl bg-amber-50 p-6 text-amber-800">
          Analytics storage isn&apos;t connected yet — set UPSTASH_REDIS_REST_URL and
          UPSTASH_REDIS_REST_TOKEN to start collecting data.
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Total visitors</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {data.totalVisitors.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Articles with reads
          </p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {data.topArticles.length.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Countries</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {data.visitorsByCountry.length.toLocaleString()}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-gray-900">Views by section</h2>
        {data.viewsByPillar.length ? (
          <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-6">
            {data.viewsByPillar.map((p) => (
              <BarRow
                key={p.pillar}
                label={p.name}
                value={p.views}
                max={maxPillarViews}
                suffix={p.views.toLocaleString()}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No views yet.</p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-gray-900">
          Average time spent per section
        </h2>
        {data.avgSecondsByPillar.some((p) => p.sessions > 0) ? (
          <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-6">
            {data.avgSecondsByPillar.map((p) => (
              <BarRow
                key={p.pillar}
                label={p.name}
                value={p.avgSeconds}
                max={maxTime}
                suffix={`${formatSeconds(p.avgSeconds)} avg · ${p.sessions.toLocaleString()} visits`}
                colorClass="bg-sky-500"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Not enough data yet.</p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-gray-900">Most-read articles</h2>
        {data.topArticles.length ? (
          <div className="overflow-hidden rounded-3xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-5 py-3">Article</th>
                  <th className="px-5 py-3">Section</th>
                  <th className="px-5 py-3 text-right">Reads</th>
                </tr>
              </thead>
              <tbody>
                {data.topArticles.map((a) => (
                  <tr key={a.slug} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-800">{a.title}</td>
                    <td className="px-5 py-3 text-gray-500">{a.pillar}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">
                      {a.views.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No article views yet.</p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-gray-900">Most-liked articles</h2>
        {data.mostLikedArticles.length ? (
          <div className="overflow-hidden rounded-3xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-5 py-3">Article</th>
                  <th className="px-5 py-3">Section</th>
                  <th className="px-5 py-3 text-right">Likes</th>
                </tr>
              </thead>
              <tbody>
                {data.mostLikedArticles.map((a) => (
                  <tr key={a.slug} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-800">{a.title}</td>
                    <td className="px-5 py-3 text-gray-500">{a.pillar}</td>
                    <td className="px-5 py-3 text-right font-semibold text-pink-600">
                      ❤️ {a.likes.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No likes yet.</p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-gray-900">Visitors by country</h2>
        {data.visitorsByCountry.length ? (
          <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-6">
            {data.visitorsByCountry.map((c) => (
              <BarRow
                key={c.country}
                label={c.country}
                value={c.visitors}
                max={maxCountry}
                suffix={c.visitors.toLocaleString()}
                colorClass="bg-emerald-500"
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No visits recorded yet.</p>
        )}
        <p className="text-xs text-gray-400">
          Country is resolved automatically from the request when live on Vercel — it won&apos;t
          show real countries during local development. No IP address is ever stored, only the
          resolved country name.
        </p>
      </section>
    </div>
  );
}
