import AutomationPanel from "../components/AutomationPanel";
import { Sparkles } from "lucide-react";

export default function Automation() {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#0071e3]">
          <Sparkles size={14} />
          Intelligent Automation
        </div>

        <h1 className="text-3xl font-semibold tracking-[-1px] sm:text-4xl">
          Automation
        </h1>

        <p className="mt-2 max-w-xl text-sm text-[#86868b]">
          Test how your smart home responds to sensor conditions before
          connecting the physical hardware.
        </p>
      </section>

      <AutomationPanel />
    </div>
  );
}