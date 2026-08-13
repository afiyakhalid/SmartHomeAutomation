import { useEffect, useState } from "react";
import api from "../api/client";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data));
  }, []);

  return (
    <div>
      <h1>Rooms</h1>

      {rooms.map((r, i) => (
        <div key={i}>
          {r.name}
        </div>
      ))}
    </div>
  );
}