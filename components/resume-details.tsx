"use client"

import { useLanguage } from "@/components/language-provider"
import type { Dictionary, Track } from "@/lib/i18n"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-foreground/60">{children}</h2>
}

export function StackSection({ trackContent }: { trackContent: Dictionary["tracks"][Track] }) {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="stack-heading" className="flex flex-col gap-4">
      <div id="stack-heading">
        <SectionTitle>{t.sections.stack}</SectionTitle>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {trackContent.skills.map((group) => (
          <div key={group.group} className="flex flex-col gap-3 rounded-lg border border-foreground/15 bg-surface p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand">{group.group}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-foreground/20 px-2 py-1 font-mono text-[11px] text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TimelineSection() {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="experience-heading" className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div id="experience-heading">
          <SectionTitle>{t.sections.experience}</SectionTitle>
        </div>
        {t.experience.map((item) => (
          <div key={item.org} className="flex flex-col gap-3 border-l border-brand/50 pl-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-mono text-base">{item.org}</h3>
              <p className="text-sm text-foreground/80">{item.role}</p>
              <p className="font-mono text-xs text-foreground/50">
                {item.period} · {item.place}
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-pretty text-sm leading-relaxed text-foreground/75">
                  <span className="text-brand" aria-hidden="true">
                    →
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <SectionTitle>{t.sections.education}</SectionTitle>
          {t.education.map((item) => (
            <div key={item.org} className="flex flex-col gap-2 border-l border-foreground/20 pl-4">
              <h3 className="font-mono text-base">{item.org}</h3>
              <p className="text-sm text-foreground/80">{item.role}</p>
              <p className="font-mono text-xs text-foreground/50">
                {item.period} · {item.place}
              </p>
              {item.bullets.map((bullet) => (
                <p key={bullet} className="text-pretty text-sm leading-relaxed text-foreground/70">
                  {bullet}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <SectionTitle>{t.sections.certifications}</SectionTitle>
          <ul className="flex flex-col divide-y divide-foreground/10">
            {t.certifications.map((cert) => (
              <li key={cert.name} className="flex flex-wrap items-baseline justify-between gap-2 py-2.5">
                <span className="text-sm text-foreground/85">{cert.name}</span>
                <span className="font-mono text-xs text-foreground/50">
                  {cert.issuer} · {cert.year}
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2 pt-1">
            {t.languages.map((language) => (
              <li
                key={language.name}
                className="rounded-full bg-brand/15 px-3 py-1 font-mono text-[11px] text-brand"
              >
                {language.name} · {language.level}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  const { t } = useLanguage()
  const whatsappNumber = t.phone.replace(/[^\d]/g, "")

  const actions = [
    { label: t.ui.ctaEmail, href: `mailto:${t.email}`, primary: true },
    { label: t.ui.ctaWhatsapp, href: `https://wa.me/${whatsappNumber}`, primary: false },
    { label: t.ui.ctaLinkedin, href: "https://www.linkedin.com/in/esteban-restrepo-escobar", primary: false },
    { label: t.ui.ctaGithub, href: "https://github.com/esteban-restrepo", primary: false },
  ]

  return (
    <section
      aria-labelledby="contact-heading"
      className="flex flex-col gap-5 rounded-lg border border-foreground/15 bg-surface p-6 sm:p-8"
    >
      <div id="contact-heading">
        <SectionTitle>{t.sections.contact}</SectionTitle>
      </div>
      <h3 className="max-w-2xl text-balance text-xl font-semibold leading-snug sm:text-2xl">{t.ui.ctaTitle}</h3>
      <p className="max-w-2xl text-pretty leading-relaxed text-foreground/75">{t.ui.ctaBody}</p>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.href.startsWith("http") ? "_blank" : undefined}
            rel={action.href.startsWith("http") ? "noreferrer" : undefined}
            className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              action.primary
                ? "bg-brand text-brand-foreground hover:opacity-90"
                : "border border-foreground/25 text-foreground/80 hover:border-brand hover:text-brand"
            }`}
          >
            {action.label}
          </a>
        ))}
      </div>

      <p className="font-mono text-xs text-foreground/50">
        {t.email} · {t.phone} · {t.location}
      </p>
    </section>
  )
}
