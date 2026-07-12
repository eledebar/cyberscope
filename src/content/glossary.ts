import type { GlossaryEntry, LocalisedText } from "../types/content";
import { topics } from "./topics";

const translations: Record<string, LocalisedText> = {
  "information security": { en: "Information security", es: "Seguridad de la información" },
  "likelihood": { en: "Likelihood", es: "Probabilidad" }, "impact": { en: "Impact", es: "Impacto" },
  "inherent risk": { en: "Inherent risk", es: "Riesgo inherente" }, "residual risk": { en: "Residual risk", es: "Riesgo residual" },
  "attack surface": { en: "Attack surface", es: "Superficie de ataque" }, "secure baseline": { en: "Secure baseline", es: "Línea base segura" },
  "trojan": { en: "Trojan", es: "Troyano" }, "worm": { en: "Worm", es: "Gusano" }, "spyware": { en: "Spyware", es: "Programa espía" }, "rootkit": { en: "Rootkit", es: "Rootkit" },
  "fileless malware": { en: "Fileless malware", es: "Malware sin archivos" }, "spear phishing": { en: "Spear phishing", es: "Spear phishing" },
  "whaling": { en: "Whaling", es: "Whaling" }, "smishing": { en: "Smishing", es: "Smishing" }, "vishing": { en: "Vishing", es: "Vishing" },
  "credential stuffing": { en: "Credential stuffing", es: "Relleno de credenciales" }, "password spraying": { en: "Password spraying", es: "Pulverización de contraseñas" },
  "brute force": { en: "Brute-force attack", es: "Ataque de fuerza bruta" }, "session hijacking": { en: "Session hijacking", es: "Secuestro de sesión" },
  "privilege escalation": { en: "Privilege escalation", es: "Escalada de privilegios" }, "persistence": { en: "Persistence", es: "Persistencia" },
  "lateral movement": { en: "Lateral movement", es: "Movimiento lateral" }, "exfiltration": { en: "Data exfiltration", es: "Exfiltración de datos" },
  "public cloud": { en: "Public cloud", es: "Nube pública" }, "private cloud": { en: "Private cloud", es: "Nube privada" },
  "hybrid cloud": { en: "Hybrid cloud", es: "Nube híbrida" }, "multi-cloud": { en: "Multi-cloud", es: "Multinube" },
  "injection": { en: "Injection", es: "Inyección" }, "code review": { en: "Code review", es: "Revisión de código" },
  "digital certificate": { en: "Digital certificate", es: "Certificado digital" }, "digital signature": { en: "Digital signature", es: "Firma digital" },
  "chain of custody": { en: "Chain of custody", es: "Cadena de custodia" }, "forensic readiness": { en: "Forensic readiness", es: "Preparación forense" },
  "personal data": { en: "Personal data", es: "Datos personales" }, "sensitive data": { en: "Sensitive data", es: "Datos sensibles" },
  "anonymisation": { en: "Anonymisation", es: "Anonimización" }, "pseudonymisation": { en: "Pseudonymisation", es: "Seudonimización" },
  "offline backup": { en: "Offline backup", es: "Copia sin conexión" }, "immutable backup": { en: "Immutable backup", es: "Copia inmutable" },
  "data poisoning": { en: "Data poisoning", es: "Envenenamiento de datos" }, "model supply chain": { en: "Model supply chain", es: "Cadena de suministro de modelos" },
  "satellite security": { en: "Satellite security", es: "Seguridad de satélites" }, "space systems": { en: "Space systems", es: "Sistemas espaciales" },
  "digital twin": { en: "Digital twin", es: "Gemelo digital" }, "connected vehicle": { en: "Connected vehicle", es: "Vehículo conectado" }
};

const acronymPattern = /^[A-Z0-9/.-]{2,12}$/;
const cleanId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const topicEntries: GlossaryEntry[] = topics.map(topic => ({
  id: topic.id,
  term: topic.title,
  shortDefinition: topic.summary,
  detailedDefinition: {
    en: `${topic.summary.en} In practice, the term should be interpreted in its technical, operational and governance context rather than as an isolated product feature.`,
    es: `${topic.summary.es} En la práctica, el término debe interpretarse en su contexto técnico, operativo y de gobierno, no como una función aislada de un producto.`
  },
  category: topic.category,
  relatedTerms: topic.relatedTopicIds,
  aliases: topic.aliases
}));

