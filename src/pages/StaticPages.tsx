import { ArrowLeft, ExternalLink, HardDrive, ShieldCheck, WifiOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../app/PreferencesContext";
import { Breadcrumbs } from "../components/content/Breadcrumbs";
import { t } from "../lib/i18n";

const sources = [
  ["NIST Cybersecurity Framework", "NIST", "https://www.nist.gov/cyberframework"],
  ["NIST Computer Security Resource Center", "NIST", "https://csrc.nist.gov/"],
  ["ENISA Topics", "European Union Agency for Cybersecurity", "https://www.enisa.europa.eu/topics"],
  ["MITRE ATT&CK", "MITRE", "https://attack.mitre.org/"],
  ["OWASP Foundation", "OWASP", "https://owasp.org/"],
  ["CIS Controls", "Center for Internet Security", "https://www.cisecurity.org/controls"],
  ["IEC 62443 overview", "IEC", "https://www.iec.ch/blog/understanding-iec-62443"],
  ["NIST SP 800-82", "NIST", "https://csrc.nist.gov/pubs/sp/800/82/r3/final"]
];

export function ResourcesPage() {
  const language = useLanguage();
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("resources", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / SOURCES" : "CYBERSCOPE / FUENTES"}</p>
      <h1 className="page-title">{t("resources", language)}</h1>
      <p className="lead">
        {language === "en"
          ? "Authoritative starting points for deeper reading. CyberScope summarises concepts and does not reproduce proprietary standards."
          : "Fuentes autorizadas para profundizar. CyberScope resume conceptos y no reproduce normas de acceso restringido."}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {sources.map(([name, publisher, url]) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="panel flex items-start gap-4 p-5 hover:border-scope-400">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-scope-50 text-scope-700 dark:bg-scope-950 dark:text-scope-300"><ExternalLink size={17} /></span>
            <span><strong className="block text-slate-950 dark:text-white">{name}</strong><span className="mt-1 block text-xs text-slate-500">{publisher}</span></span>
          </a>
        ))}
      </div>
      <aside className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
        {language === "en"
          ? "Frameworks serve different purposes. Select and tailor them based on context, contractual obligations and qualified professional judgement."
          : "Los marcos tienen finalidades distintas. Selecciónalos y adáptalos al contexto, a las obligaciones contractuales y al criterio profesional cualificado."}
      </aside>
    </div>
  );
}

export function AboutPage() {
  const language = useLanguage();
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("about", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / ABOUT" : "CYBERSCOPE / ACERCA DE"}</p>
      <h1 className="page-title">{language === "en" ? "A field guide, not a course" : "Una guía de campo, no un curso"}</h1>
      <p className="lead">
        {language === "en"
          ? "CyberScope is an original, bilingual cybersecurity knowledge application designed for self-directed exploration by beginners and professionals."
          : "CyberScope es una aplicación bilingüe y original sobre ciberseguridad, diseñada para que tanto principiantes como profesionales exploren el contenido a su ritmo."}
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <section className="panel p-6">
          <ShieldCheck className="text-scope-600" />
          <h2 className="mt-4 text-xl font-bold">{language === "en" ? "Defensive by design" : "Defensiva desde el diseño"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {language === "en"
              ? "Attack concepts focus on warning signs, consequences, detection, mitigation, containment and recovery. There are no exploit payloads or unauthorised-access instructions."
              : "Los conceptos de ataque se centran en las señales de alerta, las consecuencias, la detección, la mitigación, la contención y la recuperación. No se incluyen cargas de explotación ni instrucciones de acceso no autorizado."}
          </p>
        </section>
        <section className="panel p-6">
          <HardDrive className="text-scope-600" />
          <h2 className="mt-4 text-xl font-bold">{language === "en" ? "Local by default" : "Datos locales por defecto"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {language === "en"
              ? "No sign-up, backend, analytics, advertising or tracking. Personalisation remains in the browser and can be erased at any time."
              : "Sin registro, servicios de servidor, analítica, publicidad ni seguimiento. La personalización permanece en el navegador y puede borrarse en cualquier momento."}
          </p>
        </section>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  const language = useLanguage();
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: t("privacy", language) }]} />
      <p className="eyebrow">{language === "en" ? "CYBERSCOPE / PRIVACY" : "CYBERSCOPE / PRIVACIDAD"}</p>
      <h1 className="page-title">{language === "en" ? "Private by default" : "Privacidad por defecto"}</h1>
      <p className="lead">{language === "en" ? "CyberScope works without an account and does not intentionally collect personal data." : "CyberScope funciona sin cuenta y no recopila intencionadamente datos personales."}</p>
      <div className="mt-10 space-y-8 leading-7 text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">{language === "en" ? "Local browser storage" : "Almacenamiento local del navegador"}</h2>
          <p className="mt-2">
            {language === "en"
              ? "Colour mode, language, density, font size, reduced-motion choice, saved topics, recently viewed pages and search history are stored locally on this device. Settings can clear each browsing list or reset everything."
              : "El modo de color, el idioma, la densidad, el tamaño de fuente, la reducción de movimiento, los temas guardados, las páginas recientes y el historial de búsqueda se almacenan localmente en este dispositivo. Desde Ajustes puedes borrar las listas o restablecerlo todo."}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">{language === "en" ? "No tracking" : "Sin seguimiento"}</h2>
          <p className="mt-2">
            {language === "en"
              ? "The application contains no analytics SDK, advertising network, social tracker or third-party script. Opening an external reference is a separate visit governed by that site's policies."
              : "La aplicación no contiene herramientas de analítica, redes publicitarias, rastreadores sociales ni código de terceros. Al abrir una referencia externa, la visita queda sujeta a las políticas de ese sitio."}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">{language === "en" ? "Legal scope" : "Alcance legal"}</h2>
          <p className="mt-2">{language === "en" ? "Privacy content is general education, not jurisdiction-specific legal advice." : "El contenido sobre privacidad es de carácter formativo general y no constituye asesoramiento jurídico para una jurisdicción concreta."}</p>
        </section>
      </div>
    </div>
  );
}

export function OfflinePage() {
  const language = useLanguage();
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-5 py-10 text-center sm:px-8">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-scope-50 text-scope-700 dark:bg-scope-950 dark:text-scope-300"><WifiOff size={28} /></span>
        <p className="eyebrow mt-6">{language === "en" ? "CYBERSCOPE / OFFLINE" : "CYBERSCOPE / SIN CONEXIÓN"}</p>
        <h1 className="page-title">{language === "en" ? "Knowledge that travels with you" : "Conocimiento que viaja contigo"}</h1>
        <p className="lead mx-auto">
          {language === "en"
            ? "The app interface and previously fetched resources are cached locally. Install or revisit the content you need before going offline. External standards and references still require a connection."
            : "La interfaz y los recursos consultados se guardan localmente. Instala la aplicación o vuelve a abrir el contenido que necesites antes de quedarte sin conexión. Las normas y referencias externas siguen necesitando acceso a internet."}
        </p>
        <Link className="button-primary mt-7" to="/">{t("backHome", language)}</Link>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  const language = useLanguage();
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-5 py-10 text-center sm:px-8">
      <div>
        <p className="font-mono text-7xl font-bold text-scope-500">404</p>
        <h1 className="page-title">{t("notFound", language)}</h1>
        <p className="lead mx-auto">{language === "en" ? "This reference may have moved, or the address may be incomplete." : "Es posible que esta referencia se haya movido o que la dirección esté incompleta."}</p>
        <Link className="button-primary mt-7" to="/"><ArrowLeft size={16} />{t("backHome", language)}</Link>
      </div>
    </div>
  );
}
