import type { PhotoRowBlock } from "../types";

const variantClass: Record<PhotoRowBlock["variant"], string> = {
  portrait: "img-portrait",
  square: "img-square",
  tall: "img-tall",
};

export function PhotoRow({ count, variant }: PhotoRowBlock) {
  const cls = variantClass[variant];
  return (
    <div className="block">
      <div className="photo-row">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`img-ph ${cls}`} />
        ))}
      </div>
    </div>
  );
}
