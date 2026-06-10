type NavTabsProps = {
  items: { label: string }[];
};

export function NavTabs({ items }: NavTabsProps) {
  return (
    <div className="nav-row">
      {items.map((item) => (
        <div key={item.label} className="nav-item">
          <span className="bullet" />
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
