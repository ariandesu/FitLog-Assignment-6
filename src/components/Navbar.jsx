"use client";

import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const { todayPlanCount, savedCount } = useWorkout();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <img src="/assets/logo.png" alt="Logo" className="h-8 invert brightness-0" />
        <span className="font-display font-bold text-xl uppercase tracking-tighter">FitLog</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/my-plan" className="hidden md:block text-sm font-medium text-muted hover:text-white transition-colors">My Dashboard</Link>
        <div className="flex gap-2">
          <Link href="/my-plan/today" className="bg-accent text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            📅 <span>{todayPlanCount}</span>
          </Link>
          <Link href="/my-plan/saved" className="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            🔖 <span>{savedCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
