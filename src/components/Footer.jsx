"use client";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
export default function Footer() {
  const { todayPlanCount } = useWorkout();
  return (
    <footer className="bg-dark/50 border-t border-muted/20 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img src="/assets/logo.png" className="h-10 invert brightness-0" alt="Logo" />
          <h3 className="font-display text-xl font-bold text-white">FitLog</h3>
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-accent">Library</Link>
          <Link href="/my-plan/today" className="hover:text-accent">Plan</Link>
          <Link href="/my-plan/saved" className="hover:text-accent">Saved</Link>
          <Link href="/my-plan/completed" className="hover:text-accent">Log</Link>
        </div>
        <div className="text-right text-xs text-muted">
          <p>{todayPlanCount} lifts planned</p>
          <p>© 2026 FitLog</p>
        </div>
      </div>
    </footer>
  );
}
