import { useState } from "react";
import { evaluateAutomation } from "../api/automation";

export default function AutomationPanel() {

  const [motion, setMotion] = useState(false);
  const [lightLevel, setLightLevel] = useState(500);
  const [temperature, setTemperature] = useState(25);
  const [occupied, setOccupied] = useState(false);
  const [gasLevel, setGasLevel] = useState(100);
  const [doorOpen, setDoorOpen] = useState(false);

  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  const runAutomation = async () => {

    setLoading(true);

    try {

      const result = await evaluateAutomation({

        room_id: 1,

        motion,

        light_level: Number(lightLevel),

        temperature: Number(temperature),

        humidity: 50,

        gas_level: Number(gasLevel),

        door_open: doorOpen,

        occupied

      });

      setActions(result.actions);

    } catch (error) {

      console.error(error);

      alert("Automation request failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="automation-panel">

      <h2>Automation Simulator</h2>

      <p>
        Simulate sensor conditions and test the automation engine.
      </p>

      <div className="automation-controls">

        <label>
          Motion

          <select
            value={motion}
            onChange={(e) =>
              setMotion(e.target.value === "true")
            }
          >
            <option value="false">No Motion</option>
            <option value="true">Motion Detected</option>
          </select>

        </label>


        <label>
          Light Level

          <input
            type="number"
            value={lightLevel}
            onChange={(e) =>
              setLightLevel(e.target.value)
            }
          />

        </label>


        <label>
          Temperature °C

          <input
            type="number"
            value={temperature}
            onChange={(e) =>
              setTemperature(e.target.value)
            }
          />

        </label>


        <label>
          Occupancy

          <select
            value={occupied}
            onChange={(e) =>
              setOccupied(e.target.value === "true")
            }
          >
            <option value="false">Unoccupied</option>
            <option value="true">Occupied</option>
          </select>

        </label>


        <label>
          Gas Level

          <input
            type="number"
            value={gasLevel}
            onChange={(e) =>
              setGasLevel(e.target.value)
            }
          />

        </label>


        <label>
          Door

          <select
            value={doorOpen}
            onChange={(e) =>
              setDoorOpen(e.target.value === "true")
            }
          >
            <option value="false">Closed</option>
            <option value="true">Open</option>
          </select>

        </label>

      </div>


      <button
        onClick={runAutomation}
        disabled={loading}
      >

        {loading
          ? "Evaluating..."
          : "Run Automation"
        }

      </button>


      {actions.length > 0 && (

        <div className="automation-results">

          <h3>Automation Decisions</h3>

          {actions.map((action, index) => (

            <div
              key={index}
              className="automation-action"
            >

              <strong>
                {action.action}
              </strong>

              <p>
                {action.reason}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}