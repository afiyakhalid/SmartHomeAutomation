export default function SensorCard({ sensor }) {
  return (
    <div className="card">

      <h3>{sensor.type}</h3>

      <p>Value: {sensor.value}</p>

      <p>
        Time:{" "}
        {sensor.received_at
          ? new Date(sensor.received_at).toLocaleTimeString()
          : "live"}
      </p>

    </div>
  );
}