import { useEffect, useState } from "react";
import { Home, Plus, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [homeId, setHomeId] = useState(1);

  // Fetch rooms from database
  const fetchRooms = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/rooms/`);

      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data = await response.json();

      setRooms(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Add room
  const addRoom = async (e) => {
    e.preventDefault();

    if (!roomName.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/rooms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          home_id: Number(homeId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      setRoomName("");
      setHomeId(1);
      setShowForm(false);

      await fetchRooms();
    } catch (err) {
      console.error(err);
      setError("Unable to create room.");
    }
  };

  // Delete room
  const deleteRoom = async (roomId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/rooms/${roomId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      await fetchRooms();
    } catch (err) {
      console.error(err);
      setError("Unable to delete room.");
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <section className="flex items-start justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#0071e3]">
            <Home size={14} />
            Home
          </div>

          <h1 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
            Rooms
          </h1>

          <p className="mt-2 text-sm text-[#86868b]">
            Manage the rooms in your smart home.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          <Plus size={16} />
          Add Room
        </button>

      </section>

      {/* Add Room */}
      {showForm && (
        <section className="rounded-3xl border border-[#e5e5e7] bg-white p-6">

          <h2 className="text-lg font-semibold">
            Add a new room
          </h2>

          <form
            onSubmit={addRoom}
            className="mt-5 flex flex-col gap-4 sm:flex-row"
          >

            <input
              type="text"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex-1 rounded-2xl border border-[#d2d2d7] bg-[#f5f5f7] px-4 py-3 outline-none focus:border-[#0071e3]"
            />

            <input
              type="number"
              min="1"
              value={homeId}
              onChange={(e) => setHomeId(e.target.value)}
              className="w-32 rounded-2xl border border-[#d2d2d7] bg-[#f5f5f7] px-4 py-3 outline-none focus:border-[#0071e3]"
            />

            <button
              type="submit"
              className="rounded-2xl bg-[#0071e3] px-6 py-3 font-medium text-white hover:bg-[#0077ed]"
            >
              Create
            </button>

          </form>

        </section>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-3xl border border-[#e5e5e7] bg-white p-8 text-[#86868b]">
          Loading rooms...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Rooms */}
      {!loading && !error && (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {rooms.map((room) => (
            <div
              key={room.id}
              className="group rounded-3xl border border-[#e5e5e7] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f5f7]">
                  <Home size={22} />
                </div>

                <button
                  onClick={() => deleteRoom(room.id)}
                  className="rounded-xl p-2 text-[#86868b] transition hover:bg-red-50 hover:text-red-500"
                  title="Delete room"
                >
                  <Trash2 size={17} />
                </button>

              </div>

              <h2 className="mt-6 text-xl font-semibold">
                {room.name}
              </h2>

              <div className="mt-2 text-sm text-[#86868b]">
                Room ID: {room.id}
              </div>

              <div className="mt-1 text-sm text-[#86868b]">
                Home ID: {room.home_id}
              </div>

            </div>
          ))}

          {rooms.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-[#d2d2d7] p-12 text-center text-[#86868b]">
              No rooms found.
            </div>
          )}

        </section>
      )}

    </div>
  );
}