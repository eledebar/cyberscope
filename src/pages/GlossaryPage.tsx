import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { categoryById } from "../content/categories";
import { glossary, glossaryById } from "../content/glossary";
import { localise, t } from "../lib/i18n";
import { NotFoundPage } from "./StaticPages";

export function GlossaryPage() {
  const language = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [letter, setLetter] = useState("");
  const categories = [...new Set(glossary.map(entry => entry.category))].sort();
  const letters = [...new Set(glossary.map(entry => localise(entry.term, language)[0]?.toUpperCase()).filter(Boolean))].sort();
  const entries = useMemo(() => glossary.filter(entry => {
    const text = [entry.term.en, entry.term.es, entry.acronym, entry.shortDefinition.en, entry.shortDefinition.es, ...entry.aliases].join(" ").toLowerCase();
    return (!query || text.includes(query.toLowerCase()))
      && (!category || entry.category === category)
      && (!letter || localise(entry.term, language).toUpperCase().startsWith(letter));
  }).sort((a, b) => localise(a.term, language).localeCompare(localise(b.term, language))), [query, category, letter, language]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("glossary", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / REFERENCE" : "CYBERSCOPE / REFERENCIA"}</p>
      <h1 className="page-title">{t("glossary", language)}</h1>
      <p className="lead">
        {language === "en"
          ? `${glossary.length} linked definitions covering the language of defensive cybersecurity.`
          : `${glossary.length} definiciones relacionadas que recogen el vocabulario de la ciberseguridad defensiva.`}
      </p>

      <div className="mt-8 grid gap-3 md:grid-cols-[1fr_15rem]">
        <label className="relative">
          <span className="sr-only">{t("glossarySearch", language)}</span>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="field pl-11" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("glossarySearch", language)} />
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label={t("clear", language)}><X size={16} /></button>}
        </label>
        <select value={category} onChange={event => setCategory(event.target.value)} className="field">
          <option value="">{t("categories", language)}: {t("all", language)}</option>
          {categories.map(id => <option key={id} value={id}>{localise(categoryById(id)?.title ?? { en: id, es: id }, language)}</option>)}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap gap-1" aria-label={t("alphabeticalFilter", language)}>
        <button onClick={() => setLetter("")} aria-pressed={!letter} className={`grid min-h-9 min-w-9 place-items-center rounded-lg text-xs font-bold ${!letter ? "bg-scope-500 text-[#07150b]" : "border border-slate-200 dark:border-white/10"}`}>#</button>
        {letters.map(item => (
          <button key={item} onClick={() => setLetter(item === letter ? "" : item)} aria-pressed={letter === item} className={`grid min-h-9 min-w-9 place-items-center rounded-lg text-xs font-bold ${letter === item ? "bg-scope-500 text-[#07150b]" : "border border-slate-200 dark:border-white/10"}`}>{item}</button>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-500" aria-live="polite">{entries.length} {t("results", language)}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {entries.map(entry => (
          <Link key={entry.id} to={`/glossary/${entry.id}`} className="panel group p-5 hover:border-scope-400">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-scope-50 text-scope-700 dark:bg-scope-950 dark:text-scope-300"><BookOpen size={16} /></span>
              {entry.acronym && <span className="chip">{entry.acronym}</span>}
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-950 group-hover:text-scope-700 dark:text-white dark:group-hover:text-scope-300">{localise(entry.term, language)}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{localise(entry.shortDefinition, language)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function GlossaryDetailPage() {
  const { id } = useParams();
  const entry = glossaryById(id);
  const language = useLanguage();

  if (!entry) return <NotFoundPage />;

  const related = entry.relatedTerms.map(glossaryById).filter(Boolean);
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("glossary", language), to: "/glossary" }, { label: localise(entry.term, language) }]} />
      <h1 className="page-title">{localise(entry.term, language)}</h1>
      {entry.acronym && <p className="mt-3 font-mono text-sm font-bold text-scope-700 dark:text-scope-300">{entry.acronym}</p>}
      <div className="mt-8 rounded-2xl border-l-4 border-scope-500 bg-scope-50 p-6 text-lg leading-8 text-slate-800 dark:bg-scope-950/30 dark:text-slate-100">{localise(entry.shortDefinition, language)}</div>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">{t("definition", language)}</h2>
        <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{localise(entry.detailedDefinition, language)}</p>
      </section>
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold">{t("related", language)}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map(item => item && (
              <Link className="panel flex items-center p-4 font-semibold hover:border-scope-400" to={`/glossary/${item.id}`} key={item.id}>
                {localise(item.term, language)}<ArrowRight className="ml-auto" size={16} />
              </Link>
            ))}
          </div>
        </section>
      )}
      <Link to="/glossary" className="button mt-10"><BookOpen size={16} />{t("glossary", language)}</Link>
    </div>
  );
}
