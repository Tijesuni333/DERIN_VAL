"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/love.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      // Explicitly NOT resuming on visible, as requested
    };

    const handleCelebration = () => {
      if (audioRef.current) {
        audioRef.current.volume = 1.0; // Climax volume
        if (audioRef.current.paused) {
          audioRef.current.play().catch((e) => console.log("Playback failed", e));
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("celebrate-love", handleCelebration);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("celebrate-love", handleCelebration);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: isPlaying ? 0 : [0, -10, 0] // Bounce only when NOT playing to catch attention
          }}
          transition={{ 
            y: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 3
            } 
          }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <Button
            onClick={togglePlay}
            size="icon"
            className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-xl border-2 border-accent hover:bg-primary/90"
          >
            {isPlaying ? (
              <HugeiconsIcon icon={PauseIcon} className="h-6 w-6 text-accent" />
            ) : (
              <HugeiconsIcon icon={PlayIcon} className="h-6 w-6 text-accent" />
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}