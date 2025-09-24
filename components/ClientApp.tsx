"use client";
import { useMemo, useState } from "react";

export default function ClientApp({ sections }: { sections: any }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((s: any) => ({
        ...s,
        links: s.links.filter(
          (l: any) =>
            l.title.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q)
        ),
      }))
      .filter((s: any) => s.links.length > 0);
  }, [query, sections]);

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      {/* gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-400/20 via-sky-400/20 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/2 h-[36rem] w-[36rem] translate-x-1/3 rounded-full bg-gradient-to-tr from-fuchsia-400/10 via-amber-400/10 to-emerald-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-14">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome!
          </h1>
          <div className="relative w-full max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search links…"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-400 backdrop-blur transition focus:border-white/20 focus:bg-white/10"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
          </div>
        </header>

        {filtered.length === 0 ? (
          <p className="text-zinc-400">No results. Try another search.</p>
        ) : (
          <div className="space-y-10">
            {filtered.map((section: any) => (
              <section key={section.title}>
                <h2 className="mb-4 text-lg font-medium text-zinc-200">
                  {section.title}
                </h2>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.links.map((link: any) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
                      >
                        {link.image && (
                          <div className="mb-3 overflow-hidden rounded-xl border border-white/10">
                            <img
                              src={link.image}
                              alt=""
                              className="h-35 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <h3 className="text-base font-semibold text-zinc-50">
                          {link.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                          {link.description}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
