const SPACING_INTERVAL = 4;

const getSpacing = (level: number): string => {
  return `${level * SPACING_INTERVAL}px`;
};

export enum BorderRadius {
  SMALL = '3px',
  MEDIUM = '5px',
  LARGE = '10px',
  PILL = '999px',
  ROUND = '50%',
}

export enum IconSizes {
  SMALL = '16px',
  MEDIUM = '24px',
  LARGE = '32px',
}

export const styleUtils = {
  getSpacing,
};
