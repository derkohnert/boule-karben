import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoNote, PageIntro } from "../components/site";
import { availableLanes, formatDate, LANES, OCCUPIED_LANES, TIME_SLOTS } from "../lib/demo-data";

export const Route = createFileRoute("/buchen")({
  head: () => ({
    meta: [
      { title: "Bahnen buchen – Boule Karben (Demo)" },
      { name: "description", content: "Demo der Bahnreservierung: acht Bahnen, Datum und Zeitslot wählen – ohne echte Buchung." },
      { property: "og:title", content: "Bahnen buchen – Boule Karben (Demo)" },
      { property: "og:description", content: "Klickbare Vorschau der Bahnreservierung in der Boulehalle Karben." },
    ],
  }),
  component: Buchen,
});

// Demo booking flow: pick date, slot and lanes; submitting only shows a demo notice.
function Buchen() {
  const [date, setDate] = useState("2026-11-07");
  const [slot, setSlot] = useState(TIME_SLOTS[2]);
  const [lanes, setLanes] = useState<number[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (l: number) => { setSent(false); setLanes((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l].sort())); };

  return (
    <>
      <PageIntro eyebrow="Bahnen buchen" title="Deine Bahn, dein Spiel" text="Datum, Uhrzeit und eine oder mehrere Bahnen wählen." />
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <DemoNote>Demo-Ansicht: Belegungen sind Beispiele, es wird nichts gespeichert.</DemoNote>
          <div>
            <label className="text-sm font-semibold text-primary" htmlFor="date">1. Datum</label>
            <input id="date" type="date" value={date} onChange={(e) => { setDate(e.target.value); setSent(false); }}
              className="mt-2 block w-full max-w-xs rounded-xl border bg-card px-4 py-3" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">2. Zeitslot</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((t) => (
                <button key={t} onClick={() => { setSlot(t); setSent(false); }}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${slot === t ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-forest"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-primary">3. Bahnen</p>
              <div className="flex gap-2">
                <button onClick={() => { setLanes(availableLanes()); setSent(false); }} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">Alle verfügbaren wählen</button>
                {lanes.length > 0 && <button onClick={() => setLanes([])} className="rounded-full border px-4 py-2 text-sm">Leeren</button>}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {LANES.map((l) => {
                const busy = OCCUPIED_LANES.includes(l);
                const sel = lanes.includes(l);
                return (
                  <button key={l} disabled={busy} onClick={() => toggle(l)} aria-pressed={sel}
                    className={`flex aspect-[3/4] flex-col justify-between rounded-2xl border-2 p-4 text-left transition ${
                      busy ? "cursor-not-allowed border-transparent bg-muted text-muted-foreground"
                        : sel ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card hover:border-forest"}`}>
                    <span className="text-xs font-semibold uppercase tracking-wider">Bahn</span>
                    <span className="font-display text-5xl font-semibold">{l}</span>
                    <span className="text-xs font-medium">{busy ? "Belegt (Beispiel)" : sel ? "Ausgewählt" : "Frei"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-hero p-6 text-primary-foreground lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold">Zusammenfassung</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-primary-foreground/70">Datum</dt><dd>{date ? formatDate(date, { weekday: "short", day: "2-digit", month: "short", year: "numeric" }) : "–"}</dd></div>
            <div className="flex justify-between"><dt className="text-primary-foreground/70">Zeit</dt><dd>{slot}</dd></div>
            <div className="flex justify-between"><dt className="text-primary-foreground/70">Bahnen</dt><dd>{lanes.length ? lanes.join(", ") : "keine"}</dd></div>
          </dl>
          <button disabled={!lanes.length || !date} onClick={() => setSent(true)}
            className="mt-6 w-full rounded-full bg-gold py-3.5 font-semibold text-primary transition disabled:opacity-40">
            Reservierung absenden
          </button>
          {sent && (
            <p role="status" className="mt-4 rounded-xl bg-warning p-3 text-sm font-semibold text-warning-foreground">
              Demo: Noch keine echte Buchung möglich. Die Auswahl wurde nicht gespeichert.
            </p>
          )}
        </aside>
      </section>
    </>
  );
}