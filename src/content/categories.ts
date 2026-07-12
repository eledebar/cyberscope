import type { Category } from "../types/content";

const c = (id: string, en: string, es: string, enDescription: string, esDescription: string, icon: string, accent: string): Category => ({ id, slug: id, title: { en, es }, description: { en: enDescription, es: esDescription }, icon, accent });

export const categories: Category[] = [
  c("foundations", "Cybersecurity Foundations", "Fundamentos de ciberseguridad", "Core language for understanding assets, threats, risk, controls and resilience.", "El lenguaje esencial para comprender activos, amenazas, riesgo, controles y resiliencia.", "Blocks", "#3DCD58"),
  c("threats", "Threats and Attacks", "Amenazas y ataques", "Defensive explanations of attacker behaviours, warning signs and response.", "Explicaciones defensivas sobre comportamientos de los atacantes, señales de alerta y respuesta.", "TriangleAlert", "#e05a5a"),
  c("identity", "Identity and Access", "Identidad y acceso", "Human and machine identity, authentication, authorisation and governance.", "Identidad humana y de máquina, autenticación, autorización y gobierno.", "Fingerprint", "#6f7fe8"),
  c("network", "Network Security", "Seguridad de redes", "Traffic, trust boundaries, segmentation, inspection and secure connectivity.", "Tráfico, límites de confianza, segmentación, inspección y conectividad segura.", "Network", "#3ba7d8"),
  c("hardening", "System Hardening", "Bastionado de sistemas", "Practical attack-surface reduction for endpoints, servers and platforms.", "Reducción práctica de la superficie de ataque en equipos, servidores y plataformas.", "Settings2", "#3DCD58"),
  c("cloud", "Cloud Security", "Seguridad en la nube", "Responsibility, identity, workloads, data and resilience in cloud services.", "Responsabilidad, identidad, cargas de trabajo, datos y resiliencia en servicios en la nube.", "Cloud", "#5f9ce8"),
  c("application", "Application Security", "Seguridad de aplicaciones", "Secure design, development, testing, dependencies, APIs and delivery pipelines.", "Diseño, desarrollo, pruebas, dependencias, API y procesos de entrega seguros.", "Code2", "#a56de2"),
  c("data", "Data Security", "Seguridad de los datos", "Classification, cryptography, lifecycle controls and loss prevention.", "Clasificación, criptografía, controles del ciclo de vida y prevención de pérdidas.", "Database", "#d49b3b"),
  c("critical-infrastructure", "Critical Infrastructure", "Infraestructuras críticas", "Safety, reliability and cyber resilience across essential services.", "Seguridad física, fiabilidad y ciberresiliencia de los servicios esenciales.", "Factory", "#e3833d"),
  c("operational-technology", "Operational Technology", "Tecnología operacional", "Industrial control systems, safe architectures and operational continuity.", "Sistemas de control industrial, arquitecturas seguras y continuidad operativa.", "CircuitBoard", "#4cb59d"),
  c("incident-response", "Incident Response", "Respuesta a incidentes", "Preparation, analysis, containment, recovery and communication.", "Preparación, análisis, contención, recuperación y comunicación.", "Siren", "#e05a5a"),
  c("forensics", "Digital Forensics", "Informática forense", "Evidence preservation and defensible analysis across digital environments.", "Preservación de evidencias y análisis defendible en entornos digitales.", "SearchCheck", "#667788"),
  c("security-operations", "Security Operations", "Operaciones de seguridad", "Telemetry, detection engineering, triage, threat hunting and automation.", "Telemetría, ingeniería de detección, triaje, búsqueda de amenazas y automatización.", "Radar", "#3ba7d8"),
  c("governance", "Governance and Risk", "Gobierno y riesgo", "Accountability, policy, risk decisions, assurance and compliance.", "Responsabilidad, políticas, decisiones de riesgo, aseguramiento y cumplimiento.", "Scale", "#8a7db8"),
  c("privacy", "Privacy", "Privacidad", "Responsible handling of personal data and privacy-aware design.", "Tratamiento responsable de datos personales y diseño respetuoso con la privacidad.", "EyeOff", "#bd6b9e"),
  c("resilience", "Resilience and Recovery", "Resiliencia y recuperación", "Continuity, backups, recovery objectives and dependable restoration.", "Continuidad, copias, objetivos de recuperación y restauración fiable.", "RefreshCcw", "#43a86b"),
  c("emerging", "Emerging Technologies", "Tecnologías emergentes", "Present and future security implications of AI, quantum, IoT and connected systems.", "Implicaciones de seguridad presentes y futuras de IA, cuántica, IoT y sistemas conectados.", "Sparkles", "#8b73d6")
];

export const categoryById = (id: string) => categories.find(category => category.id === id);
