"use client";

type ScrollOffsetConfig = {
  viewportHeightMultiplier: number;
  desktopOnly?: boolean;
};

type ScrollToSectionOptions = {
  duration?: number;
  updateHash?: boolean;
  defer?: boolean;
};

const SECTION_ALIAS_MAP: Record<string, string> = {
  "#testimonios": "#testimonials",
  "#contacto": "#form",
  "#cta-form": "#form",
};

const REVEAL_SCROLL_OFFSETS: Record<string, ScrollOffsetConfig> = {
  "#itinerarios": { viewportHeightMultiplier: 1, desktopOnly: true },
  "#testimonials": { viewportHeightMultiplier: 1, desktopOnly: true },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

let scrollToken = 0;

function normalizeSectionHash(hash: string): string {
  return SECTION_ALIAS_MAP[hash] ?? hash;
}

const refreshScrollSystems = () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.__lenis?.resize();
      void import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => ScrollTrigger.refresh())
        .catch(() => {});
    });
  });
};

function animateNativeScrollTo(
  toY: number,
  durationSeconds: number,
  token: number,
  onComplete: () => void,
) {
  const fromY = window.scrollY;
  const delta = toY - fromY;
  if (Math.abs(delta) < 1) {
    window.scrollTo({ top: toY, behavior: "auto" });
    onComplete();
    return;
  }

  const durationMs = Math.max(durationSeconds * 1000, 120);
  const startAt = performance.now();

  const step = (now: number) => {
    if (token !== scrollToken) return;

    const elapsed = now - startAt;
    const t = clamp(elapsed / durationMs, 0, 1);
    const eased = easeOutQuint(t);
    const nextY = fromY + delta * eased;

    window.scrollTo({ top: nextY, behavior: "auto" });

    if (t < 1) {
      requestAnimationFrame(step);
      return;
    }

    window.scrollTo({ top: toY, behavior: "auto" });
    onComplete();
  };

  requestAnimationFrame(step);
}

export function scrollToSection(
  hash: string,
  options: ScrollToSectionOptions = {},
): boolean {
  if (typeof window === "undefined" || !hash.startsWith("#")) {
    return false;
  }

  const normalizedHash = normalizeSectionHash(hash);
  const target = document.querySelector(normalizedHash) as HTMLElement | null;
  if (!target) {
    return false;
  }

  const offsetConfig = REVEAL_SCROLL_OFFSETS[normalizedHash];
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const shouldApplyOffset =
    !!offsetConfig && (!offsetConfig.desktopOnly || isDesktop);
  const offsetPx = shouldApplyOffset
    ? window.innerHeight * offsetConfig.viewportHeightMultiplier
    : 0;

  const rawY = target.getBoundingClientRect().top + window.scrollY + offsetPx;
  const maxY = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0,
  );
  const targetY = clamp(rawY, 0, maxY);
  const duration = options.duration ?? 1.1;
  const updateHash = options.updateHash ?? true;
  const defer = options.defer ?? true;
  const currentToken = ++scrollToken;

  const performScroll = () => {
    // Drop stale scroll jobs if user clicked another CTA quickly.
    if (currentToken !== scrollToken) {
      return;
    }

    const lenis = window.__lenis;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (lenis) {
      // A few sections pause Lenis during interactive pins.
      // Force/start ensures CTA navigation always works.
      lenis.start();
      lenis.scrollTo(targetY, {
        duration,
        easing: easeOutQuint,
        force: true,
        lock: true,
        onComplete: () => {
          // Keep pin spacers + scroll limits in sync after long jumps.
          refreshScrollSystems();
        },
      });
    } else {
      if (isDesktop) {
        window.scrollTo({ top: targetY, behavior: "smooth" });
        refreshScrollSystems();
      } else {
        animateNativeScrollTo(targetY, duration, currentToken, () => {
          refreshScrollSystems();
        });
      }
    }

    if (updateHash) {
      window.history.replaceState(null, "", normalizedHash);
    }
  };

  if (defer) {
    requestAnimationFrame(() => {
      requestAnimationFrame(performScroll);
    });
  } else {
    performScroll();
  }

  return true;
}
