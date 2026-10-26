import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoNote, HallMap } from "../components/site";
import { demoEvents, formatDate, OCCUPIED_LANES } from "../lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boule Karben – Gut gelegt. Gut getroffen." },
      { name: "description", content: "Designentwurf: Pétanque Club Petterweil in der Boulehalle Karben – Termine, Bahnen, Ergebnisse." },
      { property: "og:title", content: "Boule Karben – Gut gelegt. Gut getroffen." },
      { property: "og:description", content: "Designvorschau für den Pétanque Club Petterweil und die Boulehalle Karben." },
    ],
  }),
  component: Index,
});

const news = [
  { tag: "Ergebnis · Beispiel", title: "Sommermasters: Finaltag mit 24 Teams", text: "Exemplarischer Bericht – zeigt, wie Turnierergebnisse künftig dargestellt werden." },
  { tag: "Neuigkeit · Beispiel", title: "Neue Hallenzeiten im Winter", text: "Platzhaltertext für Vereinsmitteilungen und Hinweise rund um die Halle." },
  { tag: "Liga · Beispiel", title: "Bundesliga-Spieltag in Karben", text: "Beispielhafte Vorschau auf einen Ligaspieltag mit Tabellenlink." },
];

// Landing page: hero, example events, hall card, news.
function Index() {
  return (
    <>
      <section className="bg-hero text-primary-foreground">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Pétanque Club Petterweil · Boulehalle Karben</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] md:text-7xl">Gut gelegt.<br />Gut getroffen.</h1>
            <p className="mt-6 max-w-md text-lg text-primary-foreground/75">Acht Bahnen unter einem Dach – Training, Turniere und Geselligkeit das ganze Jahr.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/buchen" className="rounded-full bg-gold px-6 py-3.5 font-semibold text-primary transition hover:brightness-105">Bahn reservieren</Link>
              <Link to="/termine" className="rounded-full border border-primary-foreground/30 px-6 py-3.5 font-semibold transition hover:bg-primary-foreground/10">Termine ansehen</Link>
            </div>
          </div>
          <div className="rounded-3xl bg-primary-foreground/5 p-5 ring-1 ring-primary-foreground/15">
            <HallMap occupied={OCCUPIED_LANES} />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-primary md:text-4xl">Nächste Veranstaltungen</h2>
          <Link to="/termine" className="font-semibold text-forest hover:underline">Alle Termine →</Link>
        </div>
        <div className="mt-5"><DemoNote>Beispieldaten – diese Termine finden nicht wirklich statt.</DemoNote></div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {demoEvents.slice(0, 2).map((e) => (
            <article key={e.id} className="flex gap-5 rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-secondary text-primary">
                <span className="font-display text-3xl font-semibold">{formatDate(e.date, { day: "2-digit" })}</span>
                <span className="text-xs uppercase">{formatDate(e.date, { month: "short" })}</span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-forest">{e.type}</span>
                <h3 className="mt-1 text-xl font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.time} Uhr · {e.place}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-sage-soft p-8">
          <h2 className="text-3xl font-semibold text-primary">Die Halle</h2>
          <p className="mt-3 text-muted-foreground">Acht wettkampftaugliche Bahnen, wetterunabhängig bespielbar. Im Beispiel sind Bahn 3 und 7 belegt.</p>
          <div className="mt-6 rounded-2xl bg-card p-4"><HallMap occupied={OCCUPIED_LANES} /></div>
          <Link to="/verein" className="mt-6 inline-block font-semibold text-forest hover:underline">Anfahrt & Hausordnung →</Link>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-primary">Neuigkeiten & Ergebnisse</h2>
          <div className="mt-6 space-y-4">
            {news.map((n) => (
              <Link key={n.title} to="/ergebnisse" className="block rounded-2xl border bg-card p-5 transition hover:border-forest">
                <span className="text-xs font-semibold uppercase tracking-wider text-forest">{n.tag}</span>
                <h3 className="mt-1 text-lg font-semibold">{n.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{n.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}