# RapidCode

Site estático da RapidCode, empresa de TI para empresas (Microsoft 365, nuvem, infraestrutura, backup, segurança, suporte, sistemas e IA aplicada). HTML, CSS e JavaScript puros, sem build e sem bibliotecas.

## Como abrir

Dê dois cliques em `index.html` (as fontes vêm do Google Fonts, então é preciso internet para a tipografia).

## Identidade visual: preto, branco e verde neon, estilo terminal

- Proporção de cores: preto 60% (fundos), branco 25% (texto, traços das ilustrações), verde neon 15% (destaques, botões, brilhos).
- Paleta (variáveis em `:root` de `css/style.css`):
  - fundos `#000000`, `#0A0A0A`, `#111111`, `#161616`; linhas `#222222` e `#333333`
  - branco `#FFFFFF`, texto secundário `#B3B3B3`, texto de listas `#D9D9D9`
  - verde neon `#39FF14`, destaque claro `#7CFF5C`, hover `#2BD10F`
  - botões primários: fundo verde neon com texto preto
- Tipografia: títulos em Space Grotesk 500/600/700, corpo em Inter, rótulos e detalhes em JetBrains Mono (rótulos de terminal como `$ rapidcode --servicos`).
- Logo: quadrado de borda verde com `>_` (chevron branco, cursor verde) e wordmark `Rapid` + `Code` (verde claro). Arquivos `img/logo.svg` (completo) e `img/favicon.svg` (símbolo); no site o logo é SVG inline no header.

## Animações

- Chuva de caracteres (canvas) no fundo; pausa quando o hero sai de vista ou a aba fica oculta
- Título do hero da home com efeito de digitação e cursor piscando
- Reveal ao rolar (IntersectionObserver) com escalonamento
- Spotlight verde que segue o mouse nos cards
- Contadores animados nos números
- Linha do tempo que se preenche com o scroll
- Marquee de tecnologias (pausa no hover)
- Header que encolhe ao rolar; menu hambúrguer no celular
- Ilustrações SVG com LEDs piscando e linhas tracejadas animadas
- `prefers-reduced-motion`: desliga animações, chuva e transições (conteúdo aparece direto)

## Imagens (`img/`)

Ilustrações em line-art branco com detalhes verde neon, todas SVG:

- `hero.svg`, `monitoramento.svg`, `cta-bg.svg`: home e chamadas
- `svc-*.svg`: uma por serviço (9)
- `mock-rapidhub.svg`, `mock-rapiddesk.svg`: telas dos produtos
- `sobre.svg`, `contato.svg`: topo das páginas Sobre e Contato
- `logo.svg`, `favicon.svg`: marca

## Estrutura

- `index.html`: home (hero, serviços, produtos, processo, diferenciais, planos, números, chamada)
- `servicos.html`: os 9 serviços em detalhe (o que inclui, tecnologias, entregáveis) e planos Basic/Standard/Premium
- `sobre.html`: missão, princípios e linha do tempo
- `contato.html`: formulário (assunto com os 9 serviços, RapidHub, RapidDesk e "Não sei ainda") e dados de contato
- `css/style.css`: tema, componentes e animações, compartilhado pelas 4 páginas
- `js/data.js`: serviços, produtos e planos (edite aqui para mudar o conteúdo de `servicos.html`, dos cards da home e do assunto do formulário)
- `js/main.js`: comportamento compartilhado (menu, header, animações, renderização, formulário)
- `modelos/`: variações visuais anteriores, mantidas como histórico (não são usadas pelo site)

## Pendências antes de publicar

- Trocar telefone, e-mail, cidade e número do WhatsApp (em `contato.html`; o número também está no link do botão)
- Ligar o formulário de contato a um serviço de envio (hoje só mostra a mensagem de sucesso)
- Substituir os números e depoimentos da home por dados reais autorizados
- Definir o endereço do e-mail e redes sociais do rodapé, se desejado
- Adicionar domínio, analytics e publicação (ex.: GitHub Pages)
