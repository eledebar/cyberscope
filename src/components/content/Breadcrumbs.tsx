import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/PreferencesContext";
import { t } from "../../lib/i18n";

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const language = useLanguage();
  return <nav aria-label="Breadcrumb" className="mb-6"><ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"><li><Link to="/" aria-label={t("home", language)} className="hover:text-scope-600"><Home size={14} /></Link></li>{items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-2"><ChevronRight size={13} aria-hidden />{item.to ? <Link to={item.to} className="hover:text-scope-600">{item.label}</Link> : <span aria-current="page" className="text-slate-700 dark:text-slate-200">{item.label}</span>}</li>)}</ol></nav>;
}
