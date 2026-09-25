"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    const storedDone = localStorage.getItem("fitlog_done");
    if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
    if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
    if (storedDone) setCompletedWorkouts(JSON.parse(storedDone));
  }, []);

  const addToTodayPlan = (workout) => {
    setTodayPlan(prev => {
      if (prev.length >= 5) return prev;
      if (prev.find(w => w.id === workout.id)) return prev;
      const next = [...prev, workout];
      localStorage.setItem("fitlog_plan", JSON.stringify(next));
      return next;
    });
  };

  const removeFromTodayPlan = (id) => {
    setTodayPlan(prev => {
      const next = prev.filter(w => w.id !== id);
      localStorage.setItem("fitlog_plan", JSON.stringify(next));
      return next;
    });
  };

  const addToSaved = (id) => {
    setSavedWorkouts(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem("fitlog_saved", JSON.stringify(next));
      return next;
    });
  };

  const removeSavedWorkout = (id) => {
    setSavedWorkouts(prev => {
      const next = prev.filter(w => w !== id);
      localStorage.setItem("fitlog_saved", JSON.stringify(next));
      return next;
    });
  };

  const markWorkoutAsDone = (id) => {
    setCompletedWorkouts(prev => {
      const next = { ...prev, [id]: true };
      localStorage.setItem("fitlog_done", JSON.stringify(next));
      return next;
    });
  };

  return (
    <WorkoutContext.Provider value={{ 
      todayPlan, addToTodayPlan, removeFromTodayPlan,
      savedWorkouts, addToSaved, removeSavedWorkout,
      completedWorkouts, markWorkoutAsDone,
      todayPlanCount: todayPlan.length,
      savedCount: savedWorkouts.length
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
}
