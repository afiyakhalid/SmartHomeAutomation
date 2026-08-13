import { useEffect, useState } from "react";
import api from "../api/client";
import DeviceCard from "../components/DeviceCard";
import SensorPanel from "../components/SensorPanel";

export default function Dashboard() {
  const [devices, setDevices] = useState([]);

  const loadDevices = async () => {
    const res = await api.get("/devices");
    setDevices(res.data);
  };

  useEffect(() => {
    loadDevices();

    const interval = setInterval(loadDevices, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">

      <h1>Smart Home Dashboard</h1>

      <div className="grid">

        <div>
          <h2>Devices</h2>

          {devices.map((d) => (
            <DeviceCard key={d.id} device={d} />
          ))}

        </div>

        <div>
          <h2>Live Sensors</h2>
          <SensorPanel />
        </div>

      </div>

    </div>
  );
}