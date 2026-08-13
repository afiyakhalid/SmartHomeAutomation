import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home">

      <div className="hero">

        <h1>Smart Home Automation</h1>

        <p>
          Simulate IoT devices, sensors, and automation in real time.
        </p>

        <div className="buttons">
          <button onClick={() => nav("/login")}>
            Login
          </button>

          <button onClick={() => nav("/dashboard")}>
            Demo Dashboard
          </button>
        </div>

      </div>

      <div className="animation">
        <div className="pulse-circle"></div>
      </div>

    </div>
  );
}