import {
  Activity,
  BarChart3,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  const navigation = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Rooms",
      path: "/rooms",
      icon: Home,
    },
    {
      label: "Devices",
      path: "/devices",
      icon: Lightbulb,
    },
    {
      label: "Sensors",
      path: "/sensors",
      icon: Activity,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Automation",
      path: "/automation",
      icon: Sparkles,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">

      <aside
        className="
          fixed left-0 top-0 z-50
          hidden h-screen w-[250px]
          border-r border-[#e5e5e7]
          bg-white/80
          backdrop-blur-2xl
          lg:flex lg:flex-col
        "
      >

        {/* BRAND */}

        <div className="px-6 pb-8 pt-7">

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-[11px]
                bg-[#1d1d1f]
                text-sm font-semibold text-white
              "
            >
              S
            </div>

            <div>

              <div className="text-[15px] font-semibold tracking-[-0.3px]">
                SmartHome
              </div>

              <div className="mt-0.5 text-[9px] font-medium tracking-[1.5px] text-[#86868b]">
                INTELLIGENT LIVING
              </div>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <div className="px-3">

          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[1.4px] text-[#86868b]">
            Control Center
          </div>

          <nav className="space-y-1">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3
                    rounded-xl px-3 py-2.5
                    text-[13px] font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#f0f0f2] text-[#1d1d1f]"
                        : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                    }
                    `
                  }
                >

                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>
                    {item.label}
                  </span>

                </NavLink>
              );
            })}

          </nav>

        </div>


        {/* SYSTEM */}

        <div className="mt-8 px-3">

          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[1.4px] text-[#86868b]">
            System
          </div>

          <nav className="space-y-1">

            <button
              onClick={() => navigate("/admin")}
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-left text-[13px] font-medium
                text-[#6e6e73]
                transition hover:bg-[#f5f5f7]
                hover:text-[#1d1d1f]
              "
            >
              <ShieldCheck size={17} strokeWidth={1.8} />
              Admin Control
            </button>

            <button
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-left text-[13px] font-medium
                text-[#6e6e73]
                transition hover:bg-[#f5f5f7]
                hover:text-[#1d1d1f]
              "
            >
              <Settings size={17} strokeWidth={1.8} />
              Settings
            </button>

          </nav>

        </div>


        {/* BOTTOM */}

        <div className="mt-auto p-4">

          <div
            className="
              mb-3 flex items-center gap-3
              rounded-2xl border border-[#e5e5e7]
              bg-[#fafafa]
              px-3 py-3
            "
          >

            <div
              className="
                flex h-8 w-8 items-center justify-center
                rounded-xl bg-white
                shadow-sm
              "
            >
              <Wifi
                size={15}
                className="text-[#34c759]"
              />
            </div>

            <div className="min-w-0">

              <div className="text-[11px] font-semibold">
                System Online
              </div>

              <div className="mt-0.5 truncate text-[9px] text-[#86868b]">
                All services operational
              </div>

            </div>

            <div className="ml-auto h-2 w-2 rounded-full bg-[#34c759]" />

          </div>


          <button
            onClick={logout}
            className="
              flex w-full items-center gap-3
              rounded-xl px-3 py-2.5
              text-[12px] font-medium
              text-[#86868b]
              transition
              hover:bg-[#f5f5f7]
              hover:text-[#1d1d1f]
            "
          >
            <LogOut size={16} strokeWidth={1.8} />
            Sign out
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <div className="lg:ml-[250px]">

        {/* TOP BAR */}

        <header
          className="
            sticky top-0 z-40
            flex h-[68px]
            items-center justify-between
            border-b border-[#e5e5e7]
            bg-white/75
            px-6
            backdrop-blur-2xl
            lg:px-10
          "
        >

          <div>

            <div className="text-[11px] text-[#86868b]">
              Smart Home
            </div>

            <div className="text-[13px] font-medium">
              Control Center
            </div>

          </div>


          <div className="flex items-center gap-5">

            <div className="hidden items-center gap-2 text-[11px] text-[#6e6e73] sm:flex">

              <span className="h-2 w-2 rounded-full bg-[#34c759]" />

              System operational

            </div>


            <div className="flex items-center gap-2.5">

              <div
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  bg-[#1d1d1f]
                  text-[11px] font-semibold text-white
                "
              >
                A
              </div>

              <div className="hidden sm:block">

                <div className="text-[11px] font-semibold">
                  Afiya
                </div>

                <div className="text-[9px] text-[#86868b]">
                  Administrator
                </div>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE */}

        <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

          <Outlet />

        </main>

      </div>

    </div>
  );
}