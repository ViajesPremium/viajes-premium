export {};

declare global {
  interface LenisLike {
    scrollTo: (
      target: number | string | HTMLElement,
      options?: {
        duration?: number;
        easing?: (value: number) => number;
        immediate?: boolean;
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
