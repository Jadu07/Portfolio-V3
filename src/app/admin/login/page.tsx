"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const [cooldown, setCooldown] = useState(-1); // -1 means initializing

  useEffect(() => {
    let initialCooldown = 0;
    const storedCooldown = sessionStorage.getItem('admin_cooldown');
    if (storedCooldown) {
      const remaining = parseInt(storedCooldown, 10) - Date.now();
      if (remaining > 0) initialCooldown = Math.ceil(remaining / 1000);
      else sessionStorage.removeItem('admin_cooldown');
    }

    if (initialCooldown === 0 && error === "unauthorized_user") {
      initialCooldown = 60;
      sessionStorage.setItem('admin_cooldown', (Date.now() + 60000).toString());
    }

    setCooldown(initialCooldown);
  }, [error]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (cooldown === 0 && error === "unauthorized_user") {
      // Once cooldown hits 0, clear error from URL so they can try again
      sessionStorage.removeItem('admin_cooldown');
      router.replace("/admin/login");
    }
  }, [cooldown, error, router]);

  let errorMessage = "";
  if (error === "unauthorized_user") {
    errorMessage = "Access denied. Only the repository owner can access the admin panel.";
  } else if (error === "missing_env") {
    errorMessage = "GitHub OAuth credentials are not configured properly on the server.";
  } else if (error === "token_failed" || error === "no_code") {
    errorMessage = "Failed to authenticate with GitHub. Please try again.";
  } else if (error === "server_error") {
    errorMessage = "An unexpected server error occurred during authentication.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white p-4 relative z-10">
      <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl md:rounded-[32px] w-full max-w-md flex flex-col gap-6 shadow-2xl border border-white/5 relative overflow-hidden">

        {/* Glow effect */}
        <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-[#e6e6e6] rounded-full blur-[100px] opacity-[0.03] pointer-events-none" />

        <div className="flex flex-col gap-2 relative z-10">
          <h1 className="text-3xl font-medium tracking-tight">Admin Portal</h1>
          <p className="text-[#a1a1aa] text-sm">
            Sign in with GitHub to manage your portfolio content.
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm relative z-10">
            {errorMessage}
          </div>
        )}

        <div className="relative z-10 pt-4">
          {cooldown > 0 ? (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-center w-full bg-white/10 text-[#a1a1aa] font-medium py-3 px-6 rounded-full cursor-not-allowed border border-white/5">
                Try again in {cooldown}s
              </div>
              <a 
                href="https://github.com/logout" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-center text-[#a1a1aa] hover:text-white transition-colors underline underline-offset-4"
              >
                Need to switch accounts? Sign out of GitHub here.
              </a>
            </div>
          ) : cooldown === -1 && error ? (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-center w-full bg-white/10 text-[#a1a1aa] font-medium py-3 px-6 rounded-full cursor-not-allowed border border-white/5">
                Please wait...
              </div>
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className="flex items-center justify-center gap-3 w-full bg-white hover:bg-white/90 text-black font-medium py-3 px-6 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89 5.06 5.06 0 0 0 .15-3.83s-1.18-.38-3.9 1.48a13.38 13.38 0 0 0-7 0c-2.72-1.86-3.9-1.48-3.9-1.48a5.06 5.06 0 0 0 .15 3.83A5.5 5.5 0 0 0 2 8.76c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
              </svg>
              Sign in with GitHub
            </a>
          )}

          <p className="text-[#a1a1aa] text-xs text-center mt-6">
            Authorized access is restricted to the repository owner.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <LoginContent />
    </Suspense>
  );
}
