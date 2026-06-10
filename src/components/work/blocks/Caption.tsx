import type { CaptionBlock } from "../types";

export function Caption({ label, size, text }: CaptionBlock) {
  return (
    <>
      <div className="bar">
        <span className="bullet" />
        <span className="bar-label">{label}</span>
      </div>
      <div className="block">
        <div className={size === "lg" ? "text-lg" : "text-sm"}>{text}</div>
      </div>
    </>
  );
}
