"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";

const reasons = [
  "Some people are easy to admire.You make it slightly distracting(i mean see bress na).In the best way 👀💫",
  "This isn’t a love letter(maybe it is 🫣🌚)Just a gentle Valentine acknowledgment that you’re kind of irresistible.Do with that information what you will 💫",
  "Some compliments are meant to be said out loud.Others are better delivered quietly, like this.Especially today 😉💖",
  "Today just felt like a good excuse to remind you.You’re effortlessly attractive in a way that’s almost unfair.And yes… I noticed 😌",
  "No big declarations, no pressure.Just a little reminder that you’re admired more than you think.Especially today 😌💌",
  "If Valentine’s Day is about appreciation,then consider this yours — slow, intentional, and well-deserved.You wear confidence beautifully 💕",
];

export function Reasons() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-primary mb-12 md:mb-16 font-script">Just Between Us 💌</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {reasons.map((reason, index) => (
            <FlipCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div className="h-48 w-full perspective-1000 cursor-pointer" onClick={handleFlip}>
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => setIsAnimating(false)}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg border-2 border-white/20">
          <HugeiconsIcon icon={FavouriteIcon} className="w-16 h-16 text-white fill-white/20" />
          <span className="absolute bottom-4 text-white/80 text-sm font-medium">click#{index + 1}</span>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl bg-white flex items-center justify-center p-6 shadow-xl border-2 border-primary/20"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-lg md:text-xl font-script text-foreground leading-tight">
            {reason}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
