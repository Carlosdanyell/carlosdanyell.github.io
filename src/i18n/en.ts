import type { Dict } from './pt'

export const en: Dict = {
  htmlLang: 'en',
  meta: {
    title: 'Carlos Danyell da Silva · Accountant | CRC-PR',
    description:
      'Portfolio of Carlos Danyell da Silva, a certified accountant (CRC-PR) focused on audit and internal controls, with a background in web and mobile development.',
  },
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  present: 'present',
  a11y: {
    skip: 'Skip to content',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    switchLang: 'Mudar para português',
    newTab: '(opens in a new tab)',
    backToTop: 'Back to top',
    home: 'Carlos Danyell, home',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
  },
  hero: {
    portfolio: 'Professional portfolio',
    disciplines: ['Accounting.', 'Controls.', 'Automation.'],
    role: 'Accountant | CRC-PR',
    name: 'Carlos Danyell da Silva',
    tagline: 'Accounting, internal controls and automation of accounting processes.',
    ctaProjects: 'View projects',
    ctaResume: 'Download CV',
    record: {
      title: 'Record',
      rows: [
        ['License', 'CRC-PR 084091/O'],
        ['Role', 'Accounting assistant'],
        ['Goal', 'Audit and internal controls'],
        ['Studying', 'Postgraduate in Auditing and Forensic Accounting'],
        ['Based in', 'Cornélio Procópio, Brazil'],
      ],
    },
    scroll: 'Scroll to the About section',
  },
  about: {
    title: 'Accounting rigor, with the technical background to build my own tools.',
    paragraphs: [
      'I am a certified accountant (CRC-PR) working as an accounting assistant at a large manufacturer with a U.S. controllership. My day-to-day work covers account reconciliations, support for the monthly close and preparing evidence for internal control testing (SOX).',
      'I started in the public sector, at the City of Nova Santa Bárbara, where I went from intern to head of the Taxation Division. I am now pursuing a postgraduate degree in Auditing and Forensic Accounting, aiming to work in audit and internal controls.',
      'Alongside accounting, I build web and mobile applications. That technical background helps me understand how accounting data is produced and transformed, and lets me build tools that make reviews faster and easier to trace.',
    ],
    stats: {
      years: 'years in accounting and public administration',
      projects: 'personal projects',
      certs: 'certifications',
    },
    portraitAlt: 'Photo of Carlos Danyell da Silva',
    monogramLabel: 'CD monogram',
  },
  experience: {
    title: 'Career path',
    lead: 'From public administration to industrial accounting, with a growing focus on internal controls.',
    jobs: {
      comtrafo: {
        company: 'Comtrafo Indústria de Transformadores Elétricos S.A.',
        sector: 'Manufacturing · U.S. controllership',
        roles: [
          {
            title: 'Accounting Assistant',
            bullets: [
              'Account reconciliations for payroll, revenue cut-off, federal taxes and accounts receivable (expected credit loss allowance)',
              'Preparation of evidence for internal control testing (SOX / Key Report Testing)',
              'Support for the monthly close, with journal entries, reclassifications and supporting documentation',
            ],
          },
        ],
      },
      eletrotrafo: {
        company: 'Eletrotrafo Produtos Elétricos Ltda.',
        sector: 'Manufacturing',
        roles: [
          { title: 'Accounting Assistant', bullets: [] },
          { title: 'Accounting Clerk', bullets: [] },
        ],
      },
      prefeitura: {
        company: 'City of Nova Santa Bárbara (Prefeitura Municipal)',
        sector: 'Public sector',
        roles: [
          { title: 'Head of the Taxation Division', bullets: [] },
          { title: 'Intern', bullets: [] },
        ],
      },
      cw: {
        company: 'CW Distribuidora de Bebidas',
        sector: 'Distribution',
        roles: [{ title: 'Customer Service', bullets: [] }],
      },
    },
  },
  projects: {
    title: 'Selected projects',
    lead: 'Applications I built from scratch, from a personal finance app to tools designed for accounting work.',
    details: 'View details',
    detailsOf: 'View project details',
    live: 'Visit site',
    play: 'Play',
    code: 'Code',
    download: 'Download APK',
    apkNote:
      'For Android. During installation, the phone asks for permission to install apps from outside the Play Store.',
    close: 'Close',
    highlights: 'Highlights',
    stack: 'Tech stack',
    gallery: 'Gallery',
    prev: 'Previous image',
    next: 'Next image',
    showImage: 'Show image',
    screens: 'Screens',
    pauseScreens: 'Pause screen rotation',
    playScreens: 'Resume screen rotation',
    inDevelopment: 'In development',
    fictional: 'Screenshots use fictional data.',
    items: {
      devfinance: {
        name: 'DevFinance',
        kind: 'Mobile app',
        summary:
          'Personal finance app for recording income and expenses, managing cards, setting budgets with spending analysis, projecting balances and tracking a financial health indicator.',
        highlights: [
          'Income and expenses by category, including installment purchases',
          'Credit, debit and benefit cards, with spending per card',
          'Monthly budgets per category, with limit alerts',
          'Projected balance based on future entries',
          'Financial health indicators: savings rate, budget adherence, committed income and covered commitments',
          'Custom Node.js API with Express, Prisma and SQLite',
        ],
        shots: {
          '01-inicio': 'Home screen with current balance, monthly income and expenses, and latest transactions',
          '02-planejamento': 'Planning screen with budgets per category and usage bars',
          '03-cartoes': 'Cards screen with monthly spending and purchases on the selected card',
          '04-saude-financeira': 'Four financial health indicators for the selected period',
          '05-projecao': 'Balance projection up to the selected date, with commitments in the period',
          '06-resumo': 'Monthly summary with a chart of income, expenses and balance',
        },
      },
      iagames: {
        name: 'IA Games',
        kind: 'Game library · PWA',
        summary:
          'A library of 11 HTML games that work offline, designed for phones. No framework and no build step: HTML, CSS and JavaScript with ES modules.',
        highlights: [
          'Eleven titles, including chess, pool, a crossword, a brick breaker and a space shooter',
          'Works offline as a PWA, with a service worker and progress saved on the device',
          'Direct multiplayer between devices on the same Wi-Fi network, with no server',
          'Chess with complete rules and five engine levels (alpha-beta search)',
          'Automated tests with the Node test runner and CI on GitHub Actions',
        ],
        shots: {
          '01-biblioteca': 'Game library with a cover and description for each title',
          '02-neon-chess': 'Neon Chess: chessboard against the engine',
          '03-neon-slither': 'Neon Slither: start screen with skin selection',
          '04-neon-shooter': 'Neon Shooter: space shooter start screen',
          '05-neon-break': 'Neon Break: brick breaker ready to play',
          '06-neon-arrow': 'Neon Arrow: archery in an urban setting',
          '07-neon-pool': 'Neon Pool: 8-ball pool table in landscape',
        },
      },
      devcount: {
        name: 'devcount',
        kind: 'Landing page',
        summary: 'A landing page built from scratch to practice HTML, CSS and JavaScript.',
        highlights: [
          'Sections for services, how it works, testimonials, FAQ and contact',
          'Responsive layout, from phone to desktop',
          'Published on GitHub Pages',
        ],
        shots: {
          '01-inicio': 'Top of the landing page with the main headline and key figures',
          '02-servicos': 'Services section with cards',
          '03-como-funciona': 'Section explaining how the service works',
          '04-contato': 'Contact form',
          '05-mobile': 'Mobile version of the top of the page',
        },
      },
      conciliacao: {
        name: 'Account reconciliation tool',
        kind: 'Local web application',
        summary:
          'A local web application that matches the general ledger against ERP reports, without sending any data outside the machine.',
        highlights: [
          'Matches general ledger entries against ERP reports',
          'Runs in the browser on your own machine: no data is sent anywhere',
        ],
        illustrationAlt: 'Abstract illustration of two columns of records being matched and reconciled',
        shots: {},
      },
    },
  },
  skills: {
    title: 'Accounting and technical skills',
    lead: 'What I use in accounting work and in building my own tools.',
    groups: {
      accounting: {
        title: 'Accounting',
        items: [
          'Account reconciliation',
          'Journal entries and closing',
          'Financial statements',
          'IFRS',
          'Internal controls (SOX)',
        ],
      },
      tools: {
        title: 'Tools',
        items: ['TOTVS Protheus', 'Advanced Excel', 'Microsoft Office'],
      },
      dev: {
        title: 'Development',
        items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React Native', 'SQLite', 'Prisma'],
      },
      ai: {
        title: 'Artificial intelligence',
        items: [
          'Prompt engineering',
          'Spreadsheet and report automation',
          'Development with Claude Code and Codex (OpenAI)',
          'Critical review of AI-generated output',
        ],
      },
    },
  },
  education: {
    title: 'Education and certifications',
    degreesTitle: 'Academic background',
    certsTitle: 'License and certifications',
    languagesTitle: 'Languages',
    inProgress: 'In progress',
    degrees: {
      pos: { name: 'Postgraduate degree in Auditing and Forensic Accounting', school: 'Anhanguera', note: '' },
      bach: {
        name: 'Bachelor’s degree in Accounting',
        school: 'UENP',
        note: 'Thesis: tax planning applied to the profitability of rural properties.',
      },
    },
    certs: {
      crc: { name: 'Professional license', org: 'CRC-PR', detail: '084091/O' },
      anbima: { name: 'Risk and Performance Management', org: 'ANBIMA', detail: '' },
      enap: { name: 'Accounting – Public Asset Management', org: 'ENAP', detail: '21 h' },
      alura: { name: 'Front-End Development Track', org: 'Alura', detail: '85 h' },
    },
    languages: [
      { name: 'Portuguese', level: 'Native' },
      { name: 'English', level: 'Basic · EF SET A2' },
    ],
  },
  contact: {
    title: 'Let’s talk',
    lead: 'Have an opening or a project in audit, internal controls or accounting? Get in touch.',
    email: 'Email',
    copy: 'Copy email',
    copied: 'Copied',
    copiedAnnounce: 'Email address copied to the clipboard.',
    copyFailed: 'Could not copy. Please select the address manually.',
    location: 'Location',
    locationValue: 'Cornélio Procópio, Paraná, Brazil',
  },
}
