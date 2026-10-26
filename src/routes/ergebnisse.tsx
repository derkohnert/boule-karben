import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoNote, PageIntro } from "../components/site";

export const Route = createFileRoute("/ergebnisse")({
  head: () => ({
    meta: [
      { title: "Ergebnisse – Boule Karben (Beispiele)" },
      { name: "description", content: "Exemplarische Darstellung von Sommermasters, Vereinsmeisterschaft, Bundesliga und Ranglisten." },
      { property: "og:title", content: "Ergebnisse – Boule Karben" },
      { property: "og:description", content: "Beispielhafte Ergebnis- und Ranglistendarstellung – keine echten Resultate." },
    ],
  }),
  component: Ergebnisse,
});

type Table = { caption: string; head: string[]; rows: (string | number)[][] };
const tabs: Record<string, Table> = {
  Sommermasters: { caption: "Endstand (exemplarisch)", head: ["Platz", "Team", "Siege", "Punkte +/-"],
    rows: [[1, "Team Beispiel A", 5, "+38"], [2, "Team Beispiel B", 4, "+21"], [3, "Team Beispiel C", 4, "+12"], [4, "Team Beispiel D", 3, "+4"]] },
  Vereinsmeisterschaft: { caption: "Zwischenstand nach Runde 2 (exemplarisch)", head: ["Platz", "Spieler:in", "Spiele", "Punkte"],
    rows: [[1, "Spieler:in 1", 6, 12], [2, "Spieler:in 2", 6, 10], [3, "Spieler:in 3", 6, 8], [4, "Spieler:in 4", 6, 6]] },
  Bundesliga: { caption: "Tabelle (exemplarisch)", head: ["Platz", "Verein", "Begegnungen", "Punkte"],
    rows: [[1, "Musterverein Nord", 4, 7], [2, "Beispielclub", 4, 6], [3, "Demo-Team Süd", 4, 4], [4, "Platzhalter e.V.", 4, 1]] },
  "Ranglisten Demo": { caption: "Vereinsrangliste (exemplarisch)", head: ["Rang", "Name", "Turniere", "Ranglistenpunkte"],
    rows: [[1, "Name A", 9, 412], [2, "Name B", 8, 380], [3, "Name C", 10, 355], [4, "Name D", 7, 301]] },
};

// Results page with tabbed example tables.
function Ergebnisse() {
  const keys = Object.keys(tabs);
  const [active, setActive] = useState<string>("Sommermasters");
  const t: Table = tabs[active] ?? tabs["Sommermasters"]!;
  return (
    <>
      <PageIntro eyebrow="Ergebnisse" title="Spielstände & Ranglisten" text="So könnten Turnier- und Ligaergebnisse künftig aussehen." />
      <section className="container-page py-12">
        <DemoNote>Exemplarisch – alle Namen, Teams und Zahlen sind erfunden und keine echten Vereinsresultate.</DemoNote>
        <div role="tablist" className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {keys.map((k) => (
            <button key={k} role="tab" aria-selected={active === k} onClick={() => setActive(k)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${active === k ? "bg-primary text-primary-foreground" : "bg-secondary text-primary hover:bg-sage"}`}>
              {k}
            </button>
          ))}
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl bg-card shadow-soft">
          <table className="w-full text-left text-sm">
            <caption className="px-5 pt-5 text-left font-display text-xl font-semibold text-primary">{active} · {t.caption}</caption>
            <thead><tr className="border-b text-muted-foreground">{t.head.map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i} className="border-b last:border-0">
                  {r.map((c, j) => <td key={j} className={`px-5 py-4 ${j === 0 ? "font-display text-lg font-semibold text-forest" : ""}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-5 pb-4 text-xs text-muted-foreground">Beispieldaten · Stand: Entwurf</p>
        </div>
      </section>
    </>
  );
}