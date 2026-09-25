"use client";

import { useState, useEffect } from "react";
import WorkoutCard from "@/components/WorkoutCard";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch("https://api.api-store.workers.dev/api/fitlog");
        if (!response.ok) throw new Error("Failed to fetch workouts");
        const data = await response.json();
        const list = Array.isArray(data) ? data : data?.data ?? data?.workouts ?? [];
        setWorkouts(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="flex flex-col bg-[#0c0d10] text-white">
      <section className="px-6 pt-8">
        <div className="max-w-[1232px] mx-auto bg-[#0f1115] border border-[#222630] rounded-[16px] p-6 md:p-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 justify-between">
          <div className="flex-1 lg:max-w-[620px]">
            <p className="text-[#c2f800] text-[11px] font-bold uppercase tracking-[1.1px] mb-4">WORKOUT LIBRARY</p>
            <h1 className="font-display font-bold uppercase text-[60px] leading-[1] tracking-[-1.5px] mb-6">
              TRAIN WITH <span className="text-white">INTENT.</span>
              <br />
              LOG EVERY SET.
            </h1>
            <p className="text-[16px] leading-[1.5] text-[#9ca3af] max-w-xl mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a href="#library" className="bg-[#c2f800] text-black inline-flex items-center gap-2 py-3 px-8 rounded-full text-xs font-bold uppercase tracking-[0.3px]">
              BROWSE WORKOUTS
              <span>→</span>
            </a>
          </div>
          <div className="w-full lg:w-[334px] h-[334px] flex-shrink-0 flex items-center justify-center bg-transparent">
              <img src="/hero.png" alt="Gym hero - FitLog reference" className="w-full h-full object-contain bg-transparent" style={{ backgroundColor: "transparent" }} />
          </div>
        </div>
      </section>
      <section id="library" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 tracking-tighter">THE LIBRARY</h2>
            <p className="text-muted max-w-2xl mx-auto">Twelve lifts covering every major muscle group.</p>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted text-sm">Loading workouts…</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">Error: {error}</p>
              <button onClick={() => window.location.reload()} className="btn-secondary mt-4">
                Try Again
              </button>
            </div>
          ) : workouts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-sm mb-4">No workouts found.</p>
              <button onClick={() => window.location.reload()} className="btn-secondary mt-4">
                Try Again
              </button>
            </div>
          ) : (
            <div className="max-w-[1232px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
