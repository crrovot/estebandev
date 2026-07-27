export type Locale = "en" | "es" | "pt"

export const locales: Locale[] = ["es", "en", "pt"]

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
}

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
}

export type Track = "backend" | "frontend"

export type DitherShape = "simplex" | "warp" | "dots" | "wave" | "ripple" | "swirl" | "sphere"

type Stat = { value: string; label: string }

export type Project = {
  id: string
  kicker: string
  title: string
  summary: string
  preview: string
  metrics: string[]
  stack: string[]
  shape: DitherShape
}

type SkillGroup = { group: string; items: string[] }

type TrackContent = {
  label: string
  headline: string
  tagline: string
  stats: Stat[]
  facts: string[]
  projects: Project[]
  skills: SkillGroup[]
}

type TimelineItem = {
  org: string
  role: string
  period: string
  place: string
  bullets: string[]
}

export type Dictionary = {
  metaTitle: string
  metaDescription: string
  brand: string
  name: string
  role: string
  location: string
  phone: string
  email: string
  sections: {
    facts: string
    work: string
    stack: string
    experience: string
    education: string
    certifications: string
    contact: string
  }
  ui: {
    hoverHint: string
    trackHint: string
    impact: string
    inProgress: string
    availability: string
    ctaTitle: string
    ctaBody: string
    ctaEmail: string
    ctaLinkedin: string
    ctaGithub: string
    ctaWhatsapp: string
  }
  a11y: {
    toggleTheme: string
    language: string
    switchTo: string
    switchTrack: string
  }
  tracks: Record<Track, TrackContent>
  experience: TimelineItem[]
  education: TimelineItem[]
  certifications: { name: string; issuer: string; year: string }[]
  languages: { name: string; level: string }[]
}

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    metaTitle: "Esteban Restrepo — Backend & AI Engineer",
    metaDescription:
      "Portafolio de Esteban Restrepo Escobar, Ingeniero de Software backend y de IA en Santiago de Chile. Ruby on Rails, Python, AWS y agentes inteligentes.",
    brand: "esteban.dev",
    name: "ESTEBAN RESTREPO ESCOBAR",
    role: "SOFTWARE ENGINEER · BACKEND & AI",
    location: "Santiago, Chile",
    phone: "+56 9 4746 2118",
    email: "estebanrestrepoe@gmail.com",
    sections: {
      facts: "Datos clave",
      work: "Trabajo seleccionado",
      stack: "Stack",
      experience: "Experiencia",
      education: "Educación",
      certifications: "Certificaciones",
      contact: "Contacto",
    },
    ui: {
      hoverHint: "Pasa el mouse sobre una tarjeta para ver el detalle",
      trackHint: "Modo oscuro = backend · Modo claro = frontend & producto",
      impact: "Impacto",
      inProgress: "En preparación",
      availability: "Disponible para roles backend / IA en Chile y remoto LATAM",
      ctaTitle: "¿Buscas un ingeniero backend con IA de verdad en producción?",
      ctaBody:
        "Respondo el mismo día. Puedo mostrarte código, arquitectura y métricas reales de los proyectos de esta página.",
      ctaEmail: "Escríbeme",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
      ctaWhatsapp: "WhatsApp",
    },
    a11y: {
      toggleTheme: "Cambiar entre backend y frontend",
      language: "Idioma",
      switchTo: "Cambiar idioma a",
      switchTrack: "Cambiar de pista de contenido",
    },
    tracks: {
      backend: {
        label: "BACKEND",
        headline: "Construyo el motor que nadie ve.",
        tagline:
          "3+ años diseñando APIs, agentes de IA y automatizaciones que mueven miles de mensajes y decisiones por día.",
        stats: [
          { value: "3+", label: "años en backend & IA" },
          { value: "2", label: "certificaciones AWS (1 en curso)" },
          { value: "24/7", label: "servicios monitoreados con Langfuse" },
          { value: "3", label: "idiomas de trabajo" },
        ],
        facts: [
          "Empecé estudiando contabilidad y terminé escribiendo agentes de IA: leo un balance y un stacktrace con la misma calma.",
          "Depuro LLMs como microservicios: latencia, costo por token y tasa de error en un mismo tablero.",
          "Mi primer despliegue serio fue en una EC2 a las 3 AM. Hoy hago lo mismo con Terraform y sin sustos.",
          "La API oficial de WhatsApp tiene más reglas que un reglamento tributario. Las conozco todas.",
          "Escribo Ruby cuando quiero elegancia y Python cuando quiero que la IA obedezca.",
        ],
        projects: [
          {
            id: "whatsapp-engine",
            kicker: "Automatización",
            title: "Motor de envío masivo WhatsApp",
            summary: "Integración con la API oficial de WhatsApp para mensajería masiva con cumplimiento estricto.",
            preview:
              "Construí el motor completo: manejo de plantillas aprobadas, colas de envío, control de rate limits, reintentos y trazabilidad por mensaje. Cada envío queda auditado, así el equipo comercial puede escalar campañas sin arriesgar el número de la empresa.",
            metrics: ["Envío masivo sin bloqueos de la cuenta", "Trazabilidad de entrega por mensaje", "Colas con reintentos automáticos"],
            stack: ["Ruby on Rails", "WhatsApp Cloud API", "SQL", "Sidekiq"],
            shape: "wave",
          },
          {
            id: "llm-observability",
            kicker: "Observabilidad IA",
            title: "Arquitectura de observabilidad para LLMs",
            summary: "Integré Langfuse para ver por dentro cada llamada a modelos de lenguaje.",
            preview:
              "Instrumenté los servicios de IA de la compañía con trazas, spans y scores. Ahora se ve en tiempo real la latencia, el costo en tokens y la calidad de cada prompt, lo que redujo drásticamente el tiempo de depuración de comportamientos raros del modelo.",
            metrics: ["Menos tiempo de depuración", "Costo por token visible por feature", "Alertas de latencia y errores"],
            stack: ["Langfuse", "Python", "Ruby on Rails", "REST APIs"],
            shape: "simplex",
          },
          {
            id: "ai-agents",
            kicker: "Agentes de IA",
            title: "Agentes internos con tooling propio",
            summary: "Agentes autónomos con function calling conectados a la lógica de negocio real.",
            preview:
              "Diseñé agentes que no solo conversan: consultan bases de datos, disparan acciones internas y escalan a un humano cuando no están seguros. El tooling personalizado los mantiene dentro de reglas de negocio explícitas y auditables.",
            metrics: ["Atención al cliente automatizada", "Herramientas con permisos acotados", "Escalamiento a humano controlado"],
            stack: ["Python", "Function calling", "Rails", "PostgreSQL"],
            shape: "swirl",
          },
          {
            id: "analytics",
            kicker: "Datos",
            title: "Tableros de conversión conversacional",
            summary: "Backend analítico para medir qué conversaciones de WhatsApp terminan en venta.",
            preview:
              "Modelé los eventos de cada conversación y expuse endpoints agregados para medir embudo, tiempo de respuesta y conversión por campaña. Mi background contable ayudó a definir métricas que el área comercial realmente usa.",
            metrics: ["Embudo conversacional completo", "Métricas por campaña y agente", "Decisiones con datos, no intuición"],
            stack: ["SQL", "Rails", "Python", "Data modeling"],
            shape: "dots",
          },
          {
            id: "cloud",
            kicker: "Cloud & DevOps",
            title: "Infraestructura reproducible en AWS",
            summary: "Contenedores, IaC y despliegues que se repiten igual todas las veces.",
            preview:
              "Empaqueto servicios con Docker, los orquesto en Kubernetes y describo la infraestructura con Terraform sobre AWS (EC2, S3, Lambda, IAM). El objetivo es simple: que levantar el entorno nunca dependa de la memoria de nadie.",
            metrics: ["Entornos reproducibles", "Despliegues sin pasos manuales", "Permisos IAM con mínimo privilegio"],
            stack: ["AWS", "Docker", "Kubernetes", "Terraform", "Bash"],
            shape: "sphere",
          },
        ],
        skills: [
          { group: "Backend & IA", items: ["Ruby on Rails", "Python", "Django", "REST APIs", "SQL", "Langfuse", "AI Agents"] },
          { group: "Cloud & DevOps", items: ["AWS EC2", "S3", "Lambda", "IAM", "Docker", "Kubernetes", "Terraform", "Linux", "Bash"] },
          { group: "Proceso", items: ["Scrum", "Jira", "Confluence", "CI/CD", "Microservicios", "Git"] },
        ],
      },
      frontend: {
        label: "FRONTEND",
        headline: "Y también la cara que sí se ve.",
        tagline:
          "Interfaces, integraciones de pago y comunicación con negocio: la parte donde el backend se vuelve algo que alguien puede usar.",
        stats: [
          { value: "5", label: "semestres de formación en negocios" },
          { value: "1", label: "presidencia estudiantil electa" },
          { value: "400+", label: "horas de bootcamp cloud" },
          { value: "0", label: "reuniones sin documentar" },
        ],
        facts: [
          "Fui elegido Presidente del Departamento de Negocios en INACAP: traducir entre directivos y estudiantes es igual que traducir entre negocio y tech.",
          "Hablo portugués conversacional avanzado, así que las reuniones con equipos de Brasil no necesitan intérprete.",
          "Antes de escribir una línea de código pregunto qué métrica se quiere mover.",
          "Documento en Confluence como si el próximo dev fuera yo con amnesia.",
          "Sé leer una pasarela de pago desde los dos lados: el checkout y la conciliación contable.",
        ],
        projects: [
          {
            id: "dashboards-ui",
            kicker: "Producto & datos",
            title: "Tableros analíticos para el área comercial",
            summary: "De consultas SQL a paneles que un vendedor entiende en cinco segundos.",
            preview:
              "Definí junto al equipo comercial qué métricas importaban y diseñé la lectura de los tableros: jerarquía visual, comparaciones por periodo y un único número protagonista por pantalla. El resultado es un panel que se usa a diario, no uno que se abre el primer día.",
            metrics: ["Una métrica protagonista por vista", "Comparación por periodo y campaña", "Adopción diaria del equipo"],
            stack: ["Data viz", "SQL", "UX de dashboards", "Jira"],
            shape: "dots",
          },
          {
            id: "ecommerce",
            kicker: "E-commerce",
            title: "Integraciones de pago y checkout",
            summary: "Pasarelas de pago conectadas de punta a punta, incluyendo el lado contable.",
            preview:
              "Integré pasarelas de pago y flujos de e-commerce cuidando los estados intermedios que suelen olvidarse: pago pendiente, rechazado, reembolsado y conciliado. Mi formación contable hace que el reporte final cuadre.",
            metrics: ["Estados de pago completos", "Conciliación clara", "Menos tickets de soporte"],
            stack: ["Pasarelas de pago", "Rails", "REST APIs", "Webhooks"],
            shape: "ripple",
          },
          {
            id: "conversations-panel",
            kicker: "Interfaz",
            title: "Panel de conversaciones asistidas por IA",
            summary: "La cara visible de los agentes: el humano siempre puede tomar el control.",
            preview:
              "Pensé la interfaz donde el equipo supervisa lo que responde la IA: contexto de la conversación, sugerencia del agente y un botón claro para intervenir. La confianza en la IA se gana con una buena interfaz de control, no con promesas.",
            metrics: ["Intervención humana en un clic", "Contexto del agente visible", "Auditoría de cada respuesta"],
            stack: ["React", "Next.js", "Tailwind CSS", "Diseño de interacción"],
            shape: "warp",
          },
          {
            id: "portfolio",
            kicker: "Side project",
            title: "Este portafolio trilingüe",
            summary: "Un CV que cambia de idioma y de perfil según quién lo mire.",
            preview:
              "Detecta el idioma del navegador entre español, inglés y portugués, y separa el contenido en dos pistas: backend en modo oscuro, producto y frontend en modo claro. Construido con Next.js, Tailwind y shaders animados en WebGL.",
            metrics: ["3 idiomas con detección automática", "2 pistas de contenido", "Shaders WebGL en tiempo real"],
            stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebGL"],
            shape: "swirl",
          },
          {
            id: "leadership",
            kicker: "Personas",
            title: "Coordinación ágil y documentación",
            summary: "Scrum, Jira y Confluence usados de verdad, no como decoración.",
            preview:
              "Coordino flujos de trabajo, estimación de requerimientos y documentación técnica del equipo. Hago las preguntas incómodas en el refinamiento para que no aparezcan en producción.",
            metrics: ["Requerimientos estimados y trazables", "Documentación técnica viva", "Comunicación con stakeholders"],
            stack: ["Scrum", "Jira", "Confluence", "Facilitación"],
            shape: "simplex",
          },
        ],
        skills: [
          { group: "Interfaz", items: ["React", "Next.js", "Tailwind CSS", "Diseño de dashboards", "Accesibilidad"] },
          { group: "Negocio", items: ["Métricas de conversión", "Analítica comercial", "Pasarelas de pago", "E-commerce"] },
          { group: "Personas", items: ["Scrum", "Jira", "Confluence", "Liderazgo", "Comunicación multicultural"] },
        ],
      },
    },
    experience: [
      {
        org: "APPTEC",
        role: "Software Engineer · Backend & AI Specialist",
        period: "Mayo 2024 → Presente",
        place: "Santiago, Chile",
        bullets: [
          "Lidero el backend e integraciones críticas en Ruby on Rails y Python, asegurando escalabilidad y alta disponibilidad.",
          "Implementé la observabilidad de servicios de IA con Langfuse: latencia, costo de tokens y performance de LLMs en tiempo real.",
          "Desarrollé agentes de IA con tooling propio que automatizan flujos de atención al cliente.",
          "Construí el motor de envío masivo sobre la API oficial de WhatsApp bajo estrictas políticas de cumplimiento.",
          "Diseñé tableros analíticos de conversión conversacional para decisiones comerciales basadas en datos.",
          "Coordino el equipo con Jira y Confluence bajo metodología Scrum.",
        ],
      },
    ],
    education: [
      {
        org: "GENERATION CHILE",
        role: "Administrador Cloud AWS re/Start · Graduado",
        period: "2024",
        place: "Santiago, Chile",
        bullets: ["Programa intensivo de 400+ horas en arquitectura AWS, Linux, Python y bases de datos."],
      },
      {
        org: "INACAP",
        role: "Contador General · 5 semestres cursados",
        period: "—",
        place: "Santiago, Chile",
        bullets: ["Presidente electo del Departamento de Negocios, enlace entre directivos y cuerpo estudiantil."],
      },
    ],
    certifications: [
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
      { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "En preparación" },
      { name: "CS50's Introduction to AI with Python", issuer: "HarvardX", year: "2024" },
      { name: "Django & Python Full Stack Developer", issuer: "Udemy", year: "2024" },
      { name: "Docker y Kubernetes en AWS desde cero", issuer: "Udemy", year: "2024" },
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Portugués", level: "Conversacional avanzado" },
      { name: "Inglés", level: "B1 intermedio" },
    ],
  },

  en: {
    metaTitle: "Esteban Restrepo — Backend & AI Engineer",
    metaDescription:
      "Portfolio of Esteban Restrepo Escobar, backend and AI software engineer based in Santiago, Chile. Ruby on Rails, Python, AWS and autonomous agents.",
    brand: "esteban.dev",
    name: "ESTEBAN RESTREPO ESCOBAR",
    role: "SOFTWARE ENGINEER · BACKEND & AI",
    location: "Santiago, Chile",
    phone: "+56 9 4746 2118",
    email: "estebanrestrepoe@gmail.com",
    sections: {
      facts: "Key facts",
      work: "Selected work",
      stack: "Stack",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      contact: "Contact",
    },
    ui: {
      hoverHint: "Hover a card to reveal the details",
      trackHint: "Dark mode = backend · Light mode = frontend & product",
      impact: "Impact",
      inProgress: "In progress",
      availability: "Open to backend / AI roles in Chile and remote across LATAM",
      ctaTitle: "Looking for a backend engineer with real AI in production?",
      ctaBody: "I reply the same day, and I can walk you through the code, architecture and real metrics behind this page.",
      ctaEmail: "Email me",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
      ctaWhatsapp: "WhatsApp",
    },
    a11y: {
      toggleTheme: "Switch between backend and frontend",
      language: "Language",
      switchTo: "Switch language to",
      switchTrack: "Switch content track",
    },
    tracks: {
      backend: {
        label: "BACKEND",
        headline: "I build the engine nobody sees.",
        tagline: "3+ years designing APIs, AI agents and automations that move thousands of messages and decisions a day.",
        stats: [
          { value: "3+", label: "years in backend & AI" },
          { value: "2", label: "AWS certifications (1 in progress)" },
          { value: "24/7", label: "services traced with Langfuse" },
          { value: "3", label: "working languages" },
        ],
        facts: [
          "I started out studying accounting and ended up writing AI agents: I read a balance sheet and a stacktrace with the same calm.",
          "I debug LLMs like microservices: latency, cost per token and error rate on a single dashboard.",
          "My first serious deploy was on an EC2 box at 3 AM. Now I do the same thing with Terraform and no adrenaline.",
          "The official WhatsApp API has more rules than a tax code. I know all of them.",
          "I write Ruby when I want elegance and Python when I want the AI to behave.",
        ],
        projects: [
          {
            id: "whatsapp-engine",
            kicker: "Automation",
            title: "WhatsApp bulk messaging engine",
            summary: "Official WhatsApp API integration for compliant, large-scale messaging.",
            preview:
              "I built the whole engine: approved template handling, send queues, rate-limit control, retries and per-message traceability. Every send is auditable, so the sales team can scale campaigns without risking the company number.",
            metrics: ["Bulk sending without account blocks", "Per-message delivery traceability", "Queues with automatic retries"],
            stack: ["Ruby on Rails", "WhatsApp Cloud API", "SQL", "Sidekiq"],
            shape: "wave",
          },
          {
            id: "llm-observability",
            kicker: "AI observability",
            title: "LLM observability architecture",
            summary: "Langfuse integration to see inside every language-model call.",
            preview:
              "I instrumented the company's AI services with traces, spans and scores. Latency, token cost and prompt quality are now visible in real time, which dramatically cut the time spent debugging odd model behaviour.",
            metrics: ["Less debugging time", "Token cost visible per feature", "Latency and error alerting"],
            stack: ["Langfuse", "Python", "Ruby on Rails", "REST APIs"],
            shape: "simplex",
          },
          {
            id: "ai-agents",
            kicker: "AI agents",
            title: "Internal agents with custom tooling",
            summary: "Autonomous agents with function calling wired into real business logic.",
            preview:
              "I designed agents that do more than chat: they query databases, trigger internal actions and hand off to a human when confidence drops. Custom tooling keeps them inside explicit, auditable business rules.",
            metrics: ["Automated customer support flows", "Tools with scoped permissions", "Controlled human handoff"],
            stack: ["Python", "Function calling", "Rails", "PostgreSQL"],
            shape: "swirl",
          },
          {
            id: "analytics",
            kicker: "Data",
            title: "Conversational conversion dashboards",
            summary: "Analytics backend measuring which WhatsApp conversations end in a sale.",
            preview:
              "I modelled conversation events and exposed aggregated endpoints for funnel, response time and conversion per campaign. My accounting background helped define metrics the sales team actually uses.",
            metrics: ["Full conversational funnel", "Metrics per campaign and agent", "Decisions from data, not hunches"],
            stack: ["SQL", "Rails", "Python", "Data modeling"],
            shape: "dots",
          },
          {
            id: "cloud",
            kicker: "Cloud & DevOps",
            title: "Reproducible AWS infrastructure",
            summary: "Containers, IaC and deploys that come out identical every time.",
            preview:
              "I package services with Docker, orchestrate them on Kubernetes and describe infrastructure with Terraform on AWS (EC2, S3, Lambda, IAM). The goal is simple: bringing up an environment should never depend on anyone's memory.",
            metrics: ["Reproducible environments", "No manual deploy steps", "Least-privilege IAM"],
            stack: ["AWS", "Docker", "Kubernetes", "Terraform", "Bash"],
            shape: "sphere",
          },
        ],
        skills: [
          { group: "Backend & AI", items: ["Ruby on Rails", "Python", "Django", "REST APIs", "SQL", "Langfuse", "AI Agents"] },
          { group: "Cloud & DevOps", items: ["AWS EC2", "S3", "Lambda", "IAM", "Docker", "Kubernetes", "Terraform", "Linux", "Bash"] },
          { group: "Process", items: ["Scrum", "Jira", "Confluence", "CI/CD", "Microservices", "Git"] },
        ],
      },
      frontend: {
        label: "FRONTEND",
        headline: "And the face you actually see.",
        tagline: "Interfaces, payment integrations and business conversations: where the backend turns into something usable.",
        stats: [
          { value: "5", label: "semesters of business training" },
          { value: "1", label: "elected student presidency" },
          { value: "400+", label: "hours of cloud bootcamp" },
          { value: "0", label: "undocumented meetings" },
        ],
        facts: [
          "I was elected President of the Business Department at INACAP: translating between directors and students is the same job as translating between business and tech.",
          "I speak advanced conversational Portuguese, so meetings with Brazilian teams need no interpreter.",
          "Before writing a line of code I ask which metric we are trying to move.",
          "I document in Confluence as if the next developer were me with amnesia.",
          "I can read a payment gateway from both sides: the checkout and the accounting reconciliation.",
        ],
        projects: [
          {
            id: "dashboards-ui",
            kicker: "Product & data",
            title: "Analytics dashboards for the sales team",
            summary: "From SQL queries to panels a salesperson understands in five seconds.",
            preview:
              "I defined with the sales team which metrics mattered and designed how the dashboards read: visual hierarchy, period comparisons and a single hero number per screen. The result is a panel used daily, not one opened once.",
            metrics: ["One hero metric per view", "Period and campaign comparison", "Daily team adoption"],
            stack: ["Data viz", "SQL", "Dashboard UX", "Jira"],
            shape: "dots",
          },
          {
            id: "ecommerce",
            kicker: "E-commerce",
            title: "Payment and checkout integrations",
            summary: "Payment gateways wired end to end, accounting side included.",
            preview:
              "I integrated payment gateways and e-commerce flows while handling the in-between states everyone forgets: pending, declined, refunded and reconciled. My accounting training makes the final report add up.",
            metrics: ["Complete payment state machine", "Clean reconciliation", "Fewer support tickets"],
            stack: ["Payment gateways", "Rails", "REST APIs", "Webhooks"],
            shape: "ripple",
          },
          {
            id: "conversations-panel",
            kicker: "Interface",
            title: "AI-assisted conversation console",
            summary: "The visible face of the agents: a human can always take over.",
            preview:
              "I shaped the interface where the team supervises what the AI answers: conversation context, the agent's suggestion and one obvious button to step in. Trust in AI is earned with good control surfaces, not promises.",
            metrics: ["One-click human takeover", "Agent context always visible", "Every answer auditable"],
            stack: ["React", "Next.js", "Tailwind CSS", "Interaction design"],
            shape: "warp",
          },
          {
            id: "portfolio",
            kicker: "Side project",
            title: "This trilingual portfolio",
            summary: "A CV that changes language and profile depending on who is reading it.",
            preview:
              "It detects the browser language across Spanish, English and Portuguese, and splits the content into two tracks: backend in dark mode, product and frontend in light mode. Built with Next.js, Tailwind and animated WebGL shaders.",
            metrics: ["3 languages, auto-detected", "2 content tracks", "Real-time WebGL shaders"],
            stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebGL"],
            shape: "swirl",
          },
          {
            id: "leadership",
            kicker: "People",
            title: "Agile coordination and documentation",
            summary: "Scrum, Jira and Confluence used for real, not as decoration.",
            preview:
              "I coordinate workflows, requirement estimation and the team's technical documentation. I ask the uncomfortable questions during refinement so they don't show up in production.",
            metrics: ["Estimated, traceable requirements", "Living technical docs", "Stakeholder communication"],
            stack: ["Scrum", "Jira", "Confluence", "Facilitation"],
            shape: "simplex",
          },
        ],
        skills: [
          { group: "Interface", items: ["React", "Next.js", "Tailwind CSS", "Dashboard design", "Accessibility"] },
          { group: "Business", items: ["Conversion metrics", "Sales analytics", "Payment gateways", "E-commerce"] },
          { group: "People", items: ["Scrum", "Jira", "Confluence", "Leadership", "Cross-cultural communication"] },
        ],
      },
    },
    experience: [
      {
        org: "APPTEC",
        role: "Software Engineer · Backend & AI Specialist",
        period: "May 2024 → Present",
        place: "Santiago, Chile",
        bullets: [
          "I lead the backend and critical integrations in Ruby on Rails and Python, ensuring scalability and high availability.",
          "Implemented AI service observability with Langfuse: latency, token cost and LLM performance in real time.",
          "Built internal AI agents with custom tooling that automate customer support flows.",
          "Built the bulk messaging engine on the official WhatsApp API under strict compliance policies.",
          "Designed conversational conversion dashboards for data-driven commercial decisions.",
          "Coordinate the team with Jira and Confluence under Scrum.",
        ],
      },
    ],
    education: [
      {
        org: "GENERATION CHILE",
        role: "AWS Cloud Administrator re/Start · Graduate",
        period: "2024",
        place: "Santiago, Chile",
        bullets: ["400+ hour intensive program on AWS architecture, Linux, Python and databases."],
      },
      {
        org: "INACAP",
        role: "General Accounting · 5 semesters completed",
        period: "—",
        place: "Santiago, Chile",
        bullets: ["Elected President of the Business Department, bridging faculty leadership and the student body."],
      },
    ],
    certifications: [
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
      { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "In progress" },
      { name: "CS50's Introduction to AI with Python", issuer: "HarvardX", year: "2024" },
      { name: "Django & Python Full Stack Developer", issuer: "Udemy", year: "2024" },
      { name: "Docker and Kubernetes on AWS from scratch", issuer: "Udemy", year: "2024" },
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "Portuguese", level: "Advanced conversational" },
      { name: "English", level: "B1 intermediate" },
    ],
  },

  pt: {
    metaTitle: "Esteban Restrepo — Engenheiro Backend & IA",
    metaDescription:
      "Portfólio de Esteban Restrepo Escobar, engenheiro de software backend e IA em Santiago, Chile. Ruby on Rails, Python, AWS e agentes autônomos.",
    brand: "esteban.dev",
    name: "ESTEBAN RESTREPO ESCOBAR",
    role: "SOFTWARE ENGINEER · BACKEND & IA",
    location: "Santiago, Chile",
    phone: "+56 9 4746 2118",
    email: "estebanrestrepoe@gmail.com",
    sections: {
      facts: "Dados principais",
      work: "Trabalhos selecionados",
      stack: "Stack",
      experience: "Experiência",
      education: "Formação",
      certifications: "Certificações",
      contact: "Contato",
    },
    ui: {
      hoverHint: "Passe o mouse em um cartão para ver o detalhe",
      trackHint: "Modo escuro = backend · Modo claro = frontend & produto",
      impact: "Impacto",
      inProgress: "Em andamento",
      availability: "Aberto a vagas backend / IA no Chile e remoto na América Latina",
      ctaTitle: "Procurando um engenheiro backend com IA de verdade em produção?",
      ctaBody: "Respondo no mesmo dia e posso mostrar código, arquitetura e métricas reais dos projetos desta página.",
      ctaEmail: "Fale comigo",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
      ctaWhatsapp: "WhatsApp",
    },
    a11y: {
      toggleTheme: "Alternar entre backend e frontend",
      language: "Idioma",
      switchTo: "Mudar idioma para",
      switchTrack: "Mudar a trilha de conteúdo",
    },
    tracks: {
      backend: {
        label: "BACKEND",
        headline: "Construo o motor que ninguém vê.",
        tagline: "3+ anos desenhando APIs, agentes de IA e automações que movem milhares de mensagens e decisões por dia.",
        stats: [
          { value: "3+", label: "anos em backend & IA" },
          { value: "2", label: "certificações AWS (1 em andamento)" },
          { value: "24/7", label: "serviços monitorados com Langfuse" },
          { value: "3", label: "idiomas de trabalho" },
        ],
        facts: [
          "Comecei estudando contabilidade e terminei escrevendo agentes de IA: leio um balanço e um stacktrace com a mesma calma.",
          "Depuro LLMs como microsserviços: latência, custo por token e taxa de erro no mesmo painel.",
          "Meu primeiro deploy sério foi numa EC2 às 3 da manhã. Hoje faço o mesmo com Terraform e sem adrenalina.",
          "A API oficial do WhatsApp tem mais regras que um código tributário. Conheço todas.",
          "Escrevo Ruby quando quero elegância e Python quando quero que a IA obedeça.",
        ],
        projects: [
          {
            id: "whatsapp-engine",
            kicker: "Automação",
            title: "Motor de envio em massa no WhatsApp",
            summary: "Integração com a API oficial do WhatsApp para mensageria em escala e em conformidade.",
            preview:
              "Construí o motor completo: gestão de templates aprovados, filas de envio, controle de rate limit, retentativas e rastreabilidade por mensagem. Cada envio fica auditado, então o time comercial escala campanhas sem arriscar o número da empresa.",
            metrics: ["Envio em massa sem bloqueios", "Rastreabilidade de entrega por mensagem", "Filas com retentativa automática"],
            stack: ["Ruby on Rails", "WhatsApp Cloud API", "SQL", "Sidekiq"],
            shape: "wave",
          },
          {
            id: "llm-observability",
            kicker: "Observabilidade de IA",
            title: "Arquitetura de observabilidade para LLMs",
            summary: "Integrei o Langfuse para ver por dentro cada chamada aos modelos de linguagem.",
            preview:
              "Instrumentei os serviços de IA da empresa com traces, spans e scores. Latência, custo em tokens e qualidade de prompt agora são visíveis em tempo real, o que reduziu muito o tempo de depuração de comportamentos estranhos do modelo.",
            metrics: ["Menos tempo de depuração", "Custo por token visível por feature", "Alertas de latência e erros"],
            stack: ["Langfuse", "Python", "Ruby on Rails", "REST APIs"],
            shape: "simplex",
          },
          {
            id: "ai-agents",
            kicker: "Agentes de IA",
            title: "Agentes internos com tooling próprio",
            summary: "Agentes autônomos com function calling ligados à lógica de negócio real.",
            preview:
              "Desenhei agentes que fazem mais do que conversar: consultam bancos de dados, disparam ações internas e passam para um humano quando a confiança cai. O tooling personalizado os mantém dentro de regras de negócio explícitas e auditáveis.",
            metrics: ["Atendimento automatizado", "Ferramentas com permissões restritas", "Transferência controlada para humano"],
            stack: ["Python", "Function calling", "Rails", "PostgreSQL"],
            shape: "swirl",
          },
          {
            id: "analytics",
            kicker: "Dados",
            title: "Painéis de conversão conversacional",
            summary: "Backend analítico para medir quais conversas de WhatsApp terminam em venda.",
            preview:
              "Modelei os eventos de cada conversa e expus endpoints agregados para funil, tempo de resposta e conversão por campanha. Minha base contábil ajudou a definir métricas que o comercial realmente usa.",
            metrics: ["Funil conversacional completo", "Métricas por campanha e agente", "Decisões com dados, não intuição"],
            stack: ["SQL", "Rails", "Python", "Modelagem de dados"],
            shape: "dots",
          },
          {
            id: "cloud",
            kicker: "Cloud & DevOps",
            title: "Infraestrutura reprodutível na AWS",
            summary: "Contêineres, IaC e deploys que saem iguais todas as vezes.",
            preview:
              "Empacoto serviços com Docker, orquestro no Kubernetes e descrevo a infraestrutura com Terraform na AWS (EC2, S3, Lambda, IAM). O objetivo é simples: subir o ambiente nunca deve depender da memória de alguém.",
            metrics: ["Ambientes reprodutíveis", "Deploys sem passos manuais", "IAM com privilégio mínimo"],
            stack: ["AWS", "Docker", "Kubernetes", "Terraform", "Bash"],
            shape: "sphere",
          },
        ],
        skills: [
          { group: "Backend & IA", items: ["Ruby on Rails", "Python", "Django", "REST APIs", "SQL", "Langfuse", "AI Agents"] },
          { group: "Cloud & DevOps", items: ["AWS EC2", "S3", "Lambda", "IAM", "Docker", "Kubernetes", "Terraform", "Linux", "Bash"] },
          { group: "Processo", items: ["Scrum", "Jira", "Confluence", "CI/CD", "Microsserviços", "Git"] },
        ],
      },
      frontend: {
        label: "FRONTEND",
        headline: "E também a cara que se vê.",
        tagline: "Interfaces, integrações de pagamento e conversa com o negócio: onde o backend vira algo utilizável.",
        stats: [
          { value: "5", label: "semestres de formação em negócios" },
          { value: "1", label: "presidência estudantil eleita" },
          { value: "400+", label: "horas de bootcamp cloud" },
          { value: "0", label: "reuniões sem documentação" },
        ],
        facts: [
          "Fui eleito Presidente do Departamento de Negócios no INACAP: traduzir entre diretoria e estudantes é o mesmo trabalho que traduzir entre negócio e tecnologia.",
          "Falo português conversacional avançado, então reuniões com times do Brasil não precisam de intérprete.",
          "Antes de escrever uma linha de código eu pergunto qual métrica queremos mover.",
          "Documento no Confluence como se o próximo dev fosse eu com amnésia.",
          "Sei ler uma pasarela de pagamento pelos dois lados: o checkout e a conciliação contábil.",
        ],
        projects: [
          {
            id: "dashboards-ui",
            kicker: "Produto & dados",
            title: "Painéis analíticos para o comercial",
            summary: "De consultas SQL a painéis que um vendedor entende em cinco segundos.",
            preview:
              "Defini com o time comercial quais métricas importavam e desenhei a leitura dos painéis: hierarquia visual, comparações por período e um único número protagonista por tela. O resultado é um painel usado diariamente, não aberto só no primeiro dia.",
            metrics: ["Uma métrica protagonista por tela", "Comparação por período e campanha", "Adoção diária do time"],
            stack: ["Data viz", "SQL", "UX de dashboards", "Jira"],
            shape: "dots",
          },
          {
            id: "ecommerce",
            kicker: "E-commerce",
            title: "Integrações de pagamento e checkout",
            summary: "Pasarelas de pagamento ligadas ponta a ponta, incluindo o lado contábil.",
            preview:
              "Integrei pasarelas de pagamento e fluxos de e-commerce cuidando dos estados intermediários que todos esquecem: pendente, recusado, reembolsado e conciliado. Minha formação contábil faz o relatório final fechar.",
            metrics: ["Estados de pagamento completos", "Conciliação limpa", "Menos tickets de suporte"],
            stack: ["Pagamentos", "Rails", "REST APIs", "Webhooks"],
            shape: "ripple",
          },
          {
            id: "conversations-panel",
            kicker: "Interface",
            title: "Console de conversas assistidas por IA",
            summary: "A face visível dos agentes: o humano sempre pode assumir.",
            preview:
              "Desenhei a interface onde o time supervisiona o que a IA responde: contexto da conversa, sugestão do agente e um botão claro para intervir. A confiança na IA se ganha com boas superfícies de controle, não com promessas.",
            metrics: ["Intervenção humana em um clique", "Contexto do agente sempre visível", "Cada resposta auditável"],
            stack: ["React", "Next.js", "Tailwind CSS", "Design de interação"],
            shape: "warp",
          },
          {
            id: "portfolio",
            kicker: "Projeto pessoal",
            title: "Este portfólio trilíngue",
            summary: "Um CV que muda de idioma e de perfil conforme quem o lê.",
            preview:
              "Detecta o idioma do navegador entre espanhol, inglês e português e separa o conteúdo em duas trilhas: backend no modo escuro, produto e frontend no modo claro. Feito com Next.js, Tailwind e shaders animados em WebGL.",
            metrics: ["3 idiomas com detecção automática", "2 trilhas de conteúdo", "Shaders WebGL em tempo real"],
            stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebGL"],
            shape: "swirl",
          },
          {
            id: "leadership",
            kicker: "Pessoas",
            title: "Coordenação ágil e documentação",
            summary: "Scrum, Jira e Confluence usados de verdade, não como decoração.",
            preview:
              "Coordeno fluxos de trabalho, estimativa de requisitos e a documentação técnica do time. Faço as perguntas incômodas no refinamento para que não apareçam em produção.",
            metrics: ["Requisitos estimados e rastreáveis", "Documentação técnica viva", "Comunicação com stakeholders"],
            stack: ["Scrum", "Jira", "Confluence", "Facilitação"],
            shape: "simplex",
          },
        ],
        skills: [
          { group: "Interface", items: ["React", "Next.js", "Tailwind CSS", "Design de dashboards", "Acessibilidade"] },
          { group: "Negócio", items: ["Métricas de conversão", "Analytics comercial", "Pagamentos", "E-commerce"] },
          { group: "Pessoas", items: ["Scrum", "Jira", "Confluence", "Liderança", "Comunicação multicultural"] },
        ],
      },
    },
    experience: [
      {
        org: "APPTEC",
        role: "Software Engineer · Backend & AI Specialist",
        period: "Maio 2024 → Presente",
        place: "Santiago, Chile",
        bullets: [
          "Lidero o backend e as integrações críticas em Ruby on Rails e Python, garantindo escalabilidade e alta disponibilidade.",
          "Implementei a observabilidade dos serviços de IA com Langfuse: latência, custo de tokens e performance de LLMs em tempo real.",
          "Desenvolvi agentes de IA internos com tooling próprio que automatizam fluxos de atendimento.",
          "Construí o motor de envio em massa sobre a API oficial do WhatsApp sob políticas rígidas de conformidade.",
          "Desenhei painéis analíticos de conversão conversacional para decisões comerciais baseadas em dados.",
          "Coordeno o time com Jira e Confluence sob Scrum.",
        ],
      },
    ],
    education: [
      {
        org: "GENERATION CHILE",
        role: "Administrador Cloud AWS re/Start · Graduado",
        period: "2024",
        place: "Santiago, Chile",
        bullets: ["Programa intensivo de 400+ horas em arquitetura AWS, Linux, Python e bancos de dados."],
      },
      {
        org: "INACAP",
        role: "Contador Geral · 5 semestres cursados",
        period: "—",
        place: "Santiago, Chile",
        bullets: ["Presidente eleito do Departamento de Negócios, ponte entre a direção e o corpo estudantil."],
      },
    ],
    certifications: [
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
      { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "Em andamento" },
      { name: "CS50's Introduction to AI with Python", issuer: "HarvardX", year: "2024" },
      { name: "Django & Python Full Stack Developer", issuer: "Udemy", year: "2024" },
      { name: "Docker e Kubernetes na AWS do zero", issuer: "Udemy", year: "2024" },
    ],
    languages: [
      { name: "Espanhol", level: "Nativo" },
      { name: "Português", level: "Conversacional avançado" },
      { name: "Inglês", level: "B1 intermediário" },
    ],
  },
}

export const defaultLocale: Locale = "es"

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as string[]).includes(value)
}

export function detectLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0]
    if (isLocale(base)) return base
  }
  return defaultLocale
}
