"use client";

import { motion } from "motion/react"
import { Calendar } from "lucide-react";

const GitHubCalendar = ({ username }: { username: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1 }}
      className="relative group"
    >
      {/* Calendar Header */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-accent" />
        <h3 className="font-serif text-xl text-accent">My Development Activity</h3>
      </div>

      {/* Calendar Image */}
      <div className="relative overflow-hidden rounded-lg border border-secondary/20 bg-background p-4">
        <img
          src={`https://ghchart.rshah.org/3282B8/${username}`}
          alt={`${username}'s GitHub contributions`}
          className="w-full h-auto"
        />
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Footer Note */}
      <p className="mt-2 text-sm text-foreground text-right opacity-60">
        @{username} on GitHub
      </p>
    </motion.div>
  );
}

export default GitHubCalendar;