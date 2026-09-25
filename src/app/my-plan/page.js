"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { useToast } from "@/components/Toast";

export default function MyPlan() {
  const { todayPlan, savedWorkouts, removeFromTodayPlan, markWorkoutAsDone, removeSavedWorkout } = useWorkout();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("today");
  const [savedDetails, setSavedDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("Duration");

  const totalMinutes = todayPlan.reduce((s, w) => s + (w.duration || 0), 0);
  const totalCalories = todayPlan.reduce((s, w) => s + (w.caloriesBurned || w.calories || 0), 0);

  useEffect(() => {
    if (activeTab !== "saved" || savedWorkouts.length === 0) {
      setSavedDetails([]);
      return;
    }
    setLoading(true);
    Promise.all(savedWorkouts.map((id) => fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`).then((r) => r.json()).catch(() => null)))
      .then((data) => setSavedDetails(data.filter(Boolean)))
      .finally(() => setLoading(false));
  }, [activeTab, savedWorkouts]);

  const list = activeTab === "today" ? todayPlan : savedDetails;

  const sortedList = useMemo(() => {
    const copy = [...list];
    if (sortBy === "Duration") copy.sort((a, b) => (a.duration || 0) - (b.duration || 0));
    else if (sortBy === "Calories") copy.sort((a, b) => (a.caloriesBurned ?? a.calories ?? 0) - (b.caloriesBurned ?? b.calories ?? 0));
    else if (sortBy === "Rating") copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return copy;
  }, [list, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-display font-bold uppercase tracking-tighter mb-3">MY PLAN</h1>
        <p className="text-muted text-sm">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-[85%] max-w-[1184px] mx-auto">
        <div className="bg-dark/30 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-2">Exercises</p>
          <p className="text-3xl font-display font-bold">{todayPlan.length}</p>
        </div>
        <div className="bg-dark/30 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-2">Minutes</p>
          <p className="text-3xl font-display font-bold">{totalMinutes}</p>
        </div>
        <div className="bg-dark/30 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-2">Calories</p>
          <p className="text-3xl font-display font-bold">{totalCalories}</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-0 mb-8 w-[85%] max-w-[1184px] h-[48px] mx-auto">
        <div className="w-[225px] h-[40px] p-1 gap-1 rounded-[12px] bg-[#151921] border border-[#232732] flex items-center">
          <button
            onClick={() => setActiveTab("today")}
            className={`h-[30px] min-w-[68px] flex-1 px-4 text-[12px] tracking-normal normal-case rounded-lg flex items-center justify-center ${
              activeTab === "today"
                ? "bg-[#1f242d] border border-[#2b303d] text-white font-bold shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "bg-transparent border border-transparent text-[#8a92a0] font-normal hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`h-[30px] min-w-[68px] flex-1 px-4 text-[12px] tracking-normal normal-case rounded-lg flex items-center justify-center ${
              activeTab === "saved"
                ? "bg-[#1f242d] border border-[#2b303d] text-white font-bold shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "bg-transparent border border-transparent text-[#8a92a0] font-normal hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>
        <div className="flex items-center gap-3 w-[147px] h-[34px]">
          <span className="w-[42px] text-[12px] text-[#8a92a0]">Sort By</span>
          <div className="relative w-[93px] h-[34px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full h-full bg-[#13161d] border border-[#232732] rounded-[9px] pl-3 pr-8 text-[12px] text-white focus:outline-none"
            >
              <option className="bg-black">Duration</option>
              <option className="bg-black">Calories</option>
              <option className="bg-black">Rating</option>
            </select>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#8a92a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted">Loading workouts…</div>
      ) : sortedList.length === 0 ? (
        <div className="text-center py-20 bg-dark/20 rounded-3xl border-2 border-dashed border-white/10 w-[85%] max-w-[1184px] mx-auto">
          <p className="text-xl font-display font-bold uppercase tracking-wider mb-3">NOTHING HERE YET</p>
          <p className="text-muted text-sm mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn-primary px-8 py-3 inline-block">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4 w-[85%] max-w-[1184px] mx-auto">
          {sortedList.map((w) => (
            <div key={w.id} className="flex items-center gap-4 p-4 bg-[#14171e] border border-[#232732] rounded-2xl">
              <img src={w.image} alt={w.name} className="w-[144px] h-[80px] rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold uppercase text-sm truncate">{w.name}</h3>
                <p className="text-xs text-muted truncate">{w.equipment}</p>
                <div className="flex gap-3 text-xs text-muted mt-1">
                  <span>◷ {w.duration} min</span>
                  <span>● {w.caloriesBurned ?? w.calories} kcal</span>
                  <span>★ {w.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 h-[34px] justify-end flex-shrink-0">
                <Link
                  href={`/workout/${w.id}`}
                  className="w-[108px] h-[34px] inline-flex items-center justify-center text-[12px] font-normal normal-case border border-[#374151] text-white rounded-full"
                >
                  View Details
                </Link>
                {activeTab === "today" ? (
                  <>
                    <button
                      onClick={() => {
                        markWorkoutAsDone(w.id);
                        showToast("Marked as done");
                      }}
                      className="w-[130px] h-8 rounded-full bg-[#ccff00] shadow inline-flex items-center justify-center px-4 text-[12px] font-semibold text-black"
                    >
                      <span>Mark as Done</span>
                    </button>
                    <button
                      onClick={() => {
                        removeFromTodayPlan(w.id);
                        showToast("Removed from plan");
                      }}
                      aria-label="Remove exercise"
                      className="w-7 h-7 p-1.5 bg-transparent border-0 inline-flex items-center justify-center"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      removeSavedWorkout(w.id);
                      showToast("Removed from saved");
                    }}
                    aria-label="Remove exercise"
                    className="w-7 h-7 p-1.5 bg-transparent border-0 inline-flex items-center justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
