(() => {
  if (window.location.pathname !== "/") {
    window.location.replace("/");
    return;
  }

  const supportUrl = "https://x.com/cwmunista";
  const marketId = "campaign-support-market";

  const campaign = {
    PT: {
      tagline: "contra a hegemonia",
      headings: ["organizar pra vencer.", "", ""],
      description: "a teoria na prática. a mídia da classe precisa da sua força pra rodar.",
    },
    EN: {
      tagline: "against hegemony",
      headings: ["organize to win.", "", ""],
      description: "theory in practice. the media of the class needs your support to keep running.",
    },
  };
  const navigationMenuItems = [
    { title: "Home", href: "#home", icon: "Home", view: "home" },
    { title: "Blog", href: "#blog", icon: "Rss", view: "blog" },
    { title: "Docs", href: "#docs", icon: "BookOpen", view: "docs" },
  ];
  const documentResources = [
    {
      category: "Biblioteca digital",
      title: "Arquivo Marxista na Internet",
      description: "Biblioteca em português com textos, dicionário, novidades e materiais temáticos.",
      cover: "/assets/karl-marx-og.webp",
      coverAlt: "Retrato de Karl Marx",
      href: "https://www.marxists.org/portugues/",
      action: "Explorar arquivo",
    },
    {
      category: "Livro em PDF",
      title: "Dicionário do Pensamento Marxista",
      description: "Versão digital em PDF hospedada pelo portal Marxismo 21.",
      cover: "/assets/dicionario.marx.jpg",
      coverAlt: "Capa do Dicionário do Pensamento Marxista",
      coverFit: "contain",
      href: "https://marxismo21.org/wp-content/uploads/2012/12/Dicion-rio-do-Pensamento-Marxista.pdf",
      action: "Abrir PDF",
    },
  ];
  const socialProfiles = [
    {
      network: "X",
      name: "☭",
      handle: "@cwmunista",
      bio: "opressor da burguesia",
      href: "https://x.com/cwmunista",
      banner: "/assets/cwmunista-x-banner.jpg",
      avatar: "/assets/cwmunista-x-avatar.jpg",
    },
    {
      network: "X",
      name: "☭ BolcheBased ☭",
      handle: "@BolcheBased",
      bio: "Patriota e comunista, financiado pelo Soros para espalhar o marxismo cultural pelo mundo... | Estudante de Relações Internacionais!",
      href: "https://x.com/BolcheBased",
      banner: "/assets/bolchebased-x-banner.jpg",
      avatar: "/assets/bolchebased-x-avatar.jpg",
    },
  ];
  const organizationGroups = [
    {
      title: "Partidos",
      tabLabel: "Partidos",
      organizations: [
        {
          title: "UP - Unidade Popular",
          image: "/assets/logos/up.webp",
          imageAlt: "Logo da Unidade Popular",
          href: "https://unidadepopular.org.br/",
        },
        {
          title: "PCB - Partido Comunista Brasileiro",
          image: "/assets/logos/pcb.webp",
          imageAlt: "Logo do Partido Comunista Brasileiro",
          href: "https://pcb.org.br/portal2/",
        },
        {
          title: "PCB-RR - PCB Reconstrução Revolucionária",
          image: "/assets/logos/pcbrr.jpg",
          imageAlt: "Logo do PCB Reconstrução Revolucionária",
          href: "https://www.instagram.com/pcbrr_rp/",
        },
        {
          title: "PSTU - Partido Socialista dos Trabalhadores Unificado",
          image: "/assets/logos/pstu-redimensionado.jpg",
          imageAlt: "Logo do PSTU",
          href: "https://www.pstu.org.br/",
        },
        {
          title: "PCO - Partido da Causa Operária",
          image: "/assets/logos/pco-redimensionado.png",
          imageAlt: "Logo do Partido da Causa Operária",
          href: "https://pco.org.br/",
        },
        {
          title: "PSOL - Partido Socialismo e Liberdade",
          image: "/assets/logos/psol.svg",
          imageAlt: "Logo do PSOL",
          href: "https://psol50.org.br/",
        },
        {
          title: "PCdoB - Partido Comunista do Brasil",
          image: "/assets/logos/pcdob.webp",
          imageAlt: "Logo do PCdoB",
          href: "https://pcdob.org.br/",
        },
        {
          title: "PT - Partido dos Trabalhadores",
          image: "/assets/logos/pt.png",
          imageAlt: "Logo do PT",
          href: "https://pt.org.br/",
        },
      ],
    },
    {
      title: "Movimentos Sociais de Massa",
      tabLabel: "Movimentos",
      organizations: [
        {
          title: "MST - Movimento dos Trabalhadores Rurais Sem Terra",
          image: "/assets/logos/mst.png",
          imageAlt: "Logo do MST",
          href: "https://mst.org.br/",
        },
        {
          title: "MTST - Movimento dos Trabalhadores Sem-Teto",
          image: "/assets/logos/mtst.png",
          imageAlt: "Logo do MTST",
          href: "https://mtst.org/",
        },
        {
          title: "MLB - Movimento de Luta nos Bairros, Vilas e Favelas",
          image: "/assets/logos/mlb.png",
          imageAlt: "Logo do MLB",
          href: "https://www.instagram.com/mlbnacional/",
        },
        {
          title: "MAM - Movimento pela Soberania Popular na Mineração",
          image: "/assets/logos/mam.jpg",
          imageAlt: "Logo do MAM",
          href: "https://www.mamnacional.org.br/",
        },
        {
          title: "MPA - Movimento dos Pequenos Agricultores",
          image: "/assets/logos/mpa.jpg",
          imageAlt: "Logo do MPA",
          href: "https://mpabrasil.org.br/",
        },
        {
          title: "MAB - Movimento dos Atingidos por Barragens",
          image: "/assets/logos/mab.jpg",
          imageAlt: "Logo do MAB",
          href: "https://mab.org.br/",
        },
      ],
    },
    {
      title: "Coletivos de Agitação, Juventude e Frentes Populares",
      tabLabel: "Coletivos",
      organizations: [
        {
          title: "UJC - União da Juventude Comunista",
          image: "/assets/logos/ujc.jpg",
          imageAlt: "Logo da UJC",
          href: "https://ujc.org.br/",
        },
        {
          title: "UJR - União da Juventude Rebelião",
          image: "/assets/logos/ujr.png",
          imageAlt: "Logo da UJR",
          href: "https://www.rebeliao.org/",
        },
        {
          title: "Coletivo Olga Benario - Movimento de Mulheres",
          image: "/assets/logos/olga.png",
          imageAlt: "Logo do Coletivo Olga Benario",
          href: "https://www.movimentoolga.com/",
        },
        {
          title: "Coletivo Minervino de Oliveira - Coletivo Negro Combativo",
          image: "/assets/logos/minervino.webp",
          imageAlt: "Logo do Coletivo Minervino de Oliveira",
          href: "https://coletivominervinocom.wordpress.com/",
        },
        {
          title: "Soberana - Coletivo de Mídia e Agitprop Popular",
          image: "/assets/logos/soberana.png",
          imageAlt: "Logo da Soberana",
          href: "https://soberana.tv/",
        },
      ],
    },
  ];

  function backgroundVideos() {
    return Array.from(document.querySelectorAll("video.campaign-background-video")).filter((video) => {
      try {
        const path = new URL(video.currentSrc || video.src, window.location.href).pathname;
        return path === "/bolsonaropl.mp4" || path === "/ssstwitter.com_1791476129925.mp4";
      } catch {
        return false;
      }
    });
  }

  function enforceSingleBackgroundPlayer() {
    const videos = backgroundVideos();
    videos.forEach((video, index) => {
      if (index === 0) return;
      video.muted = true;
      video.pause();
      video.dataset.brandingDuplicate = "true";
    });
  }

  function handleBackgroundVisibility() {
    const videos = backgroundVideos();
    if (document.hidden) {
      videos.forEach((video, index) => {
        if (index === 0) {
          video.dataset.brandingPreviousMuted = String(video.muted);
        }
        video.pause();
        video.muted = true;
      });
      return;
    }

    const primary = videos.find((video) => video.dataset.brandingDuplicate !== "true");
    if (!primary || !primary.paused) return;

    primary.muted = primary.dataset.brandingPreviousMuted !== "false";
    primary.play().catch(() => {
      primary.muted = true;
      primary.dataset.brandingPreviousMuted = "true";
    });
  }

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim().toLocaleLowerCase("pt-BR");
  }

  function ensureMarketStyles() {
    if (document.getElementById("campaign-market-styles")) return;

    const style = document.createElement("style");
    style.id = "campaign-market-styles";
    style.textContent = `
      body {
        background: #000 !important;
        color: #fff !important;
      }
      #campaign-background-layer {
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        background: #000;
        pointer-events: none;
      }
      #root {
        position: relative;
        z-index: 1;
      }
      #root section.campaign-hero {
        position: relative !important;
        isolation: isolate;
        overflow: hidden;
        min-height: 100svh !important;
        padding-top: 104px !important;
        padding-bottom: 48px !important;
      }
      #root section.campaign-hero .display-heading {
        font-family: Arial, Helvetica, sans-serif !important;
        font-weight: 900 !important;
        letter-spacing: 0 !important;
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.3);
        paint-order: stroke fill;
        text-shadow: 5px 6px 0 rgba(0, 0, 0, 0.86), 9px 10px 0 rgba(112, 24, 24, 0.78);
      }
      #root section.campaign-hero p.label-caps.mb-8 {
        display: inline-block;
        padding: 10px 14px;
        border-left: 3px solid #c3423f;
        background: rgba(0, 0, 0, 0.92);
        box-shadow: 4px 4px 0 rgba(104, 33, 35, 0.82);
        color: #fff !important;
        font-size: 18px !important;
        font-weight: 800 !important;
        letter-spacing: 0.06em;
        line-height: 1.35;
        text-shadow: 0 1px 2px #000;
      }
      #root section.campaign-hero p.max-w-md.leading-relaxed {
        box-sizing: border-box;
        width: min(100%, 700px);
        max-width: 700px !important;
        padding: 16px 20px;
        border-left: 3px solid #c3423f;
        background: rgba(0, 0, 0, 0.92);
        box-shadow: 4px 4px 0 rgba(104, 33, 35, 0.82);
        color: #fff !important;
        font-size: 20px !important;
        font-weight: 650 !important;
        line-height: 1.5 !important;
        text-shadow: 0 1px 2px #000;
      }
      #root section.campaign-video-preview {
        box-sizing: border-box;
        display: block;
        padding: clamp(52px, 8vw, 96px) 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(8, 8, 8, 0.48);
      }
      #root nav.campaign-navigation {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
        padding: 18px 20px;
        background: rgba(8, 8, 8, 0.48);
      }
      .campaign-navigation__list {
        display: flex;
        align-items: center;
        gap: clamp(32px, 4vw, 48px);
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .campaign-navigation__link {
        position: relative;
        display: inline-flex;
        height: 48px;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 10px 4px;
        color: rgba(255, 255, 255, 0.82);
        font-size: 20px;
        font-weight: 500;
        text-decoration: none;
        transition: color 160ms ease;
      }
      .campaign-navigation__link::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: #c3423f;
        content: "";
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 160ms ease;
      }
      .campaign-navigation__link:hover,
      .campaign-navigation__link:focus-visible {
        color: #fff;
      }
      .campaign-navigation__link:hover::after,
      .campaign-navigation__link:focus-visible::after,
      .campaign-navigation__link[aria-current="page"]::after {
        transform: scaleX(1);
      }
      .campaign-navigation__link:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 4px;
      }
      .campaign-navigation__link svg {
        width: 28px;
        height: 28px;
        flex: 0 0 auto;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }
      .campaign-navigation__icon-symbol {
        display: inline-grid;
        width: 28px;
        height: 28px;
        flex: 0 0 auto;
        place-items: center;
        font-family: "Segoe UI Symbol", "Arial Unicode MS", sans-serif;
        font-size: 30px;
        line-height: 1;
      }
      @media (max-width: 480px) {
        .campaign-navigation__list {
          gap: 24px;
        }
        .campaign-navigation__link {
          height: 44px;
          gap: 9px;
          font-size: 17px;
        }
        .campaign-navigation__link svg {
          width: 24px;
          height: 24px;
        }
        .campaign-navigation__icon-symbol {
          width: 24px;
          height: 24px;
          font-size: 26px;
        }
      }
      .organization-directory {
        box-sizing: border-box;
        padding: clamp(52px, 8vw, 96px) 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(8, 8, 8, 0.48);
      }
      .organization-directory[hidden],
      #root section.blog-profiles[hidden],
      #root section.docs-resources[hidden] {
        display: none !important;
      }
      .organization-directory__content {
        display: grid;
        width: min(100%, 1240px);
        margin: 0 auto;
        gap: clamp(48px, 7vw, 82px);
      }
      #root section.blog-profiles {
        box-sizing: border-box;
        padding: clamp(52px, 8vw, 96px) 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(8, 8, 8, 0.48);
      }
      #root section.docs-resources {
        min-height: 100svh;
      }
      .blog-profiles__content {
        width: min(100%, 1240px);
        margin: 0 auto;
      }
      .blog-profiles__heading {
        margin: 0 0 24px;
        color: #fff;
        font-size: 24px;
        font-weight: 900;
      }
      .blog-profiles__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
        grid-auto-rows: 1fr;
        align-items: stretch;
        gap: 28px;
      }
      .social-profile-card {
        box-sizing: border-box;
        display: flex;
        width: min(100%, 560px);
        height: 100%;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        text-decoration: none;
        transition: border-color 160ms ease, transform 160ms ease;
      }
      .social-profile-card:hover {
        transform: translateY(-3px);
        border-color: rgba(255, 255, 255, 0.6);
      }
      .social-profile-card:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 5px;
      }
      .social-profile-card__banner {
        display: block;
        width: 100%;
        aspect-ratio: 3 / 1;
        object-fit: cover;
        background: #111;
      }
      .social-profile-card__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0 20px 22px;
      }
      .social-profile-card__avatar {
        display: block;
        width: 112px;
        height: 112px;
        margin-top: -52px;
        margin-bottom: 14px;
        border: 4px solid #000;
        border-radius: 50%;
        object-fit: cover;
        background: #111;
      }
      .social-profile-card__name {
        display: block;
        color: #fff;
        font-size: 22px;
        font-weight: 900;
        line-height: 1.2;
      }
      .social-profile-card__handle {
        display: block;
        margin-top: 4px;
        color: rgba(255, 255, 255, 0.62);
        font-size: 14px;
      }
      .social-profile-card__bio {
        display: block;
        margin-top: 16px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        line-height: 1.5;
      }
      .social-profile-card__action {
        display: inline-block;
        align-self: flex-start;
        margin-top: auto;
        padding: 9px 12px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: #fff;
        font-size: 13px;
        font-weight: 800;
      }
      .docs-resource-card {
        box-sizing: border-box;
        display: flex;
        min-height: 240px;
        height: 100%;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        text-decoration: none;
        transition: border-color 160ms ease, transform 160ms ease;
      }
      .docs-resource-card:hover {
        transform: translateY(-3px);
        border-color: rgba(255, 255, 255, 0.6);
      }
      .docs-resource-card:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 5px;
      }
      .docs-resource-card__cover {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        background: #171314;
      }
      .docs-resource-card__cover--contain {
        object-fit: contain;
      }
      .docs-resource-card__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 20px;
      }
      .docs-resource-card__category {
        color: rgba(255, 255, 255, 0.62);
        font-size: 13px;
        font-weight: 800;
        text-transform: uppercase;
      }
      .docs-resource-card__title {
        display: block;
        margin-top: 14px;
        font-size: 22px;
        font-weight: 900;
        line-height: 1.25;
      }
      .docs-resource-card__description {
        display: block;
        margin-top: 12px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        line-height: 1.5;
      }
      .docs-resource-card__action {
        align-self: flex-start;
        margin-top: auto;
        padding: 9px 12px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        color: #fff;
        font-size: 13px;
        font-weight: 800;
      }
      .organization-directory__tabs {
        display: flex;
        align-items: center;
        gap: clamp(20px, 3.5vw, 44px);
        margin: 0 auto clamp(38px, 6vw, 64px);
        overflow-x: auto;
        border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        scrollbar-width: none;
      }
      .organization-directory__tabs::-webkit-scrollbar {
        display: none;
      }
      .organization-directory__tab {
        position: relative;
        flex: 0 0 auto;
        min-height: 54px;
        padding: 12px 3px;
        border: 0;
        background: transparent;
        color: rgba(255, 255, 255, 0.68);
        cursor: pointer;
        font: inherit;
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        transition: color 160ms ease;
      }
      .organization-directory__tab::after {
        position: absolute;
        right: 0;
        bottom: -1px;
        left: 0;
        height: 2px;
        background: #c3423f;
        content: "";
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 160ms ease;
      }
      .organization-directory__tab[aria-selected="true"],
      .organization-directory__tab:hover,
      .organization-directory__tab:focus-visible {
        color: #fff;
      }
      .organization-directory__tab[aria-selected="true"]::after,
      .organization-directory__tab:hover::after,
      .organization-directory__tab:focus-visible::after {
        transform: scaleX(1);
      }
      .organization-directory__tab:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 5px;
      }
      @media (max-width: 480px) {
        .organization-directory__tabs {
          gap: 20px;
        }
        .organization-directory__tab {
          min-height: 46px;
          font-size: 17px;
        }
      }
      .organization-directory__group {
        display: grid;
        gap: 22px;
      }
      .organization-directory__group[hidden] {
        display: none !important;
      }
      .organization-directory__heading {
        margin: 0;
        color: #fff;
        font-size: clamp(20px, 2vw, 28px);
        font-weight: 900;
        line-height: 1.2;
      }
      .organization-directory__heading::after {
        display: block;
        width: 54px;
        height: 3px;
        margin-top: 12px;
        background: #c3423f;
        content: "";
      }
      .organization-directory__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
        align-items: start;
        justify-items: start;
        gap: 28px;
      }
      .organization-card {
        box-sizing: border-box;
        display: grid;
        width: min(100%, 380px);
        align-content: start;
        gap: 14px;
        color: #fff;
        text-decoration: none;
        transition: transform 160ms ease;
      }
      .organization-card:hover {
        transform: translateY(-3px);
      }
      .organization-card:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 5px;
      }
      .organization-card__image {
        display: grid;
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        place-items: center;
        background: #000;
      }
      .organization-card__image img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: #000;
      }
      .organization-card--wide .organization-card__image {
        aspect-ratio: 2 / 1;
      }
      .organization-card--wide .organization-card__image img {
        object-fit: contain;
      }
      .organization-card__mark {
        display: grid;
        width: 100%;
        height: 100%;
        place-items: center;
        overflow: hidden;
        background: #101010;
        color: #fff;
        font-size: clamp(64px, 8vw, 104px);
        font-weight: 900;
        line-height: 1;
        text-align: center;
        text-shadow: 6px 6px 0 rgba(112, 24, 24, 0.82);
      }
      .organization-card__mark[data-long="true"] {
        padding: 12px;
        box-sizing: border-box;
        font-size: clamp(36px, 4vw, 52px);
      }
      .organization-card__title {
        margin: 0;
        color: #fff;
        font-size: 20px;
        font-weight: 800;
        line-height: 1.25;
      }
      @media (prefers-reduced-motion: reduce) {
        .organization-card {
          transition: none;
        }
        .social-profile-card {
          transition: none;
        }
      }
      #root nav button.nav-link {
        position: relative;
        min-height: 36px;
        padding: 0 12px !important;
        border: 1px solid rgba(255, 255, 255, 0.72) !important;
        border-radius: 0 !important;
        background: rgba(10, 10, 10, 0.88) !important;
        box-shadow: 3px 3px 0 #742527;
        color: #fff !important;
        font-size: 10px !important;
        font-weight: 900 !important;
        letter-spacing: 0.14em;
        transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
      }
      #root nav button.nav-link::before {
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: -1px;
        width: 3px;
        background: #c3423f;
        content: "";
      }
      #root nav button.nav-link:hover {
        transform: translate(2px, 2px);
        background: #252020 !important;
        box-shadow: 1px 1px 0 #742527;
      }
      #root section.campaign-hero button[data-campaign-action="support"] {
        min-width: min(196px, calc(100vw - 56px));
        min-height: 58px;
        padding: 0 25px !important;
        border: 1px solid #fff8ed !important;
        border-radius: 0 !important;
        background: #a72e30 !important;
        clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        color: #fff !important;
        font-size: 15px !important;
        font-weight: 900 !important;
        letter-spacing: 0.14em;
        filter: drop-shadow(4px 4px 0 #fff8ed) drop-shadow(8px 8px 0 #682123);
        transition: transform 160ms ease, filter 160ms ease, background-color 160ms ease;
      }
      #root section.campaign-hero button[data-campaign-action="support"] svg {
        margin: 0;
        transition: transform 160ms ease;
      }
      #root section.campaign-hero button[data-campaign-action="support"]:hover {
        transform: translate(4px, 4px);
        background: #c13a3c !important;
        filter: drop-shadow(1px 1px 0 #fff8ed) drop-shadow(3px 3px 0 #682123);
      }
      #root section.campaign-hero button[data-campaign-action="support"]:hover svg {
        transform: translateX(3px);
      }
      #root nav button.nav-link:focus-visible,
      #root section.campaign-hero button[data-campaign-action="support"]:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 6px;
      }
      @media (prefers-reduced-motion: reduce) {
        #root nav button.nav-link,
        #root section.campaign-hero button[data-campaign-action="support"],
        #root section.campaign-hero button[data-campaign-action="support"] svg {
          transition: none;
        }
      }
      #campaign-background-layer .campaign-background-video {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.68;
        pointer-events: none;
      }
      #root .campaign-app-shell {
        min-height: 0 !important;
        background: transparent !important;
      }
      #root [data-campaign-hidden="true"] {
        display: none !important;
      }
      section.campaign-market {
        box-sizing: border-box;
        padding: 56px 20px 76px;
        scroll-margin-top: 72px;
        background: #000;
      }
      .market-shell {
        box-sizing: border-box;
        max-width: 1080px;
        margin: 0 auto;
        padding: clamp(22px, 4vw, 42px);
        overflow: hidden;
        border: 1px solid rgba(74, 222, 128, 0.25);
        border-radius: 18px;
        background: linear-gradient(145deg, rgba(11, 24, 17, 0.97), rgba(5, 10, 8, 0.98));
        box-shadow: 0 24px 90px rgba(0, 0, 0, 0.32), inset 0 1px rgba(255, 255, 255, 0.04);
        color: #f3f7f3;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }
      .market-topline, .market-chart-heading, .market-dates, .market-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .market-topline {
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        color: #aebeb2;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .market-live {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #79e69a;
      }
      .market-live::before {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #4ade80;
        box-shadow: 0 0 12px rgba(74, 222, 128, 0.7);
        content: "";
      }
      .market-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 30px;
        padding: 28px 0 24px;
      }
      .market-eyebrow, .market-cell-label, .market-total-label, .market-change-label {
        margin: 0;
        color: #829387;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
      .market-title {
        margin: 9px 0 8px;
        font-size: clamp(24px, 4vw, 38px);
        font-weight: 800;
        letter-spacing: -0.04em;
      }
      .market-description {
        max-width: 560px;
        margin: 0;
        color: #9dad9f;
        font-size: 13px;
        line-height: 1.7;
      }
      .market-change {
        flex: 0 0 auto;
        min-width: 190px;
        text-align: right;
      }
      .market-change-value {
        display: block;
        margin-top: 7px;
        color: #75e695;
        font-size: clamp(25px, 4vw, 34px);
        font-variant-numeric: tabular-nums;
        font-weight: 750;
      }
      .market-change-note {
        display: block;
        margin-top: 5px;
        color: #7f9084;
        font-size: 11px;
      }
      .market-grid {
        display: grid;
        grid-template-columns: minmax(190px, 0.8fr) minmax(300px, 1.7fr) minmax(130px, 0.55fr);
        gap: 14px;
      }
      .market-total, .market-chart, .market-cell {
        box-sizing: border-box;
        min-width: 0;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.025);
      }
      .market-total {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 218px;
        padding: 22px;
      }
      .market-total-value {
        display: block;
        margin: 12px 0 3px;
        color: #ffffff;
        font-size: clamp(40px, 5vw, 57px);
        font-variant-numeric: tabular-nums;
        font-weight: 750;
        letter-spacing: -0.06em;
        line-height: 1;
      }
      .market-total-note {
        margin: 9px 0 0;
        color: #75e695;
        font-size: 12px;
        font-variant-numeric: tabular-nums;
      }
      .market-chart {
        padding: 19px 18px 13px;
      }
      .market-chart-heading {
        color: #97a79b;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.13em;
        text-transform: uppercase;
      }
      .market-chart-period {
        color: #6fdc8e;
        white-space: nowrap;
      }
      .market-chart svg {
        display: block;
        width: 100%;
        height: 130px;
        margin-top: 15px;
        overflow: visible;
      }
      .market-chart-grid {
        stroke: rgba(255, 255, 255, 0.07);
        stroke-width: 1;
      }
      .market-chart-area {
        fill: url(#market-chart-fill);
      }
      .market-chart-line {
        fill: none;
        stroke: #55dc7c;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2.5;
        vector-effect: non-scaling-stroke;
      }
      .market-dates {
        margin-top: 2px;
        color: #6f7e73;
        font-size: 9px;
        font-variant-numeric: tabular-nums;
      }
      .market-stats {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .market-cell {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        min-height: 98px;
        padding: 17px;
      }
      .market-cell-value {
        margin-top: 8px;
        color: #eff8f0;
        font-size: 24px;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
      }
      .market-footer {
        align-items: flex-start;
        margin-top: 20px;
        padding-top: 17px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        color: #829387;
        font-size: 10px;
        line-height: 1.65;
      }
      .market-message {
        margin: 0;
        max-width: 680px;
      }
      .market-legal {
        margin: 0;
        color: #708175;
        text-align: right;
        text-transform: uppercase;
      }
      .market-shell {
        max-width: 920px;
        padding: 16px 24px;
        overflow: visible;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        color: #fff;
        font-family: inherit;
      }
      .market-label {
        margin: 0 0 6px;
        color: rgba(255, 255, 255, 0.55);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .market-count {
        display: block;
        margin: 0;
        color: #fff;
        font-size: clamp(48px, 9vw, 78px);
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        letter-spacing: -0.06em;
        line-height: 1;
      }
      .market-chart {
        margin-top: 24px;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
      }
      .market-chart svg {
        height: clamp(180px, 30vw, 250px);
        margin-top: 0;
      }
      .market-chart-grid {
        stroke: rgba(255, 255, 255, 0.14);
      }
      .market-chart-line {
        stroke: #fff;
        stroke-width: 2;
      }
      .market-dates {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.46);
        font-size: 10px;
      }
      .market-status {
        min-height: 1.4em;
        margin: 16px 0 0;
        color: #b7c9ba;
        font-size: 13px;
        line-height: 1.5;
      }
      .market-status:empty {
        display: none;
      }
      .market-official-result {
        margin: 0 0 30px;
        padding: 20px 0 24px;
        border-block: 1px solid rgba(255, 255, 255, 0.14);
      }
      .market-official-label {
        margin: 0;
        color: #79e69a;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
      .market-official-main {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 18px;
        margin-top: 12px;
      }
      .market-official-candidate {
        margin: 0;
        color: #fff;
        font-size: clamp(19px, 3vw, 27px);
        font-weight: 700;
      }
      .market-official-votes {
        color: #fff;
        font-size: clamp(24px, 4vw, 36px);
        font-variant-numeric: tabular-nums;
        font-weight: 750;
        letter-spacing: -0.04em;
        white-space: nowrap;
      }
      .market-official-share,
      .market-official-source {
        margin: 7px 0 0;
        color: #aab8ad;
        font-size: 12px;
        line-height: 1.6;
      }
      .market-official-source a {
        color: #c6f3d0;
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .market-online-note {
        max-width: 680px;
        margin: 12px 0 0;
        color: #89978d;
        font-size: 12px;
        line-height: 1.6;
      }
      @media (max-width: 780px) {
        #root section.campaign-hero {
          min-height: 100svh !important;
        }
        .market-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 18px;
        }
        .market-change {
          text-align: left;
        }
        .market-official-main {
          align-items: flex-start;
          flex-direction: column;
          gap: 3px;
        }
        .market-grid {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
        }
        .market-chart {
          grid-column: 1 / -1;
          grid-row: 2;
        }
        .market-total, .market-cell {
          min-height: 150px;
        }
        .market-stats {
          flex-direction: row;
        }
        .market-cell {
          flex: 1;
          padding: 14px;
        }
      }
      @media (max-width: 480px) {
        #root section.campaign-hero {
          min-height: 100svh !important;
          padding-inline: 18px !important;
        }
        section.campaign-market {
          padding: 34px 13px 50px;
        }
        .market-shell {
          padding: 20px 15px;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }
        .market-topline {
          font-size: 8px;
          letter-spacing: 0.1em;
        }
        .market-grid {
          grid-template-columns: 1fr;
        }
        .market-chart {
          grid-column: auto;
          grid-row: auto;
          margin-top: 20px;
          padding: 0;
          border: 0;
          background: transparent;
        }
        .market-chart svg {
          height: 190px;
          margin-top: 0;
        }
        .market-total {
          min-height: 150px;
        }
        .market-footer {
          flex-direction: column;
        }
        .market-legal {
          text-align: left;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function formatCount(value) {
    return new Intl.NumberFormat("pt-BR").format(Number(value) || 0);
  }

  function updateMarket(market, stats) {
    const total = market.querySelector("[data-support-total]");
    const line = market.querySelector("[data-support-line]");
    const area = market.querySelector("[data-support-area]");
    const dates = market.querySelector("[data-support-dates]");

    if (total) total.textContent = formatCount(stats.total);

    const activity = Array.isArray(stats.activity) ? stats.activity : [];
    if (line && activity.length) {
      const values = activity.map((item) => Number(item.count) || 0);
      const maximum = Math.max(...values);
      const points = values
        .map((value, index) => {
          const x = 10 + (540 * index) / Math.max(values.length - 1, 1);
          const y = maximum ? 176 - (value / maximum) * 142 : 176;
          return `${x},${y}`;
        })
        .join(" ");
      line.setAttribute("points", points);
      if (area) {
        area.setAttribute("d", `M 10 184 L ${points.replace(/ /g, " L ")} L 550 184 Z`);
      }
    }
    if (dates && activity.length) {
      dates.replaceChildren(
        ...activity.map((item) => {
          const day = document.createElement("span");
          day.textContent = item.date.slice(8);
          day.setAttribute("aria-label", item.date);
          return day;
        }),
      );
    }
  }

  async function loadMarketStats(market) {
    try {
      const response = await fetch("/api/support-count", {
        cache: "no-store",
        credentials: "same-origin",
      });
      const stats = await response.json();
      if (!response.ok) throw new Error(stats.error || "Contagem indisponível.");
      updateMarket(market, stats);
    } catch {
      const status = market.querySelector("[data-support-status]");
      if (status && !status.dataset.userMessage) {
        status.textContent = "Não foi possível carregar a contagem agora. Tente novamente mais tarde.";
      }
    }
  }

  function createMarketSection() {
    const section = document.createElement("section");
    section.id = marketId;
    section.className = "campaign-market";
    section.setAttribute("aria-label", "Gráfico de apoios registrados");
    section.innerHTML = `
      <div class="market-shell">
        <div class="market-official-result">
          <p class="market-official-label">Resultado oficial · Eleições 2026 · 1º turno</p>
          <div class="market-official-main">
            <div>
              <p class="market-official-candidate">Flávio Bolsonaro</p>
              <p class="market-official-share">47,03% dos votos válidos</p>
            </div>
            <strong class="market-official-votes">56.104.503 votos</strong>
          </div>
          <p class="market-official-source">
            Arquivo final do TSE, atualizado em 05/10/2026 às 12h51:
            499.207 de 499.248 seções totalizadas (99,99%). A votação presidencial consolidada inclui Brasil e exterior.
            <a href="https://resultados.tse.jus.br/oficial/app/index.html#/eleicao/6257/uf/br/cargo/1/vis/nominal/resultados" target="_blank" rel="noopener noreferrer">Ver resultados no TSE</a>
            · <a href="https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json" target="_blank" rel="noopener noreferrer">arquivo oficial</a>
          </p>
        </div>
        <p class="market-label">Apoios online registrados neste site</p>
        <strong class="market-count" data-support-total aria-live="polite">2.380</strong>
        <p class="market-online-note">O botão VOTAR registra um apoio neste site, uma vez por endereço IP. Esses registros não são votos eleitorais e não alteram o resultado oficial acima.</p>
        <div class="market-chart">
          <svg viewBox="0 0 560 200" role="img" aria-label="Gráfico de apoios por dia nos últimos sete dias">
            <defs>
              <linearGradient id="market-chart-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#ffffff" stop-opacity=".16"></stop>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
            <path class="market-chart-grid" d="M0 42H560 M0 98H560 M0 154H560"></path>
            <path data-support-area class="market-chart-area" d="M10 184 L10 176 L550 176 L550 184 Z"></path>
            <polyline data-support-line class="market-chart-line" points="10,176 550,176"></polyline>
          </svg>
          <div class="market-dates" data-support-dates aria-hidden="true"></div>
        </div>
        <p class="market-status" data-support-status role="status" aria-live="polite"></p>
      </div>
    `;
    return section;
  }

  function setButtonLabel(button, label) {
    const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) {
      if (!textNode.nodeValue.trim()) continue;
      if (normalizeText(textNode.nodeValue) !== normalizeText(label)) {
        const trailingSpace = /\s$/.test(textNode.nodeValue) ? " " : "";
        textNode.nodeValue = `${label}${trailingSpace}`;
      }
      button.setAttribute("aria-label", label);
      return;
    }
    button.setAttribute("aria-label", label);
  }

  function addActionHandler(button, action) {
    const handlerKey = action === "vote" ? "voteHandler" : "supportHandler";
    if (button.dataset[handlerKey] === "true") return;
    button.dataset[handlerKey] = "true";
    button.addEventListener(
      "click",
      async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (action === "support") {
          window.location.assign(supportUrl);
          return;
        }

        const market = document.getElementById(marketId);
        if (!market) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        market.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        const status = market.querySelector("[data-support-status]");
        if (status) {
          status.dataset.userMessage = "true";
          status.textContent = "Registrando a manifestação de apoio…";
        }

        if (button.dataset.votePending === "true") return;
        button.dataset.votePending = "true";
        button.disabled = true;
        button.setAttribute("aria-busy", "true");

        try {
          const response = await fetch("/api/support-count", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: "{}",
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || "Não foi possível registrar.");

          updateMarket(market, result);
          if (status) {
            status.dataset.userMessage = "true";
            status.textContent = result.recorded
              ? "Apoio registrado. O contador considera um registro por endereço IP e não altera o resultado oficial da eleição."
              : "Este endereço IP já foi contabilizado; o total não mudou.";
          }
        } catch (error) {
          if (status) {
            status.dataset.userMessage = "true";
            status.textContent = error.message || "Não foi possível registrar o apoio agora.";
          }
        } finally {
          button.disabled = false;
          button.removeAttribute("aria-busy");
          delete button.dataset.votePending;
        }
      },
      { capture: true },
    );
  }

  function configureHeroAction(hero, sourceLabel, action, label) {
    const button =
      hero.querySelector(`[data-campaign-action="${action}"]`) ||
      Array.from(hero.querySelectorAll("button")).find(
        (item) => normalizeText(item.textContent).includes(normalizeText(sourceLabel)),
      );
    if (!button) return null;

    button.dataset.campaignAction = action;
    button.type = "button";
    setButtonLabel(button, label);
    addActionHandler(button, action);
    return button;
  }

  function createNavigationMenu() {
    const icons = {
      Home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      Rss: '<span class="campaign-navigation__icon-symbol" aria-hidden="true">☭</span>',
      BookOpen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v14"></path><path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H3z"></path><path d="M21 18V5a2 2 0 0 0-2-2h-3a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h6z"></path></svg>',
    };
    const nav = document.createElement("nav");
    nav.className = "campaign-navigation";
    nav.setAttribute("aria-label", "Primary navigation");
    const list = document.createElement("ul");
    list.className = "campaign-navigation__list";

    navigationMenuItems.forEach((item) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.className = "campaign-navigation__link";
      link.href = item.href;
      if (item.isActive) link.setAttribute("aria-current", "page");
      link.innerHTML = `${icons[item.icon]}<span>${item.title}</span>`;
      listItem.append(link);
      list.append(listItem);
    });

    nav.append(list);
    return nav;
  }

  function createOrganizationCard(organization) {
    const card = document.createElement("a");
    card.className = "organization-card";
    if (organization.wideLogo) card.classList.add("organization-card--wide");
    card.href = organization.href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `Acessar página de ${organization.title}`);

    const imageFrame = document.createElement("div");
    imageFrame.className = "organization-card__image";
    if (organization.image) {
      const image = document.createElement("img");
      image.src = organization.image;
      image.alt = organization.imageAlt || `Logo ${organization.title}`;
      image.loading = "lazy";
      image.decoding = "async";
      imageFrame.append(image);
    } else {
      const mark = document.createElement("span");
      mark.className = "organization-card__mark";
      if (organization.mark.length > 5) mark.dataset.long = "true";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = organization.mark;
      imageFrame.append(mark);
    }
    const title = document.createElement("span");
    title.className = "organization-card__title";
    title.textContent = organization.title;
    card.append(imageFrame, title);
    return card;
  }

  function createSocialProfileCard(profile) {
    const card = document.createElement("a");
    card.className = "social-profile-card";
    card.href = profile.href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `Abrir perfil ${profile.handle} no ${profile.network}`);

    const banner = document.createElement("img");
    banner.className = "social-profile-card__banner";
    banner.src = profile.banner;
    banner.alt = `Banner do perfil ${profile.handle}`;
    banner.loading = "lazy";
    banner.decoding = "async";

    const body = document.createElement("span");
    body.className = "social-profile-card__body";
    const avatar = document.createElement("img");
    avatar.className = "social-profile-card__avatar";
    avatar.src = profile.avatar;
    avatar.alt = `Foto do perfil ${profile.handle}`;
    avatar.loading = "lazy";
    avatar.decoding = "async";
    const name = document.createElement("span");
    name.className = "social-profile-card__name";
    name.textContent = profile.name;
    const handle = document.createElement("span");
    handle.className = "social-profile-card__handle";
    handle.textContent = profile.handle;
    const bio = document.createElement("span");
    bio.className = "social-profile-card__bio";
    bio.textContent = profile.bio;
    const action = document.createElement("span");
    action.className = "social-profile-card__action";
    action.textContent = `Ver perfil no ${profile.network} ↗`;

    body.append(avatar, name, handle, bio, action);
    card.append(banner, body);
    return card;
  }

  function createBlogProfilesSection() {
    const section = document.createElement("section");
    section.id = "blog";
    section.className = "blog-profiles";
    section.setAttribute("aria-label", "Perfis nas redes sociais");

    const content = document.createElement("div");
    content.className = "blog-profiles__content";
    const heading = document.createElement("h2");
    heading.className = "blog-profiles__heading";
    heading.textContent = "Perfis";
    const grid = document.createElement("div");
    grid.className = "blog-profiles__grid";
    socialProfiles.forEach((profile) => grid.append(createSocialProfileCard(profile)));
    content.append(heading, grid);
    section.append(content);
    return section;
  }

  function createOrganizationDirectory() {
    const section = document.createElement("section");
    section.id = "campaign-organizations";
    section.className = "organization-directory";
    section.setAttribute("aria-label", "Organizações populares");

    const content = document.createElement("div");
    content.className = "organization-directory__content";
    const tabs = document.createElement("div");
    tabs.className = "organization-directory__tabs";
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Categorias de organizações");
    const tabButtons = [];
    const groupPanels = [];

    function activateGroup(activeIndex) {
      tabButtons.forEach((tab, index) => {
        const isActive = index === activeIndex;
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        groupPanels[index].hidden = !isActive;
      });
    }

    organizationGroups.forEach((group, index) => {
      const tab = document.createElement("button");
      tab.className = "organization-directory__tab";
      tab.type = "button";
      tab.id = `organization-tab-${index}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", `organization-group-${index}`);
      tab.setAttribute("aria-selected", String(index === 0));
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.textContent = group.tabLabel;
      tab.addEventListener("click", () => activateGroup(index));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % organizationGroups.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + organizationGroups.length) % organizationGroups.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = organizationGroups.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        tabButtons[nextIndex].focus();
        activateGroup(nextIndex);
      });
      tabs.append(tab);
      tabButtons.push(tab);
    });
    content.append(tabs);

    organizationGroups.forEach((group, index) => {
      const groupSection = document.createElement("div");
      groupSection.className = "organization-directory__group";
      groupSection.id = `organization-group-${index}`;
      groupSection.setAttribute("role", "tabpanel");
      groupSection.setAttribute("aria-labelledby", `organization-tab-${index}`);
      groupSection.tabIndex = 0;
      groupSection.hidden = index !== 0;
      const heading = document.createElement("h2");
      heading.className = "organization-directory__heading";
      heading.textContent = group.title;
      const grid = document.createElement("div");
      grid.className = "organization-directory__grid";
      group.organizations.forEach((organization) => grid.append(createOrganizationCard(organization)));
      groupSection.append(heading, grid);
      groupPanels.push(groupSection);
      content.append(groupSection);
    });
    section.append(content);
    return section;
  }

  function createDocsSection() {
    const section = document.createElement("section");
    section.id = "docs";
    section.className = "blog-profiles docs-resources";
    section.setAttribute("aria-label", "Materiais de referência");

    const content = document.createElement("div");
    content.className = "blog-profiles__content";
    const heading = document.createElement("h2");
    heading.className = "blog-profiles__heading";
    heading.textContent = "Materiais de referência";
    const grid = document.createElement("div");
    grid.className = "blog-profiles__grid";

    documentResources.forEach((resource) => {
      const card = document.createElement("a");
      card.className = "docs-resource-card";
      card.href = resource.href;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const cover = document.createElement("img");
      cover.className = `docs-resource-card__cover${resource.coverFit === "contain" ? " docs-resource-card__cover--contain" : ""}`;
      cover.src = resource.cover;
      cover.alt = resource.coverAlt;
      cover.loading = "lazy";
      cover.decoding = "async";

      const body = document.createElement("span");
      body.className = "docs-resource-card__body";

      const category = document.createElement("span");
      category.className = "docs-resource-card__category";
      category.textContent = resource.category;
      const title = document.createElement("strong");
      title.className = "docs-resource-card__title";
      title.textContent = resource.title;
      const description = document.createElement("span");
      description.className = "docs-resource-card__description";
      description.textContent = resource.description;
      const action = document.createElement("span");
      action.className = "docs-resource-card__action";
      action.textContent = `${resource.action} ↗`;

      body.append(category, title, description, action);
      card.append(cover, body);
      grid.append(card);
    });

    content.append(heading, grid);
    section.append(content);
    return section;
  }

  function updateContentView(navigationMenu, blogProfiles, organizationDirectory, docsResources, shouldScroll = false) {
    const currentView = ["#blog", "#docs"].includes(window.location.hash)
      ? window.location.hash.slice(1)
      : "home";
    blogProfiles.hidden = currentView !== "blog";
    organizationDirectory.hidden = currentView !== "home";
    docsResources.hidden = currentView !== "docs";

    navigationMenu.querySelectorAll(".campaign-navigation__link").forEach((link) => {
      if (link.hash === `#${currentView}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (shouldScroll) {
      const activeSection = currentView === "home"
        ? document.getElementById("home")
        : currentView === "blog"
          ? blogProfiles
          : docsResources;
      activeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function applyCampaignLayout(language) {
    const root = document.querySelector("#root");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll("section"));
    const hero = sections.find((section) => section.querySelector(".display-heading"));
    if (!hero) return;

    ensureMarketStyles();
    hero.id = "home";
    hero.classList.add("campaign-hero");
    if (!document.getElementById("campaign-background-layer")) {
      const backgroundLayer = document.createElement("div");
      backgroundLayer.id = "campaign-background-layer";
      backgroundLayer.setAttribute("aria-hidden", "true");

      const backgroundVideo = document.createElement("video");
      backgroundVideo.className = "campaign-background-video";
      backgroundVideo.src = "/ssstwitter.com_1791476129925.mp4";
      backgroundVideo.autoplay = true;
      backgroundVideo.loop = true;
      backgroundVideo.muted = true;
      backgroundVideo.playsInline = true;
      backgroundVideo.preload = "auto";
      backgroundVideo.setAttribute("aria-hidden", "true");
      backgroundVideo.tabIndex = -1;
      backgroundLayer.append(backgroundVideo);
      document.body.prepend(backgroundLayer);
      backgroundVideo.play().catch(() => {});
    }
    const appShell = Array.from(root.children).find(
      (child) => child.classList.contains("min-h-screen") && child.classList.contains("bg-background"),
    );
    if (appShell) {
      appShell.classList.add("campaign-app-shell");
    }
    let navigationMenu = document.getElementById("campaign-navigation");
    if (!navigationMenu) {
      navigationMenu = createNavigationMenu();
      navigationMenu.id = "campaign-navigation";
      if (appShell) {
        appShell.insertAdjacentElement("afterend", navigationMenu);
      } else {
        root.append(navigationMenu);
      }
    }
    let blogProfiles = document.getElementById("blog");
    if (!blogProfiles) {
      blogProfiles = createBlogProfilesSection();
      navigationMenu.insertAdjacentElement("afterend", blogProfiles);
    }
    let organizationDirectory = document.getElementById("campaign-organizations");
    if (!organizationDirectory) {
      organizationDirectory = createOrganizationDirectory();
      if (blogProfiles) {
        blogProfiles.insertAdjacentElement("afterend", organizationDirectory);
      } else if (navigationMenu) {
        navigationMenu.insertAdjacentElement("afterend", organizationDirectory);
      } else if (appShell) {
        appShell.insertAdjacentElement("afterend", organizationDirectory);
      } else {
        root.append(organizationDirectory);
      }
    }
    let docsResources = document.getElementById("docs");
    if (!docsResources) {
      docsResources = createDocsSection();
      organizationDirectory.insertAdjacentElement("afterend", docsResources);
    }
    updateContentView(navigationMenu, blogProfiles, organizationDirectory, docsResources);
    if (navigationMenu.dataset.viewNavigation !== "true") {
      navigationMenu.dataset.viewNavigation = "true";
      window.addEventListener("hashchange", () => {
        updateContentView(navigationMenu, blogProfiles, organizationDirectory, docsResources, true);
      });
      if (window.location.hash) {
        requestAnimationFrame(() => {
          updateContentView(navigationMenu, blogProfiles, organizationDirectory, docsResources, true);
        });
      }
    }
    const scrollIndicator = hero.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.dataset.campaignHidden = "true";
      scrollIndicator.setAttribute("aria-hidden", "true");
    }
    const actions = hero.querySelector(".mt-10.flex");
    if (actions) {
      actions.style.opacity = "1";
      actions.style.transform = "none";
      while (actions.children.length > 1) {
        actions.lastElementChild.remove();
      }
    }

    const market = document.getElementById(marketId);
    if (market) market.remove();

    const supportLabel = language === "PT" ? "APOIE" : "SUPPORT";
    configureHeroAction(hero, "Criar seu perfil", "support", supportLabel);

    root.querySelectorAll("section").forEach((section) => {
      if (section !== hero && section !== blogProfiles && section !== organizationDirectory && section !== docsResources) {
        section.dataset.campaignHidden = "true";
        section.setAttribute("aria-hidden", "true");
      }
    });
    const footer = root.querySelector("footer");
    if (footer) {
      footer.dataset.campaignHidden = "true";
      footer.setAttribute("aria-hidden", "true");
    }

  }

  function applyBranding() {
    enforceSingleBackgroundPlayer();
    if (window.location.pathname !== "/") return;

    const lang = localStorage.getItem("ikiss_lang") === "EN" ? "EN" : "PT";
    const copy = campaign[lang];
    const brandLink = document.querySelector('nav a[href="/"]');

    if (brandLink && brandLink.dataset.flavioBrand !== "true") {
      const name = document.createElement("span");
      name.textContent = "PORTAL COMUNISTA";
      name.className = "text-sm font-bold text-white";

      brandLink.replaceChildren(name);
      brandLink.className = "flex items-center gap-3 rounded-xl";
      brandLink.setAttribute("aria-label", "Portal Comunista — início");
      brandLink.dataset.flavioBrand = "true";
    }

    const tagline = document.querySelector("p.label-caps.mb-8");
    if (tagline && tagline.textContent !== copy.tagline) {
      tagline.textContent = copy.tagline;
    }

    const headings = document.querySelectorAll(".display-heading");
    if (headings.length >= 3) {
      copy.headings.forEach((text, index) => {
        const heading = headings[index];
        if (heading.textContent !== text) {
          heading.textContent = text;
        }
        heading.hidden = !text;
      });
    }

    const description = document.querySelector("p.max-w-md.leading-relaxed");
    if (description && description.textContent !== copy.description) {
      description.textContent = copy.description;
    }

    applyCampaignLayout(lang);
  }

  const observer = new MutationObserver(applyBranding);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  document.addEventListener("visibilitychange", handleBackgroundVisibility);

  applyBranding();
})();