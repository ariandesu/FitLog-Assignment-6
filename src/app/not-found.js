import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-display font-bold uppercase tracking-tighter mb-4">404</h1>
      <p className="text-muted mb-8">This lift does not exist — check the library.</p>
      <Link href="/" className="btn-primary px-8 py-3">
        Go to workouts
      </Link>
    </div>
  );
}
