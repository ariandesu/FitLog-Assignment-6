"use client";

import { useState, useEffect } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!response.ok) throw new Error("Failed to fetch workouts");
        const data = await response.json();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 w-full h-full bg-accent/5 blur-[120px] rounded-full" />
        <h1 className="text-5xl md:text-6xl font-display font-bold uppercase mb-6 leading-tight">
          TRAIN WITH <span className="text-accent">INTENT.</span><br/>LOG EVERY SET.
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
        </p>
        <a href="#library" className="btn-primary inline-block py-3 px-6 text-sm font-bold uppercase tracking-wider">Browse Workouts</a>
      </section>
      <section id="library" className="py-20 px-6">
        <h2 className="text-4xl font-display font-bold uppercase mb-12 text-center">THE LIBRARY</h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-16">
          Twelve lifts covering every major muscle group.
        </p>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">Error: {error}</p>
            <button onClick={() => window.location.reload()} className="btn-secondary">Try Again</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
