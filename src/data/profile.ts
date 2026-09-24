// Dados de contato e links. Textos visíveis ficam em src/i18n.

export const profile = {
  name: 'Carlos Danyell da Silva',
  email: 'carlosdanyellnsb@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/carlosdanyell',
  github: 'https://github.com/carlosdanyell',
  siteUrl: 'https://carlosdanyell.github.io',
  /** Currículo por idioma do site. */
  resume: { pt: '/curriculo-carlos-danyell.pdf', en: '/resume-carlos-danyell.pdf' },
  /** Início na área contábil e pública (estágio na prefeitura). */
  careerStart: [2021, 10] as const,
} as const

/** Anos completos desde o início da carreira contábil, calculados na data atual. */
export function yearsOfExperience(now = new Date()) {
  const [year, month] = profile.careerStart
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)
  return Math.floor(months / 12)
}
