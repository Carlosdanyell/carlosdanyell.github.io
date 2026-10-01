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
        ['License', 'CRC-PR 084091/O-8'],
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
          '01-inicio': 'Top of the landing page with the main headline, service highlights and illustration',
          '02-servicos': 'Services section with cards listing what each one includes',
          '03-como-funciona': 'Section explaining how the service works, in three steps',
          '04-contato': 'Contact form and service channels',
          '05-mobile': 'Mobile version of the top of the page',
        },
      },
      auditanalyzer: {
        name: 'AuditAnalyzer',
        kind: 'Web application · Audit',
        summary:
          'A tool that analyzes the TOTVS Protheus CFGR700 audit log (journal entries, table CT2) and produces an Excel workpaper for internal audit and SOX. All processing happens in the browser.',
        highlights: [
          'Flags deleted, changed and posted entries and unbalanced documents, by period and by manual or automatic origin',
          'Streams files of up to about 1 million rows in a Web Worker, keeping the interface responsive',
          'Excel workpaper in Portuguese or English, with justifications and a row reconciliation',
          'Verifiable integrity: SHA-256 of the files, ZIP CRC32 checks and invariants that block the export',
          'No data leaves the machine: no server, no network calls and a strict Content-Security-Policy',
          'Configurable rules, tests with synthetic files and end-to-end tests with Playwright in CI',
        ],
        shots: {
          '01-painel': 'Dashboard with deleted, changed, unbalanced and posted documents and the table by origin',
          '02-inicio': 'Start screen for loading the CFGR700 extractions, with the analysis steps',
          '03-reconciliacao': 'Reconciliation with file integrity, the totals read and the checks',
          '04-tabelas': 'Documents table with search, origin filter and one tab per category',
          '05-justificativas': 'List of deleted documents with the status and justification of each one',
          '06-exportacao': 'Export of the Excel workpaper, in Portuguese or English',
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
      crc: { name: 'Professional license', org: 'CRC-PR', detail: '084091/O-8' },
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
