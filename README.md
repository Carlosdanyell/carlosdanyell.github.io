# Portfólio · Carlos Danyell da Silva

Portfólio profissional de Carlos Danyell da Silva, contador (CRC-PR 084091/O) com foco em auditoria e controles
internos e base em desenvolvimento web e mobile. Publicado em **[carlosdanyell.github.io](https://carlosdanyell.github.io)**.

O site apresenta trajetória, projetos, competências, formação e contato, em português (padrão) e inglês, com tema claro
(padrão) e escuro.

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com), com tokens de design em variáveis CSS (`src/styles/tokens.css`)
- [Motion](https://motion.dev) para galeria, carrossel, inclinação dos cards e indicadores; CSS + IntersectionObserver
  para as entradas de seção
- [Lenis](https://lenis.darkroom.engineering) para rolagem suave, só em desktop com mouse (no toque fica a rolagem
  nativa); tudo respeita `prefers-reduced-motion`
- Fontes auto-hospedadas: Sora (`@fontsource-variable/sora`), Geist e Geist Mono (pacote `geist`, recortadas para o
  latim com [subset-font](https://github.com/papandreou/subset-font))
- Pré-renderização no build com `react-dom/static`: o HTML já chega com todo o conteúdo e o React só hidrata
- [sharp](https://sharp.pixelplumbing.com) para gerar as imagens WebP responsivas
- Deploy no GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Comandos

Requer Node.js 22 ou mais recente.

```bash
npm install          # instala as dependências
npm run dev          # servidor local em http://localhost:5173
npm run build        # fontes + tipos + build de produção + pré-renderização em dist/
npm run preview      # serve o build de produção localmente
npm run typecheck    # só a checagem do TypeScript
npm run lint         # oxlint
npm run format       # Prettier
npm run images       # converte assets-origem/ em WebP, atualiza o manifesto e copia os currículos
npm run fonts        # recorta Geist e Geist Mono (roda sozinho antes do dev e do build)
```

## Estrutura

```
assets-origem/             Imagens originais (fora do git). Uma pasta por projeto.
scripts/process-images.mjs Gera public/images/** e src/data/images.generated.json
scripts/subset-fonts.mjs   Recorta as fontes Geist para src/assets/fonts/ (gerado, fora do git)
scripts/prerender.mjs      Injeta o HTML renderizado pelo React (src/entry-server.tsx) em dist/index.html
public/                    Favicon, imagem de compartilhamento, robots, sitemap, 404, imagens processadas
src/
  i18n/                    Todos os textos visíveis: pt.ts (padrão) e en.ts
  data/                    Dados sem texto: projetos, experiência, formação, contato
  components/              Layout (menu, rodapé), UI (botões, molduras, contador) e animações
  sections/                Uma pasta por seção: Hero, About, Experience, Projects, Skills, Education, Contact
  hooks/ lib/              Tema, rolagem, seção ativa, inclinação 3D, brilho dos cards e preferências de movimento
  styles/                  Tailwind, tokens de cor, composição editorial mobile first e fontes
```

## Como adicionar um novo projeto

1. **Imagens.** Crie `assets-origem/<slug>/` e coloque as capturas em PNG ou JPG, com nomes ordenados
   (`01-inicio.png`, `02-detalhe.png`…). Celular em retrato, desktop em 16:10 ou paisagem.
2. **Processe.** Rode `npm run images`. As versões WebP (480, 960 e 1440 px) vão para `public/images/<slug>/` e o
   manifesto `src/data/images.generated.json` é atualizado.
3. **Textos.** Em `src/i18n/pt.ts`, dentro de `projects.items`, adicione uma entrada com a mesma chave nos dois idiomas
   (repita em `src/i18n/en.ts`; o TypeScript acusa se faltar alguma):

   ```ts
   meuprojeto: {
     name: 'Meu projeto',
     kind: 'Aplicação web',
     summary: 'Uma frase sobre o que o projeto faz.',
     highlights: ['Destaque 1', 'Destaque 2'],
     shots: { '01-inicio': 'Texto alternativo da captura' },
   },
   ```

4. **Dados.** Em `src/data/projects.ts`, adicione o projeto ao array `projects`:

   ```ts
   {
     id: 'meuprojeto',
     index: '05',
     stack: ['TypeScript', 'React'],
     links: [{ kind: 'live', href: 'https://…' }, { kind: 'code', href: 'https://github.com/…' }],
     visual: 'browser', // 'phone-carousel' | 'phone-fan' | 'browser' | 'illustration'
     shots: shots('meuprojeto', [['01-inicio', 'browser']]), // 'phone' | 'browser' | 'landscape'
   },
   ```

   Os tipos de link são `live` (Ver site), `play` (Jogar), `code` (Código) e `download` (Baixar APK, com o tamanho
   em `size`). Use `status: 'in-development'` para mostrar o selo “Em desenvolvimento” e `fictionalData: true` quando
   as capturas usarem dados fictícios.

   O APK do DevFinance fica numa release deste repositório, com o arquivo `devfinance.apk`. O link usa
   `releases/latest/download/devfinance.apk`, então uma versão nova só precisa de uma release nova com o arquivo de
   mesmo nome; o site não muda.

5. **Posição na grade.** Em `src/sections/Projects/ProjectGrid.tsx`, inclua um `<ProjectCard>` com o layout desejado:
   `featured` (largura total, destaque), `stacked` (visual em cima, texto embaixo) ou `wide` (lado a lado). As colunas
   seguem a grade de 12 (`lg:col-span-7` + `lg:col-span-5`, por exemplo).
6. Rode `npm run dev` para conferir e `npm run build` antes de publicar.

## Currículo e foto

- **Currículo:** salve os PDFs em `assets-origem/` e rode `npm run images`:
  - português: `curriculo-carlos-danyell.pdf` → publicado como `/curriculo-carlos-danyell.pdf`
  - inglês: `curriculo-carlos-danyell Ingles.pdf` (ou `curriculo-carlos-danyell-en.pdf`) → `/resume-carlos-danyell.pdf`

  O botão “Baixar currículo” baixa o PDF do idioma ativo e aparece sozinho no próximo build (ou ao reiniciar o
  `npm run dev`). Os dois arquivos estão bloqueados para buscadores no `public/robots.txt`, porque trazem telefone.

- **Foto:** salve como `assets-origem/perfil/foto.jpg` (retrato, proporção 4:5) e rode `npm run images`. Ela substitui o
  monograma na seção Sobre.

Como `assets-origem/` fica fora do git, o PDF e as imagens processadas em `public/` precisam ser commitados.

## Publicação

Cada push na branch `main` executa o workflow `.github/workflows/deploy.yml`, que instala as dependências, gera o build
e publica `dist/` no GitHub Pages (Settings → Pages → Source: **GitHub Actions**). Por ser um site de usuário
(`carlosdanyell.github.io`), o `base` do Vite é `/`.

## Acessibilidade e desempenho

- HTML semântico, navegação por teclado com foco visível, link para pular ao conteúdo e textos alternativos
- Contraste AA nos dois temas; o vermelho de detalhe nunca é usado como cor de texto
- `prefers-reduced-motion` desliga o Lenis, a inclinação 3D, o cursor, a grade interativa, as entradas, a troca
  automática de telas e os indicadores animados
- Imagens WebP responsivas com `srcset`, carregamento sob demanda e placeholder desfocado
- HTML pré-renderizado: o conteúdo aparece antes do JavaScript; as entradas do hero são animações CSS
- A grade de projetos, o modal de detalhes e o Lenis ficam em chunks separados; o Lenis só carrega em desktop com mouse
- Hero de 88svh no celular, timeline vertical, competências em quatro grupos e projetos em bento no desktop
- Capturas com controles de 44px; a troca automática pausa com o mouse em cima, com o foco e pelo botão
- Efeitos que seguem o mouse (grade do hero, brilho e inclinação dos cards) só existem com ponteiro fino; máscaras CSS
  ficam fora do celular, onde já corromperam a pintura em GPUs Android
- Entradas progressivas com HTML visível antes da hidratação e também sem JavaScript
- Fontes latinas recortadas e pré-carregadas (Sora e Geist)
