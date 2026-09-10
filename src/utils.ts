import { AppState } from './types';
import { PALETTES, CONTRAST, SHOTS, RATIOS, FILMS, GENRES, NOISE, EXCLUDE_OPTIONS } from './data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function whitespacePhrase(v: number) {
  if (v <= 30) return "tightly framed, subject fills most of the frame, minimal negative space";
  if (v <= 60) return "balanced composition with comfortable negative space";
  return "expansive negative space, the subject small within a vast quiet frame, generous breathing room";
}

function colorPhrase(state: AppState) {
  const c = PALETTES.find(p => p.key === state.color) || PALETTES[0];
  const s = c.shades.find(sh => sh.key === state.shade) || c.shades[1];
  return `${c.phrase}, ${s.depthLabel}, ${c.mood}`;
}

const SINGLE_IMAGE_PHRASE = "a single unified photograph, one continuous full-bleed scene, not a collage, not a grid, not a mood board";
const NO_PARAMS = "collage, split screen, grid layout, diptych, triptych, multiple panels, contact sheet, comic panels, frame within frame, color palette, color swatch, paint chips, color chart, color bars, color blocks, swatch card, mood board";

export function buildPrompt(state: AppState): string {
  const subjectText = state.subject.trim();
  const contrast = CONTRAST.find(c => c.key === state.contrast) || CONTRAST[0];
  const shot = SHOTS.find(s => s.key === state.shot) || SHOTS[0];
  const noise = NOISE.find(n => n.key === state.noise) || NOISE[0];
  const genre = GENRES.find(g => g.key === state.genre) || GENRES[0];
  const ratio = RATIOS.find(r => r.key === state.ratio) || RATIOS[0];
  const film = FILMS.find(f => f.key === state.film) || FILMS[0];
  
  const palette = PALETTES.find(p => p.key === state.color) || PALETTES[0];
  const shade = palette.shades.find(sh => sh.key === state.shade) || palette.shades[2];
  const hex = shade?.hex || palette.hex;
  const paletteName = palette.name;

  const parts = [
    subjectText,
    SINGLE_IMAGE_PHRASE,
    colorPhrase(state),
    `specifically color-graded and tinted with exact hex code ${hex}`,
    contrast.phrase,
    whitespacePhrase(state.whitespace),
    shot.phrase,
    genre.phrase,
    film.phrase,
    noise.phrase,
    state.suffix.trim()
  ].filter(Boolean);

  const excludeTerms = state.exclude.map(k => {
    const item = EXCLUDE_OPTIONS.find(e => e.key === k);
    return item ? item.terms : "";
  }).filter(Boolean);
  
  const srefUrl = state.sref.trim();
  const displayRatio = state.ratio === "custom" && state.customRatio ? state.customRatio : state.ratio;

  if (state.format === "general") {
    let sentence = parts.join(", ") + ".";
    sentence += ` Compose the image in a ${displayRatio} aspect ratio.`;
    if (excludeTerms.length) {
      sentence += ` Please avoid including any ${excludeTerms.join(", ")} in the image.`;
    }
    sentence += ` Please strongly set the overall color tone of the image to the specified color (Hexcode: ${hex}).`;
    if (srefUrl) {
      sentence += ` In addition, use the reference image at ${srefUrl} specifically as a visual guide for object composition, subject layout, and theme structure.`;
    }
    return sentence;
  }

  // Midjourney output
  let tail = ` --ar ${displayRatio.replace(':', ':')} --s ${state.stylize}`;
  if (state.chaos > 0) tail += ` --chaos ${state.chaos}`;
  
  let noList = NO_PARAMS;
  if (excludeTerms.length) noList += ", " + excludeTerms.join(", ");

  tail += ` --v 6.0 --style raw --no ${noList}`;

  if (srefUrl) {
    const iwVal = (state.srefWeight / 500).toFixed(1);
    return `${srefUrl} ${parts.join(", ")}${tail} --iw ${iwVal}`;
  }

  return parts.join(", ") + tail;
}
