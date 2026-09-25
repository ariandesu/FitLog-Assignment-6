"use client";
import { useWorkout } from "@/context/WorkoutContext";
import WorkoutCard from "@/components/WorkoutCard";
import Link from "next/link";

export default function SavedWorkouts() {
  const { savedWorkouts, removeSavedWorkout } = useWorkout();
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white uppercase">Saved Lifts</h1>
        <Link href="/" className="text-accent text-sm">Back to Library</Link>
      </div>
      {savedWorkouts.length === 0 ? (
        <div className="text-center py-20 bg-dark/20 rounded-3xl border-2 border-dashed border-muted/20"><p className="text-muted mb-6">No saved lifts</p><Link href="/" className="btn-primary px-6 py-2">Browse</Link></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedWorkouts.map(w => <div key={w.id} className="relative group"><WorkoutCard workout={w} /><button onClick={() => removeSavedWorkout(w.id)} className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">✕</button></div>)}
        </div>
      )}
    </div>
  );
}
