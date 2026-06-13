export type HslColor = { h: number; s: number; l: number };

export type PhotoBlock = {
  type: "photo";
  variant: "frame";
  image?: string;
};

export type PhotoRowBlock = {
  type: "photoRow";
  variant: "portrait" | "square" | "tall";
  images?: string[];
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
  image?: string;
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
  _id: string;
  brand: string;
  project: string;
  category: string;
  date?: string;
  image?: string;
  blocks?: Block[];
};
