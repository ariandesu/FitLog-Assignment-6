"use client";

import { useWorkout } from "@/context/WorkoutContext";
import Link from "next/link";

export default function TodayPlan() {
  const { todayPlan, removeFromTodayPlan, markWorkoutAsDone, completedWorkouts } = useWorkout();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white uppercase">Today's Plan</h1>
        <Link href="/" className="text-accent text-sm">Back to Library</Link>
      </div>
      {todayPlan.length === 0 ? (
        <div className="text-center py-20 bg-dark/20 rounded-3xl border-2 border-dashed border-muted/20">
          <p className="text-muted mb-6">Your plan is empty</p>
          <Link href="/" className="btn-primary px-6 py-2">Browse Workouts</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {todayPlan.map((w, i) => (
            <div key={w.id} className="flex items-center justify-between p-4 bg-dark/30 border border-muted/20 rounded-2xl">
              <div className="flex items-center gap-4">
                <button onClick={() => markWorkoutAsDone(w.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completedWorkouts[w.id] ? 'bg-accent border-accent' : 'border-muted/40'}`}>
                  {completedWorkouts[w.id] && <span className="text-dark text-xs">✓</span>}
                </button>
                <span className={`font-bold ${completedWorkouts[w.id] ? 'line-through text-muted' : 'text-white'}`}>{w.name}</span>
              </div>
              <button onClick={() => removeFromTodayPlan(w.id)} className="text-muted hover:text-red-500">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
