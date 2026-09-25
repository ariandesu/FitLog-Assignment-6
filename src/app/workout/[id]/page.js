"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutDetails({ params }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToTodayPlan, addToSaved } = useWorkout();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await response.json();
        setWorkout(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }
    fetchWorkout();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-white">Loading...</div>;
  if (!workout) return <div className="py-20 text-center text-white">Workout not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
      <div className="lg:w-1/2">
        <img src={workout.image} alt={workout.name} className="rounded-3xl w-full shadow-2xl" />
      </div>
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-display font-bold text-white uppercase mb-4">{workout.name}</h1>
        <p className="text-muted mb-6">{workout.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-8 bg-dark/30 p-6 rounded-2xl border border-muted/20">
          <div><span className="text-xs text-muted block">Equipment</span><span className="text-white font-bold">{workout.equipment}</span></div>
          <div><span className="text-xs text-muted block">Difficulty</span><span className="text-white font-bold">{workout.difficulty}</span></div>
          <div><span className="text-xs text-muted block">Sets</span><span className="text-white font-bold">{workout.sets}</span></div>
          <div><span className="text-xs text-muted block">Reps</span><span className="text-white font-bold">{workout.reps}</span></div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => addToTodayPlan(workout)} className="btn-primary flex-1 py-3 font-bold">Add to Plan</button>
          <button onClick={() => addToSaved(workout.id)} className="btn-secondary flex-1 py-3 font-bold">Save Lift</button>
        </div>
        <Link href="/" className="block text-center mt-8 text-accent hover:underline">Return to Library</Link>
      </div>
    </div>
  );
}
