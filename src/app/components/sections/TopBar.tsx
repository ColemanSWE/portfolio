const LINKS = [
  ['#statement', 'about'],
  ['#game', 'game'],
  ['#lab', 'lab'],
  ['#work', 'work'],
  ['#contact', 'contact'],
] as const;

export default function TopBar() {
  return (
    <header className="bar gut">
      <b>
        <span className="full">COLEMAN ROSE</span>
        <span className="short">CR</span> ©
      </b>
      <nav aria-label="Sections">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
