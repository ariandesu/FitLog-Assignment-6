"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const { todayPlanCount, savedCount } = useWorkout();
  const pathname = usePathname();
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[67px] bg-[#0f1115] border-b border-[#1b1f28] z-50">
      <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-display font-bold text-white text-[20px] tracking-tight" style={{ fontFamily: "Oswald", fontWeight: 700 }}>
            FITLOG
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className={`text-xs font-medium tracking-wide ${isActive("/") ? "text-[#c2f800]" : "text-[#9ca3af] hover:text-white"}`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-xs font-medium tracking-wide ${isActive("/my-plan") ? "text-[#c2f800]" : "text-[#9ca3af] hover:text-white"}`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="hidden sm:block text-xs text-[#d1d5db]">Plan</span>
            <span className="bg-[#c2f800] text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{todayPlanCount}</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 border border-[#1b1f28] rounded-full px-3 py-1.5">
            <span className="hidden sm:block text-xs text-[#9ca3af]">Saved</span>
            <span className="bg-[#1a1d24] text-[#d1d5db] w-5 h-5 rounded-full flex items-center justify-center text-xs">{savedCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
