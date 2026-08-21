import { useEffect, useState } from "react";
import { Activity, Radio } from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

export default function Sensors() {

  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSensors = async () => {
    try {

      const response = await fetch(`${API_URL}/sensors/data`);

      if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
      }

      const data = await response.json();

      setSensors(data);

    } catch (error) {

      console.error("Sensor fetch error:", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchSensors();

    // Refresh every 2 seconds
    const interval = setInterval(fetchSensors, 2000);

    return () => clearInterval(interval);

  }, []);


  /*
   * Get latest reading for a particular sensor type
   */
  const getLatest = (type) => {

    const readings = sensors.filter(
      (sensor) => sensor.type?.toLowerCase() === type
    );

    if (readings.length === 0) {
      return null;
    }

    return readings[0];
  };


  const temperature = getLatest("temperature");
  const humidity = getLatest("humidity");
  const motion = getLatest("motion");


  /*
   * Determine whether we have received
   * sensor data recently.
   */
  const latestSensor = sensors.length > 0
    ? sensors[0]
    : null;


  let isOnline = false;

  if (latestSensor) {

    const lastReceived = new Date(
      latestSensor.received_at
    );

    const now = new Date();

    const difference =
      (now - lastReceived) / 1000;

    isOnline = difference < 30;
  }


  return (
    <div className="space-y-8">

      {/* Header */}

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


      {/* Sensor cards */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


        {/* Temperature */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <div className="text-xs text-[#86868b]">
            TEMPERATURE
          </div>

          <div className="mt-3 text-3xl font-semibold">

            {temperature
              ? `${temperature.value}°`
              : "—"}

          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-[#34c759]">

            <span className="h-2 w-2 rounded-full bg-[#34c759]" />

            {temperature ? "Live" : "No reading"}

          </div>

        </div>


        {/* Humidity */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <div className="text-xs text-[#86868b]">
            HUMIDITY
          </div>

          <div className="mt-3 text-3xl font-semibold">

            {humidity
              ? `${humidity.value}%`
              : "—"}

          </div>

          <div className="mt-2 text-xs text-[#86868b]">

            {humidity
              ? `Room ${humidity.room_id}`
              : "No reading"}

          </div>

        </div>


        {/* Motion */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <div className="text-xs text-[#86868b]">
            MOTION
          </div>

          <div className="mt-3 text-3xl font-semibold">

            {motion
              ? (
                String(motion.value).toLowerCase() === "true" ||
                String(motion.value) === "1"
                  ? "Active"
                  : "No Motion"
              )
              : "—"}

          </div>

          <div className="mt-2 text-xs text-[#86868b]">
            PIR sensor
          </div>

        </div>


        {/* Network */}

        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <div className="text-xs text-[#86868b]">
            NETWORK
          </div>

          <div className="mt-3 text-3xl font-semibold">

            {isOnline
              ? "Online"
              : "Offline"}

          </div>

          <div
            className={`mt-2 flex items-center gap-2 text-xs ${
              isOnline
                ? "text-[#34c759]"
                : "text-red-500"
            }`}
          >

            <span
              className={`h-2 w-2 rounded-full ${
                isOnline
                  ? "bg-[#34c759]"
                  : "bg-red-500"
              }`}
            />

            {isOnline
              ? "Sensor data received"
              : "No recent data"}

          </div>

        </div>

      </section>


      {/* Sensor stream */}

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


        {loading ? (

          <div className="text-sm text-[#86868b]">
            Loading sensor data...
          </div>

        ) : sensors.length === 0 ? (

          <div className="rounded-2xl bg-[#f5f5f7] p-5 text-sm text-[#86868b]">
            No sensor data has been received yet.
          </div>

        ) : (

          <div className="space-y-3">

            {sensors.slice(0, 10).map((sensor) => (

              <div
                key={sensor.id}
                className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] px-5 py-4"
              >

                <div>

                  <div className="font-semibold">
                    {sensor.type}
                  </div>

                  <div className="mt-1 text-xs text-[#86868b]">
                    Device {sensor.device_id}
                    {" · "}
                    Room {sensor.room_id}
                  </div>

                </div>


                <div className="text-right">

                  <div className="font-semibold">
                    {sensor.value}
                  </div>

                  <div className="mt-1 text-xs text-[#86868b]">

                    {new Date(
                      sensor.received_at
                    ).toLocaleTimeString()}

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