import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoNote, PageIntro } from "../components/site";
import { demoEvents, formatDate } from "../lib/demo-data";

export const Route = createFileRoute("/termine")({
  head: () => ({
    meta: [
      { title: "Termine – Boule Karben (Entwurf)" },
      { name: "description", content: "Beispieltermine als Liste oder Monatskalender – Designvorschau." },
      { property: "og:title", content: "Termine – Boule Karben" },
      { property: "og:description", content: "Turniere, Training und Kurse in der Boulehalle Karben (Beispiele)." },
    ],
  }),
  component: Termine,
});

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

// Events page with switchable list and month calendar view.
function Termine() {
  const [view, setView] = useState<"list" | "month">("list");
  const [month, setMonth] = useState({ y: 2026, m: 10 }); // November 2026
  const first = new Date(month.y, month.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(month.y, month.m + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const iso = (d: number) => `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const shift = (n: number) => setMonth(({ y, m }) => { const d = new Date(y, m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });

  return (
    <>
      <PageIntro eyebrow="Termine" title="Was ansteht" text="Turniere, Spielabende und Kurse auf einen Blick." />
      <section className="container-page py-12">
        <DemoNote>Alle Termine sind Beispieldaten für die Designabstimmung.</DemoNote>
        <div className="mt-8 inline-flex rounded-full bg-secondary p-1">
          {(["list", "month"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${view === v ? "bg-primary text-primary-foreground" : "text-primary"}`}>
              {v === "list" ? "Liste" : "Monat"}
            </button>
          ))}
        </div>

        {view === "list" ? (
          <ul className="mt-8 divide-y rounded-2xl bg-card shadow-soft">
            {demoEvents.map((e) => (
              <li key={e.id} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-44 font-semibold text-primary">{formatDate(e.date)}</span>
                <span className="flex-1 font-medium">{e.title}</span>
                <span className="text-sm text-muted-foreground">{e.time} Uhr · {e.type}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl bg-card p-4 shadow-soft md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <button onClick={() => shift(-1)} className="rounded-full border px-3 py-1.5" aria-label="Vorheriger Monat">←</button>
              <h2 className="text-2xl font-semibold text-primary">{first.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</h2>
              <button onClick={() => shift(1)} className="rounded-full border px-3 py-1.5" aria-label="Nächster Monat">→</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
              {WEEKDAYS.map((w) => <div key={w} className="py-2">{w}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                const evs = d ? demoEvents.filter((e) => e.date === iso(d)) : [];
                return (
                  <div key={i} className={`min-h-16 rounded-lg p-1.5 text-left text-sm md:min-h-24 ${d ? "bg-muted" : ""} ${evs.length ? "!bg-sage-soft ring-1 ring-forest" : ""}`}>
                    {d && <span className="font-semibold">{d}</span>}
                    {evs.map((e) => <p key={e.id} className="mt-1 hidden text-xs leading-tight text-primary md:block">{e.time} {e.title.replace(" (Beispiel)", "")}</p>)}
                    {evs.length > 0 && <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-forest md:hidden" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}