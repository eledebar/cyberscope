import { ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { usePreferences } from "../../app/PreferencesContext";
import { categoryById } from "../../content/categories";
import { localise, t } from "../../lib/i18n";
import type { CyberTopic } from "../../types/content";

export function TopicCard({ topic, list = false }: { topic: CyberTopic; list?: boolean }) {
  const { preferences, isSaved, toggleSaved } = usePreferences(); const language = preferences.language; const category = categoryById(topic.category); const saved = isSaved(topic.id);
  return <article className={`panel density-card group relative p-5 transition hover:-translate-y-0.5 hover:border-scope-400/70 ${list ? "sm:flex sm:items-center sm:gap-6" : ""}`}>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2"><span className="eyebrow">{category ? localise(category.title, language) : topic.category}</span><span className="chip">{t(topic.difficulty, language)}</span></div>
      <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-white"><Link to={`/topic/${topic.slug}`} className="after:absolute after:inset-0">{localise(topic.title, language)}</Link></h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{localise(topic.summary, language)}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-scope-700 dark:text-scope-300">{t("viewTopic", language)} <ArrowUpRight size={16} /></div>
    </div>
    <button onClick={event => { event.preventDefault(); toggleSaved(topic.id); }} aria-label={saved ? t("bookmarked", language) : t("bookmark", language)} aria-pressed={saved} className="relative z-10 ml-auto grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-scope-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-scope-300">{saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}</button>
  </article>;
}
