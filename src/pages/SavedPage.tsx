import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { usePreferences } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { TopicCard } from "../components/content/TopicCard";
import { topics } from "../content/topics";
import { t } from "../lib/i18n";

export function SavedPage() {
  const { preferences } = usePreferences();
  const language = preferences.language;
  const saved = preferences.savedTopics.map(item => topics.find(topic => topic.id === item.topicId)).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("saved", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / LOCAL" : "CYBERSCOPE / LOCAL"}</p>
      <h1 className="page-title">{t("saved", language)}</h1>
      <p className="lead">
        {language === "en"
          ? "A private list of useful references stored on this device. It is never treated as progress."
          : "Una lista privada de referencias útiles guardada en este dispositivo. Nunca se interpreta como progreso."}
      </p>
      {saved.length ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {saved.map(topic => topic && <TopicCard key={topic.id} topic={topic} />)}
        </div>
      ) : (
        <div className="panel mt-8 grid min-h-64 place-items-center p-8 text-center">
          <div>
            <Bookmark className="mx-auto text-scope-600" size={32} />
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t("savedEmpty", language)}</p>
            <Link to="/explore" className="button-primary mt-5">{t("explore", language)}</Link>
          </div>
        </div>
      )}
    </div>
  );
}
