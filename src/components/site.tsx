import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

// Minimal logo: three boules in a row.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="38" height="20" viewBox="0 0 38 20" aria-hidden>
        <circle cx="8" cy="10" r="7" className={light ? "fill-sage" : "fill-primary"} />
        <circle cx="21" cy="10" r="7" className={light ? "fill-primary-foreground" : "fill-forest"} />
        <circle cx="33" cy="13" r="4" className="fill-gold" />
      </svg>
      <span className={`font-display text-xl font-semibold ${light ? "text-primary-foreground" : "text-primary"}`}>Boule Karben</span>
    </span>
  );
}

const nav = [
  { to: "/", label: "Start" },
  { to: "/termine", label: "Termine" },
  { to: "/buchen", label: "Bahnen buchen" },
  { to: "/ergebnisse", label: "Ergebnisse" },
  { to: "/verein", label: "Verein & Halle" },
] as const;

// Sticky site header with responsive mobile menu.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="bg-warning py-1.5 text-center text-xs font-semibold text-warning-foreground">
        Entwurf · Designvorschau – keine echten Buchungen, alle Inhalte sind Beispiele
      </div>
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="hidden gap-1 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-primary"
              activeProps={{ className: "bg-secondary !text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="rounded-full border px-4 py-2 text-sm font-medium md:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Schließen" : "Menü"}
        </button>
      </div>
      {open && (
        <nav className="container-page flex flex-col gap-1 pb-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
              className="rounded-xl px-4 py-3 font-medium text-primary hover:bg-secondary"
              activeProps={{ className: "bg-secondary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

// Footer with placeholder legal links, marked as draft.
export function SiteFooter() {
  const [note, setNote] = useState("");
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">Pétanque Club Petterweil · Boulehalle Karben. Designentwurf zur gemeinsamen Abstimmung.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Seiten</p>
          <ul className="mt-3 space-y-2 text-primary-foreground/70">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary-foreground">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Rechtliches (Platzhalter)</p>
          <div className="mt-3 flex gap-4 text-primary-foreground/70">
            <button className="underline-offset-4 hover:underline" onClick={() => setNote("Impressum folgt in der finalen Version.")}>Impressum</button>
            <button className="underline-offset-4 hover:underline" onClick={() => setNote("Datenschutzerklärung folgt in der finalen Version.")}>Datenschutz</button>
          </div>
          {note && <p className="mt-3 rounded-lg bg-primary-foreground/10 px-3 py-2">{note}</p>}
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs text-primary-foreground/60">
        ENTWURF – Demo-Website ohne Buchungsbetrieb. Alle Termine, Ergebnisse und Namen sind Beispiele.
      </div>
    </footer>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-warning-foreground/20 bg-warning px-4 py-3 text-sm text-warning-foreground">
      <span className="font-bold">Hinweis:</span><span>{children}</span>
    </div>
  );
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-hero text-primary-foreground">
      <div className="container-page py-16 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-primary-foreground/75">{text}</p>
      </div>
    </section>
  );
}

// Illustrated top-down map of the hall with 8 lanes.
export function HallMap({ occupied = [] as number[] }) {
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Hallenplan mit acht Bahnen">
      <rect x="2" y="2" width="396" height="216" rx="18" className="fill-sage-soft stroke-sage" strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 18 + i * 46;
        const busy = occupied.includes(i + 1);
        return (
          <g key={i}>
            <rect x={x} y="22" width="38" height="150" rx="6" className={busy ? "fill-sage" : "fill-card stroke-forest"} strokeWidth="1.5" />
            <circle cx={x + 19} cy="60" r="4" className="fill-primary" />
            <circle cx={x + 13} cy="130" r="4" className="fill-forest" />
            <circle cx={x + 24} cy="138" r="2.5" className="fill-gold" />
            <text x={x + 19} y="196" textAnchor="middle" className="fill-primary text-[12px] font-semibold">{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}