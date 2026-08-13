export default function SimulationPanel() {

  const startSim = () => {
    alert("Simulation Started");
  };

  const stopSim = () => {
    alert("Simulation Stopped");
  };

  return (
    <div className="sim-panel">

      <button onClick={startSim}>
        ▶ Start Simulation
      </button>

      <button onClick={stopSim}>
        ⏸ Stop Simulation
      </button>

    </div>
  );
}