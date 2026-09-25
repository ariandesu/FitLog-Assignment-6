"use client";

import Link from "next/link";

export default function WorkoutCard({ workout }) {
  if (!workout) return null;
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#15171d] border border-[#222630] rounded-2xl overflow-hidden p-0 gap-0 h-full"
    >
      <div className="w-full h-[192px] overflow-hidden">
        <img src={workout.image} alt={workout.name} className="w-full h-full object-cover block" />
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2">
            {(workout.muscleGroups || []).map((group, idx) => (
              <span
                key={idx}
                className="text-[11px] font-bold uppercase bg-[#c2f800] text-black px-2.5 py-0.5 rounded-full tracking-[0.55px] leading-[1.5]"
              >
                {group}
              </span>
            ))}
          </div>
          <h3 className="font-display font-bold uppercase text-[18px] tracking-[0.45px] leading-[1.55] text-white pt-2">
            {workout.name}
          </h3>
          <p className="text-[12px] font-normal text-[#9ca3af] leading-[1.33]">{workout.equipment}</p>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#20242e]">
          <span className="flex items-center gap-1.5 text-[12px] text-[#9ca3af]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#9ca3af" strokeWidth="1.16" />
              <path d="M7 4.5V7L8.75 8.25" stroke="#9ca3af" strokeWidth="1.16" strokeLinecap="round" />
            </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#9ca3af]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1.5C7 1.5 3.5 5 3.5 8a3.5 3.5 0 007 0c0-3-3.5-6.5-3.5-6.5z"
                stroke="#9ca3af"
                strokeWidth="1.16"
                strokeLinejoin="round"
              />
            </svg>
            {workout.caloriesBurned ?? workout.calories} kcal
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#9ca3af]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1.8l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.5l-3.4 1.8.7-3.8L1.5 5.8l3.8-.5L7 1.8z"
                stroke="#9ca3af"
                strokeWidth="1.16"
                strokeLinejoin="round"
              />
            </svg>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
