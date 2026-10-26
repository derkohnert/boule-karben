import { createFileRoute } from "@tanstack/react-router";
import { DemoNote, HallMap, PageIntro } from "../components/site";

export const Route = createFileRoute("/verein")({
  head: () => ({
    meta: [
      { title: "Verein & Halle – Boule Karben (Entwurf)" },
      { name: "description", content: "Über den Pétanque Club Petterweil, Kontakt, Anfahrt und Hausordnung der Boulehalle Karben." },
      { property: "og:title", content: "Verein & Halle – Boule Karben" },
      { property: "og:description", content: "Verein, Halle, Anfahrt und Hausordnung – Designvorschau." },
    ],
  }),
  component: Verein,
});

const rules = [
  "Hallenschuhe bzw. saubere Schuhe tragen",
  "Bahnen nach dem Spiel abziehen und Kugeln einsammeln",
  "Reservierte Zeiten pünktlich beginnen und beenden",
  "Rücksicht auf Nachbarbahnen – kein Werfen über Bahngrenzen",
  "Getränke nur im Aufenthaltsbereich",
];

// Club & hall page: about, contact, directions, house rules, external links.
function Verein() {
  return (
    <>
      <PageIntro eyebrow="Verein & Halle" title="Pétanque mit Herz" text="Der Pétanque Club Petterweil und seine Heimat, die Boulehalle Karben." />
      <section className="container-page space-y-6 py-12">
        <DemoNote>Texte, Kontaktangaben und Adresse sind Platzhalter und werden vor Veröffentlichung ersetzt.</DemoNote>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-primary">Über uns</h2>
            <p className="mt-3 text-muted-foreground">Platzhaltertext: Hier stellt sich der Verein vor – Geschichte, Mannschaften, Training für Einsteiger:innen und Ligaspieler:innen.</p>
            <a href="https://www.pc-petterweil.de/" target="_blank" rel="noreferrer" className="mt-5 inline-block font-semibold text-forest hover:underline">pc-petterweil.de ↗</a>
          </article>
          <article className="rounded-3xl bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-primary">Die Halle</h2>
            <div className="mt-4"><HallMap /></div>
            <a href="https://www.boulehalle-karben.de/" target="_blank" rel="noreferrer" className="mt-5 inline-block font-semibold text-forest hover:underline">boulehalle-karben.de ↗</a>
          </article>
          <article className="rounded-3xl bg-sage-soft p-8">
            <h2 className="text-2xl font-semibold text-primary">Kontakt</h2>
            <p className="mt-3 text-muted-foreground">E-Mail und Telefon folgen (Platzhalter). Bewusst kein Kontaktformular in dieser Vorschau.</p>
          </article>
          <article className="rounded-3xl bg-sage-soft p-8">
            <h2 className="text-2xl font-semibold text-primary">Anfahrt</h2>
            <p className="mt-3 text-muted-foreground">Boulehalle Karben · Adresse folgt (Platzhalter). Parkplätze und ÖPNV-Hinweise werden ergänzt.</p>
          </article>
        </div>
        <article className="rounded-3xl bg-hero p-8 text-primary-foreground">
          <h2 className="text-2xl font-semibold">Hausordnung (Entwurf)</h2>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {rules.map((r, i) => (
              <li key={r} className="flex gap-3"><span className="font-display text-xl text-gold">{i + 1}</span><span className="text-primary-foreground/85">{r}</span></li>
            ))}
          </ol>
        </article>
      </section>
    </>
  );
}