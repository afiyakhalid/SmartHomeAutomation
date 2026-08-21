import { Trash2, Power, Pencil } from "lucide-react";
import api from "../api/client";

export default function DeviceCard({
  device,
  onRefresh,
  onEdit,
}) {

  const toggle = async () => {
    try {
      await api.put(`/devices/${device.id}/toggle`);
      onRefresh();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
        "Unable to toggle device"
      );
    }
  };


  const remove = async () => {

    const confirmed = window.confirm(
      `Delete "${device.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {

      await api.delete(
        `/devices/${device.id}`
      );

      onRefresh();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Unable to delete device"
      );
    }
  };


  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-medium text-[#1d1d1f]">
            {device.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {device.type}
          </p>

        </div>

        <div
          className={`h-3 w-3 rounded-full ${
            device.status
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        />

      </div>


      <div className="mt-6">

        <p className="text-sm text-gray-500">
          Status
        </p>

        <p className="mt-1 text-xl font-medium">
          {device.status ? "ON" : "OFF"}
        </p>

      </div>


      <div className="mt-6 flex gap-2">

        <button
          onClick={toggle}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm text-white transition hover:bg-gray-800"
        >
          <Power size={16} />

          {device.status
            ? "Turn Off"
            : "Turn On"}
        </button>


        <button
          onClick={() => onEdit(device)}
          className="rounded-xl border border-black/10 px-4 py-3 hover:bg-gray-50"
        >
          <Pencil size={16} />
        </button>


        <button
          onClick={remove}
          className="rounded-xl border border-red-200 px-4 py-3 text-red-500 hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}