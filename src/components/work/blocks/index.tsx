export { Photo } from "./Photo";
export { PhotoRow } from "./PhotoRow";
export { Caption } from "./Caption";
export { Split } from "./Split";
export { ResultsCredits } from "./ResultsCredits";

import type { ReactNode } from "react";
import type { Block } from "../types";
import { Photo } from "./Photo";
import { PhotoRow } from "./PhotoRow";
import { Caption } from "./Caption";
import { Split } from "./Split";
import { ResultsCredits } from "./ResultsCredits";

export function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case "photo":
      return <Photo key={key} {...block} />;
    case "photoRow":
      return <PhotoRow key={key} {...block} />;
    case "caption":
      return <Caption key={key} {...block} />;
    case "split":
      return <Split key={key} {...block} />;
    case "resultsCredits":
      return <ResultsCredits key={key} {...block} />;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}
