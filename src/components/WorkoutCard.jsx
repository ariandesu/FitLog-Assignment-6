"use client";

import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutCard({ workout }) {
  const { addToSaved } = useWorkout();

  return (
    <div className="card-glass group p-6 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-[24px] mb-6">
        <img 
          src={workout.image} 
          alt={workout.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={() => addToSaved(workout.id)}
            className="w-8 h-8 bg-dark/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:text-accent transition-colors border border-white/10"
          >
            🔖
          </button>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-display font-bold uppercase mb-4 group-hover:text-accent transition-colors">
          {workout.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {workout.muscleGroups.map((group, idx) => (
            <span key={idx} className="text-[10px] font-bold uppercase bg-white/5 text-muted px-2 py-1 rounded-full border border-white/10">
              {group}
            </span>
          ))}
        </div>
      </div>
      <Link 
        href={`/workout/${workout.id}`} 
        className="btn-primary w-full py-3 text-sm font-bold uppercase tracking-wider text-center block"
      >
        View Details
      </Link>
    </div>
  );
}
