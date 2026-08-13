import { useEffect, useState } from "react";
import api from "../api/client";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/sensors/data");
      setData(res.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const motionCount = data.filter(d => d.type === "motion").length;
  const smokeAlerts = data.filter(d => d.type === "smoke" && d.value === 1).length;

  return (
    <div className="page">

      <h1>Analytics</h1>

      <div className="grid">

        <div className="card">
          <h3>Total Sensor Events</h3>
          <p>{data.length}</p>
        </div>

        <div className="card">
          <h3>Motion Events</h3>
          <p>{motionCount}</p>
        </div>

        <div className="card">
          <h3>Smoke Alerts</h3>
          <p>{smokeAlerts}</p>
        </div>

      </div>

    </div>
  );
}