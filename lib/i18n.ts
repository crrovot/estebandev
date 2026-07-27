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
  url?: string
  images?: { src: string; alt: string }[]
}

type SkillGroup = { group: string; items: string[] }

type TrackContent = {
  label: string
  headline: string
  tagline: string
  stats: Stat[]
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
      work: "Trabajo seleccionado",
      stack: "Stack",
      experience: "Experiencia",
      education: "Educación",
      certifications: "Certificaciones",
      contact: "Contacto",
    },
    ui: {
      hoverHint: "Proyectos y productos construidos",
      trackHint: "Modo oscuro = backend · Modo claro = frontend & producto",
      impact: "Alcance",
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
          { value: "2", label: "ecosistemas principales: Rails y Python" },
        ],
        projects: [
          {
            id: "torus-backend",
            kicker: "Producto · Backend",
            title: "Torus · Backend operativo para talleres",
            summary:
              "API Rails que conecta órdenes de trabajo, inventario, POS y comisiones en una operación multi-sucursal.",
            preview:
              "Construí el núcleo de Torus separando controladores, servicios y modelos. El flujo de órdenes combina estados configurables, permisos por alcance y eventos en tiempo real sin bloquear las respuestas HTTP.",
            metrics: [
              "Kanban configurable conectado a workflows y AASM",
              "RBAC por rol, empresa y sucursal, con overrides y auditoría",
              "WebSockets autenticados y jobs Sidekiq para eventos en tiempo real",
            ],
            stack: ["Rails 8", "PostgreSQL", "Redis", "Sidekiq", "Action Cable", "Docker"],
            shape: "ripple",
          },
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
        headline: "Convierto procesos complejos en productos que se entienden.",
        tagline:
          "Diseño y construyo interfaces conectadas a procesos reales de negocio. Torus.cl reúne producto, experiencia de usuario y desarrollo full stack.",
        stats: [
          { value: "FULL", label: "desarrollo de producto end-to-end" },
          { value: "Torus", label: "plataforma para talleres técnicos" },
          { value: "400+", label: "horas de bootcamp cloud" },
          { value: "5", label: "semestres de formación en negocios" },
        ],
        projects: [
          {
            id: "torus",
            kicker: "Proyecto full stack",
            title: "Torus.cl · Sistema operativo para talleres técnicos",
            summary:
              "Plataforma para centralizar la operación de talleres: órdenes de trabajo, inventario, punto de venta y recursos técnicos.",
            preview:
              "El trabajo abarca la experiencia pública del producto y herramientas operativas para el día a día del taller, con vistas orientadas a priorizar órdenes, consultar documentación y mantener el flujo de trabajo visible.",
            metrics: [
              "Landing pública y aplicación operativa",
              "Gestión visual de órdenes, estados y prioridades",
              "Centro técnico con guías, planos y referencias",
            ],
            stack: ["Full stack", "UX/UI", "Producto"],
            shape: "sphere",
            url: "https://torus.cl",
            images: [
              { src: "/torus/torus-landing.png", alt: "Landing de Torus para talleres técnicos" },
              { src: "/torus/torus-centro-tecnico.png", alt: "Centro técnico de Torus con guías y planos" },
              { src: "/torus/torus-monitor-ordenes.png", alt: "Monitor operativo de órdenes de Torus" },
            ],
          },
        ],
        skills: [
          { group: "Producto", items: ["UX/UI", "Interfaces operativas", "Flujos de trabajo", "Diseño responsive"] },
          { group: "Desarrollo", items: ["Full stack", "Integración frontend/backend", "REST APIs", "Modelado de datos"] },
          { group: "Proceso", items: ["Scrum", "Jira", "Confluence", "Documentación técnica"] },
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
      work: "Selected work",
      stack: "Stack",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      contact: "Contact",
    },
    ui: {
      hoverHint: "Projects and products built",
      trackHint: "Dark mode = backend · Light mode = frontend & product",
      impact: "Scope",
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
          { value: "2", label: "core ecosystems: Rails and Python" },
        ],
        projects: [
          {
            id: "torus-backend",
            kicker: "Product · Backend",
            title: "Torus · Operational backend for repair shops",
            summary:
              "A Rails API connecting work orders, inventory, POS and commissions across multiple locations.",
            preview:
              "I built the Torus core with responsibilities split across controllers, services and models. Its work-order flow combines configurable states, scoped permissions and real-time events without blocking HTTP responses.",
            metrics: [
              "Configurable Kanban backed by workflows and AASM",
              "Role, company and location-scoped RBAC with overrides and auditing",
              "Authenticated WebSockets and Sidekiq jobs for real-time events",
            ],
            stack: ["Rails 8", "PostgreSQL", "Redis", "Sidekiq", "Action Cable", "Docker"],
            shape: "ripple",
          },
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
        headline: "I turn complex processes into products people can understand.",
        tagline: "I design and build interfaces connected to real business operations. Torus.cl brings product, user experience and full-stack development together.",
        stats: [
          { value: "FULL", label: "end-to-end product development" },
          { value: "Torus", label: "platform for technical workshops" },
          { value: "400+", label: "hours of cloud bootcamp" },
          { value: "5", label: "semesters of business training" },
        ],
        projects: [
          {
            id: "torus",
            kicker: "Full-stack project",
            title: "Torus.cl · Operating system for technical workshops",
            summary: "A platform that centralizes workshop operations: work orders, inventory, point of sale and technical resources.",
            preview:
              "The work covers the public product experience and operational tools for day-to-day workshop use, with views designed to prioritize orders, consult documentation and keep workflow status visible.",
            metrics: [
              "Public landing page and operational application",
              "Visual management of orders, statuses and priorities",
              "Technical center with guides, diagrams and references",
            ],
            stack: ["Full stack", "UX/UI", "Product"],
            shape: "sphere",
            url: "https://torus.cl",
            images: [
              { src: "/torus/torus-landing.png", alt: "Torus landing page for technical workshops" },
              { src: "/torus/torus-centro-tecnico.png", alt: "Torus technical center with guides and diagrams" },
              { src: "/torus/torus-monitor-ordenes.png", alt: "Torus operational work-order monitor" },
            ],
          },
        ],
        skills: [
          { group: "Product", items: ["UX/UI", "Operational interfaces", "Workflows", "Responsive design"] },
          { group: "Development", items: ["Full stack", "Frontend/backend integration", "REST APIs", "Data modeling"] },
          { group: "Process", items: ["Scrum", "Jira", "Confluence", "Technical documentation"] },
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
      work: "Trabalhos selecionados",
      stack: "Stack",
      experience: "Experiência",
      education: "Formação",
      certifications: "Certificações",
      contact: "Contato",
    },
    ui: {
      hoverHint: "Projetos e produtos construídos",
      trackHint: "Modo escuro = backend · Modo claro = frontend & produto",
      impact: "Escopo",
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
          { value: "2", label: "ecossistemas principais: Rails e Python" },
        ],
        projects: [
          {
            id: "torus-backend",
            kicker: "Produto · Backend",
            title: "Torus · Backend operacional para assistências técnicas",
            summary:
              "API Rails que conecta ordens de serviço, estoque, PDV e comissões em uma operação com várias unidades.",
            preview:
              "Construí o núcleo do Torus separando controllers, services e models. O fluxo de ordens combina estados configuráveis, permissões por escopo e eventos em tempo real sem bloquear as respostas HTTP.",
            metrics: [
              "Kanban configurável conectado a workflows e AASM",
              "RBAC por função, empresa e unidade, com overrides e auditoria",
              "WebSockets autenticados e jobs Sidekiq para eventos em tempo real",
            ],
            stack: ["Rails 8", "PostgreSQL", "Redis", "Sidekiq", "Action Cable", "Docker"],
            shape: "ripple",
          },
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
        headline: "Transformo processos complexos em produtos fáceis de entender.",
        tagline: "Desenho e construo interfaces ligadas a operações reais. Torus.cl reúne produto, experiência do usuário e desenvolvimento full stack.",
        stats: [
          { value: "FULL", label: "desenvolvimento de produto end-to-end" },
          { value: "Torus", label: "plataforma para oficinas técnicas" },
          { value: "400+", label: "horas de bootcamp cloud" },
          { value: "5", label: "semestres de formação em negócios" },
        ],
        projects: [
          {
            id: "torus",
            kicker: "Projeto full stack",
            title: "Torus.cl · Sistema operacional para oficinas técnicas",
            summary: "Plataforma que centraliza a operação da oficina: ordens de trabalho, estoque, ponto de venda e recursos técnicos.",
            preview:
              "O trabalho inclui a experiência pública do produto e ferramentas operacionais para o dia a dia da oficina, com telas voltadas a priorizar ordens, consultar documentação e manter o fluxo de trabalho visível.",
            metrics: [
              "Landing pública e aplicação operacional",
              "Gestão visual de ordens, estados e prioridades",
              "Centro técnico com guias, diagramas e referências",
            ],
            stack: ["Full stack", "UX/UI", "Produto"],
            shape: "sphere",
            url: "https://torus.cl",
            images: [
              { src: "/torus/torus-landing.png", alt: "Landing do Torus para oficinas técnicas" },
              { src: "/torus/torus-centro-tecnico.png", alt: "Centro técnico do Torus com guias e diagramas" },
              { src: "/torus/torus-monitor-ordenes.png", alt: "Monitor operacional de ordens do Torus" },
            ],
          },
        ],
        skills: [
          { group: "Produto", items: ["UX/UI", "Interfaces operacionais", "Fluxos de trabalho", "Design responsivo"] },
          { group: "Desenvolvimento", items: ["Full stack", "Integração frontend/backend", "REST APIs", "Modelagem de dados"] },
          { group: "Processo", items: ["Scrum", "Jira", "Confluence", "Documentação técnica"] },
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
