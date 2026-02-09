"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/app/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Simple heart animation URL
const heartAnimationUrl = "https://lottie.host/56743b4f-b67e-4050-9a3d-4c31165c957e/UjX6XF8q9u.json"; 

export function TheQuestion() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noBtnScale, setNoBtnScale] = useState(1);
  const [yesPressed, setYesPressed] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(heartAnimationUrl)
      .then((res) => res.json())
      .then((data) => setAnimationData(data as object))
      .catch((err) => console.error("Failed to load Lottie", err));
  }, []);

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoBtnPosition({ x, y });
    setNoBtnScale((prev) => Math.max(0, prev - 0.1));
  };

  const handleYesClick = () => {
    setYesPressed(true);
    
    // Trigger music climax
    window.dispatchEvent(new Event("celebrate-love"));

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Dancing Figure Animation - Using the Provided GIF */}
      {yesPressed && (
        <motion.div
          initial={{ x: "-100vw", y: 0 }}
          animate={{ 
            x: "100vw",
          }}
          transition={{ 
            x: { duration: 10, ease: "linear", repeat: Infinity },
          }}
          className="absolute bottom-20 z-20 pointer-events-none"
        >
          <Image 
            src="/ijemy.gif" 
            alt="Waltzing Couple" 
            width={200}
            height={140}
            unoptimized
            className="h-48 w-auto rounded-lg"
          />
        </motion.div>
      )}

      <div className="max-w-md w-full flex flex-col items-center">
        {animationData && (
          <div className="w-48 h-48 md:w-64 md:h-64 mb-8">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}

        {yesPressed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-primary font-script">Consider Yourself Celebrated 💌</h1>
            <p className="text-xl text-muted-foreground font-sans">Best Valentine's Day Ever!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground font-script leading-tight">
              This Was Made With Intention 💌
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
              <Button
                size="lg"
                onClick={handleYesClick}
                className="bg-primary hover:bg-primary/90 text-white text-xl px-12 py-8 rounded-full shadow-xl transition-all hover:scale-110"
              >
                I like it!!!!
              </Button>

              <motion.div
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y, scale: noBtnScale }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={handleNoHover}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="text-muted-foreground border-muted-foreground/30 text-xl px-12 py-8 rounded-full hover:bg-destructive/10"
                  onClick={handleNoHover} // Just in case they click fast
                >
                  It's just there😏
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
