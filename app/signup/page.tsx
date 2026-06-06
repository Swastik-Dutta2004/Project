"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Bus, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }
      alert("Welcome to BusTiFY. Your first ticket is on us.");
      router.push("/login");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const perqs = [
    "Real-time tracking on 412 routes",
    "₹50 off your first 3 tickets",
    "Priority customer support",
    "Saved routes & recent journeys",
  ];

  return (
    <div className="min-h-[calc(100vh-9rem)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left — editorial panel */}
      <aside className="relative bg-ink text-paper overflow-hidden paper-grain p-8 md:p-14 flex flex-col justify-between min-h-[480px] lg:min-h-[calc(100vh-9rem)]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-md bg-tram text-ink grid place-items-center">
              <Bus className="w-5 h-5" />
            </div>
            <span className="display text-2xl">
              Bus<span className="italic">Ti</span>FY
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="route-num text-2xl text-tram">№ 03</span>
            <span className="mono text-[10px] tracking-[0.3em] uppercase opacity-60">
              New here
            </span>
          </div>

          <h1 className="display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
            Get your <br />
            <span className="italic font-light text-tram">first ticket</span> <br />
            on us.
          </h1>

          <p className="text-paper/70 text-lg max-w-md leading-relaxed">
            Join 1.2 million Kolkatans who book their daily commute the honest way. No spam,
            no nonsense, no missed buses.
          </p>
        </div>

        <ul className="relative z-10 space-y-3 mt-10 max-w-md">
          {perqs.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full border border-tram grid place-items-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-tram" />
              </span>
              <span className="text-paper/85">{p}</span>
            </li>
          ))}
        </ul>

        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
            <path
              d="M -50 200 Q 150 100 250 200 T 500 100"
              stroke="oklch(0.82 0.135 78)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M -50 450 Q 200 350 350 400 T 500 320"
              stroke="oklch(0.82 0.135 78)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </aside>

      {/* Right — form */}
      <section className="flex items-center justify-center p-8 md:p-14">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Form · REG-01
            </span>
            <Link
              href="/login"
              className="text-sm font-medium text-ink hover:text-tram transition-colors flex items-center gap-1.5"
            >
              Already a member? <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <h2 className="display text-4xl md:text-5xl leading-tight tracking-tight mb-2 text-ink">
            Create account.
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            Takes 30 seconds. We&apos;ll never share your data.{" "}
            <Link href="/login" className="text-ink font-medium underline decoration-tram decoration-2 underline-offset-4">
              Sign in instead
            </Link>
            .
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Arnab Mukherjee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-3 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
              />
            </div>

            <div>
              <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@kolkata.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-3 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
              />
            </div>

            <div>
              <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-3 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
              />
              <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                Strength: {password.length < 6 ? "weak" : password.length < 10 ? "good" : "strong"}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-ink text-paper py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-tram hover:text-ink transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Creating your account…" : "Create my BusTiFY account"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              By continuing you agree to our{" "}
              <a href="#" className="text-ink underline">Terms</a> and{" "}
              <a href="#" className="text-ink underline">Privacy</a>.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
