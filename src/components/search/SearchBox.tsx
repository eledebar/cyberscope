import { Search, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "../../app/PreferencesContext";
import { t } from "../../lib/i18n";

export function SearchBox({ large = false, initial = "", onChange }: { large?: boolean; initial?: string; onChange?: (value: string) => void }) {
  const { preferences, addSearch } = usePreferences();
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();
  useEffect(() => setValue(initial), [initial]);
  const submit = (event: FormEvent) => { event.preventDefault(); const query = value.trim(); if (!query) return; addSearch(query); navigate(`/search?q=${encodeURIComponent(query)}`); };
  return <form onSubmit={submit} role="search" className="relative w-full">
    <label htmlFor={large ? "home-search" : "global-search"} className="sr-only">{t("search", preferences.language)}</label>
    <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={large ? 22 : 18} />
    <input id={large ? "home-search" : "global-search"} value={value} onChange={event => { setValue(event.target.value); onChange?.(event.target.value); }} placeholder={t("searchHint", preferences.language)} className={`field pl-12 pr-11 ${large ? "h-16 rounded-2xl text-base shadow-panel" : "h-11 text-sm"}`} autoComplete="off" />
    {value && <button type="button" onClick={() => { setValue(""); onChange?.(""); }} aria-label={t("clear", preferences.language)} className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"><X size={17} /></button>}
  </form>;
}
