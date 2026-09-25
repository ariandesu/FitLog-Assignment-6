"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { useToast } from "@/components/Toast";

export default function WorkoutDetails({ params }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { addToTodayPlan, addToSaved, todayPlan, savedWorkouts } = useWorkout();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const response = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
        if (!response.ok) throw new Error("Not found");
        const data = await response.json();
        if (!data || !data.id) throw new Error("Not found");
        setWorkout(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [id]);

  const handleAddToPlan = () => {
    if (todayPlan.length >= 5) {
      showToast("Plan is full — max 5 lifts");
      return;
    }
    if (todayPlan.find((w) => w.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    addToTodayPlan(workout);
    showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (!workout) return;
    if (savedWorkouts.includes(workout.id)) {
      showToast("Already saved");
      return;
    }
    addToSaved(workout.id);
    showToast("Saved for later");
  };

  if (loading) return <div className="py-20 text-center text-white">Loading...</div>;
  if (!workout) return <div className="py-20 text-center text-white">Workout not found</div>;

  const isMax = todayPlan.length >= 5;
  const alreadyInPlan = todayPlan.some((w) => w.id === workout.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2">
          <div className="rounded-[32px] overflow-hidden border border-white/10 bg-dark/30">
            <img src={workout.image} alt={workout.name} className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-4 tracking-tighter">{workout.name}</h1>
          <p className="text-muted mb-6 leading-relaxed">{workout.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups.map((g, i) => (
              <span key={i} className="text-xs font-bold uppercase bg-white/5 text-muted px-3 py-1.5 rounded-full border border-white/10 tracking-wider">
                {g}
              </span>
            ))}
          </div>

          <div className="bg-dark/30 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 divide-y divide-white/10">
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Equipment</span>
                <span className="text-white font-bold">{workout.equipment}</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Difficulty</span>
                <span className="text-white font-bold">{workout.difficulty}</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Sets</span>
                <span className="text-white font-bold">{workout.sets}</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Reps</span>
                <span className="text-white font-bold">{workout.reps}</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Duration</span>
                <span className="text-white font-bold">{workout.duration} min</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Calories</span>
                <span className="text-white font-bold">{workout.caloriesBurned ?? workout.calories} kcal</span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted uppercase text-xs tracking-widest">Rating</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <span className="text-accent">★</span> {workout.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-2">Instructions</h3>
            <ol className="space-y-3">
              {(workout.instructions || []).map((step, idx) => (
                <li key={idx} className="flex gap-4 text-sm text-muted">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-black flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToPlan}
              disabled={isMax && !alreadyInPlan}
              className={`flex-1 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 ${
                isMax && !alreadyInPlan ? "bg-white/10 text-muted cursor-not-allowed" : "btn-primary"
              }`}
            >
              <span>+</span> Add to today&apos;s plan
            </button>
            <button onClick={handleSave} className="btn-secondary flex-1 py-3.5 flex items-center justify-center gap-2">
              <span>♡</span> Save for later
            </button>
          </div>
          <Link href="/" className="block text-center mt-8 text-accent hover:underline text-sm">
            ← Return to Library
          </Link>
        </div>
      </div>
    </div>
  );
}
