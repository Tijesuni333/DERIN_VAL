"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import Image from "next/image";

const milestones = [
  {
    title: "That smile does things.",
    date: "💖💖",
    description: "Effortlessly pretty, dangerously charming — a risky combination😌✨.....",
    image: "/images/milestone-first-date.jpeg",
  },
  {
    title: "Pure good vibes.",
    date: "💖💖",
    description: "The kind of picture that makes you look twice… just to be sure you saw it right🔥💫....",
    image: "/images/milestone-our-first-trip-v2.jpeg",
  },
  {
    title: "Low-key stunning.",
    date: "💖💖",
    description: "Somehow managing to be sweet, confident, and distracting all at once👀💕.....",
    image: "/images/milestone-unforgettable-laughs-new.jpeg",
  },
  {
    title: "Naturally her.",
    date: "💖💖",
    description: "Not trying too hard, yet absolutely getting the desired effect😏💫.",
    image: "/images/milestone-today.jpeg",
  },
];

export function Timeline() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl text-center text-primary mb-12 md:mb-16 font-script">Effortlessly lovely</h2>
      
      <div className="relative">
        {/* Vertical Line (Desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent/30 hidden md:block" />
        
        {/* Vertical Line (Mobile) */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-accent/30 md:hidden" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content Card */}
              <div className="flex-1 w-full pl-8 md:pl-0">
                <Card className="overflow-hidden border-accent/20 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <Image 
                      src={milestone.image} 
                      alt={milestone.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 text-center md:text-left">
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">{milestone.date}</span>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-script">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-sans">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Center Heart Icon (Desktop) */}
              <div className="hidden md:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg z-10">
                <HugeiconsIcon icon={FavouriteIcon} className="w-6 h-6 fill-current" />
              </div>

              {/* Spacer for opposite side */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
