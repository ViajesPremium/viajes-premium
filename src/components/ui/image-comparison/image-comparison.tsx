"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  motion,
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import styles from "./image-comparison.module.css";

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
    }
  | undefined
>(undefined);

type ImageComparisonProps = {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

const DEFAULT_SPRING_OPTIONS: SpringOptions = { bounce: 0, duration: 0 };

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS,
  );
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;
    const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : event.clientX - containerRect.left;
    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 0), 100);
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={cn(styles.root, enableHover && styles.hoverMode, className)}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

function ImageComparisonImage({
  className,
  alt,
  src,
  position,
}: {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
}) {
  const context = useContext(ImageComparisonContext);
  if (!context) return null;
  const { motionSliderPosition } = context;
  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`);
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`,
  );
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(styles.image, className)}
      style={{ clipPath: position === "left" ? leftClipPath : rightClipPath }}
      loading="lazy"
      decoding="async"
    />
  );
}

function ImageComparisonSlider({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const context = useContext(ImageComparisonContext);
  if (!context) return null;
  const { motionSliderPosition } = context;
  const left = useTransform(motionSliderPosition, (value) => `${value}%`);
  return (
    <motion.div className={cn(styles.slider, className)} style={{ left }}>
      {children}
    </motion.div>
  );
}

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
