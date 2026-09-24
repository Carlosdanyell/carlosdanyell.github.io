import type { Dict } from '@/i18n/pt'
import manifest from './images.generated.json'

export type ProjectId = keyof Dict['projects']['items']

export interface ImageAsset {
  key: string
  width: number
  height: number
  src: string
  srcset: string
  placeholder: string
}

export type ShotFrame = 'phone' | 'browser' | 'landscape'

export interface Shot {
  /** Chave da captura em t.projects.items[id].shots (texto alternativo). */
  id: string
  image: ImageAsset
  frame: ShotFrame
}

export interface ProjectLink {
  kind: 'live' | 'play' | 'code' | 'download'
  href: string
  /** Tamanho do arquivo, mostrado junto do link de download. */
  size?: string
}

export interface Project {
  id: ProjectId
  index: string
  stack: string[]
  status?: 'in-development'
  links: ProjectLink[]
  /** Como o card apresenta o projeto. */
  visual: 'phone-carousel' | 'phone-fan' | 'browser' | 'illustration'
  shots: Shot[]
  /** Aviso de que as capturas usam dados fictícios. */
  fictionalData?: boolean
}

const images = manifest as Record<string, Omit<ImageAsset, 'key'>>

export function image(key: string): ImageAsset {
  const entry = images[key]
  if (!entry) throw new Error(`Imagem não encontrada no manifesto: ${key}. Rode "npm run images".`)
  return { key, ...entry }
}

function shots(folder: string, list: [id: string, frame: ShotFrame][]): Shot[] {
  return list.map(([id, frame]) => ({ id, frame, image: image(`${folder}/${id}`) }))
}

export const projects: Project[] = [
  {
    id: 'devfinance',
    index: '01',
    stack: ['React Native', 'TypeScript', 'Prisma', 'SQLite'],
    // O APK fica numa release deste repositório. "latest" mantém o link igual quando
    // sair versão nova: basta publicar outra release com o arquivo devfinance.apk.
    links: [
      {
        kind: 'download',
        href: 'https://github.com/Carlosdanyell/carlosdanyell.github.io/releases/latest/download/devfinance.apk',
        size: '85 MB',
      },
    ],
    visual: 'phone-carousel',
    fictionalData: true,
    shots: shots('devfinance', [
      ['01-inicio', 'phone'],
      ['02-planejamento', 'phone'],
      ['03-cartoes', 'phone'],
      ['04-saude-financeira', 'phone'],
      ['05-projecao', 'phone'],
      ['06-resumo', 'phone'],
    ]),
  },
  {
    id: 'iagames',
    index: '02',
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'PWA', 'WebRTC'],
    links: [
      { kind: 'play', href: 'https://carlosdanyell.github.io/IA-Games/' },
      { kind: 'code', href: 'https://github.com/carlosdanyell/IA-Games' },
    ],
    visual: 'phone-fan',
    shots: shots('ia-games', [
      ['01-biblioteca', 'phone'],
      ['02-neon-chess', 'phone'],
      ['03-neon-slither', 'phone'],
      ['04-neon-shooter', 'phone'],
      ['05-neon-break', 'phone'],
      ['06-neon-arrow', 'landscape'],
      ['07-neon-pool', 'landscape'],
    ]),
  },
  {
    id: 'devcount',
    index: '03',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { kind: 'live', href: 'https://carlosdanyell.github.io/devcount' },
      { kind: 'code', href: 'https://github.com/carlosdanyell/devcount' },
    ],
    visual: 'browser',
    shots: shots('devcount', [
      ['01-inicio', 'browser'],
      ['02-servicos', 'browser'],
      ['03-como-funciona', 'browser'],
      ['04-contato', 'browser'],
      ['05-mobile', 'phone'],
    ]),
  },
  {
    id: 'conciliacao',
    index: '04',
    stack: ['HTML', 'JavaScript'],
    status: 'in-development',
    links: [],
    visual: 'illustration',
    shots: [],
  },
]

/** Versão tolerante de image(): devolve undefined se a imagem ainda não foi adicionada. */
export function optionalImage(key: string): ImageAsset | undefined {
  const entry = images[key]
  return entry ? { key, ...entry } : undefined
}
