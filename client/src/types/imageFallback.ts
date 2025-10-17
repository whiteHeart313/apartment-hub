export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}
