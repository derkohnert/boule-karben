// All data here is fictional example data for the design mockup.
export type DemoEvent = { id: string; date: string; time: string; title: string; type: string; place: string };

export const demoEvents: DemoEvent[] = [
  { id: "e1", date: "2026-11-07", time: "10:00", title: "Herbst-Doublette (Beispiel)", type: "Turnier", place: "Boulehalle Karben" },
  { id: "e2", date: "2026-11-14", time: "19:00", title: "Offener Spielabend (Beispiel)", type: "Training", place: "Boulehalle Karben" },
  { id: "e3", date: "2026-11-21", time: "11:00", title: "Vereinsmeisterschaft Runde 3 (Beispiel)", type: "Meisterschaft", place: "Boulehalle Karben" },
  { id: "e4", date: "2026-11-28", time: "14:00", title: "Schnupperkurs Pétanque (Beispiel)", type: "Kurs", place: "Boulehalle Karben" },
  { id: "e5", date: "2026-12-05", time: "10:00", title: "Nikolaus-Triplette (Beispiel)", type: "Turnier", place: "Boulehalle Karben" },
];

export const LANES = [1, 2, 3, 4, 5, 6, 7, 8];
export const OCCUPIED_LANES = [3, 7];
export const TIME_SLOTS = ["10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–20:00", "20:00–22:00"];

// Returns lanes that are free in the demo (all except the example-occupied ones).
export function availableLanes(): number[] {
  return LANES.filter((l) => !OCCUPIED_LANES.includes(l));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "long" }) {
  return new Date(iso + "T12:00:00").toLocaleDateString("de-DE", opts);
}