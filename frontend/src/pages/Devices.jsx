import { useEffect, useState } from "react";
import api from "../api/client";
import DeviceCard from "../components/DeviceCard";

export default function Devices() {
  const [devices, setDevices] = useState([]);

  const loadDevices = async () => {
    const res = await api.get("/devices");
    setDevices(res.data);
  };

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <div className="page">

      <h1>Devices</h1>

      <div className="grid">
        {devices.map((d) => (
          <DeviceCard key={d.id} device={d} />
        ))}
      </div>

    </div>
  );
}