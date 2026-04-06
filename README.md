# Kauany Kimberly — Estética e Cosmética

Site institucional desenvolvido para a disciplina de **Programação Front-End** do curso de Análise e Desenvolvimento de Sistemas — UniCesumar.

Tema

Site de uma clínica de estética especializada em tratamentos faciais e corporais. O objetivo é apresentar os serviços oferecidos, facilitar o contato com clientes e permitir o agendamento de horários online.


Funcionalidades Interativas (JavaScript puro)

| # | Funcionalidade | Descrição |
|---|---|---|
| 1 | **Busca de serviços** | Barra de busca que filtra e destaca os cards de serviço em tempo real, com normalização de acentos e navegação por teclado |
| 2 | **Menu (mobile)** | Botão que abre/fecha a navegação em dispositivos móveis, com animação CSS e controle de foco |
| 3 | **Validação de formulário** | Validação inline com mensagens de erro acessíveis, máscara de telefone e simulação de envio |
| 4 | **Link ativo na navbar** | Intersection Observer que destaca o item do menu correspondente à seção visível |
| 5 | **Animação scroll reveal** | Cards revelados com fade + slide ao entrar no viewport (Intersection Observer) |
| 6 | **Sombra dinâmica no header** | Sombra do cabeçalho aumenta ao rolar a página |
| 7 | **Ano automático no footer** | Ano atual inserido via JS para não exigir atualização manual |


Tecnologias Utilizadas

**HTML5** — estrutura semântica com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<address>`, `<footer>`, `<figure>`, `<form>`
**CSS3** — Flexbox, CSS Grid, variáveis customizadas (`--var`), Media Queries, animações (`@keyframes`)
**JavaScript ES6+** — DOM API, Intersection Observer, eventos, validação, sem frameworks
**Google Fonts** — Cormorant Garamond (display) + Jost (corpo)
**Google Maps Embed API** — mapa de localização incorporado

Acessibilidade (WCAG)

Link "pular para o conteúdo principal" (WCAG 2.4.1)
Atributos `aria-label`, `aria-expanded`, `aria-controls`, `aria-live`, `aria-required`, `aria-invalid` em todos os elementos interativos
Texto alternativo em todas as imagens (`alt`)
Navegação completa por teclado (Tab, Enter, Escape)
Contraste de cores ≥ 4.5:1 (texto sobre fundo)
HTML semântico como base de acessibilidade
Mensagens de erro inline com `role="alert"` e `aria-live="polite"`

Responsividade

Breakpoint | Comportamento |
 Desktop (> 900px) | Layout horizontal com navbar expandida |
 Tablet (≤ 900px) | Seções empilhadas, navbar controlada pelo hamburguer |
 Mobile (≤ 480px) | Fonte e espaçamentos reduzidos, formulário em coluna única |

Estrutura de Arquivos
/
├── index.html         # Estrutura semântica da página
├── layout.css         # Estilos, variáveis, Flexbox/Grid, Media Queries
├── main.js            # JavaScript puro com todas as interatividades
├── logo.png           # Logotipo da marca
├── logow.png.png      # Ícone do WhatsApp
├── Cuidado.jpg        # Foto da seção hero
├── skin treatment.jpg # Foto da seção sobre
└── README.md          # Este arquivo
```
