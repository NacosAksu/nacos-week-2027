// Types for the React Bits OrbitImages component (OrbitImages.jsx, JS-CSS variant)
import type { FC, ReactNode } from 'react';

export interface OrbitImagesProps {
  images?: (string | { src: string; alt?: string })[];
  altPrefix?: string;
  shape?: 'ellipse' | 'circle' | 'square' | 'rectangle' | 'triangle' | 'star' | 'heart' | 'infinity' | 'wave' | 'custom';
  customPath?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathDash?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  paused?: boolean;
  depth?: number;
  itemRadius?: number | string;
  shadow?: number;
  hoverScale?: number;
  hoverSpeed?: number;
  draggable?: boolean;
  clickToFront?: boolean;
  onItemClick?: (index: number, src: string) => void;
  alignToPath?: boolean;
  intro?: boolean;
  centerContent?: ReactNode;
}

declare const OrbitImages: FC<OrbitImagesProps>;
export default OrbitImages;
