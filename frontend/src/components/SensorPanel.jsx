import { useEffect, useState } from "react";
import api from "../api/client";

export default function SensorPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/sensors/data");
      setData(res.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {data.slice(-5).map((d, i) => (
        <div key={i}>
          {d.type} → {d.value}
        </div>
      ))}

    </div>
  );
}