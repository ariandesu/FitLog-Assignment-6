"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10H17M7 6V14M13 6V14M5 8V12M15 8V12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-display font-bold text-white text-[14px] tracking-[0.7px]" style={{ fontFamily: "Oswald", fontWeight: 700 }}>
            FITLOG
          </span>
        </div>
        <p className="text-xs text-muted text-center">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