const seen = new Set(topicEntries.map(entry => entry.id));
const aliasEntries: GlossaryEntry[] = [];
for (const topic of topics) {
  for (const alias of topic.aliases) {
    let id = cleanId(alias);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const term = translations[alias.toLowerCase()] ?? { en: alias, es: alias };
    aliasEntries.push({
      id,
      term,
      acronym: acronymPattern.test(alias) ? alias : undefined,
      shortDefinition: {
        en: `${term.en} is a term within ${topic.title.en.toLowerCase()}: ${topic.summary.en}`,
        es: `${term.es} es un término relacionado con ${topic.title.es.toLowerCase()}: ${topic.summary.es}`
      },
      detailedDefinition: {
        en: `Within CyberScope, ${term.en} is used in its defensive and professional sense. ${topic.summary.en} Its significance depends on assets, trust boundaries, operational constraints and the controls around it.`,
        es: `En CyberScope, ${term.es} se utiliza en su sentido profesional y defensivo. ${topic.summary.es} Su importancia depende de activos, límites de confianza, restricciones operativas y controles relacionados.`
      },
      category: topic.category,
      relatedTerms: [topic.id, ...topic.relatedTopicIds.slice(0, 2)],
      aliases: [alias, topic.title.en, topic.title.es]
    });
  }
}

