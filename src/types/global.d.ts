export {};

declare global {
  interface LenisLike {
    scrollTo: (
      target: number | string | HTMLElement,
      options?: {
        duration?: number;
        easing?: (value: number) => number;
      },
    ) => void;
    resize: () => void;
  }

  interface Window {
    __lenis?: LenisLike;
  }
}
