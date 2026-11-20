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
  var LOGO = {
    linux: 'M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z',
    vmware: 'M.5 10.1a.505.505 0 00-.197.048.497.497 0 00-.25.68l1.138 2.475c.179.38.38.592.721.592.342 0 .542-.22.72-.592l1.003-2.186a.144.144 0 01.144-.092.16.16 0 01.157.16v2.118a.535.535 0 101.066 0v-1.73a.531.531 0 01.566-.552.52.52 0 01.541.551v1.730a.531.531 0 00.53.593.539.539 0 00.535-.592v-1.73a.531.531 0 01.564-.552.52.52 0 01.543.551v1.73a.531.531 0 00.528.593.535.535 0 00.535-.592v-1.969a1.234 1.234 0 00-1.283-1.23 1.647 1.647 0 00-1.14.486 1.26 1.26 0 00-1.095-.483 1.807 1.807 0 00-1.074.483 1.287 1.287 0 00-.961-.483 1.177 1.177 0 00-1.158.786l-.729 1.716-.933-2.203.011-.004A.505.505 0 00.5 10.1zm18.43.06a.27.27 0 00-.266.274h.002v3.142a.27.27 0 10.535 0v-1.222c0-1.037.571-1.560 1.27-1.643a.266.266 0 00.238-.274.258.258 0 00-.266-.269 1.465 1.465 0 00-1.242.88v-.614a.266.266 0 00-.271-.274zm-6.735.008a.273.273 0 00-.25.217l-.912 2.627-.902-2.62a.28.28 0 00-.274-.22.266.266 0 00-.27.258.493.493 0 00.034.144l1.09 3.037.02-.007a.319.319 0 00.298.242.3.3 0 00.293-.242l.903-2.583.896 2.583a.3.3 0 00.293.242h.018a.319.319 0 00.293-.242l1.097-3.038a.512.512 0 00.033-.144.258.258 0 00-.265-.25.262.262 0 00-.258.209l-.918 2.63-.904-2.626a.285.285 0 00-.278-.217h-.025a.273.273 0 00-.012 0zm10.168.008a1.75 1.75 0 00-1.691 1.851 1.765 1.765 0 001.76 1.858l-.008.013a1.784 1.784 0 001.33-.539.228.228 0 00.082-.17.228.228 0 00-.379-.168 1.435 1.435 0 01-1.018.415 1.237 1.237 0 01-1.24-1.207h2.555a.247.247 0 00.246-.247c0-.945-.593-1.806-1.637-1.806zm-5.744.002a1.571 1.571 0 00-.158.006 2.384 2.384 0 00-1.078.205.22.22 0 00-.143.222.24.24 0 00.235.229.266.266 0 00.095-.024 1.822 1.822 0 01.834-.162c.691 0 1.07.334 1.07.979v.125a3.796 3.796 0 00-1.103-.15c-.892 0-1.52.4-1.52 1.16l-.003-.004c0 .736.671 1.117 1.34 1.117a1.575 1.575 0 001.298-.62v.343a.247.247 0 00.254.25.254.254 0 00.258-.262v-1.983a1.416 1.416 0 00-.379-1.046 1.571 1.571 0 00-1-.385zm5.719.43c.714 0 1.085.565 1.139 1.214h-2.278a1.222 1.222 0 011.139-1.215zm-5.885 1.382a3.75 3.75 0 011.057.153V12.49c0 .57-.539.973-1.2.973-.485 0-.904-.261-.904-.713 0-.467.375-.76 1.047-.76Z',
    ubiquiti: 'M23.1627 0h-1.4882v1.4882h1.4882zm-5.2072 10.4226V7.4409l.0007.001h2.9755v2.9762h2.9756v.9433c0 1.0906-.0927 2.3827-.306 3.3973-.1194.5672-.3004 1.1308-.5127 1.672-.2175.5537-.468 1.0841-.7408 1.5595a11.6795 11.6795 0 0 1-1.2456 1.7762l-.0253.0294-.0417.0488c-.1148.1347-.2283.2679-.3531.398a11.7612 11.7612 0 0 1-.4494.4492c-1.9046 1.8343-4.3861 2.98-6.9808 3.243-.3122.032-.939.0652-1.2519.0652-.3139-.001-.9397-.0331-1.252-.0651-2.5946-.263-5.0761-1.4097-6.9806-3.243a11.75 11.75 0 0 1-.4495-.4494c-.131-.1356-.249-.2748-.3683-.4154l-.0006-.0004-.0512-.0603a11.6576 11.6576 0 0 1-1.2456-1.7762c-.2727-.4763-.5233-1.0058-.7408-1.5595-.2123-.5414-.3933-1.1048-.5128-1.6718C.1854 13.743.0927 12.452.0927 11.3616V.1864h5.9518v10.2362s0 .7847.0099 1.0415l.0022.0599v.0004c.0127.332.0247.6575.0594.9812.098.919.3014 1.7913.7203 2.5288.1213.213.2443.42.3915.616.8953 1.1939 2.2577 2.0901 3.9573 2.3398.2022.0294.6108.0552.8149.0552.204 0 .6125-.0258.8149-.0552 1.6996-.2497 3.062-1.146 3.9573-2.3398.148-.196.2701-.403.3914-.616.419-.7375.6224-1.6095.7204-2.5288.0346-.3243.047-.6503.0594-.9831l.0022-.0584c.0099-.2568.0099-1.0415.0099-1.0415zm.7427-8.19h2.2326v2.2319h2.9764v2.9764h-2.9764V4.4654h-2.2326V2.2328Z',
    fortinet: 'M0 9.785h6.788v4.454H0zm8.666-6.33h6.668v4.453H8.666zm0 12.637h6.668v4.454H8.666zm8.522-6.307H24v4.454h-6.812zM2.792 3.455C1.372 3.814.265 5.404 0 7.425v.506h6.788V3.454zM0 16.091v.554c.24 1.926 1.276 3.466 2.624 3.9h4.188v-4.454zm24-8.184v-.506c-.265-1.998-1.372-3.587-2.792-3.972h-4.02v4.454H24zM21.376 20.57c1.324-.458 2.36-1.974 2.624-3.9v-.554h-6.812v4.454Z',
    claude: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'
  };

  function lista(a) { return '<ul class="list">' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }

  // Cards de serviços da home
  var grid = $('#servicosGrid');
  // (o HTML já vem pré-renderizado para SEO; o JS só preenche se estiver vazio)
  if (grid && !grid.children.length) {
    grid.innerHTML = D.servicos.map(function (s, i) {
      return '<a class="card spot reveal" href="servicos.html#' + s.id + '"><img class="card__img" src="img/' + IMG[s.id] + '.svg" width="120" height="90" loading="lazy" alt="' + ALT[s.id] + '"><span class="card__ico mono">' + pad(i + 1) + ' / ' + s.id + '</span><h3>' + s.nome + '</h3><p>' + s.resumo + '</p></a>';
    }).join('');
  }

  // Marquee de tecnologias (logos: Simple Icons, CC0; Microsoft/Sophos/Acronis sem ícone oficial disponível)
  var mq = $('#marquee');
  if (mq) {
    var P = {
      ms: '<path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623z"/>',
      linux: '<path d="' + LOGO.linux + '"/>',
      ubiquiti: '<path d="' + LOGO.ubiquiti + '"/>',
      fortinet: '<path d="' + LOGO.fortinet + '"/>',
      claude: '<path d="' + LOGO.claude + '"/>',
      shield: '<path d="M12 1.5 3.5 5v6.2c0 5.2 3.6 9.9 8.5 11.3 4.9-1.4 8.5-6.1 8.5-11.3V5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8.2 12 2.6 2.6 5-5" fill="none" stroke="currentColor" stroke-width="2"/>',
      code: '<path d="M8 6 2 12l6 6M16 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2"/>'
    };
    var list = [
      ['Microsoft 365', 'ms'], ['Azure', 'ms'], ['Windows Server', 'ms'], ['Copilot', 'ms'],
      ['Linux', 'linux'], ['VMware', 'vmware'], ['UniFi', 'ubiquiti'], ['Fortinet', 'fortinet'],
      ['Sophos', 'shield'], ['Acronis', 'shield'], ['Claude', 'claude'], ['APIs REST', 'code']
    ];
    var items = list.map(function (t) {
      if (t[1] === 'vmware') {
        return '<span class="mq__item" title="VMware"><svg class="mq__word" viewBox="0 9.6 24 4.6" width="78" height="15" fill="currentColor" role="img" aria-label="VMware"><path d="' + LOGO.vmware + '"/></svg></span>';
      }
      return '<span class="mq__item"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">' + P[t[1]] + '</svg>' + t[0] + '</span>';
    }).join('');
    mq.innerHTML = items + items.replace(/<span class="mq__item"/g, '<span class="mq__item" aria-hidden="true"');
  }

  // Página de serviços: índice e seções detalhadas
  var idx = $('#svcIndex');
  if (idx && !idx.children.length) {
    idx.innerHTML = D.servicos.map(function (s) { return '<a href="#' + s.id + '">' + s.nome + '</a>'; }).join('');
  }
  function planos() {
    return '<div class="plans"><p class="tag mono">$ rapidcode --planos-suporte</p><h3>Planos de suporte</h3><div class="grid grid--3">' +
      D.planos.map(function (p) {
        return '<div class="card plan card--static' + (p.pop ? ' plan--hot' : '') + '">' + (p.pop ? '<span class="badge mono">mais popular</span>' : '') +
          '<h3>' + p.nome + '</h3><p class="price mono">Sob consulta</p>' + lista(p.itens) +
          '<a class="btn' + (p.pop ? '' : ' btn--ghost') + '" href="contato.html?assunto=' + encodeURIComponent('Suporte e outsourcing de TI') + '">Consultar plano ' + p.nome + '</a></div>';
      }).join('') +
      '</div><p class="plans__more"><a class="btn btn--ghost" href="contato.html">Monte um plano sob medida</a></p></div>';
  }
  var det = $('#svcDetalhe');
  if (det) {
    if (!det.children.length) det.innerHTML =D.servicos.map(function (s, i) {
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
      // quebras de linha em CRLF, como pede a RFC 6068 para mailto (alguns clientes ignoram só \n)
      var corpo = ['Nome: ' + v('nome'), 'Empresa: ' + v('empresa'), 'E-mail: ' + v('email'),
        'Telefone: ' + v('tel'), 'Assunto: ' + v('assunto'), '', 'Mensagem:', v('msg')].join('\r\n');
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
