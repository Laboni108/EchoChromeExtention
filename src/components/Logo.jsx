import { Cat } from "lucide-react";

function Logo() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-amber-400 border border-slate-700 shadow-md">
      <Cat className="h-6 w-6 stroke-[2.2]" />
    </div>
  );
}

export default Logo;