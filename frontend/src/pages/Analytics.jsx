import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Gauge,
  Thermometer,
  Droplets,
  Wind,
  Radio,
} from "lucide-react";

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/sensors/data");
        setData(res.data);
      } catch (error) {
        console.error("Analytics fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const motionEvents = useMemo(
    () => data.filter((d) => d.type === "motion" && Number(d.value) === 1),
    [data]
  );

  const smokeAlerts = useMemo(
    () => data.filter((d) => d.type === "smoke" && Number(d.value) >= 1000),
    [data]
  );

  const temperatureReadings = useMemo(
    () => data.filter((d) => d.type === "temperature"),
    [data]
  );

  const humidityReadings = useMemo(
    () => data.filter((d) => d.type === "humidity"),
    [data]
  );

  const smokeReadings = useMemo(
    () => data.filter((d) => d.type === "smoke"),
    [data]
  );

  const latestTemperature = temperatureReadings[0];
  const latestHumidity = humidityReadings[0];
  const latestSmoke = smokeReadings[0];

  const getAverage = (readings) => {
    if (!readings.length) return null;

    const total = readings.reduce(
      (sum, reading) => sum + Number(reading.value),
      0
    );

    return total / readings.length;
  };

  const averageTemperature = getAverage(temperatureReadings);
  const averageHumidity = getAverage(humidityReadings);

  const formatTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <section>
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#0071e3]">
          <BarChart3 size={14} />
          Insights
        </div>

        <h1 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
          Analytics
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#86868b]">
          Review sensor activity, environmental conditions, and recent events
          from your smart-home system.
        </p>
      </section>


      {/* SUMMARY CARDS */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total events */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#86868b]">
                TOTAL SENSOR EVENTS
              </div>

              <div className="mt-3 text-3xl font-semibold">
                {loading ? "—" : data.length}
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs text-[#34c759]">
                <span className="h-2 w-2 rounded-full bg-[#34c759]" />
                Live data
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Activity size={18} />
            </div>
          </div>
        </div>


        {/* Motion */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#86868b]">
                MOTION EVENTS
              </div>

              <div className="mt-3 text-3xl font-semibold">
                {loading ? "—" : motionEvents.length}
              </div>

              <div className="mt-2 text-xs text-[#86868b]">
                PIR activity detected
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Radio size={18} />
            </div>
          </div>
        </div>


        {/* Smoke */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#86868b]">
                SMOKE ALERTS
              </div>

              <div className="mt-3 text-3xl font-semibold">
                {loading ? "—" : smokeAlerts.length}
              </div>

              <div
                className={`mt-2 flex items-center gap-2 text-xs ${
                  smokeAlerts.length > 0
                    ? "text-red-500"
                    : "text-[#34c759]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    smokeAlerts.length > 0
                      ? "bg-red-500"
                      : "bg-[#34c759]"
                  }`}
                />

                {smokeAlerts.length > 0
                  ? "Alert detected"
                  : "No smoke alerts"}
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <AlertTriangle size={18} />
            </div>
          </div>
        </div>


        {/* Latest smoke */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-[#86868b]">
                CURRENT GAS LEVEL
              </div>

              <div className="mt-3 text-3xl font-semibold">
                {latestSmoke
                  ? Number(latestSmoke.value).toFixed(0)
                  : "—"}
              </div>

              <div className="mt-2 text-xs text-[#86868b]">
                MQ-2 sensor reading
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Wind size={18} />
            </div>
          </div>
        </div>

      </section>


      {/* ENVIRONMENT OVERVIEW */}

      <section className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
            <Gauge size={18} />
          </div>

          <div>
            <h2 className="font-semibold">
              Environment overview
            </h2>

            <p className="mt-1 text-xs text-[#86868b]">
              Current and average environmental readings.
            </p>
          </div>

        </div>


        <div className="grid gap-4 md:grid-cols-3">

          {/* Temperature */}

          <div className="rounded-2xl bg-[#f5f5f7] p-5">

            <div className="flex items-center gap-2 text-xs text-[#86868b]">
              <Thermometer size={15} />
              TEMPERATURE
            </div>

            <div className="mt-4 text-2xl font-semibold">
              {latestTemperature
                ? `${Number(latestTemperature.value).toFixed(1)}°C`
                : "—"}
            </div>

            <div className="mt-2 text-xs text-[#86868b]">
              Average:{" "}
              {averageTemperature !== null
                ? `${averageTemperature.toFixed(1)}°C`
                : "—"}
            </div>

          </div>


          {/* Humidity */}

          <div className="rounded-2xl bg-[#f5f5f7] p-5">

            <div className="flex items-center gap-2 text-xs text-[#86868b]">
              <Droplets size={15} />
              HUMIDITY
            </div>

            <div className="mt-4 text-2xl font-semibold">
              {latestHumidity
                ? `${Number(latestHumidity.value).toFixed(1)}%`
                : "—"}
            </div>

            <div className="mt-2 text-xs text-[#86868b]">
              Average:{" "}
              {averageHumidity !== null
                ? `${averageHumidity.toFixed(1)}%`
                : "—"}
            </div>

          </div>


          {/* Gas */}

          <div className="rounded-2xl bg-[#f5f5f7] p-5">

            <div className="flex items-center gap-2 text-xs text-[#86868b]">
              <Wind size={15} />
              GAS / SMOKE
            </div>

            <div className="mt-4 text-2xl font-semibold">
              {latestSmoke
                ? Number(latestSmoke.value).toFixed(0)
                : "—"}
            </div>

            <div className="mt-2 text-xs text-[#86868b]">
              Latest MQ-2 reading
            </div>

          </div>

        </div>

      </section>


      {/* RECENT SENSOR ACTIVITY */}

      <section className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
            <Activity size={18} />
          </div>

          <div>
            <h2 className="font-semibold">
              Recent activity
            </h2>

            <p className="mt-1 text-xs text-[#86868b]">
              Latest readings received from the sensor system.
            </p>
          </div>

        </div>


        {loading ? (

          <div className="text-sm text-[#86868b]">
            Loading analytics...
          </div>

        ) : data.length === 0 ? (

          <div className="rounded-2xl bg-[#f5f5f7] p-5 text-sm text-[#86868b]">
            No sensor activity has been recorded yet.
          </div>

        ) : (

          <div className="space-y-3">

            {data.slice(0, 8).map((sensor) => (

              <div
                key={sensor.id}
                className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] px-5 py-4"
              >

                <div>

                  <div className="font-semibold capitalize">
                    {sensor.type}
                  </div>

                  <div className="mt-1 text-xs text-[#86868b]">
                    Device {sensor.device_id ?? "—"}
                    {" · "}
                    Room {sensor.room_id ?? "—"}
                  </div>

                </div>


                <div className="text-right">

                  <div className="font-semibold">
                    {sensor.type === "motion"
                      ? Number(sensor.value) === 1
                        ? "Motion"
                        : "No Motion"
                      : sensor.type === "temperature"
                        ? `${Number(sensor.value).toFixed(1)} °C`
                        : sensor.type === "humidity"
                          ? `${Number(sensor.value).toFixed(1)} %`
                          : Number(sensor.value).toFixed(0)}
                  </div>

                  <div className="mt-1 text-xs text-[#86868b]">
                    {formatTime(sensor.received_at)}
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}