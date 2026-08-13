import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <h2>SmartHome</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/devices">Devices</Link>
      <Link to="/rooms">Rooms</Link>
      <Link to="/analytics">Analytics</Link>

    </div>
  );
}