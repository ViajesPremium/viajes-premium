"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";

import styles from "./video-player.module.css";

const MOBILE_BREAKPOINT = 768;

const formatTime = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = Math.floor(safeSeconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

type SliderProps = {
  value: number;
  onChange: (nextValue: number) => void;
  className?: string;
};

function Slider({ value, onChange, className }: SliderProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <motion.div
      className={`${styles.slider} ${className ?? ""}`.trim()}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(Math.min(Math.max(percentage, 0), 100));
      }}
    >
      <motion.div
        className={styles.sliderProgress}
        initial={{ width: 0 }}
        animate={{ width: `${safeValue}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
}

type VideoPlayerProps = {
  desktopSrc: string;
  mobileSrc: string;
};

export default function VideoPlayer({ desktopSrc, mobileSrc }: VideoPlayerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const syncMedia = () => {
      setIsMobile(mediaQuery.matches);
      setShowControls(false);
    };

    syncMedia();
    mediaQuery.addEventListener("change", syncMedia);
    return () => mediaQuery.removeEventListener("change", syncMedia);
  }, []);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const showMobileControlsTemporarily = () => {
    if (!isMobile) return;
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 2200);
  };

  const src = useMemo(() => (isMobile ? mobileSrc : desktopSrc), [desktopSrc, isMobile, mobileSrc]);

  const safePlay = async (video: HTMLVideoElement) => {
    try {
      await video.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    video.pause();
    video.currentTime = 0;
    setUserPaused(false);
  }, [src]);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!userPaused && video.paused) {
            if (!hasUserInteracted) {
              video.muted = true;
              setIsMuted(true);
            }
            void safePlay(video);
          }
          return;
        }

        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
        }
        setUserPaused(false);
      },
      {
        root: null,
        rootMargin: "160px 0px",
        threshold: [0, 0.35, 0.6],
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasUserInteracted, userPaused]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    showMobileControlsTemporarily();
    if (video.paused) {
      setHasUserInteracted(true);
      if (isMuted && volume > 0) {
        video.muted = false;
        setIsMuted(false);
      }
      void safePlay(video);
      setUserPaused(false);
      return;
    }

    video.pause();
    setIsPlaying(false);
    setUserPaused(true);
  };

  const handleVolumeChange = (nextVolumePercent: number) => {
    const video = videoRef.current;
    if (!video) return;

    setHasUserInteracted(true);
    showMobileControlsTemporarily();
    const newVolume = nextVolumePercent / 100;
    video.volume = newVolume;
    video.muted = newVolume === 0;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextProgress = (video.currentTime / video.duration) * 100;
    setProgress(Number.isFinite(nextProgress) ? nextProgress : 0);
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const handleSeek = (nextProgress: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const nextTime = (nextProgress / 100) * video.duration;
    if (!Number.isFinite(nextTime)) return;

    video.currentTime = nextTime;
    setProgress(nextProgress);
    showMobileControlsTemporarily();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasUserInteracted(true);
    showMobileControlsTemporarily();
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && volume === 0) {
      video.volume = 1;
      setVolume(1);
    }
  };

  const setSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;

    setHasUserInteracted(true);
    showMobileControlsTemporarily();
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.player}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
      onClick={() => showMobileControlsTemporarily()}
    >
      <video
        ref={videoRef}
        className={styles.video}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
        src={src}
        onClick={togglePlay}
        playsInline
        preload="metadata"
      />

      <AnimatePresence>
        {showControls && (
          <div className={styles.controlsDock}>
            <motion.div
              className={styles.controls}
              initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 20, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "circInOut", type: "spring" }}
            >
            <div className={styles.timeRow}>
              <span className={styles.time}>{formatTime(currentTime)}</span>
              <Slider value={progress} onChange={handleSeek} className={styles.timeSlider} />
              <span className={styles.time}>{formatTime(duration)}</span>
            </div>

            <div className={styles.actionRow}>
              <div className={styles.leftControls}>
                <button type="button" className={styles.iconButton} onClick={togglePlay}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <div className={styles.volumeGroup}>
                  <button type="button" className={styles.iconButton} onClick={toggleMute}>
                    {isMuted ? <VolumeX size={20} /> : volume > 0.5 ? <Volume2 size={20} /> : <Volume1 size={20} />}
                  </button>
                  <div className={styles.volumeSliderWrap}>
                    <Slider value={volume * 100} onChange={handleVolumeChange} />
                  </div>
                </div>
              </div>

              <div className={styles.speedGroup}>
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <button
                    type="button"
                    key={speed}
                    className={`${styles.speedButton} ${playbackSpeed === speed ? styles.speedButtonActive : ""}`.trim()}
                    onClick={() => setSpeed(speed)}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
