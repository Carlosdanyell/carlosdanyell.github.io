// Textos em português (idioma padrão). O inglês em en.ts segue exatamente esta forma.

export const pt = {
  htmlLang: 'pt-BR',
  meta: {
    title: 'Carlos Danyell da Silva · Contador | CRC-PR',
    description:
      'Portfólio de Carlos Danyell da Silva, contador (CRC-PR) com foco em auditoria e controles internos e base em desenvolvimento web e mobile.',
  },
  months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  present: 'atual',
  a11y: {
    skip: 'Pular para o conteúdo',
    mainNav: 'Navegação principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    toLight: 'Ativar tema claro',
    toDark: 'Ativar tema escuro',
    switchLang: 'Switch to English',
    newTab: '(abre em nova aba)',
    backToTop: 'Voltar ao topo',
    home: 'Carlos Danyell, início',
  },
  nav: {
    about: 'Sobre',
    experience: 'Experiência',
    projects: 'Projetos',
    skills: 'Competências',
    education: 'Formação',
    contact: 'Contato',
  },
  hero: {
    role: 'Contador | CRC-PR',
    name: 'Carlos Danyell da Silva',
    tagline: 'Contabilidade, controles internos e automação de processos contábeis.',
    ctaProjects: 'Ver projetos',
    ctaResume: 'Baixar currículo',
    record: {
      title: 'Ficha',
      rows: [
        ['Registro', 'CRC-PR 084091/O'],
        ['Atuação', 'Assistente de contabilidade'],
        ['Objetivo', 'Auditoria e controles internos'],
        ['Estudo', 'Pós em Auditoria e Perícia Contábil'],
        ['Base', 'Cornélio Procópio – PR'],
      ],
    },
    scroll: 'Rolar para a seção Sobre',
  },
  about: {
    title: 'Rigor contábil, com base técnica para construir as próprias ferramentas.',
    paragraphs: [
      'Sou contador registrado no CRC-PR e trabalho como assistente de contabilidade em uma indústria de grande porte com controladoria norte-americana. No dia a dia, cuido de conciliações contábeis, do apoio ao fechamento mensal e da preparação de evidências para testes de controles internos (SOX).',
      'Comecei no setor público, na Prefeitura de Nova Santa Bárbara, onde passei de estagiário a chefe da Divisão de Tributação. Hoje curso pós-graduação em Auditoria e Perícia Contábil, com o objetivo de atuar em auditoria e controles internos.',
      'Em paralelo, desenvolvo aplicações web e mobile. Essa base técnica me permite enxergar como os dados contábeis são gerados e transformados, e construir ferramentas que tornam conferências mais rápidas e rastreáveis.',
    ],
    stats: {
      years: 'anos na área contábil e pública',
      projects: 'projetos próprios',
      certs: 'certificações',
    },
    portraitAlt: 'Foto de Carlos Danyell da Silva',
    monogramLabel: 'Monograma CD',
  },
  experience: {
    title: 'Trajetória profissional',
    lead: 'Da administração pública à contabilidade industrial, com foco crescente em controles internos.',
    jobs: {
      comtrafo: {
        company: 'Comtrafo Indústria de Transformadores Elétricos S.A.',
        sector: 'Indústria · controladoria norte-americana',
        roles: [
          {
            title: 'Assistente de Contabilidade',
            bullets: [
              'Conciliações contábeis de folha de pagamento, revenue cut-off, tributos federais e contas a receber (PECLD)',
              'Preparação de evidências para testes de controles internos (SOX / Key Report Testing)',
              'Apoio ao fechamento contábil mensal, com lançamentos, reclassificações e documentação de suporte',
            ],
          },
        ],
      },
      eletrotrafo: {
        company: 'Eletrotrafo Produtos Elétricos Ltda.',
        sector: 'Indústria',
        roles: [
          { title: 'Assistente de Contabilidade', bullets: [] },
          { title: 'Auxiliar de Contabilidade', bullets: [] },
        ],
      },
      prefeitura: {
        company: 'Prefeitura Municipal de Nova Santa Bárbara',
        sector: 'Setor público',
        roles: [
          { title: 'Chefe da Divisão de Tributação', bullets: [] },
          { title: 'Estagiário', bullets: [] },
        ],
      },
      cw: {
        company: 'CW Distribuidora de Bebidas',
        sector: 'Distribuição',
        roles: [{ title: 'Atendimento ao cliente', bullets: [] }],
      },
    },
  },
  projects: {
    title: 'Projetos selecionados',
    lead: 'Aplicações que construí do zero, do aplicativo de finanças pessoais a ferramentas pensadas para a rotina contábil.',
    details: 'Ver detalhes',
    detailsOf: 'Ver detalhes do projeto',
    live: 'Ver site',
    play: 'Jogar',
    code: 'Código',
    close: 'Fechar',
    highlights: 'Destaques',
    stack: 'Tecnologias',
    gallery: 'Galeria',
    prev: 'Imagem anterior',
    next: 'Próxima imagem',
    showImage: 'Mostrar imagem',
    screens: 'Telas',
    pauseScreens: 'Pausar a troca de telas',
    playScreens: 'Retomar a troca de telas',
    inDevelopment: 'Em desenvolvimento',
    fictional: 'Capturas com dados fictícios.',
    items: {
      devfinance: {
        name: 'DevFinance',
        kind: 'Aplicativo mobile',
        summary:
          'Aplicativo de finanças pessoais com registro de receitas e despesas, cadastro de cartões, orçamentos com análise de gastos, saldo projetado e indicador de saúde financeira.',
        highlights: [
          'Receitas e despesas por categoria, incluindo compras parceladas',
          'Cartões de crédito, débito e benefício, com gastos por cartão',
          'Orçamentos mensais por categoria, com alerta de limite',
          'Saldo projetado a partir dos lançamentos futuros',
          'Indicadores de saúde financeira: poupança, aderência ao orçamento, renda comprometida e compromissos cobertos',
          'API própria em Node.js com Express, Prisma e SQLite',
        ],
        shots: {
          '01-inicio': 'Tela inicial com saldo atual, receitas e despesas do mês e últimas movimentações',
          '02-planejamento': 'Planejamento com orçamento por categoria e barras de consumo do limite',
          '03-cartoes': 'Cartões com gasto mensal e lista de compras do cartão selecionado',
          '04-saude-financeira': 'Quatro indicadores de saúde financeira do período escolhido',
          '05-projecao': 'Projeção do saldo até a data escolhida, com os compromissos do período',
          '06-resumo': 'Resumo do mês com gráfico de receitas, despesas e balanço',
        },
      },
      iagames: {
        name: 'IA Games',
        kind: 'Biblioteca de jogos · PWA',
        summary:
          'Biblioteca com 11 jogos em HTML que funcionam offline, feitos para celular. Sem framework e sem build: HTML, CSS e JavaScript com módulos ES.',
        highlights: [
          'Onze títulos, entre eles xadrez, sinuca, cruzadinha, quebra-blocos e tiro espacial',
          'Funciona sem internet como PWA, com service worker e progresso salvo no aparelho',
          'Multiplayer direto entre aparelhos na mesma rede Wi-Fi, sem servidor',
          'Xadrez com regras completas e cinco níveis de máquina (busca alfa-beta)',
          'Testes automatizados com o test runner do Node e CI no GitHub Actions',
        ],
        shots: {
          '01-biblioteca': 'Biblioteca de jogos com capas e descrição de cada título',
          '02-neon-chess': 'Neon Chess: tabuleiro de xadrez contra a máquina',
          '03-neon-slither': 'Neon Slither: tela inicial com escolha de skin',
          '04-neon-shooter': 'Neon Shooter: tela inicial do tiro espacial',
          '05-neon-break': 'Neon Break: quebra-blocos pronto para jogar',
          '06-neon-arrow': 'Neon Arrow: tiro com arco em cenário urbano',
          '07-neon-pool': 'Neon Pool: mesa de sinuca 8-ball na horizontal',
        },
      },
      devcount: {
        name: 'devcount',
        kind: 'Landing page',
        summary: 'Landing page criada do zero para praticar HTML, CSS e JavaScript.',
        highlights: [
          'Seções de serviços, funcionamento, depoimentos, perguntas frequentes e contato',
          'Layout responsivo, do celular ao desktop',
          'Publicada no GitHub Pages',
        ],
        shots: {
          '01-inicio': 'Topo da landing page com chamada principal e indicadores',
          '02-servicos': 'Seção de serviços em cards',
          '03-como-funciona': 'Seção que explica como o trabalho funciona',
          '04-contato': 'Formulário de contato',
          '05-mobile': 'Versão para celular do topo da página',
        },
      },
      conciliacao: {
        name: 'Ferramenta de conciliação contábil',
        kind: 'Aplicação web local',
        summary:
          'Aplicação web local para cruzamento entre razão contábil e relatórios do ERP, sem envio de dados externos.',
        highlights: [
          'Cruza os lançamentos do razão com os relatórios do ERP',
          'Roda no navegador, na própria máquina: nenhum dado é enviado para fora',
        ],
        illustrationAlt: 'Ilustração abstrata de duas colunas de registros sendo cruzadas e conciliadas',
        shots: {},
      },
    },
  },
  skills: {
    title: 'Competências contábeis e técnicas',
    lead: 'O que uso no trabalho contábil e no desenvolvimento das minhas ferramentas.',
    groups: {
      accounting: {
        title: 'Contábeis',
        items: [
          'Conciliação contábil',
          'Lançamentos e fechamento',
          'Demonstrações contábeis',
          'IFRS',
          'Controles internos (SOX)',
        ],
      },
      tools: {
        title: 'Ferramentas',
        items: ['TOTVS Protheus', 'Excel avançado', 'Microsoft Office'],
      },
      dev: {
        title: 'Desenvolvimento',
        items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React Native', 'SQLite', 'Prisma'],
      },
      ai: {
        title: 'Inteligência artificial',
        items: [
          'Engenharia de prompts',
          'Automação de planilhas e relatórios',
          'Desenvolvimento com Claude Code e Codex (OpenAI)',
          'Revisão crítica de resultados gerados por IA',
        ],
      },
    },
  },
  education: {
    title: 'Formação e certificações',
    degreesTitle: 'Formação acadêmica',
    certsTitle: 'Registro e certificações',
    languagesTitle: 'Idiomas',
    inProgress: 'Em andamento',
    degrees: {
      pos: { name: 'Pós-graduação em Auditoria e Perícia Contábil', school: 'Anhanguera', note: '' },
      bach: {
        name: 'Bacharelado em Ciências Contábeis',
        school: 'UENP',
        note: 'TCC: planejamento tributário aplicado à lucratividade de propriedades rurais.',
      },
    },
    certs: {
      crc: { name: 'Registro profissional', org: 'CRC-PR', detail: '084091/O' },
      anbima: { name: 'Gestão de Riscos e Performance', org: 'ANBIMA', detail: '' },
      enap: { name: 'Contabilidade – Gestão do Patrimônio Público', org: 'ENAP', detail: '21 h' },
      alura: { name: 'Formação Front-End', org: 'Alura', detail: '85 h' },
    },
    languages: [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'Básico · EF SET A2' },
    ],
  },
  contact: {
    title: 'Vamos conversar',
    lead: 'Tem uma vaga ou um projeto em auditoria, controles internos ou contabilidade? Escreva para mim.',
    email: 'E-mail',
    copy: 'Copiar e-mail',
    copied: 'Copiado',
    copiedAnnounce: 'E-mail copiado para a área de transferência.',
    copyFailed: 'Não foi possível copiar. Selecione o endereço manualmente.',
    location: 'Localização',
    locationValue: 'Cornélio Procópio – PR',
  },
  footer: {
    built: 'Feito com React, TypeScript e Motion.',
  },
}

export type Dict = typeof pt
