import { Crosshair } from "lucide-react";
import { Link } from "react-router-dom";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="flex items-center gap-3 rounded-lg" aria-label="CyberScope home">
    <span className="grid size-10 place-items-center rounded-xl bg-[#101512] text-scope-400 ring-1 ring-scope-400/30"><Crosshair size={23} strokeWidth={2.2} /></span>
    {!compact && <span><span className="block text-base font-bold tracking-tight text-slate-950 dark:text-white">Cyber<span className="text-scope-600 dark:text-scope-400">Scope</span></span><span className="block font-mono text-[9px] uppercase tracking-[.16em] text-slate-500">Visual field guide</span></span>}
  </Link>;
}
