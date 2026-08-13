import { useEffect, useState } from "react";
import api from "../api/client";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get("/rooms").then((res) => setRooms(res.data));
  }, []);

  return (
    <div className="page">

      <h1>Rooms</h1>

      <div className="grid">

        {rooms.map((room, index) => (
          <div key={index} className="card">
            <h3>{room.name}</h3>
            <p>ID: {room.id}</p>
          </div>
        ))}

      </div>

    </div>
  );
}