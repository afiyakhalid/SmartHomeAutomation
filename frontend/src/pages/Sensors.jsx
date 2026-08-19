import { Activity, Radio } from "lucide-react";
import SensorPanel from "../components/SensorPanel";

export default function Sensors() {
  return (
    <div className="space-y-8">

      <section>

        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#0071e3]">

          <Radio size={14} />

          Environment

        </div>

        <h1 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
          Live Sensors
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#86868b]">
          Monitor environmental data and activity from your
          connected smart-home sensors.
        </p>

      </section>


      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="text-xs text-[#86868b]">
            TEMPERATURE
          </div>

          <div className="mt-3 text-3xl font-semibold">
            26.4°
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-[#34c759]">
            <span className="h-2 w-2 rounded-full bg-[#34c759]" />
            Normal
          </div>

        </div>


        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="text-xs text-[#86868b]">
            HUMIDITY
          </div>

          <div className="mt-3 text-3xl font-semibold">
            57%
          </div>

          <div className="mt-2 text-xs text-[#86868b]">
            Living Room
          </div>

        </div>


        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="text-xs text-[#86868b]">
            MOTION
          </div>

          <div className="mt-3 text-3xl font-semibold">
            Active
          </div>

          <div className="mt-2 text-xs text-[#86868b]">
            PIR sensor
          </div>

        </div>


        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-5">

          <div className="text-xs text-[#86868b]">
            NETWORK
          </div>

          <div className="mt-3 text-3xl font-semibold">
            Online
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-[#34c759]">
            <span className="h-2 w-2 rounded-full bg-[#34c759]" />
            ESP32 ready
          </div>

        </div>

      </section>


      <section className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
            <Activity size={18} />
          </div>

          <div>

            <h2 className="font-semibold">
              Sensor stream
            </h2>

            <p className="mt-1 text-xs text-[#86868b]">
              Latest readings received by the backend.
            </p>

          </div>

        </div>

        <SensorPanel />

      </section>

    </div>
  );
}