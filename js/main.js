/* RapidCode - comportamento compartilhado pelas 4 páginas (JS puro, sem bibliotecas).
   Menu, header que encolhe, digitação, reveal, contadores, linha do tempo, spotlight, chuva de caracteres,
   cards de serviços, página de serviços detalhada e formulário de contato. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var D = window.RC || { servicos: [], produtos: [], planos: [] };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // Ilustração de cada serviço (id em data.js -> arquivo em img/)
  var IMG = {
    'microsoft-365': 'svc-microsoft-365', 'servidores-nuvem': 'svc-servidores-nuvem', 'infraestrutura-local': 'svc-infra-local',
    'backup': 'svc-backup', 'seguranca': 'svc-seguranca', 'suporte': 'svc-suporte', 'desenvolvimento': 'svc-dev',
    'ia': 'svc-ia', 'consultoria': 'svc-consultoria'
  };
  var ALT = {
    'microsoft-365': 'Ilustração de um envelope de e-mail ligado a quatro janelas do Microsoft 365',
    'servidores-nuvem': 'Ilustração de uma nuvem conectada a dois servidores com LEDs',
    'infraestrutura-local': 'Ilustração de um switch de rede com portas e sinais de wi-fi',
    'backup': 'Ilustração de uma pilha de discos ligada a um cadeado de proteção',
    'seguranca': 'Ilustração de um escudo com marca de verificação e linhas de firewall',
    'suporte': 'Ilustração de um headset de atendimento com balão de chamado',
    'desenvolvimento': 'Ilustração de uma janela de navegador com símbolos de código',
    'ia': 'Ilustração de um chip com a sigla AI e trilhas de circuito',
    'consultoria': 'Ilustração de um gráfico de barras com linha de tendência'
  };
  var techs = ['Microsoft 365', 'Azure', 'Entra ID', 'Intune', 'SharePoint', 'Teams', 'Windows Server', 'Linux', 'Hyper-V', 'VMware', 'UniFi', 'Sophos', 'Fortinet', 'Acronis', 'Claude', 'Copilot', 'APIs REST'];

  function lista(a) { return '<ul class="list">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }

  // Cards de serviços da home
  var grid = $('#servicosGrid');
  if (grid) {
    grid.innerHTML = D.servicos.map(function (s, i) {
      return '<a class="card spot reveal" href="servicos.html#' + s.id + '"><img class="card__img" src="img/' + IMG[s.id] + '.svg" width="120" height="90" loading="lazy" alt="' + ALT[s.id] + '"><span class="card__ico mono">' + pad(i + 1) + ' / ' + s.id + '</span><h3>' + s.nome + '</h3><p>' + s.resumo + '</p></a>';
    }).join('');
  }

  // Marquee de tecnologias
  var mq = $('#marquee');
  if (mq) {
    var items = techs.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    mq.innerHTML = items + items.replace(/<span>/g, '<span aria-hidden="true">');
  }

  // Página de serviços: índice e seções detalhadas
  var idx = $('#svcIndex');
  if (idx) {
    idx.innerHTML = D.servicos.map(function (s) { return '<a href="#' + s.id + '">' + s.nome + '</a>'; }).join('');
  }
  function planos() {
    return '<div class="plans"><p class="tag mono">$ rapidcode --planos-suporte</p><h3>Planos de suporte</h3><div class="grid grid--3">' +
      D.planos.map(function (p) {
        return '<div class="card plan card--static' + (p.pop ? ' plan--hot' : '') + '">' + (p.pop ? '<span class="badge mono">mais popular</span>' : '') +
          '<h3>' + p.nome + '</h3><p class="price mono">Sob consulta</p>' + lista(p.itens) +
          '<a class="btn' + (p.pop ? '' : ' btn--ghost') + '" href="contato.html?assunto=' + encodeURIComponent('Suporte e outsourcing de TI') + '">Consultar</a></div>';
      }).join('') +
      '</div><p class="plans__more"><a class="btn btn--ghost" href="contato.html">Monte um plano sob medida</a></p></div>';
  }
  var det = $('#svcDetalhe');
  if (det) {
    det.innerHTML = D.servicos.map(function (s, i) {
      return '<article class="card spot reveal svc" id="' + s.id + '">' +
        '<div class="svc__head"><img src="img/' + IMG[s.id] + '.svg" width="150" height="113" loading="lazy" alt="' + ALT[s.id] + '">' +
        '<div><span class="card__ico mono">' + pad(i + 1) + ' / ' + s.id + '</span><h2>' + s.nome + '</h2><p class="svc__desc">' + s.desc + '</p></div></div>' +
        '<div class="cols"><div><h4>$ o-que-inclui</h4>' + lista(s.inclui) + '</div>' +
        '<div><h4>$ tecnologias</h4><div class="chips">' + s.tec.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></div>' +
        '<div><h4>$ entregaveis</h4>' + lista(s.entreg) + '</div></div>' +
        (s.planos ? planos() : '') + '</article>';
    }).join('');
    if (location.hash) {
      var tg = document.getElementById(location.hash.slice(1));
      if (tg) setTimeout(function () { tg.scrollIntoView(); }, 60);
    }
  }

  // Formulário de contato
  var sel = $('#assunto');
  if (sel) {
    var opts = D.servicos.map(function (s) { return s.nome; }).concat(D.produtos.map(function (p) { return 'Produto: ' + p.nome; }), ['Não sei ainda']);
    sel.innerHTML = '<option value="">Selecione...</option>' + opts.map(function (o) { return '<option>' + o + '</option>'; }).join('');
    var q = (location.search.match(/assunto=([^&]+)/) || [])[1];
    if (q) { try { sel.value = decodeURIComponent(q); } catch (e) { /* ignora */ } }
  }
  var form = $('#formContato');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = $('#ok');
      var f = form.elements;
      var v = function (n) { return (f[n] && f[n].value || '').trim(); };
      var corpo = 'Nome: ' + v('nome') + '\nEmpresa: ' + v('empresa') + '\nE-mail: ' + v('email') +
        '\nTelefone: ' + v('tel') + '\nAssunto: ' + v('assunto') + '\n\nMensagem:\n' + v('msg');
      var assunto = 'Contato pelo site - ' + v('assunto');
      ok.style.display = 'block';
      window.location.href = 'mailto:contato@rapidcode.com.br?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);
      ok.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
  }

  // Header que encolhe + linha do tempo
  var header = $('#header');
  function onScroll() {
    header.classList.toggle('is-small', window.scrollY > 40);
    updateTimeline();
  }

  // Menu hambúrguer
  var burger = $('#burger'), nav = $('#nav');
  function closeMenu() {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Digitação no título do hero
  var typed = $('#typed');
  if (typed) {
    var full = typed.getAttribute('data-text');
    if (reduce) { typed.textContent = full; }
    else {
      var n = 0;
      (function tick() {
        typed.textContent = full.slice(0, ++n);
        if (n < full.length) setTimeout(tick, 38 + Math.random() * 45);
      })();
    }
  }

  // Reveal escalonado
  var revs = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    revs.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, sibs = $$('.reveal', el.parentElement);
        el.style.setProperty('--d', Math.max(0, sibs.indexOf(el)) * 80 + 'ms');
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    revs.forEach(function (e) { io.observe(e); });
  }

  // Contadores
  function runCount(el) {
    var to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = to.toFixed(dec) + suf; return; }
    var t0 = performance.now(), dur = 1600;
    (function f(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } });
    }, { threshold: .6 });
    counters.forEach(function (e) { co.observe(e); });
  } else { counters.forEach(runCount); }

  // Linha do tempo
  var tl = $('#timeline'), fill = $('#tlFill'), steps = tl ? $$('li', tl) : [];
  function updateTimeline() {
    if (!tl) return;
    var r = tl.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh * .6 - r.top) / r.height));
    fill.style.height = (p * 100) + '%';
    steps.forEach(function (li) {
      li.classList.toggle('on', li.getBoundingClientRect().top < vh * .6);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateTimeline);
  onScroll();

  // Spotlight nos cards
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.spot');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  // Chuva de caracteres (pausa quando o hero sai de vista ou a aba fica oculta)
  var cv = $('#rain');
  if (!reduce && cv && cv.getContext) {
    var ctx = cv.getContext('2d'), cols, drops, fs = 16, visible = true, raf = 0, last = 0;
    var chars = '01<>/{}[]();=$#ABCDEF'.split('');
    var size = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(innerWidth / fs);
      drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * -50);
    };
    size();
    window.addEventListener('resize', size);
    var draw = function (t) {
      raf = requestAnimationFrame(draw);
      if (t - last < 70) return;
      last = t;
      ctx.fillStyle = 'rgba(0,0,0,.14)';
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.font = fs + 'px "JetBrains Mono", monospace';
      for (var i = 0; i < cols; i++) {
        var ch = chars[(Math.random() * chars.length) | 0];
        var rr = Math.random();
        ctx.fillStyle = rr > .9 ? 'rgba(255,255,255,.35)' : rr > .45 ? 'rgba(57,255,20,.75)' : 'rgba(124,255,92,.55)';
        ctx.fillText(ch, i * fs, drops[i] * fs);
        if (drops[i] * fs > innerHeight && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
    };
    var start = function () { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw); };
    var stop = function () { cancelAnimationFrame(raf); raf = 0; };
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    var hero = $('.hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) start(); else stop();
      }).observe(hero);
    }
    start();
  }
})();
