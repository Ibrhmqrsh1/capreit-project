const links = [
  { id: "overview", label: "Overview" },
  { id: "dcf", label: "DCF" },
  { id: "housing", label: "Housing" },
  { id: "immigration", label: "Immigration" },
  { id: "policy", label: "Policy" },
  { id: "scenarios", label: "Scenarios" },
  { id: "conclusion", label: "Conclusion" },
  { id: "methodology", label: "Methodology" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-12 lg:px-20">
        <a href="#top" className="font-serif text-lg font-medium text-navy">
          CAPREIT <span className="text-ink/40">/</span> <span className="text-sm font-sans text-ink/60">CAR.UN</span>
        </a>
        <div className="hidden gap-6 font-sans text-sm text-ink/70 md:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="hover:text-rust">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
