import { useState } from "react";
import api from "../api/client";
import { useNavigate, Link } from "react-router-dom";
import futurePoster from "../assets/future-poster.png";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);

      nav("/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-180px] left-[-120px] w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[130px]" />

        <div className="absolute bottom-[-180px] right-[-100px] w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-[130px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>


      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl min-h-[620px] rounded-[32px] border border-white/10 bg-white/[0.035] backdrop-blur-2xl shadow-2xl overflow-hidden flex">


        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="hidden md:flex md:w-[48%] relative flex-col justify-between p-10 bg-gradient-to-br from-purple-950/40 via-[#11111a] to-[#08090d] overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] border border-purple-400/10 rounded-full" />

          <div className="absolute top-[-70px] left-[-70px] w-[240px] h-[240px] border border-purple-400/10 rounded-full" />


          {/* Logo */}
          <div className="relative z-10">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-300 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">

                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 11.5L12 4l9 7.5" />
                  <path d="M5 10.5V20h14v-9.5" />
                  <path d="M9 20v-5h6v5" />
                </svg>

              </div>

              <div>
                <p className="font-semibold tracking-tight text-lg">
                  Smart Home
                </p>

                <p className="text-xs text-white/40">
                  Intelligent Living
                </p>
              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* FUTURISTIC IMAGE */}
          {/* ================================================= */}

          <div className="relative flex-1 flex items-center justify-center py-8">

            {/* Image glow */}
            <div className="absolute w-[360px] h-[420px] bg-purple-500/20 blur-[100px] rounded-full" />

            {/* Image container */}
            <div className="relative w-[270px] h-[370px] rounded-[28px] overflow-hidden border border-white/15 bg-black/30 shadow-2xl shadow-purple-900/30">

              <img
                src={futurePoster}
                alt="Future smart home technology"
                className="w-full h-full object-cover"
              />

              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d]/50 via-transparent to-purple-500/5 pointer-events-none" />

            </div>


            {/* Floating Secure badge */}
            <div className="absolute right-2 top-[24%] px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl flex items-center gap-2 text-xs shadow-xl">

              <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />

              Secure

            </div>


            {/* Floating Smart Access badge */}
            <div className="absolute left-1 bottom-[25%] px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl text-xs text-white/70 shadow-xl">

              Smart Access

            </div>

          </div>


          {/* Bottom text */}
          <div className="relative z-10">

            <p className="text-3xl font-light tracking-tight leading-tight">

              Your home.

              <br />

              <span className="text-white/40">
                Smarter than ever.
              </span>

            </p>

            <p className="mt-4 text-sm text-white/40 max-w-sm leading-6">

              Control your connected home, monitor sensors and automate
              everyday devices from one intelligent platform.

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="w-full md:w-[52%] flex items-center justify-center p-8 sm:p-12 lg:p-16">

          <div className="w-full max-w-md">


            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-3 mb-10">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-300 to-purple-500 flex items-center justify-center">

                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 11.5L12 4l9 7.5" />
                  <path d="M5 10.5V20h14v-9.5" />
                  <path d="M9 20v-5h6v5" />
                </svg>

              </div>

              <div>

                <p className="font-semibold">
                  Smart Home
                </p>

                <p className="text-xs text-white/40">
                  Intelligent Living
                </p>

              </div>

            </div>


            {/* Heading */}
            <div className="mb-10">

              <p className="text-sm text-cyan-300 mb-3 tracking-wide">
                WELCOME BACK
              </p>

              <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
                Sign in
              </h1>

              <p className="mt-4 text-white/40 text-sm leading-6">
                Access your smart home and continue where you left off.
              </p>

            </div>


            {/* Login form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label className="block text-xs text-white/50 mb-2 ml-1">
                  Email
                </label>

                <div className="relative">

                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.045] pl-12 pr-4 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-cyan-300/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-300/5"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <div className="flex justify-between items-center mb-2 ml-1">

                  <label className="text-xs text-white/50">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-white/30 hover:text-cyan-300 transition"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="2"
                    />

                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.045] pl-12 pr-4 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-cyan-300/40 focus:bg-white/[0.07] focus:ring-4 focus:ring-cyan-300/5"
                  />

                </div>

              </div>


              {/* Remember */}
              <div className="flex items-center gap-2 pt-1">

                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-cyan-300"
                />

                <span className="text-xs text-white/40">
                  Remember me
                </span>

              </div>


              {/* Login */}
              <button
                type="submit"
                className="group w-full h-14 rounded-2xl bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-cyan-200 hover:shadow-[0_0_35px_rgba(103,232,249,0.18)] active:scale-[0.98] flex items-center justify-center gap-3"
              >

                Sign in

                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>

              </button>

            </form>


            {/* Divider */}
            <div className="flex items-center gap-4 my-8">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-white/25">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>


            {/* Google */}
            <button
              type="button"
              className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.07] transition flex items-center justify-center gap-3 text-sm text-white/80"
            >

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.72c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.72z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 13.8a5.86 5.86 0 0 1 0-3.75V7.52H3.3a9.73 9.73 0 0 0 0 8.81l3.24-2.53z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.02c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.12 14.63 2.28 12 2.28a9.74 9.74 0 0 0-8.7 5.24l3.24 2.53C7.31 7.74 9.46 6.02 12 6.02z"
                />

              </svg>

              Continue with Google

            </button>


            {/* Register */}
            <p className="text-center text-sm text-white/35 mt-8">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-white hover:text-cyan-300 transition-colors"
              >
                Create account
              </Link>

            </p>

          </div>

        </div>

      </div>


      {/* Copyright */}
      <div className="absolute bottom-5 left-0 right-0 text-center text-[11px] text-white/20">

        Smart Home Automation • Secure Access

      </div>

    </div>
  );
}