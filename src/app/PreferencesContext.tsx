import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Language, RecentPage, UserPreferences } from "../types/content";

const KEY = "cyberscope.preferences";
const defaults: UserPreferences = {
  language: "en",
  theme: "light",
  reducedMotion: false,
  density: "comfortable",
  fontSize: "medium",
  savedTopics: [],
  recentlyViewed: [],
  searchHistory: []
};

interface PreferencesApi {
  preferences: UserPreferences;
  update: (patch: Partial<UserPreferences>) => void;
  toggleSaved: (topicId: string) => void;
  isSaved: (topicId: string) => boolean;
  addRecent: (page: RecentPage) => void;
  addSearch: (query: string) => void;
  reset: () => void;
}

const Context = createContext<PreferencesApi | null>(null);

function load(): UserPreferences {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<UserPreferences>;
    const theme: UserPreferences["theme"] = stored.theme === "dark" ? "dark" : "light";
    return { ...defaults, ...stored, theme };
  } catch {
    return defaults;
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(load);
  const update = (patch: Partial<UserPreferences>) => setPreferences(current => ({ ...current, ...patch }));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    const dark = preferences.theme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.documentElement.lang = preferences.language;
    document.documentElement.dataset.motion = preferences.reducedMotion ? "reduced" : "full";
    document.documentElement.dataset.density = preferences.density;
    document.documentElement.dataset.font = preferences.fontSize;
  }, [preferences.theme, preferences.language, preferences.reducedMotion, preferences.density, preferences.fontSize]);

  const api = useMemo<PreferencesApi>(() => ({
    preferences,
    update,
    toggleSaved: topicId => setPreferences(current => ({
      ...current,
      savedTopics: current.savedTopics.some(item => item.topicId === topicId)
        ? current.savedTopics.filter(item => item.topicId !== topicId)
        : [{ topicId, savedAt: new Date().toISOString() }, ...current.savedTopics]
    })),
    isSaved: topicId => preferences.savedTopics.some(item => item.topicId === topicId),
    addRecent: page => setPreferences(current => ({
      ...current,
      recentlyViewed: [page, ...current.recentlyViewed.filter(item => item.path !== page.path)].slice(0, 8)
    })),
    addSearch: query => setPreferences(current => ({
      ...current,
      searchHistory: [query, ...current.searchHistory.filter(item => item.toLowerCase() !== query.toLowerCase())].slice(0, 8)
    })),
    reset: () => setPreferences(defaults)
  }), [preferences]);

  return <Context.Provider value={api}>{children}</Context.Provider>;
}

export function usePreferences() {
  const value = useContext(Context);
  if (!value) throw new Error("usePreferences must be inside PreferencesProvider");
  return value;
}

export function useLanguage(): Language {
  return usePreferences().preferences.language;
}
