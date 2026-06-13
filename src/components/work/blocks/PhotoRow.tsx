import type { PhotoRowBlock } from "../types";

const variantClass: Record<PhotoRowBlock["variant"], string> = {
  portrait: "img-portrait",
  square: "img-square",
  tall: "img-tall",
};

export function PhotoRow({ variant, images }: PhotoRowBlock) {
  const cls = variantClass[variant];
  if (images && images.length > 0) {
    return (
      <div className="block">
        <div className="photo-row">
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" className={cls} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}
