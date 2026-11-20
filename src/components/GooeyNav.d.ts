// Types for the React Bits GooeyNav component (GooeyNav.jsx, JS-CSS variant)
import type { CSSProperties, FC, ReactNode } from 'react';

export interface GooeyNavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface GooeyNavProps {
  items?: GooeyNavItem[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number, item: GooeyNavItem) => void;
  theme?: 'dark' | 'light';
  color?: string;
  activeTextColor?: string;
  colors?: string[];
  size?: 'sm' | 'md' | 'lg';
  frame?: boolean;
  animationTime?: number;
  particleCount?: number;
  spread?: number;
  timeVariance?: number;
  gooeyness?: number;
  wobble?: number;
  hoverEffect?: boolean;
  className?: string;
  style?: CSSProperties;
}

declare const GooeyNav: FC<GooeyNavProps>;
export default GooeyNav;
