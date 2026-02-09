"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Timeline } from "./components/Timeline";
import { TheQuestion } from "./components/TheQuestion";
import { VirtualGift } from "./components/VirtualGift";
import { Reasons } from "./components/Reasons";
import { MusicPlayer } from "./components/MusicPlayer";
import { LoadingScreen } from "./components/LoadingScreen";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Intro Hero */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl md:text-8xl text-primary font-script mb-6 animate-pulse leading-tight">
          Happy Valentine’s Day ❤️
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12">
          Someone had to say it — you’re amazing.
        </p>
        <div className="animate-bounce">
          <HugeiconsIcon icon={ArrowDown01Icon} className="w-8 h-8 md:w-10 md:h-10 text-primary" />
        </div>
      </section>

      {/* Sections */}
      <Timeline />
      <Reasons />
      <VirtualGift />
      <TheQuestion />

      {/* Floaters */}
      <MusicPlayer />
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground">
        Made with ❤️ just for you.
      </footer>
    </main>
  );
}