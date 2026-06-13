export type HslColor = { h: number; s: number; l: number };

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
  brand: string;
  project: string;
  category: string;
  date: number;
  image?: string;
  blocks?: Block[];
};

export type FactorKey = "brand" | "project" | "category" | "date";
export type FactorState = "off" | "desc" | "asc";
export type Factor = { key: FactorKey; label: string; state: FactorState };
