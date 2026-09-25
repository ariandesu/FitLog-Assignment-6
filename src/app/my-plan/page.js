"use client";

import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function MyPlan() {
  const { todayPlanCount, savedCount, completedWorkouts } = useWorkout();
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-display font-bold text-white uppercase mb-12">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/my-plan/today" className="p-8 bg-dark/30 border border-muted/20 rounded-3xl hover:border-accent/50 transition-all">
          <div className="text-4xl mb-4">📅</div>
          <h2 className="text-xl font-bold text-white mb-2">Today's Plan</h2>
          <p className="text-muted mb-4">Organize your session</p>
          <span className="bg-accent text-dark px-3 py-1 rounded-full text-xs font-bold">{todayPlanCount} Lifts</span>
        </Link>
        <Link href="/my-plan/saved" className="p-8 bg-dark/30 border border-muted/20 rounded-3xl hover:border-accent/50 transition-all">
          <div className="text-4xl mb-4">🔖</div>
          <h2 className="text-xl font-bold text-white mb-2">Saved Lifts</h2>
          <p className="text-muted mb-4">Your favorites</p>
          <span className="bg-accent text-dark px-3 py-1 rounded-full text-xs font-bold">{savedCount} Saved</span>
        </Link>
        <Link href="/my-plan/completed" className="p-8 bg-dark/30 border border-muted/20 rounded-3xl hover:border-accent/50 transition-all">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-xl font-bold text-white mb-2">Activity Log</h2>
          <p className="text-muted mb-4">Track history</p>
          <span className="bg-accent text-dark px-3 py-1 rounded-full text-xs font-bold">{Object.keys(completedWorkouts).length} Done</span>
        </Link>
      </div>
    </div>
  );
}
