export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: "spring" as const, stiffness: 260, damping: 30 },
};

export const DUR = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
  hero: 1.4,
};

/** Delay between items in a staggered list (seconds). */
export const STAGGER = 0.08;

/** Below 768px, shorten durations by 30% (spec §5.3). */
export const MOBILE_DURATION_SCALE = 0.7;

export const REDUCED_MOTION_FADE_DUR = 0.2;

export const HEADER_SCROLL_THRESHOLD_PX = 80;
export const HEADER_HEIGHT_EXPANDED_PX = 96;
export const HEADER_HEIGHT_COMPACT_PX = 68;
export const HEADER_MORPH_DUR = 0.3;

export const SCROLL_REVEAL_Y = 32;
export const HERO_TITLE_Y = 40;
export const HERO_SCALE_FROM = 1.08;
export const KEN_BURNS_TO = 1.06;
export const KEN_BURNS_DUR = 20;
export const CARD_HOVER_Y = -6;
export const CARD_IMAGE_SCALE = 1.06;
export const CARD_HOVER_DUR = 0.35;
export const GRAYSCALE_DUR = 0.4;
export const BUTTON_FILL_DUR = 0.3;
export const MODAL_BACKDROP_DUR = 0.2;
export const MODAL_CARD_DUR = 0.35;
export const MODAL_EXIT_DUR = 0.2;
export const STEP_SLIDE_X = 40;
export const SLOT_STAGGER = 0.03;
export const LOADING_MIN_MS = 400;
export const SUCCESS_CHECK_DUR = 0.6;
export const SCROLL_CUE_DUR = 1.6;
export const PAGE_TRANSITION_DUR = 0.5;
export const TEXT_SPLIT_STAGGER = 0.05;
export const COUNTER_DUR = 1.2;
export const PARALLAX_Y = 80;
export const VIEWPORT_AMOUNT = 0.2;
