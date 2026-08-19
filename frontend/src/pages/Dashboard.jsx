import { useEffect, useState } from "react";
import {
  Activity,
  Fan,
  Lightbulb,
  Thermometer,
  Wind,
} from "lucide-react";

import api from "../api/client";

export default function Dashboard() {

  const [devices, setDevices] = useState([]);

  const loadDevices = async () => {
    try {
      const response = await api.get("/devices");
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    loadDevices();

    const interval = setInterval(
      loadDevices,
      3000
    );

    return () => clearInterval(interval);

  }, []);


  const activeDevices =
    devices.filter((device) => device.status).length;


  return (
    <div className="space-y-8">

      {/* HEADER */}

      <section>

        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#0071e3]">
          Overview
        </div>

        <h1 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
          Good morning, Afiya.
        </h1>

        <p className="mt-2 text-sm text-[#86868b]">
          Here's what's happening around your home.
        </p>

      </section>


      {/* STATUS */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Thermometer size={18} />
            </div>

            <span className="text-[10px] text-[#86868b]">
              TODAY
            </span>

          </div>

          <div className="text-2xl font-semibold tracking-tight">
            26.4°
          </div>

          <div className="mt-1 text-xs text-[#86868b]">
            Average temperature
          </div>

        </div>


        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Wind size={18} />
            </div>

            <span className="text-[10px] text-[#34c759]">
              NORMAL
            </span>

          </div>

          <div className="text-2xl font-semibold tracking-tight">
            57%
          </div>

          <div className="mt-1 text-xs text-[#86868b]">
            Average humidity
          </div>

        </div>


        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Lightbulb size={18} />
            </div>

            <span className="text-[10px] text-[#86868b]">
              DEVICES
            </span>

          </div>

          <div className="text-2xl font-semibold tracking-tight">
            {activeDevices}
          </div>

          <div className="mt-1 text-xs text-[#86868b]">
            Devices currently active
          </div>

        </div>


        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Activity size={18} />
            </div>

            <span className="text-[10px] text-[#34c759]">
              LIVE
            </span>

          </div>

          <div className="text-2xl font-semibold tracking-tight">
            Online
          </div>

          <div className="mt-1 text-xs text-[#86868b]">
            Home system status
          </div>

        </div>

      </section>


      {/* ROOMS */}

      <section>

        <div className="mb-4 flex items-end justify-between">

          <div>

            <h2 className="text-lg font-semibold">
              Your home
            </h2>

            <p className="mt-1 text-xs text-[#86868b]">
              Monitor each space at a glance.
            </p>

          </div>

        </div>


        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {[
            {
              name: "Living Room",
              temperature: "26.4°",
              humidity: "57%",
            },
            {
              name: "Bedroom",
              temperature: "24.8°",
              humidity: "61%",
            },
            {
              name: "Kitchen",
              temperature: "28.1°",
              humidity: "48%",
            },
          ].map((room) => (

            <div
              key={room.name}
              className="
                group rounded-3xl
                border border-[#e5e5e7]
                bg-white p-6
                transition
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-black/5
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="text-[11px] font-semibold uppercase tracking-[1px] text-[#86868b]">
                    Room
                  </div>

                  <h3 className="mt-2 text-lg font-semibold">
                    {room.name}
                  </h3>

                </div>

                <div className="h-2 w-2 rounded-full bg-[#34c759]" />

              </div>


              <div className="mt-8 flex items-end justify-between">

                <div>

                  <div className="text-3xl font-semibold tracking-[-1px]">
                    {room.temperature}
                  </div>

                  <div className="mt-1 text-xs text-[#86868b]">
                    Temperature
                  </div>

                </div>


                <div className="text-right">

                  <div className="text-lg font-medium">
                    {room.humidity}
                  </div>

                  <div className="mt-1 text-xs text-[#86868b]">
                    Humidity
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* DEVICES + ACTIVITY */}

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <div className="mb-6">

            <h2 className="text-lg font-semibold">
              Active devices
            </h2>

            <p className="mt-1 text-xs text-[#86868b]">
              Control your connected devices.
            </p>

          </div>


          <div className="space-y-3">

            {devices.length === 0 ? (

              <div className="rounded-2xl bg-[#f5f5f7] p-6 text-center">

                <Lightbulb
                  className="mx-auto mb-3 text-[#86868b]"
                  size={22}
                />

                <p className="text-sm font-medium">
                  No devices connected
                </p>

                <p className="mt-1 text-xs text-[#86868b]">
                  Add devices to start controlling your home.
                </p>

              </div>

            ) : (

              devices.slice(0, 5).map((device) => (

                <div
                  key={device.id}
                  className="
                    flex items-center justify-between
                    rounded-2xl bg-[#f5f5f7]
                    px-4 py-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      {device.type === "fan"
                        ? <Fan size={17} />
                        : <Lightbulb size={17} />
                      }
                    </div>

                    <div>

                      <div className="text-sm font-medium">
                        {device.name}
                      </div>

                      <div className="mt-0.5 text-[10px] text-[#86868b]">
                        {device.type}
                      </div>

                    </div>

                  </div>


                  <div className="flex items-center gap-2">

                    <span
                      className={`
                        h-2 w-2 rounded-full
                        ${
                          device.status
                            ? "bg-[#34c759]"
                            : "bg-[#c7c7cc]"
                        }
                      `}
                    />

                    <span className="text-[11px] text-[#6e6e73]">
                      {device.status ? "On" : "Off"}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>


        {/* ACTIVITY */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <div className="mb-6">

            <h2 className="text-lg font-semibold">
              Live activity
            </h2>

            <p className="mt-1 text-xs text-[#86868b]">
              Recent events from your home.
            </p>

          </div>


          <div className="space-y-5">

            {[
              "System connected",
              "Sensor network online",
              "Automation engine ready",
            ].map((event, index) => (

              <div
                key={event}
                className="flex gap-3"
              >

                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#34c759]" />

                <div>

                  <div className="text-xs font-medium">
                    {event}
                  </div>

                  <div className="mt-1 text-[10px] text-[#86868b]">
                    {index === 0
                      ? "Just now"
                      : `${index * 2} min ago`
                    }
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}