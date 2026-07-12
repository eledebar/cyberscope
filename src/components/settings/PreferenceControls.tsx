import { Moon, Sun } from "lucide-react";
import { usePreferences } from "../../app/PreferencesContext";
import { t } from "../../lib/i18n";
import type { UserPreferences } from "../../types/content";

export function LanguageSwitch() {
  const { preferences, update } = usePreferences();
  return (
    <div className="flex rounded-xl border border-slate-200 p-1 dark:border-white/10" aria-label={t("language", preferences.language)}>
      {(["en", "es"] as const).map(language => (
        <button
          key={language}
          onClick={() => update({ language })}
          aria-pressed={preferences.language === language}
          className={`min-h-8 rounded-lg px-2.5 text-xs font-bold transition ${preferences.language === language ? "bg-scope-500 text-[#07150b]" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function ThemeControl({ full = false }: { full?: boolean }) {
  const { preferences, update } = usePreferences();
  const options: { value: UserPreferences["theme"]; icon: typeof Sun; key: "light" | "dark" }[] = [
    { value: "light", icon: Sun, key: "light" },
    { value: "dark", icon: Moon, key: "dark" }
  ];

  return (
    <div className="flex rounded-xl border border-slate-200 p-1 dark:border-white/10" aria-label={t("theme", preferences.language)}>
      {options.map(({ value, icon: Icon, key }) => (
        <button
          key={value}
          onClick={() => update({ theme: value })}
          aria-label={t(key, preferences.language)}
          title={t(key, preferences.language)}
          aria-pressed={preferences.theme === value}
          className={`flex min-h-8 items-center gap-2 rounded-lg px-2.5 text-xs font-semibold transition ${preferences.theme === value ? "bg-scope-500 text-[#07150b]" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
        >
          <Icon size={15} />
          {full && <span>{t(key, preferences.language)}</span>}
        </button>
      ))}
    </div>
  );
}
