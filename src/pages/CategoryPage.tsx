import { ArrowRight, Boxes, Factory, Layers3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { TopicCard } from "../components/content/TopicCard";
import { ConceptDiagram } from "../components/content/Visuals";
import { categoryById } from "../content/categories";
import { topics } from "../content/topics";
import { diagramById } from "../content/visuals";
import { localise, t } from "../lib/i18n";
import { NotFoundPage } from "./StaticPages";

export function CategoryPage({ categoryId }: { categoryId?: string }) {
  const params = useParams();
  const id = categoryId ?? params.slug ?? "";
  const category = categoryById(id);
  const language = useLanguage();

  if (!category) return <NotFoundPage />;

  const items = topics.filter(topic => topic.category === id);
  const special = ["critical-infrastructure", "operational-technology", "hardening"].includes(id);
  const diagram = diagramById(
    id === "critical-infrastructure"
      ? "critical-dependencies"
      : id === "operational-technology"
        ? "purdue"
        : id === "hardening"
          ? "hardening-loop"
          : undefined
  );

  return (
    <div>
      <section className="industrial-grid border-b border-slate-200 px-5 py-12 dark:border-white/10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: localise(category.title, language) }]} />
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">{language === "en" ? "CYBERSCOPE / DOMAIN" : "CYBERSCOPE / ÁMBITO"}</p>
              <h1 className="page-title max-w-4xl">{localise(category.title, language)}</h1>
              <p className="lead">
                {localise(category.description, language)}{" "}
                {special && (language === "en"
                  ? "This section places operational safety, service continuity and real-world consequences at the centre of cyber decisions."
                  : "Esta sección sitúa la seguridad operacional, la continuidad del servicio y las consecuencias reales en el centro de las decisiones de ciberseguridad.")}
              </p>
            </div>
            <div className="grid size-24 place-items-center rounded-3xl border border-scope-400/40 bg-scope-50 text-scope-700 dark:bg-scope-950/50 dark:text-scope-300">
              {id === "critical-infrastructure" ? <Factory size={36} /> : id === "operational-technology" ? <Layers3 size={36} /> : <Boxes size={36} />}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {diagram && <ConceptDiagram diagram={diagram} />}
        <div className="mt-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">{language === "en" ? "DOMAIN INDEX" : "ÍNDICE DEL ÁMBITO"}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
              {items.length} {language === "en" ? "connected topics" : "temas relacionados"}
            </h2>
          </div>
          <Link to="/explore" className="button hidden sm:flex">{t("explore", language)}<ArrowRight size={16} /></Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map(topic => <TopicCard topic={topic} key={topic.id} />)}
        </div>
      </div>
    </div>
  );
}
