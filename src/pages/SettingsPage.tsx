import { Database, RotateCcw, Trash2, WifiOff } from "lucide-react";
import { usePreferences } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { LanguageSwitch, ThemeControl } from "../components/settings/PreferenceControls";
import { t } from "../lib/i18n";
import type { UserPreferences } from "../types/content";

export function SettingsPage() {
  const { preferences, update, reset } = usePreferences();
  const language = preferences.language;
  const segmented = <K extends keyof UserPreferences>(
    key: K,
    values: UserPreferences[K] extends string ? UserPreferences[K][] : never,
    labels: string[]
  ) => (
    <div className="flex flex-wrap gap-2">
      {(values as string[]).map((value, index) => (
        <button
          key={value}
          onClick={() => update({ [key]: value } as Partial<UserPreferences>)}
          aria-pressed={preferences[key] === value}
          className={preferences[key] === value ? "button-primary" : "button"}
        >
          {labels[index]}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("settings", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / PREFERENCES" : "CYBERSCOPE / PREFERENCIAS"}</p>
      <h1 className="page-title">{t("settings", language)}</h1>
      <p className="lead">
        {language === "en"
          ? "All settings remain in your browser. CyberScope has no account, analytics or tracking."
          : "Todos los ajustes se guardan en tu navegador. CyberScope no requiere cuenta y no incorpora analítica ni seguimiento."}
      </p>

      <div className="mt-8 space-y-5">
        <section className="panel p-6">
          <h2 className="text-lg font-bold">{t("appearance", language)}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">{t("language", language)}</p>
              <LanguageSwitch />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">{t("theme", language)}</p>
              <ThemeControl full />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">{t("density", language)}</p>
              {segmented("density", ["comfortable", "compact"], [t("comfortable", language), t("compact", language)])}
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">{t("fontSize", language)}</p>
              {segmented("fontSize", ["small", "medium", "large"], [t("small", language), t("medium", language), t("large", language)])}
            </div>
          </div>
          <label className="mt-6 flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 dark:border-white/10">
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={event => update({ reducedMotion: event.target.checked })}
              className="size-4 accent-scope-500"
            />
            <span className="font-semibold">{t("reducedMotion", language)}</span>
          </label>
        </section>

        <section className="panel p-6">
          <div className="flex items-center gap-3">
            <Database size={20} className="text-scope-600" />
            <h2 className="text-lg font-bold">{t("localData", language)}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {language === "en"
              ? "Language, appearance, saved topics, recent pages and search history are stored only in this browser on this device."
              : "El idioma, la apariencia, los temas guardados, las páginas recientes y el historial de búsqueda se almacenan únicamente en este navegador y en este dispositivo."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="button" onClick={() => update({ recentlyViewed: [], searchHistory: [] })}><Trash2 size={16} />{t("clearHistory", language)}</button>
            <button className="button" onClick={() => update({ savedTopics: [] })}><Trash2 size={16} />{t("clearSaved", language)}</button>
            <button className="button" onClick={reset}><RotateCcw size={16} />{t("reset", language)}</button>
          </div>
        </section>

        <section className="panel p-6">
          <div className="flex items-center gap-3">
            <WifiOff size={20} className="text-scope-600" />
            <h2 className="text-lg font-bold">{t("offline", language)}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {language === "en"
              ? "The installable app caches its interface and visited resources. Content opened after installation is normally available offline; external references still require a connection."
              : "La aplicación instalable guarda su interfaz y los recursos visitados. El contenido abierto tras instalarla suele estar disponible sin conexión; las referencias externas siguen necesitando acceso a internet."}
          </p>
        </section>
      </div>
    </div>
  );
}
