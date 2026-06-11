import type { ResultsCreditsBlock } from "../types";

export function ResultsCredits({ results, credits }: ResultsCreditsBlock) {
  return (
    <div className="two-col">
      <div className="col-results">
        <div className="bar">
          <span className="bullet" />
          <span className="bar-label">Results</span>
        </div>
        <div className="col-body">
          <div className="text-sm">{results}</div>
        </div>
      </div>
      <div className="col-credits">
        <div className="bar bar-right">
          <span className="bar-label">Credits</span>
          <span className="bullet" />
        </div>
        <div className="col-body">
          <div className="text-sm">{credits}</div>
        </div>
      </div>
    </div>
  );
}
