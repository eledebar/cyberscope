import { ArrowRight, BookOpen, Compass, Factory, HardDriveDownload, Network, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { TopicCard } from "../components/content/TopicCard";
import { SearchBox } from "../components/search/SearchBox";
import { categories } from "../content/categories";
import { glossary } from "../content/glossary";
import { topics } from "../content/topics";
import { localise, t } from "../lib/i18n";

export function HomePage() {
  const { preferences } = usePreferences();
  const language = preferences.language;
  const day = Math.floor(Date.now() / 86400000);
  const concept = topics[day % topics.length];
  const featured = ["zero-trust", "hardening-fundamentals", "critical-infrastructure", "ot-ics"]
    .map(id => topics.find(topic => topic.id === id)!)
    .filter(Boolean);
  const popular = ["zero-trust", "ransomware", "mfa", "scada", "pki", "siem"]
    .map(id => glossary.find(entry => entry.id === id))
    .filter(Boolean);

  return (
    <div>
      <section className="industrial-grid border-b border-slate-200 bg-gradient-to-br from-white via-scope-50/60 to-slate-100 px-5 py-14 dark:border-white/10 dark:from-[#0d110f] dark:via-[#101d14] dark:to-[#111613] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="eyebrow">
              {language === "en" ? "CYBERSCOPE / KNOWLEDGE SYSTEM" : "CYBERSCOPE / SISTEMA DE CONOCIMIENTO"}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              {language === "en" ? "See cybersecurity as a connected system." : "Comprende la ciberseguridad como un sistema conectado."}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {language === "en"
                ? "A visual field guide for freely exploring concepts, architecture, controls, threats and resilient operations."
                : "Una guía visual para explorar libremente conceptos, arquitectura, controles, amenazas y operaciones resilientes."}
            </p>
            <div className="mt-9 max-w-3xl"><SearchBox large /></div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip"><ShieldCheck size={13} /> {topics.length} {language === "en" ? "defensive topics" : "temas defensivos"}</span>
              <span className="chip"><BookOpen size={13} /> {glossary.length} {language === "en" ? "glossary terms" : "términos del glosario"}</span>
              <span className="chip"><HardDriveDownload size={13} /> {language === "en" ? "Offline-ready PWA" : "PWA disponible sin conexión"}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-5 py-12 sm:px-8">
        <section aria-labelledby="featured">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{language === "en" ? "FIELD NOTES" : "NOTAS DESTACADAS"}</p>
              <h2 id="featured" className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{t("featured", language)}</h2>
            </div>
            <Link to="/explore" className="button">{t("allTopics", language)}<ArrowRight size={16} /></Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featured.map(topic => <TopicCard key={topic.id} topic={topic} />)}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <article className="panel overflow-hidden p-6 sm:p-8">
            <p className="eyebrow">{t("conceptDay", language)}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{localise(concept.title, language)}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{localise(concept.summary, language)}</p>
            <Link className="button-primary mt-6" to={`/topic/${concept.slug}`}>{t("readMore", language)}<ArrowRight size={16} /></Link>
          </article>

          <article className="panel p-6 sm:p-8">
            <p className="eyebrow">{t("quickLinks", language)}</p>
            <div className="mt-5 grid gap-3">
              {[
                [Compass, "/explore", t("explore", language)],
                [Factory, "/critical-infrastructure", localise(categories.find(c => c.id === "critical-infrastructure")!.title, language)],
                [Network, "/operational-technology", localise(categories.find(c => c.id === "operational-technology")!.title, language)]
              ].map(([Icon, to, label]) => {
                const C = Icon as typeof Compass;
                return (
                  <Link key={to as string} to={to as string} className="flex min-h-14 items-center gap-3 rounded-xl border border-slate-200 px-4 font-semibold hover:border-scope-400 hover:text-scope-700 dark:border-white/10 dark:hover:text-scope-300">
                    <C size={18} /><span>{label as string}</span><ArrowRight className="ml-auto" size={16} />
                  </Link>
                );
              })}
            </div>
          </article>
        </section>

        <section aria-labelledby="domains">
          <p className="eyebrow">{language === "en" ? "SYSTEM VIEW" : "VISIÓN DEL SISTEMA"}</p>
          <h2 id="domains" className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{t("domains", language)}</h2>
          <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
            {language === "en"
              ? "Every domain contributes to prevention, detection, response and dependable recovery."
              : "Cada ámbito contribuye a la prevención, la detección, la respuesta y una recuperación fiable."}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <Link to={`/category/${category.slug}`} key={category.id} className="panel group flex min-h-28 items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-scope-400">
                <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold" style={{ background: `${category.accent}20`, color: category.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="block text-slate-950 group-hover:text-scope-700 dark:text-white dark:group-hover:text-scope-300">{localise(category.title, language)}</strong>
                  <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-500 dark:text-slate-400">{localise(category.description, language)}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article>
            <p className="eyebrow">{t("recentlyViewed", language)}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{language === "en" ? "Your local browsing history" : "Tu historial de navegación en este dispositivo"}</h2>
            <div className="mt-5 grid gap-3">
              {preferences.recentlyViewed.length
                ? preferences.recentlyViewed.slice(0, 4).map(item => (
                    <Link className="panel flex items-center gap-3 p-4 hover:border-scope-400" key={item.path} to={item.path}>
                      <span className="size-2 rounded-full bg-scope-500" />
                      <span className="font-medium">{localise(item.title, language)}</span>
                      <ArrowRight className="ml-auto" size={15} />
                    </Link>
                  ))
                : <div className="panel p-5 text-sm text-slate-500 dark:text-slate-400">{language === "en" ? "Pages you open will appear here, only on this device." : "Las páginas que abras aparecerán aquí y solo se guardarán en este dispositivo."}</div>}
            </div>
          </article>

          <article>
            <p className="eyebrow">{t("popularTerms", language)}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{t("glossary", language)}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {popular.map(entry => entry && <Link key={entry.id} to={`/glossary/${entry.id}`} className="button">{localise(entry.term, language)}</Link>)}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
