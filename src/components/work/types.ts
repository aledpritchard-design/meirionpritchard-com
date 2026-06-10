export type PhotoBlock = {
  type: "photo";
  variant: "frame";
};

export type PhotoRowBlock = {
  type: "photoRow";
  count: number;
  variant: "portrait" | "square" | "tall";
};

export type CaptionBlock = {
  type: "caption";
  label: string;
  size: "lg" | "sm";
  text: string;
};

export type SplitBlock = {
  type: "split";
  label: string;
  text: string;
  secondary: string;
};

export type ResultsCreditsBlock = {
  type: "resultsCredits";
  results: string;
  credits: string;
};

export type Block =
  | PhotoBlock
  | PhotoRowBlock
  | CaptionBlock
  | SplitBlock
  | ResultsCreditsBlock;

export type WorkProject = {
  title: string;
  category: string;
  value: string;
  blocks?: Block[];
};
