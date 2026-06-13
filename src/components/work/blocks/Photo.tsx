import type { PhotoBlock } from "../types";

export function Photo({ image }: PhotoBlock) {
  return (
    <div className="block">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="img-frame" />
      ) : (
        <div className="img-ph img-frame" />
      )}
    </div>
  );
}