const extra: [string, string, string, string, string, string][] = [
  ["asset", "Asset", "Activo", "foundations", "Something of value that requires appropriate protection.", "Algo de valor que requiere protección adecuada."],
  ["threat", "Threat", "Amenaza", "foundations", "A potential cause of harm to an asset or objective.", "Una causa potencial de daño para un activo u objetivo."],
  ["vulnerability", "Vulnerability", "Vulnerabilidad", "foundations", "A weakness that may be exposed or exploited.", "Una debilidad que puede quedar expuesta o ser explotada."],
  ["exploit", "Exploit", "Exploit", "threats", "A method or code that takes advantage of a vulnerability.", "Un método o código que aprovecha una vulnerabilidad."],
  ["attack-vector", "Attack vector", "Vector de ataque", "threats", "A pathway or method used to reach a target.", "Una vía o método utilizado para alcanzar un objetivo."],
  ["security-control", "Security control", "Control de seguridad", "foundations", "A safeguard that modifies likelihood or impact.", "Una salvaguarda que modifica la probabilidad o el impacto."],
  ["resilience", "Resilience", "Resiliencia", "resilience", "The ability to withstand, recover and adapt while preserving outcomes.", "La capacidad de resistir, recuperar y adaptarse preservando resultados."],
  ["business-continuity", "Business continuity", "Continuidad de negocio", "resilience", "Arrangements for sustaining prioritised operations during disruption.", "Medidas para mantener operaciones prioritarias durante una interrupción."],
  ["cyber-hygiene", "Cyber hygiene", "Higiene digital", "foundations", "Routine practices that reduce common and preventable exposure.", "Prácticas habituales que reducen exposición común y evitable."],
  ["security-architecture", "Security architecture", "Arquitectura de seguridad", "foundations", "The structure of trust boundaries, controls and security responsibilities.", "La estructura de límites de confianza, controles y responsabilidades de seguridad."],
  ["security-monitoring", "Security monitoring", "Monitorización de seguridad", "security-operations", "Continuous observation for evidence of unsafe or malicious activity.", "Observación continua de evidencias de actividad insegura o maliciosa."],
  ["water-holing", "Watering-hole attack", "Ataque watering hole", "threats", "Compromise of a site or service frequented by intended targets.", "Compromiso de un sitio o servicio frecuentado por los objetivos previstos."],
  ["insider-threat", "Insider threat", "Amenaza interna", "threats", "Risk arising from trusted access used maliciously or negligently.", "Riesgo derivado de acceso de confianza usado de forma maliciosa o negligente."],
  ["botnet", "Botnet", "Botnet", "threats", "A set of compromised devices controlled as a coordinated network.", "Un conjunto de dispositivos comprometidos controlado como red coordinada."],
  ["authorisation", "Authorisation", "Autorización", "identity", "The decision about which actions an authenticated principal may perform.", "La decisión sobre qué acciones puede realizar un principal autenticado."],
  ["accounting", "Accounting", "Registro", "identity", "Records that support attribution and review of identity activity.", "Registros que permiten atribuir y revisar actividad de identidades."],
  ["conditional-access", "Conditional access", "Acceso condicional", "identity", "Access policy that considers identity, device, location and risk context.", "Política de acceso que considera identidad, dispositivo, ubicación y riesgo."],
  ["session-security", "Session security", "Seguridad de sesión", "identity", "Protection of an authenticated interaction throughout its lifecycle.", "Protección de una interacción autenticada durante todo su ciclo de vida."],
  ["east-west", "East-west traffic", "Tráfico este-oeste", "network", "Traffic moving between systems within an environment.", "Tráfico que se mueve entre sistemas dentro de un entorno."],
  ["north-south", "North-south traffic", "Tráfico norte-sur", "network", "Traffic crossing an environment's external boundary.", "Tráfico que cruza el límite externo de un entorno."],
  ["nac", "Network access control", "Control de acceso a la red", "network", "Policy enforcement for devices and identities joining a network.", "Aplicación de políticas a dispositivos e identidades que acceden a una red."],
  ["secure-boot", "Secure boot", "Arranque seguro", "hardening", "Verification that trusted software starts during the boot process.", "Verificación de que durante el arranque se inicia software de confianza."],
  ["host-firewall", "Host firewall", "Firewall de host", "hardening", "Network policy enforced on an individual endpoint or server.", "Política de red aplicada en un equipo o servidor concreto."],
  ["audit-policy", "Audit policy", "Política de auditoría", "hardening", "Rules defining which security-relevant activity is recorded.", "Reglas que definen qué actividad relevante para seguridad se registra."],
  ["shadow-it", "Shadow IT", "TI en la sombra", "cloud", "Technology used without appropriate organisational visibility or approval.", "Tecnología usada sin visibilidad o aprobación adecuada de la organización."],
  ["tenant-isolation", "Tenant isolation", "Aislamiento entre clientes", "cloud", "Separation preventing one cloud customer from affecting another.", "Separación que impide que un cliente de la nube afecte a otro."],
  ["policy-as-code", "Policy as code", "Política como código", "cloud", "Machine-readable, versioned policy evaluated through automation.", "Política legible por máquinas, versionada y evaluada mediante automatización."],
  ["infrastructure-as-code", "Infrastructure as code", "Infraestructura como código", "cloud", "Versioned definitions used to create and configure infrastructure.", "Definiciones versionadas usadas para crear y configurar infraestructura."],
  ["input-validation", "Input validation", "Validación de entrada", "application", "Verification that input matches the expected form and business rules.", "Verificación de que la entrada cumple el formato y reglas de negocio esperados."],
  ["output-encoding", "Output encoding", "Codificación de salida", "application", "Contextual representation of data to prevent it being interpreted as active content.", "Representación contextual del dato para evitar que se interprete como contenido activo."],
  ["secure-headers", "Secure headers", "Cabeceras seguras", "application", "Protocol metadata that directs safer browser and client behaviour.", "Metadatos de protocolo que orientan un comportamiento más seguro del navegador y cliente."],
  ["key-management", "Key management", "Gestión de claves", "data", "Governance of cryptographic key creation, storage, use, rotation and destruction.", "Gobierno de creación, almacenamiento, uso, rotación y destrucción de claves criptográficas."],
  ["data-residency", "Data residency", "Residencia de datos", "data", "The physical or logical location where data is stored or processed.", "La ubicación física o lógica donde los datos se almacenan o procesan."],
  ["data-sovereignty", "Data sovereignty", "Soberanía del dato", "data", "How laws and authority relate to data based on location and control.", "Cómo se relacionan leyes y autoridad con los datos según ubicación y control."],
  ["safety-instrumented-system", "Safety instrumented system", "Sistema instrumentado de seguridad", "operational-technology", "An independent system designed to move a process to a safe state when required.", "Un sistema independiente diseñado para llevar un proceso a estado seguro cuando sea necesario."],
  ["historian", "Industrial historian", "Historiador industrial", "operational-technology", "A system that stores time-series process and operational data.", "Un sistema que almacena datos temporales de proceso y operación."],
  ["engineering-workstation", "Engineering workstation", "Estación de ingeniería", "operational-technology", "A specialised system used to configure and maintain industrial control assets.", "Un sistema especializado usado para configurar y mantener activos de control industrial."],
  ["removable-media", "Removable media", "Medios extraíbles", "operational-technology", "Portable storage requiring control because it crosses trust zones.", "Almacenamiento portátil que requiere control porque cruza zonas de confianza."],
  ["severity", "Incident severity", "Gravedad del incidente", "incident-response", "A classification reflecting actual or potential consequence and response urgency.", "Una clasificación que refleja consecuencia real o potencial y urgencia de respuesta."],
  ["triage", "Alert triage", "Triaje de alertas", "security-operations", "Rapid assessment to establish relevance, priority and next action.", "Evaluación rápida para establecer relevancia, prioridad y siguiente acción."],
  ["evidence", "Digital evidence", "Evidencia digital", "forensics", "Digital information with potential value in establishing facts.", "Información digital con valor potencial para establecer hechos."],
  ["volatile-data", "Volatile data", "Datos volátiles", "forensics", "Information likely to change or disappear when a system state changes.", "Información que puede cambiar o desaparecer cuando cambia el estado del sistema."],
  ["false-positive", "False positive", "Falso positivo", "security-operations", "A detection that indicates unwanted activity when the activity is benign.", "Una detección que indica actividad no deseada cuando es legítima."],
  ["false-negative", "False negative", "Falso negativo", "security-operations", "Harmful activity that a control fails to identify.", "Actividad dañina que un control no identifica."],
  ["risk-appetite", "Risk appetite", "Apetito de riesgo", "governance", "The amount and type of risk an organisation is willing to pursue or retain.", "La cantidad y tipo de riesgo que una organización está dispuesta a asumir."],
  ["risk-tolerance", "Risk tolerance", "Tolerancia al riesgo", "governance", "Defined variation around objectives or appetite that guides escalation.", "Variación definida alrededor de objetivos o apetito que guía el escalado."],
  ["control-effectiveness", "Control effectiveness", "Eficacia del control", "governance", "Evidence of how well a control produces its intended risk outcome.", "Evidencia de hasta qué punto un control produce el resultado de riesgo previsto."],
  ["data-minimisation", "Data minimisation", "Minimización de datos", "privacy", "Limiting personal data to what is necessary for a stated purpose.", "Limitar datos personales a lo necesario para una finalidad declarada."],
  ["purpose-limitation", "Purpose limitation", "Limitación de finalidad", "privacy", "Using personal data only for defined and compatible purposes.", "Usar datos personales solo para finalidades definidas y compatibles."],
  ["consent", "Consent", "Consentimiento", "privacy", "A specific and informed indication of an individual's choice where applicable.", "Una manifestación específica e informada de la elección de una persona cuando proceda."],
  ["failover", "Failover", "Conmutación por error", "resilience", "Controlled transfer of service to an alternate resource after failure.", "Transferencia controlada del servicio a un recurso alternativo tras un fallo."],
  ["high-availability", "High availability", "Alta disponibilidad", "resilience", "Design that reduces service interruption through redundancy and recovery.", "Diseño que reduce interrupción mediante redundancia y recuperación."],
  ["single-point-failure", "Single point of failure", "Punto único de fallo", "resilience", "A component whose loss can stop an entire service or outcome.", "Un componente cuya pérdida puede detener todo un servicio o resultado."],
  ["prompt-injection", "Prompt injection", "Prompt injection", "emerging", "Untrusted instructions that attempt to redirect an AI system from intended policy.", "Instrucciones no fiables que intentan desviar un sistema de IA de su política prevista."],
  ["deepfake", "Deepfake", "Deepfake", "emerging", "Synthetic media designed or used to imitate a real person or event.", "Contenido sintético diseñado o usado para imitar a una persona o evento real."],
  ["crypto-agility", "Cryptographic agility", "Criptoagilidad", "emerging", "The ability to replace cryptographic algorithms and keys without redesigning whole systems.", "La capacidad de sustituir algoritmos y claves sin rediseñar sistemas completos."]
];

const extraEntries: GlossaryEntry[] = extra.filter(([id]) => !seen.has(id)).map(([id, en, es, category, shortEn, shortEs]) => ({
  id, term: { en, es }, shortDefinition: { en: shortEn, es: shortEs },
  detailedDefinition: { en: `${shortEn} Its practical meaning depends on the assets, threats, trust boundaries and operational context in which it is used.`, es: `${shortEs} Su significado práctico depende de activos, amenazas, límites de confianza y contexto operativo en el que se utiliza.` },
  category, relatedTerms: topics.filter(topic => topic.category === category).slice(0, 3).map(topic => topic.id), aliases: [en, es]
}));

export const glossary: GlossaryEntry[] = [...topicEntries, ...aliasEntries, ...extraEntries].sort((a, b) => a.term.en.localeCompare(b.term.en)).slice(0, Math.max(150, topicEntries.length + aliasEntries.length + extraEntries.length));
export const glossaryById = (id?: string) => glossary.find(entry => entry.id === id);
