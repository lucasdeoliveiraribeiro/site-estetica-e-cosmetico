/**
 * main.js — Kauany Kimberly Estética e Cosmética
 *
 * Funcionalidades implementadas (JavaScript puro, sem frameworks):
 *   1. Busca de serviços — filtra e destaca cards pelo nome
 *   2. Menu hamburguer — abre/fecha navegação em dispositivos móveis
 *   3. Validação de formulário — valida e exibe erros inline em tempo real
 *   4. Link ativo na navbar — destaca o item correspondente à seção visível
 *   5. Animação de cards — revela cards ao entrar no viewport (Intersection Observer)
 *   6. Header com sombra dinâmica — aumenta sombra ao rolar a página
 *   7. Ano dinâmico no footer — insere o ano atual automaticamente
 */

/* ================================================================
   1. BUSCA DE SERVIÇOS
   Abre/fecha a barra de busca e filtra os cards de serviço pelo texto
   ================================================================ */

function initBusca() {
    const btnBusca    = document.getElementById('btn-busca');
    const barraBusca  = document.getElementById('barra-busca');
    const campoBusca  = document.getElementById('campo-busca');
    const btnExecutar = document.getElementById('btn-executar-busca');
    const resultados  = document.getElementById('resultados-busca');

    if (!btnBusca || !barraBusca || !campoBusca) return;

    /* Dados dos serviços disponíveis — cada item tem palavras-chave para busca */
    const servicos = [
        {
            nome: 'Limpeza de Pele',
            palavras: ['limpeza', 'pele', 'impureza', 'revitalizar', 'limpeza de pele'],
            descricao: 'Tratamento profundo para remover impurezas e revitalizar sua pele.',
            âncora: '#servico'
        },
        {
            nome: 'Radiofrequência',
            palavras: ['radiofrequencia', 'radiofrequência', 'firmeza', 'rejuvenescimento', 'facial', 'corporal'],
            descricao: 'Tecnologia avançada para firmeza e rejuvenescimento facial e corporal.',
            âncora: '#servico'
        },
        {
            nome: 'Peeling Químico',
            palavras: ['peeling', 'quimico', 'químico', 'renovação', 'renovacao', 'celular', 'luminosa'],
            descricao: 'Renovação celular para uma pele mais luminosa, uniforme e jovem.',
            âncora: '#servico'
        },
        {
            nome: 'Hidratação Facial',
            palavras: ['hidratação', 'hidratacao', 'hidratação facial', 'nutricao', 'nutrição', 'vico', 'viço'],
            descricao: 'Nutrição profunda e recuperação do viço natural da sua pele.',
            âncora: '#servico'
        }
    ];

    /* Abre / fecha a barra de busca */
    function toggleBusca(abrir) {
        const estadoAtual = barraBusca.classList.contains('aberta');
        const novoEstado  = abrir !== undefined ? abrir : !estadoAtual;

        barraBusca.classList.toggle('aberta', novoEstado);
        barraBusca.setAttribute('aria-hidden', String(!novoEstado));
        btnBusca.setAttribute('aria-expanded', String(novoEstado));

        if (novoEstado) {
            campoBusca.focus();
        } else {
            /* Limpa busca ao fechar */
            campoBusca.value = '';
            resultados.innerHTML = '';
            limparDestaquesCards();
        }
    }

    /* Remove destaques visuais nos cards de serviço */
    function limparDestaquesCards() {
        document.querySelectorAll('.servico-card').forEach(card => {
            card.classList.remove('destaque-busca');
        });
    }

    /* Executa a busca e exibe resultados */
    function executarBusca() {
        const termo      = campoBusca.value.trim().toLowerCase();
        const cards      = document.querySelectorAll('.servico-card');

        limparDestaquesCards();
        resultados.innerHTML = '';

        if (!termo) return;

        /* Normaliza o texto removendo acentos para comparação */
        const normalizar = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const termoNorm  = normalizar(termo);

        const encontrados = servicos.filter(s =>
            s.palavras.some(p => normalizar(p).includes(termoNorm)) ||
            normalizar(s.nome).includes(termoNorm)
        );

        if (encontrados.length === 0) {
            resultados.innerHTML = `<p class="sem-resultado">Nenhum serviço encontrado para "<strong>${termo}</strong>".</p>`;
            return;
        }

        /* Exibe resultados na barra e destaca os cards correspondentes */
        encontrados.forEach(servico => {
            /* Item de resultado clicável */
            const item = document.createElement('div');
            item.className = 'resultado-item';
            item.innerHTML = `<strong>${servico.nome}</strong> — ${servico.descricao}`;
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Ir para ${servico.nome}`);

            const irPara = () => {
                const alvo = document.querySelector(servico.âncora);
                if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                toggleBusca(false);
            };

            item.addEventListener('click', irPara);
            item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') irPara(); });
            resultados.appendChild(item);

            /* Destaca o card de serviço correspondente */
            cards.forEach(card => {
                const nomeCard = card.getAttribute('data-servico') || '';
                if (normalizar(nomeCard).includes(normalizar(servico.nome.toLowerCase()))) {
                    card.classList.add('destaque-busca');
                }
            });
        });
    }

    /* Eventos */
    btnBusca.addEventListener('click', () => toggleBusca());
    btnExecutar.addEventListener('click', executarBusca);

    campoBusca.addEventListener('keydown', e => {
        if (e.key === 'Enter') executarBusca();
        if (e.key === 'Escape') toggleBusca(false);
    });

    /* Fecha a busca ao pressionar Escape em qualquer lugar */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && barraBusca.classList.contains('aberta')) {
            toggleBusca(false);
            btnBusca.focus();
        }
    });
}

/* ================================================================
   2. MENU HAMBURGUER (MOBILE)
   Abre/fecha a navegação em telas pequenas
   ================================================================ */

function initHamburger() {
    const btnMenu = document.getElementById('btn-menu');
    const navbar  = document.querySelector('.navbar');

    if (!btnMenu || !navbar) return;

    /* Alterna o estado do menu */
    function toggleMenu() {
        const aberto = navbar.classList.toggle('aberta');
        btnMenu.setAttribute('aria-expanded', String(aberto));
        btnMenu.setAttribute(
            'aria-label',
            aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
        );
    }

    btnMenu.addEventListener('click', toggleMenu);

    /* Fecha o menu ao clicar em um link de navegação */
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('aberta');
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.setAttribute('aria-label', 'Abrir menu de navegação');
        });
    });

    /* Fecha o menu ao clicar fora dele */
    document.addEventListener('click', e => {
        if (!btnMenu.contains(e.target) && !navbar.contains(e.target)) {
            navbar.classList.remove('aberta');
            btnMenu.setAttribute('aria-expanded', 'false');
        }
    });

    /* Fecha o menu ao pressionar Escape */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navbar.classList.contains('aberta')) {
            navbar.classList.remove('aberta');
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.focus();
        }
    });
}

/* ================================================================
   3. VALIDAÇÃO DE FORMULÁRIO
   Valida campos em tempo real e ao enviar; exibe erros inline
   ================================================================ */

function initFormulario() {
    const form    = document.getElementById('form-agendamento');
    const sucesso = document.getElementById('form-sucesso');

    if (!form) return;

    /* Regras de validação para cada campo */
    const regras = {
        nome: {
            validar: v => v.trim().length >= 3,
            mensagem: 'Informe seu nome completo (mínimo 3 caracteres).'
        },
        email: {
            validar: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
            mensagem: 'Informe um e-mail válido (ex: nome@email.com).'
        },
        telefone: {
            validar: v => v.replace(/\D/g, '').length >= 10,
            mensagem: 'Informe um telefone válido com DDD (ex: (41) 9 9999-9999).'
        },
        'servico-select': {
            validar: v => v !== '',
            mensagem: 'Selecione o serviço desejado.'
        }
    };

    /* Exibe ou remove mensagem de erro em um campo */
    function definirErro(campo, mensagem) {
        const erroEl = document.getElementById(`erro-${campo.id}`);
        if (!erroEl) return;

        if (mensagem) {
            erroEl.textContent = mensagem;
            campo.classList.add('campo-erro');
            campo.setAttribute('aria-invalid', 'true');
        } else {
            erroEl.textContent = '';
            campo.classList.remove('campo-erro');
            campo.setAttribute('aria-invalid', 'false');
        }
    }

    /* Valida um único campo e retorna true se válido */
    function validarCampo(campo) {
        const id   = campo.id;
        const regra = regras[id];
        if (!regra) return true; // campo sem regra é sempre válido

        const valido = regra.validar(campo.value);
        definirErro(campo, valido ? '' : regra.mensagem);
        return valido;
    }

    /* Validação em tempo real: ao sair do campo */
    Object.keys(regras).forEach(id => {
        const campo = document.getElementById(id);
        if (!campo) return;
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => {
            /* Remove o erro assim que o usuário começa a corrigir */
            if (campo.classList.contains('campo-erro')) validarCampo(campo);
        });
    });

    /* Máscara simples de telefone */
    const campTel = document.getElementById('telefone');
    if (campTel) {
        campTel.addEventListener('input', () => {
            let v = campTel.value.replace(/\D/g, '').substring(0, 11);
            if (v.length > 2)  v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
            if (v.length > 10) v = `${v.substring(0, 10)}-${v.substring(10)}`;
            campTel.value = v;
        });
    }

    /* Validação no envio do formulário */
    form.addEventListener('submit', e => {
        e.preventDefault();

        /* Valida todos os campos e coleta resultados */
        const resultados = Object.keys(regras).map(id => {
            const campo = document.getElementById(id);
            return campo ? validarCampo(campo) : true;
        });

        const tudo_valido = resultados.every(Boolean);

        if (!tudo_valido) {
            /* Move o foco para o primeiro campo com erro */
            const primeiro_erro = form.querySelector('.campo-erro');
            if (primeiro_erro) primeiro_erro.focus();
            return;
        }

        /* Simula envio e exibe mensagem de sucesso */
        const btnEnviar = document.getElementById('btn-agendar');
        if (btnEnviar) {
            btnEnviar.setAttribute('disabled', 'true');
            btnEnviar.querySelector('span').textContent = 'Enviando...';
        }

        /* Simula delay de requisição (em produção, seria uma chamada fetch/AJAX) */
        setTimeout(() => {
            form.reset();
            if (sucesso) {
                sucesso.removeAttribute('hidden');
                sucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            if (btnEnviar) {
                btnEnviar.removeAttribute('disabled');
                btnEnviar.querySelector('span').textContent = 'Enviar Agendamento';
            }
            /* Oculta mensagem de sucesso após 6 segundos */
            setTimeout(() => {
                if (sucesso) sucesso.setAttribute('hidden', '');
            }, 6000);
        }, 1200);
    });
}

/* ================================================================
   4. LINK ATIVO NA NAVBAR
   Destaca o link da seção atualmente visível na tela
   ================================================================ */

function initActiveNavLink() {
    const secoes   = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    /* Remove "active" de todos os links */
                    navLinks.forEach(link => link.classList.remove('active'));

                    /* Adiciona "active" ao link correspondente */
                    const linkAtivo = document.querySelector(
                        `.navbar a[href="#${entry.target.id}"]`
                    );
                    if (linkAtivo) linkAtivo.classList.add('active');
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-90px 0px 0px 0px'
        }
    );

    secoes.forEach(secao => observer.observe(secao));
}

/* ================================================================
   5. ANIMAÇÃO DE CARDS (SCROLL REVEAL)
   Revela os cards com fade+slide ao entrarem no viewport
   ================================================================ */

function initCardAnimations() {
    const cards = document.querySelectorAll(
        '.servico-card, .info-card, .menu .content, .homer-container-image'
    );

    /* Estado inicial: invisível e deslocado */
    cards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    /* Delay escalonado: cada card aparece 100ms após o anterior */
                    setTimeout(() => {
                        entry.target.style.opacity   = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);

                    /* Não repete a animação */
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    cards.forEach(card => observer.observe(card));
}

/* ================================================================
   6. SOMBRA DINÂMICA NO HEADER
   Aumenta a sombra ao rolar a página para dar profundidade
   ================================================================ */

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 40px rgba(180, 120, 80, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 30px rgba(180, 120, 80, 0.08)';
        }
    });
}

/* ================================================================
   7. ANO DINÂMICO NO FOOTER
   Insere automaticamente o ano atual para não precisar atualizar o HTML
   ================================================================ */

function initFooterYear() {
    const spanAno = document.getElementById('ano-footer');
    if (spanAno) {
        spanAno.textContent = new Date().getFullYear();
    }
}

/* ================================================================
   INICIALIZAÇÃO — executa após o DOM estar completamente carregado
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initBusca();           // Funcionalidade 1: busca de serviços
    initHamburger();       // Funcionalidade 2: menu mobile
    initFormulario();      // Funcionalidade 3: validação de formulário
    initActiveNavLink();   // Funcionalidade 4: link ativo na navbar
    initCardAnimations();  // Funcionalidade 5: animação de entrada dos cards
    initHeaderScroll();    // Funcionalidade 6: sombra dinâmica no header
    initFooterYear();      // Funcionalidade 7: ano automático no footer
});
