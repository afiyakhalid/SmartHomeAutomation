import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  const cards = [
    {
      icon: "⌁",
      title: "Temperature",
      value: "24.8°C",
      status: "Optimal",
      detail: "Living Room",
      type: "temperature",
    },
    {
      icon: "◌",
      title: "Humidity",
      value: "56%",
      status: "Comfortable",
      detail: "Living Room",
      type: "humidity",
    },
    {
      icon: "◉",
      title: "Motion Detection",
      value: "Detected",
      status: "Active",
      detail: "Hallway Sensor",
      type: "motion",
    },
    {
      icon: "◈",
      title: "Smoke Detection",
      value: "Normal",
      status: "Safe",
      detail: "Kitchen Sensor",
      type: "smoke",
    },
    {
      icon: "◒",
      title: "Cooling System",
      value: "ON",
      status: "Automatic",
      detail: "Temperature > 25°C",
      type: "fan",
    },
    {
      icon: "⌂",
      title: "Smart Home",
      value: "5 Devices",
      status: "Online",
      detail: "All systems operational",
      type: "home",
    },
  ];

  // Duplicate cards to create seamless infinite scrolling
  const carouselCards = [...cards, ...cards];

  return (
    <div className="min-h-screen overflow-hidden bg-[#08090b] text-white">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <span className="text-lg font-bold">⌂</span>
            </div>

            <span className="text-sm font-semibold tracking-wide">
              SmartHome
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#automation" className="transition hover:text-white">
              Automation
            </a>

            <a href="#sensors" className="transition hover:text-white">
              Sensors
            </a>
          </div>

          <button
            onClick={() => nav("/login")}
            className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium backdrop-blur-xl transition hover:bg-white/10"
          >
            Sign In
          </button>

        </div>
      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden">

        {/* Background glow */}
        <div className="absolute left-1/2 top-[35%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.08] blur-[140px]" />

        <div className="absolute -left-40 top-40 h-[350px] w-[350px] rounded-full bg-orange-500/[0.05] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">

          {/* Small badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            Intelligent Home Automation
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            Your home.
            <br />

            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              Smarter than ever.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
            Monitor sensors, control devices, and automate your home
            environment in real time from one intelligent platform.
          </p>


          {/* Buttons */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <button
              onClick={() => nav("/login")}
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
            >
              Get Started

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => nav("/dashboard")}
              className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-medium text-white/80 backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              View Dashboard
            </button>

          </div>


          {/* Hero mini status */}

          <div className="mx-auto mt-14 flex max-w-md items-center justify-center gap-8 text-xs text-white/35">

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              System Online
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div>
              5 Devices Connected
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SENSOR CAROUSEL
      ===================================================== */}

      <section
        id="sensors"
        className="relative overflow-hidden border-y border-white/[0.06] bg-[#0b0d10] py-16"
      >

        {/* Section heading */}

        <div className="relative z-10 mx-auto mb-10 max-w-7xl px-6">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/70">
                Live Environment
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Everything under control.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Real-time monitoring and intelligent automation working
              together throughout your home.
            </p>

          </div>

        </div>


        {/* Fade edges */}

        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#0b0d10] to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#0b0d10] to-transparent" />


        {/* Moving track */}

        <div className="overflow-hidden">

          <div className="smart-carousel-track flex w-max gap-5">

            {carouselCards.map((card, index) => (

              <div
                key={index}
                className="group relative w-[280px] shrink-0 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.055] sm:w-[320px]"
              >

                {/* Glow */}

                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[60px] ${
                    card.type === "temperature"
                      ? "bg-orange-500/20"
                      : card.type === "humidity"
                      ? "bg-cyan-500/20"
                      : card.type === "motion"
                      ? "bg-purple-500/20"
                      : card.type === "smoke"
                      ? "bg-emerald-500/20"
                      : "bg-blue-500/20"
                  }`}
                />


                {/* Top */}

                <div className="relative flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-lg text-white/80">
                      {card.icon}
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {card.title}
                      </p>

                      <p className="mt-0.5 text-[11px] text-white/30">
                        {card.detail}
                      </p>
                    </div>

                  </div>

                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                </div>


                {/* Value */}

                <div className="relative mt-8">

                  <p className="text-3xl font-semibold tracking-tight">
                    {card.value}
                  </p>

                  <p className="mt-2 text-xs text-white/35">
                    {card.status}
                  </p>

                </div>


                {/* Fake graph / indicator */}

                <div className="relative mt-6 flex h-8 items-end gap-1">

                  {[35, 55, 40, 70, 48, 85, 58, 72, 92, 65, 80, 60].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="w-1.5 rounded-full bg-white/20 transition-all duration-500 group-hover:bg-cyan-400/50"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          AUTOMATION SECTION
      ===================================================== */}

      <section
        id="automation"
        className="relative mx-auto max-w-7xl px-6 py-24"
      >

        <div className="grid gap-8 md:grid-cols-2">

          {/* Left */}

          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.07] bg-gradient-to-br from-white/[0.06] to-white/[0.015] p-8 sm:p-10">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/[0.08] blur-[80px]" />

            <p className="relative text-xs uppercase tracking-[0.2em] text-white/35">
              Automation
            </p>

            <h3 className="relative mt-4 max-w-md text-3xl font-semibold tracking-tight">
              Your home reacts before you have to.
            </h3>

            <p className="relative mt-4 max-w-lg text-sm leading-7 text-white/40">
              Sensor data can trigger actions automatically, reducing the
              need for manual control and keeping your environment
              continuously monitored.
            </p>

            <button
              onClick={() => nav("/dashboard")}
              className="relative mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Explore Dashboard →
            </button>

          </div>


          {/* Right */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-[25px] border border-white/[0.07] bg-white/[0.035] p-6">

              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
                ⌁
              </div>

              <h4 className="font-medium">
                Temperature
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Monitor room temperature continuously.
              </p>

            </div>


            <div className="rounded-[25px] border border-white/[0.07] bg-white/[0.035] p-6">

              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-300">
                ◉
              </div>

              <h4 className="font-medium">
                Motion
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Detect activity throughout your home.
              </p>

            </div>


            <div className="rounded-[25px] border border-white/[0.07] bg-white/[0.035] p-6">

              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                ◈
              </div>

              <h4 className="font-medium">
                Smoke
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Monitor environmental safety in real time.
              </p>

            </div>


            <div className="rounded-[25px] border border-white/[0.07] bg-white/[0.035] p-6">

              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                ◒
              </div>

              <h4 className="font-medium">
                Devices
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Control connected devices automatically.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/[0.06] px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-white/30 sm:flex-row">

          <span>
            © 2026 SmartHome Automation
          </span>

          <span>
            Intelligent • Connected • Automated
          </span>

        </div>

      </footer>


      {/* =====================================================
          CAROUSEL ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes smartHomeCarousel {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        .smart-carousel-track {
          animation: smartHomeCarousel 35s linear infinite;
        }

        .smart-carousel-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .smart-carousel-track {
            animation-duration: 28s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smart-carousel-track {
            animation: none;
          }
        }
      `}</style>

    </div>
  );
}