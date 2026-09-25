"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function CompletedRedirect() {
  const r = useRouter();
  useEffect(() => r.replace("/my-plan"), [r]);
  return <div className="py-20 text-center text-muted">Redirecting…</div>;
}
