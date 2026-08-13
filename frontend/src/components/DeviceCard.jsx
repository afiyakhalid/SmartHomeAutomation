import api from "../api/client";

export default function DeviceCard({ device }) {

  const toggle = async () => {
    await api.put(`/devices/${device.id}/toggle`);
    window.location.reload(); // simple college demo style
  };

  return (
    <div className={`card ${device.status ? "on" : "off"}`}>

      <h3>{device.name}</h3>

      <p>Type: {device.type}</p>

      <p>Status: {device.status ? "ON" : "OFF"}</p>

      <button onClick={toggle}>
        Toggle
      </button>

    </div>
  );
}