import { ArrowRight, Clock3, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { SearchBox } from "../components/search/SearchBox";
import { categoryById } from "../content/categories";
import { localise, searchTypeLabel, t } from "../lib/i18n";
import { highlight, searchContent } from "../lib/search";

export function SearchPage() {
  const [params] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const { preferences, update } = usePreferences();
  const language = preferences.language;
  const results = useMemo(() => searchContent(query), [query]);
  const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const highlighted = (value: string) => highlight(value, query).map((part, index) =>
    searchTerms.length > 0 && searchTerms.some(term => part.toLowerCase().includes(term))
      ? <mark key={index}>{part}</mark>
      : part
  );
  const suggestions = language === "en" ? ["risk", "MFA", "SCADA"] : ["riesgo", "MFA", "SCADA"];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("search", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / GLOBAL SEARCH" : "CYBERSCOPE / BÚSQUEDA GLOBAL"}</p>
      <h1 className="page-title">{t("search", language)}</h1>
      <div className="mt-7"><SearchBox large initial={initial} onChange={setQuery} /></div>

      {!query && preferences.searchHistory.length > 0 && (
        <section className="mt-8 panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold"><Clock3 size={17} />{t("searchHistory", language)}</h2>
            <button onClick={() => update({ searchHistory: [] })} className="button"><Trash2 size={15} />{t("clear", language)}</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {preferences.searchHistory.map(item => <button key={item} onClick={() => setQuery(item)} className="chip hover:border-scope-400">{item}</button>)}
          </div>
        </section>
      )}

      {query && (
        <section className="mt-8" aria-live="polite">
          <p className="mb-4 text-sm text-slate-500"><strong className="text-slate-950 dark:text-white">{results.length}</strong> {t("results", language)}</p>
          {results.length ? (
            <div className="grid gap-3">
              {results.slice(0, 80).map(({ entry }) => (
                <Link to={entry.path} key={`${entry.type}-${entry.id}`} className="panel group flex items-start gap-4 p-5 hover:border-scope-400">
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-xl bg-scope-50 text-scope-700 dark:bg-scope-950 dark:text-scope-300"><Search size={16} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow">{searchTypeLabel(entry.type, language)} · {localise(categoryById(entry.category)?.title ?? { en: entry.category, es: entry.category }, language)}</span>
                    <strong className="mt-1 block text-lg text-slate-950 dark:text-white">{highlighted(localise(entry.title, language))}</strong>
                    <span className="mt-1 line-clamp-2 block text-sm leading-6 text-slate-500 dark:text-slate-400">{highlighted(localise(entry.description, language))}</span>
                  </span>
                  <ArrowRight className="mt-2 shrink-0 text-slate-400 group-hover:text-scope-600" size={17} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="panel grid min-h-64 place-items-center p-8 text-center">
              <div>
                <h2 className="text-xl font-bold">{t("noResults", language)}</h2>
                <p className="mt-2 text-sm text-slate-500">{t("noResultsHelp", language)}</p>
                <div className="mt-4 flex justify-center gap-2">
                  {suggestions.map(item => <button key={item} className="chip" onClick={() => setQuery(item)}>{item}</button>)}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
