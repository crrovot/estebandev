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
  href?: string
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
    metaTitle: "Esteban Restrepo — Software Engineer",
    metaDescription:
      "Portafolio de Esteban Restrepo Escobar, Ingeniero de Software full stack y backend en Santiago de Chile. React, Ruby on Rails, Go, Python y AWS.",
    brand: "esteban.dev",
    name: "ESTEBAN RESTREPO ESCOBAR",
    role: "SOFTWARE ENGINEER · FULL STACK & BACKEND",
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
      trackHint: "Modo oscuro = backend · Modo claro = full stack",
      impact: "Alcance",
      inProgress: "En preparación",
      availability: "Disponible para roles de ingeniería de software en Chile y remoto LATAM",
      ctaTitle: "¿Buscas un ingeniero que pueda llevar un producto de punta a punta?",
      ctaBody:
        "Respondo el mismo día. Puedo mostrarte código, arquitectura y métricas reales de los proyectos de esta página.",
      ctaEmail: "Escríbeme",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
      ctaWhatsapp: "WhatsApp",
    },
    a11y: {
      toggleTheme: "Cambiar entre backend y full stack",
      language: "Idioma",
      switchTo: "Cambiar idioma a",
      switchTrack: "Cambiar de pista de contenido",
    },
    tracks: {
      backend: {
        label: "BACKEND",
        headline: "Diseño sistemas que sostienen productos reales.",
        tagline:
          "Backend con Ruby on Rails, Go y Python: APIs, datos, procesos asíncronos y servicios desplegados en AWS.",
        stats: [
          { value: "3+", label: "años construyendo software" },
          { value: "RAILS", label: "APIs y lógica de negocio" },
          { value: "GO", label: "servicios backend" },
          { value: "AWS", label: "cloud y despliegues" },
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
        ],
        skills: [
          { group: "Backend", items: ["Ruby on Rails", "Go", "Python", "Django", "REST APIs"] },
          { group: "Datos & sistemas", items: ["PostgreSQL", "Redis", "Sidekiq", "WebSockets", "RBAC", "SQL"] },
          { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD"] },
        ],
      },
      frontend: {
        label: "FULL STACK",
        headline: "Construyo productos completos, de la API a la interfaz.",
        tagline:
          "Full stack con React, Next.js y TypeScript, integrado con APIs, bases de datos y servicios AWS.",
        stats: [
          { value: "FULL", label: "desarrollo end-to-end" },
          { value: "REACT", label: "interfaces modernas" },
          { value: "NEXT.JS", label: "aplicaciones web" },
          { value: "AWS", label: "cloud y despliegues" },
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
            href: "/torus",
            images: [
              { src: "/torus/torus-landing.png", alt: "Landing de Torus para talleres técnicos" },
              { src: "/torus/torus-centro-tecnico.png", alt: "Centro técnico de Torus con guías y planos" },
              { src: "/torus/torus-monitor-ordenes.png", alt: "Monitor operativo de órdenes de Torus" },
            ],
          },
          {
            id: "rouch",
            kicker: "E-commerce · Fotografía",
            title: "Rouch.cl · Piercing, joyería & body",
            summary:
              "Tienda online con identidad visual propia, catálogo de productos y fotografía orientada a e-commerce.",
            preview:
              "Trabajé la experiencia visual de la tienda y la fotografía de producto con una Nikon D5600 y lente 105 mm, conectando dirección de arte, catálogo y compra online.",
            metrics: [
              "Dirección visual y experiencia de catálogo",
              "Fotografía propia con Nikon D5600 + lente 105 mm",
              "Landing, productos destacados, filtros y grilla comercial",
            ],
            stack: ["E-commerce", "UX/UI", "Fotografía", "Dirección de arte"],
            shape: "wave",
            url: "https://rouch.cl",
            href: "/rouch",
            images: [
              { src: "/rouch/rouch-home.png", alt: "Portada de Rouch.cl con fotografía de joyería" },
              { src: "/rouch/rouch-destacados.png", alt: "Productos destacados de la tienda Rouch.cl" },
              { src: "/rouch/rouch-catalogo.png", alt: "Catálogo de piercing y joyería de Rouch.cl" },
            ],
          },
        ],
        skills: [
          { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Diseño responsive"] },
          { group: "Full stack", items: ["REST APIs", "Ruby on Rails", "Python", "PostgreSQL", "Modelado de datos"] },
          { group: "Cloud & delivery", items: ["AWS", "Docker", "Git", "CI/CD", "Scrum"] },
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
    metaTitle: "Esteban Restrepo — Software Engineer",
    metaDescription:
      "Portfolio of Esteban Restrepo Escobar, full-stack and backend software engineer based in Santiago, Chile. React, Ruby on Rails, Go, Python and AWS.",
    brand: "esteban.dev",
    name: "ESTEBAN RESTREPO ESCOBAR",
    role: "SOFTWARE ENGINEER · FULL STACK & BACKEND",
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
      trackHint: "Dark mode = backend · Light mode = full stack",
      impact: "Scope",
      inProgress: "In progress",
      availability: "Open to software engineering roles in Chile and remote across LATAM",
      ctaTitle: "Looking for an engineer who can take a product end to end?",
      ctaBody: "I reply the same day, and I can walk you through the code, architecture and real metrics behind this page.",
      ctaEmail: "Email me",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
      ctaWhatsapp: "WhatsApp",
    },
    a11y: {
      toggleTheme: "Switch between backend and full stack",
      language: "Language",
      switchTo: "Switch language to",
      switchTrack: "Switch content track",
    },
    tracks: {
      backend: {
        label: "BACKEND",
        headline: "I design systems that support real products.",
        tagline: "Backend with Ruby on Rails, Go and Python: APIs, data, asynchronous processing and services deployed on AWS.",
        stats: [
          { value: "3+", label: "years building software" },
          { value: "RAILS", label: "APIs and business logic" },
          { value: "GO", label: "backend services" },
          { value: "AWS", label: "cloud and deployments" },
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
        ],
        skills: [
          { group: "Backend", items: ["Ruby on Rails", "Go", "Python", "Django", "REST APIs"] },
          { group: "Data & systems", items: ["PostgreSQL", "Redis", "Sidekiq", "WebSockets", "RBAC", "SQL"] },
          { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD"] },
        ],
      },
      frontend: {
        label: "FULL STACK",
        headline: "I build complete products, from API to interface.",
        tagline: "Full-stack development with React, Next.js and TypeScript, integrated with APIs, databases and AWS services.",
        stats: [
          { value: "FULL", label: "end-to-end development" },
          { value: "REACT", label: "modern interfaces" },
          { value: "NEXT.JS", label: "web applications" },
          { value: "AWS", label: "cloud and deployments" },
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
            href: "/torus",
            images: [
              { src: "/torus/torus-landing.png", alt: "Torus landing page for technical workshops" },
              { src: "/torus/torus-centro-tecnico.png", alt: "Torus technical center with guides and diagrams" },
              { src: "/torus/torus-monitor-ordenes.png", alt: "Torus operational work-order monitor" },
            ],
          },
          {
            id: "rouch",
            kicker: "E-commerce · Photography",
            title: "Rouch.cl · Piercing, jewelry & body",
            summary:
              "An online store with its own visual identity, product catalog and e-commerce photography.",
            preview:
              "I worked on the store's visual experience and product photography with a Nikon D5600 and 105 mm lens, connecting art direction, catalog and online shopping.",
            metrics: [
              "Visual direction and catalog experience",
              "Original photography with Nikon D5600 + 105 mm lens",
              "Landing page, featured products, filters and commercial grid",
            ],
            stack: ["E-commerce", "UX/UI", "Photography", "Art direction"],
            shape: "wave",
            url: "https://rouch.cl",
            href: "/rouch",
            images: [
              { src: "/rouch/rouch-home.png", alt: "Rouch.cl home page featuring jewelry photography" },
              { src: "/rouch/rouch-destacados.png", alt: "Featured products from the Rouch.cl store" },
              { src: "/rouch/rouch-catalogo.png", alt: "Rouch.cl piercing and jewelry catalog" },
            ],
          },
        ],
        skills: [
          { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive design"] },
          { group: "Full stack", items: ["REST APIs", "Ruby on Rails", "Python", "PostgreSQL", "Data modeling"] },
          { group: "Cloud & delivery", items: ["AWS", "Docker", "Git", "CI/CD", "Scrum"] },
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
    metaTitle: "Esteban Restrepo — Engenheiro de Software",
    metaDescription:
      "Portfólio de Esteban Restrepo Escobar, engenheiro de software full stack e backend em Santiago, Chile. React, Ruby on Rails, Go, Python e AWS.",
    brand: "esteban.dev",
    name: "ESTEBAN RESTREPO ESCOBAR",
    role: "SOFTWARE ENGINEER · FULL STACK & BACKEND",
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
      trackHint: "Modo escuro = backend · Modo claro = full stack",
      impact: "Escopo",
      inProgress: "Em andamento",
      availability: "Aberto a vagas de engenharia de software no Chile e remoto na América Latina",
      ctaTitle: "Procurando um engenheiro que leve um produto de ponta a ponta?",
      ctaBody: "Respondo no mesmo dia e posso mostrar código, arquitetura e métricas reais dos projetos desta página.",
      ctaEmail: "Fale comigo",
      ctaLinkedin: "LinkedIn",
      ctaGithub: "GitHub",
      ctaWhatsapp: "WhatsApp",
    },
    a11y: {
      toggleTheme: "Alternar entre backend e full stack",
      language: "Idioma",
      switchTo: "Mudar idioma para",
      switchTrack: "Mudar a trilha de conteúdo",
    },
    tracks: {
      backend: {
        label: "BACKEND",
        headline: "Desenho sistemas que sustentam produtos reais.",
        tagline: "Backend com Ruby on Rails, Go e Python: APIs, dados, processamento assíncrono e serviços implantados na AWS.",
        stats: [
          { value: "3+", label: "anos construindo software" },
          { value: "RAILS", label: "APIs e lógica de negócio" },
          { value: "GO", label: "serviços backend" },
          { value: "AWS", label: "cloud e deploys" },
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
        ],
        skills: [
          { group: "Backend", items: ["Ruby on Rails", "Go", "Python", "Django", "REST APIs"] },
          { group: "Dados & sistemas", items: ["PostgreSQL", "Redis", "Sidekiq", "WebSockets", "RBAC", "SQL"] },
          { group: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "CI/CD"] },
        ],
      },
      frontend: {
        label: "FULL STACK",
        headline: "Construo produtos completos, da API à interface.",
        tagline: "Desenvolvimento full stack com React, Next.js e TypeScript, integrado a APIs, bancos de dados e serviços AWS.",
        stats: [
          { value: "FULL", label: "desenvolvimento end-to-end" },
          { value: "REACT", label: "interfaces modernas" },
          { value: "NEXT.JS", label: "aplicações web" },
          { value: "AWS", label: "cloud e deploys" },
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
            href: "/torus",
            images: [
              { src: "/torus/torus-landing.png", alt: "Landing do Torus para oficinas técnicas" },
              { src: "/torus/torus-centro-tecnico.png", alt: "Centro técnico do Torus com guias e diagramas" },
              { src: "/torus/torus-monitor-ordenes.png", alt: "Monitor operacional de ordens do Torus" },
            ],
          },
          {
            id: "rouch",
            kicker: "E-commerce · Fotografia",
            title: "Rouch.cl · Piercing, joalheria & body",
            summary:
              "Loja online com identidade visual própria, catálogo de produtos e fotografia voltada para e-commerce.",
            preview:
              "Trabalhei a experiência visual da loja e a fotografia de produto com uma Nikon D5600 e lente 105 mm, conectando direção de arte, catálogo e compra online.",
            metrics: [
              "Direção visual e experiência de catálogo",
              "Fotografia própria com Nikon D5600 + lente 105 mm",
              "Landing, produtos em destaque, filtros e grade comercial",
            ],
            stack: ["E-commerce", "UX/UI", "Fotografia", "Direção de arte"],
            shape: "wave",
            url: "https://rouch.cl",
            href: "/rouch",
            images: [
              { src: "/rouch/rouch-home.png", alt: "Página inicial da Rouch.cl com fotografia de joias" },
              { src: "/rouch/rouch-destacados.png", alt: "Produtos em destaque da loja Rouch.cl" },
              { src: "/rouch/rouch-catalogo.png", alt: "Catálogo de piercing e joalheria da Rouch.cl" },
            ],
          },
        ],
        skills: [
          { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design responsivo"] },
          { group: "Full stack", items: ["REST APIs", "Ruby on Rails", "Python", "PostgreSQL", "Modelagem de dados"] },
          { group: "Cloud & delivery", items: ["AWS", "Docker", "Git", "CI/CD", "Scrum"] },
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
