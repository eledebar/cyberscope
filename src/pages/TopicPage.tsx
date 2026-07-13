import { Bookmark, BookmarkCheck, CalendarDays, ExternalLink, Tag } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { Checklist, Comparison, ConceptDiagram, Example } from "../components/content/Visuals";
import { TopicCard } from "../components/content/TopicCard";
import { categoryById } from "../content/categories";
import { glossaryById } from "../content/glossary";
import { topicBySlug, topics } from "../content/topics";
import { checklistById, comparisonById, diagramById } from "../content/visuals";
import { contentTypeLabel, localise, t, taxonomyLabel } from "../lib/i18n";
import { NotFoundPage } from "./StaticPages";

const comparableText = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase();

export function TopicPage() {
  const { slug } = useParams();
  const topic = topicBySlug(slug);
  const { preferences, isSaved, toggleSaved, addRecent } = usePreferences();
  const language = preferences.language;

  useEffect(() => {
    if (topic) addRecent({ path: `/topic/${topic.slug}`, title: topic.title, viewedAt: new Date().toISOString() });
  }, [topic?.id]);

  if (!topic) return <NotFoundPage />;

  const category = categoryById(topic.category);
  const diagram = diagramById(topic.diagramId);
  const comparison = comparisonById(topic.comparisonId);
  const checklist = checklistById(topic.checklistId);
  const saved = isSaved(topic.id);
  const related = topic.relatedTopicIds.map(id => topics.find(item => item.id === id)).filter(Boolean);
  const summary = localise(topic.summary, language);
  const definition = localise(topic.definition, language);
  const showDefinition = comparableText(summary) !== comparableText(definition);
  const tagLabel = (tag: string) => {
    const tagCategory = categoryById(tag);
    return tagCategory ? localise(tagCategory.title, language) : taxonomyLabel(tag, language);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[
        { label: category ? localise(category.title, language) : topic.category, to: `/category/${topic.category}` },
        { label: localise(topic.title, language) }
      ]} />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="chip">{t(topic.difficulty, language)}</span>
            <span className="chip">{contentTypeLabel(topic.contentType, language)}</span>
          </div>

          <h1 className="page-title max-w-4xl">{localise(topic.title, language)}</h1>
          <p className="lead">{summary}</p>

          <button
            onClick={() => toggleSaved(topic.id)}
            className={saved ? "button-primary mt-6" : "button mt-6"}
            aria-pressed={saved}
          >
            {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
            {saved ? t("bookmarked", language) : t("bookmark", language)}
          </button>

          {showDefinition && (
            <section className="mt-10 rounded-2xl border-l-4 border-scope-500 bg-scope-50 p-6 dark:bg-scope-950/30">
              <p className="eyebrow">{t("definition", language)}</p>
              <p className="mt-2 text-lg font-medium leading-8 text-slate-800 dark:text-slate-100">{definition}</p>
            </section>
          )}

          {diagram && <ConceptDiagram diagram={diagram} />}

          <div className="mt-10 space-y-10">
            {topic.sections.map(section => (
              <section
                key={section.id}
                id={section.id}
                className={
                  section.id === "risks"
                    ? "rounded-2xl border border-red-200 bg-red-50/60 p-6 dark:border-red-900/60 dark:bg-red-950/20"
                    : section.id === "controls"
                      ? "rounded-2xl border border-scope-200 bg-scope-50/60 p-6 dark:border-scope-900 dark:bg-scope-950/20"
                      : ""
                }
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {localise(section.heading, language)}
                </h2>
                <div className="mt-3 space-y-4 text-slate-600 dark:text-slate-300">
                  {localise(section.body, language)
                    .split(/\n\s*\n/)
                    .filter(Boolean)
                    .map((paragraph, index) => (
                      <p key={index} className="leading-7">{paragraph}</p>
                    ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 grid gap-2">
                    {section.bullets.map((bullet, index) => (
                      <li key={index} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-scope-500" />
                        {localise(bullet, language)}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {comparison && <Comparison table={comparison} />}
          {checklist && <Checklist checklist={checklist} />}
          {topic.example && <Example example={topic.example} />}

          <section className="mt-12 border-t border-slate-200 pt-8 dark:border-white/10">
            <h2 className="text-2xl font-bold">{t("related", language)}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map(item => item && <TopicCard key={item.id} topic={item} />)}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">{t("furtherReading", language)}</h2>
            <div className="mt-4 grid gap-3">
              {topic.references.map(reference => (
                <a
                  key={reference.url}
                  className="panel flex items-center gap-3 p-4 hover:border-scope-400"
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <strong className="block text-slate-950 dark:text-white">{reference.label}</strong>
                    <span className="text-xs text-slate-500">{reference.publisher}</span>
                  </span>
                  <ExternalLink className="ml-auto" size={16} />
                </a>
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:h-fit">
          <div className="panel p-5">
            <h2 className="font-bold">{t("topicMetadata", language)}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <CalendarDays size={14} />
                  {t("lastReviewed", language)}
                </dt>
                <dd className="mt-1">
                  {new Intl.DateTimeFormat(language === "en" ? "en-GB" : "es-ES", { dateStyle: "medium" }).format(new Date(topic.lastReviewed))}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Tag size={14} />
                  {t("tags", language)}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {topic.tags.slice(0, 6).map(tag => <span className="chip" key={tag}>{tagLabel(tag)}</span>)}
                </dd>
              </div>
            </dl>
          </div>

          {topic.glossaryTermIds.some(id => glossaryById(id)) && (
            <div className="panel p-5">
              <h2 className="font-bold">{t("glossary", language)}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {topic.glossaryTermIds
                  .map(id => glossaryById(id))
                  .filter(Boolean)
                  .map(entry => entry && (
                    <Link className="chip hover:border-scope-400" to={`/glossary/${entry.id}`} key={entry.id}>
                      {localise(entry.term, language)}
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
