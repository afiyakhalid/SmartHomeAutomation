import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  DoorOpen,
  Flame,
  Lightbulb,
  Loader2,
  Play,
  ShieldCheck,
  Sparkles,
  Thermometer,
  UserRound,
  Zap,
} from "lucide-react";

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
  const [hasRun, setHasRun] = useState(false);

  const runAutomation = async () => {
    setLoading(true);
    setHasRun(false);
    setActions([]);

    try {
      const result = await evaluateAutomation({
        room_id: 1,
        motion,
        light_level: Number(lightLevel),
        temperature: Number(temperature),
        humidity: 50,
        gas_level: Number(gasLevel),
        door_open: doorOpen,
        occupied,
      });

      setActions(result.actions || []);
      setHasRun(true);
    } catch (error) {
      console.error(error);
      alert("Automation request failed");
    } finally {
      setLoading(false);
    }
  };

  const setScenario = (scenario) => {
    switch (scenario) {
      case "night":
        setMotion(true);
        setLightLevel(50);
        setTemperature(22);
        setOccupied(true);
        setGasLevel(100);
        setDoorOpen(false);
        break;

      case "hot":
        setMotion(false);
        setLightLevel(500);
        setTemperature(32);
        setOccupied(true);
        setGasLevel(100);
        setDoorOpen(false);
        break;

      case "security":
        setMotion(true);
        setLightLevel(300);
        setTemperature(25);
        setOccupied(false);
        setGasLevel(100);
        setDoorOpen(true);
        break;

      case "gas":
        setMotion(false);
        setLightLevel(500);
        setTemperature(25);
        setOccupied(true);
        setGasLevel(700);
        setDoorOpen(false);
        break;

      default:
        break;
    }

    setActions([]);
    setHasRun(false);
  };

  return (
    <div className="space-y-6">

      {/* QUICK SCENARIOS */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#86868b]">
              Quick scenarios
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.5px] text-[#1d1d1f]">
              Test common situations
            </h2>
          </div>

          <div className="hidden items-center gap-2 text-xs text-[#86868b] sm:flex">
            <Zap size={14} />
            Automation simulator
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          <ScenarioCard
            icon={<Lightbulb size={19} />}
            title="Night mode"
            description="Motion + low light"
            onClick={() => setScenario("night")}
          />

          <ScenarioCard
            icon={<Thermometer size={19} />}
            title="High temperature"
            description="Simulate a hot room"
            onClick={() => setScenario("hot")}
          />

          <ScenarioCard
            icon={<ShieldCheck size={19} />}
            title="Security event"
            description="Motion while away"
            onClick={() => setScenario("security")}
          />

          <ScenarioCard
            icon={<Flame size={19} />}
            title="Gas warning"
            description="High gas reading"
            onClick={() => setScenario("gas")}
          />

        </div>
      </section>


      {/* SENSOR CONDITIONS */}
      <section className="overflow-hidden rounded-[28px] border border-[#e5e5e7] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

        <div className="border-b border-[#e5e5e7] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <Activity size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-[#1d1d1f]">
                Sensor conditions
              </h2>

              <p className="mt-0.5 text-xs text-[#86868b]">
                Configure the environment that the automation engine should evaluate.
              </p>
            </div>

          </div>
        </div>


        <div className="grid gap-px bg-[#e5e5e7] sm:grid-cols-2 lg:grid-cols-3">

          <Control
            icon={<Activity size={17} />}
            label="Motion"
            description="Movement detected"
          >
            <Select
              value={motion}
              onChange={(e) => setMotion(e.target.value === "true")}
            >
              <option value="false">No Motion</option>
              <option value="true">Motion Detected</option>
            </Select>
          </Control>


          <Control
            icon={<Lightbulb size={17} />}
            label="Light level"
            description="Ambient light intensity"
          >
            <NumberInput
              value={lightLevel}
              onChange={(e) => setLightLevel(e.target.value)}
              suffix="lux"
            />
          </Control>


          <Control
            icon={<Thermometer size={17} />}
            label="Temperature"
            description="Room temperature"
          >
            <NumberInput
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              suffix="°C"
            />
          </Control>


          <Control
            icon={<UserRound size={17} />}
            label="Occupancy"
            description="Someone is home"
          >
            <Select
              value={occupied}
              onChange={(e) => setOccupied(e.target.value === "true")}
            >
              <option value="false">Unoccupied</option>
              <option value="true">Occupied</option>
            </Select>
          </Control>


          <Control
            icon={<Flame size={17} />}
            label="Gas level"
            description="Detected gas concentration"
          >
            <NumberInput
              value={gasLevel}
              onChange={(e) => setGasLevel(e.target.value)}
              suffix="ppm"
            />
          </Control>


          <Control
            icon={<DoorOpen size={17} />}
            label="Door"
            description="Current door state"
          >
            <Select
              value={doorOpen}
              onChange={(e) => setDoorOpen(e.target.value === "true")}
            >
              <option value="false">Closed</option>
              <option value="true">Open</option>
            </Select>
          </Control>

        </div>
      </section>


      {/* CURRENT SIMULATION */}
      <section className="rounded-[28px] border border-[#e5e5e7] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7">

        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#86868b]">
            Current simulation
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-[-0.4px]">
            Conditions sent to the engine
          </h2>
        </div>


        <div className="flex flex-wrap gap-2.5">

          <StatusPill
            label="Motion"
            value={motion ? "Detected" : "No Motion"}
            active={motion}
          />

          <StatusPill
            label="Light"
            value={`${lightLevel} lux`}
          />

          <StatusPill
            label="Temperature"
            value={`${temperature}°C`}
          />

          <StatusPill
            label="Occupancy"
            value={occupied ? "Occupied" : "Unoccupied"}
            active={occupied}
          />

          <StatusPill
            label="Gas"
            value={`${gasLevel} ppm`}
          />

          <StatusPill
            label="Door"
            value={doorOpen ? "Open" : "Closed"}
            active={doorOpen}
          />

        </div>
      </section>


      {/* RUN AUTOMATION */}
      <section className="overflow-hidden rounded-[28px] bg-[#1d1d1f] text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">

        <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles size={20} />
            </div>

            <div>
              <h2 className="font-semibold">
                Evaluate automation
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-white/55">
                Run the configured conditions through your automation engine
                and see which rules and actions are triggered.
              </p>
            </div>

          </div>


          <button
            onClick={runAutomation}
            disabled={loading}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#1d1d1f] transition hover:bg-[#f5f5f7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                <Play size={17} fill="currentColor" />
                Run automation
              </>
            )}
          </button>

        </div>
      </section>


      {/* RESULTS */}
      {hasRun && (
        <section
          className={`overflow-hidden rounded-[28px] border shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${
            actions.length > 0
              ? "border-[#b7ebc6] bg-[#f2fff5]"
              : "border-[#e5e5e7] bg-white"
          }`}
        >

          {/* RESULT HEADER */}
          <div className="flex items-start justify-between gap-4 border-b border-black/5 p-6 sm:p-7">

            <div className="flex items-start gap-4">

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  actions.length > 0
                    ? "bg-[#dff8e5] text-[#1f9d48]"
                    : "bg-[#f5f5f7] text-[#86868b]"
                }`}
              >
                {actions.length > 0 ? (
                  <CheckCircle2 size={21} />
                ) : (
                  <CircleAlert size={21} />
                )}
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#86868b]">
                  Evaluation result
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-[-0.4px]">
                  {actions.length > 0
                    ? `${actions.length} action${actions.length === 1 ? "" : "s"} triggered`
                    : "No actions triggered"}
                </h2>

                <p className="mt-1 text-sm text-[#86868b]">
                  {actions.length > 0
                    ? "The automation engine responded to the current conditions."
                    : "The current conditions did not trigger any configured automation."}
                </p>
              </div>

            </div>

          </div>


          {/* RESULT CONTENT */}
          {actions.length > 0 ? (
            <div className="divide-y divide-black/5">

              {actions.map((action, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 transition hover:bg-white/50"
                >

                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0071e3] shadow-sm">
                    <Zap size={17} />
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-semibold text-[#1d1d1f]">
                        {formatAction(action.action)}
                      </h3>

                      <span className="rounded-full bg-[#dff8e5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1f9d48]">
                        Triggered
                      </span>

                    </div>

                    {action.reason && (
                      <p className="mt-1.5 text-sm leading-6 text-[#6e6e73]">
                        {action.reason}
                      </p>
                    )}

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="p-7">
              <div className="rounded-2xl bg-[#f5f5f7] p-5">
                <p className="text-sm font-medium text-[#1d1d1f]">
                  System conditions are safe.
                </p>

                <p className="mt-1 text-sm leading-6 text-[#86868b]">
                  No automation rule matched the simulated sensor values.
                </p>
              </div>
            </div>
          )}

        </section>
      )}

    </div>
  );
}


/* -------------------------------------------------- */
/* COMPONENTS */
/* -------------------------------------------------- */

function ScenarioCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group rounded-[22px] border border-[#e5e5e7] bg-white p-4 text-left shadow-[0_4px_18px_rgba(0,0,0,0.025)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d2d2d7] hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)]"
    >
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-[#1d1d1f] group-hover:text-white">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#1d1d1f]">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-[#86868b]">
            {description}
          </p>
        </div>

      </div>
    </button>
  );
}


function Control({
  icon,
  label,
  description,
  children,
}) {
  return (
    <div className="bg-white p-5 sm:p-6">

      <div className="mb-3 flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#1d1d1f]">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#1d1d1f]">
            {label}
          </p>

          <p className="mt-0.5 text-xs text-[#86868b]">
            {description}
          </p>
        </div>

      </div>

      {children}

    </div>
  );
}


function Select({
  value,
  onChange,
  children,
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-xl border border-[#d2d2d7] bg-white px-3 pr-9 text-sm text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10"
      >
        {children}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b]"
      />

    </div>
  );
}


function NumberInput({
  value,
  onChange,
  suffix,
}) {
  return (
    <div className="relative">

      <input
        type="number"
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-[#d2d2d7] bg-white px-3 pr-12 text-sm text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10"
      />

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#86868b]">
        {suffix}
      </span>

    </div>
  );
}


function StatusPill({
  label,
  value,
  active = false,
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3.5 py-2 text-xs">

      <span className="text-[#86868b]">
        {label}:
      </span>

      <span className="font-medium text-[#1d1d1f]">
        {value}
      </span>

      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
      )}

    </div>
  );
}


function formatAction(action) {
  if (!action) return "Automation action";

  return action
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}