"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { GiftIcon } from "@hugeicons/core-free-icons";
import { Card, CardContent } from "@/app/components/ui/card";

const flowers = [
  { emoji: "🌹", name: "Rose", message: "For the confidence, the charm,and the way you quietly turn heads.This one felt obvious 😏🌹" },
  { emoji: "🌻", name: "Sunflower", message: "Bright, warm, and impossible not to smile at.Your energy does that thing people notice.Sunflower vibes, always 🌻✨" },
  { emoji: "🌷", name: "Tulip", message: "Soft, elegant, and effortlessly attractive.You don’t try too hard — you don’t need to.Tulip energy suits you 😌🌷" },
];

export function VirtualGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-primary mb-8 md:mb-12 font-script">A Little Gift For You</h2>

        <div className="min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="box"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0] }}
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <div className="w-48 h-48 bg-primary rounded-xl flex items-center justify-center shadow-2xl relative">
                  <div className="absolute inset-0 border-4 border-accent rounded-xl" />
                  <HugeiconsIcon icon={GiftIcon} className="w-24 h-24 text-white" />
                  <span className="absolute -bottom-12 text-lg font-medium text-foreground">Tap to Open</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
              >
                {selectedFlower === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {flowers.map((flower, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <Card 
                          className="cursor-pointer hover:border-primary transition-colors bg-white/50 backdrop-blur-sm"
                          onClick={() => setSelectedFlower(index)}
                        >
                          <CardContent className="p-8 flex flex-col items-center gap-4">
                            <span className="text-6xl filter drop-shadow-md">{flower.emoji}</span>
                            <span className="font-script text-2xl text-foreground">{flower.name}</span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 p-8 rounded-2xl shadow-xl border-2 border-primary/20"
                  >
                    <span className="text-8xl block mb-6">{flowers[selectedFlower].emoji}</span>
                    <h3 className="text-3xl font-script text-primary mb-4">
                      {flowers[selectedFlower].name}
                    </h3>
                    <p className="text-xl font-sans text-foreground">
                      "{flowers[selectedFlower].message}"
                    </p>
                    <button 
                      onClick={() => setSelectedFlower(null)}
                      className="mt-8 text-sm text-muted-foreground hover:text-primary underline"
                    >
                      Pick another
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
