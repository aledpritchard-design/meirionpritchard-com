import type { SplitBlock } from "../types";

export function Split({ label, text, secondary }: SplitBlock) {
  return (
    <>
      <div className="bar">
        <span className="bullet" />
        <span className="bar-label">{label}</span>
      </div>
      <div className="block">
        <div className="split">
          <div className="split-text">
            <div className="text-lg">{text}</div>
            <div className="secondary">{secondary}</div>
          </div>
          <div className="img-ph img-tall" />
        </div>
      </div>
    </>
  );
}
