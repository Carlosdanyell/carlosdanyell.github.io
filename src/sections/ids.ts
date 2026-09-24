// Âncoras das seções, em português (idioma padrão do site).
export const SECTION_IDS = {
  about: 'sobre',
  experience: 'experiencia',
  projects: 'projetos',
  skills: 'competencias',
  education: 'formacao',
  contact: 'contato',
} as const

export type SectionKey = keyof typeof SECTION_IDS

export const SECTION_LIST: readonly string[] = Object.values(SECTION_IDS)
