import { useEffect, useState } from "react";
import api from "../api/client";
import DeviceCard from "../components/DeviceCard";


export default function Devices() {

  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("Light");
  const [roomId, setRoomId] = useState("");


  const loadDevices = async () => {

    try {

      const response = await api.get("/devices");

      setDevices(response.data);

    } catch (error) {

      console.error(error);

    }

  };


  const loadRooms = async () => {

    try {

      const response = await api.get("/rooms");

      setRooms(response.data);

    } catch (error) {

      console.error(error);

    }

  };


  useEffect(() => {

    loadDevices();
    loadRooms();

  }, []);


  const openAddForm = () => {

    setEditingDevice(null);

    setName("");
    setType("Light");
    setRoomId("");

    setShowForm(true);
  };


  const openEditForm = (device) => {

    setEditingDevice(device);

    setName(device.name);
    setType(device.type);
    setRoomId(String(device.room_id));

    setShowForm(true);
  };


  const saveDevice = async (e) => {

    e.preventDefault();


    if (!roomId) {

      alert("Please select a room");

      return;
    }


    const payload = {

      name,
      type,
      room_id: Number(roomId),
      status: editingDevice
        ? editingDevice.status
        : false,

    };


    try {

      if (editingDevice) {

        await api.put(
          `/devices/${editingDevice.id}`,
          payload
        );

      } else {

        await api.post(
          "/devices/",
          payload
        );

      }


      setShowForm(false);

      setEditingDevice(null);

      await loadDevices();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Unable to save device"
      );
    }

  };


  return (

    <div className="min-h-full">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
            Control Center
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Devices
          </h1>

          <p className="mt-2 text-gray-500">
            Manage connected devices in your smart home.
          </p>

        </div>


        <button
          onClick={openAddForm}
          className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Add Device
        </button>

      </div>


      {/* DEVICE COUNT */}

      <div className="mt-8">

        <p className="text-sm text-gray-500">

          {devices.length}{" "}
          {devices.length === 1
            ? "device"
            : "devices"}{" "}
          connected

        </p>

      </div>


      {/* DEVICES */}

      {devices.length === 0 ? (

        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">

          <h2 className="text-xl font-medium">
            No devices yet
          </h2>

          <p className="mt-2 text-gray-500">
            Add your first smart device.
          </p>

          <button
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-black px-5 py-3 text-sm text-white"
          >
            Add Device
          </button>

        </div>

      ) : (

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {devices.map((device) => (

            <DeviceCard
              key={device.id}
              device={device}
              onRefresh={loadDevices}
              onEdit={openEditForm}
            />

          ))}

        </div>

      )}


      {/* ADD / EDIT MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

            <h2 className="text-2xl font-semibold">

              {editingDevice
                ? "Edit Device"
                : "Add Device"}

            </h2>


            <p className="mt-2 text-sm text-gray-500">
              Configure the device for your smart home.
            </p>


            <form
              onSubmit={saveDevice}
              className="mt-6 space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="text-sm font-medium">
                  Device name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Living Room Light"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              {/* TYPE */}

              <div>

                <label className="text-sm font-medium">
                  Device type
                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                >

                  <option value="Light">
                    Light
                  </option>

                  <option value="Fan">
                    Fan
                  </option>

                  <option value="Door">
                    Door
                  </option>

                  <option value="AC">
                    AC
                  </option>

                  <option value="Alarm">
                    Alarm
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* ROOM */}

              <div>

                <label className="text-sm font-medium">
                  Room
                </label>

                <select
                  value={roomId}
                  onChange={(e) =>
                    setRoomId(e.target.value)
                  }
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                >

                  <option value="">
                    Select a room
                  </option>

                  {rooms.map((room) => (

                    <option
                      key={room.id}
                      value={room.id}
                    >
                      {room.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-black px-4 py-3 text-sm text-white"
                >
                  {editingDevice
                    ? "Save Changes"
                    : "Add Device"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}