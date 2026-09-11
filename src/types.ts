export interface Shade {
  key: string;
  label: string;
  hex: string;
  depthLabel: string;
}

export interface Palette {
  key: string;
  name: string;
  sub: string;
  hex: string;
  phrase: string;
  mood: string;
  shades: Shade[];
  items: string[];
}

export interface Option {
  key: string;
  name: string;
  sub?: string;
  phrase?: string;
  use?: string; // For ratios
  ar?: string;  // For ratios
  ratioCss?: string; // For ratio box preview
  terms?: string; // For exclusions
  description?: string;
  suitableFor?: string;
  searchTerm?: string;
  visualTraits?: string[];
  weightPhrase?: string; // For color weights
}

export interface AppState {
  projectName: string;
  color: string;
  shade: string;
  colorWeight: string;
  subject: string;
  genre: string;
  film: string;
  contrast: string;
  whitespace: number;
  shot: string;
  ratio: string;
  customRatio?: string;
  noise: string;
  exclude: string[];
  format: 'midjourney' | 'general';
  mjVersion: string;
  suffix: string;
  stylize: number;
  chaos: number;
  sref: string;
  srefWeight: number;
}
