export {};

declare global {
  interface LenisLike {
    scrollTo: (
      target: number | string | HTMLElement,
      options?: {
        duration?: number;
        easing?: (value: number) => number;
        immediate?: boolean;
        force?: boolean;
        lock?: boolean;
        onComplete?: () => void;
      },
    ) => void;
    resize: () => void;
    stop: () => void;
    start: () => void;
  }

  interface Window {
    __lenis?: LenisLike;
  }
}
