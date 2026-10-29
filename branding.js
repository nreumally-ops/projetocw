(() => {
  if (window.location.pathname !== "/") {
    window.location.replace("/");
    return;
  }

  const marketId = "campaign-support-market";

  const campaign = {
    PT: {
      tagline: "",
      headings: ["organizar pra vencer.", "", ""],
      description: "",
    },
    EN: {
      tagline: "",
      headings: ["organize to win.", "", ""],
      description: "",
    },
  };
  const navigationMenuItems = [
    { title: "Home", href: "#home", icon: "Home", view: "home" },
    { title: "Blog", href: "#blog", icon: "Rss", view: "blog" },
    { title: "Docs", href: "#docs", icon: "BookOpen", view: "docs" },
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
    {
      network: "X",
      name: "sif mística ☭ ⋆⁺₊⋆",
      handle: "@TropicalScv1ad",
      bio: "Socialism, and palpitaria",
      href: "https://x.com/TropicalScv1ad",
      banner: "/assets/tropicalscv1ad-banner.jpg",
      avatar: "/assets/tropicalscv1ad-avatar.jpg",
    },
    {
      network: "X",
      name: "chrondevity",
      handle: "@Esmr4ll",
      bio: "",
      href: "https://x.com/Esmr4ll",
      banner: "/assets/esmr4ll-banner.jpg",
      avatar: "/assets/esmr4ll-avatar.jpg",
    },
    {
      network: "X",
      name: "carioca marxista ☭",
      handle: "@camaradabeok",
      bio: "“A miséria do nosso povo é a consequência inevitável da espoliação do país pelo imperialismo estrangeiro, em aliança com os grandes latifundiários.” – Prestes.",
      href: "https://x.com/camaradabeok",
      banner: "/assets/camaradabeok-banner.jpg",
      avatar: "/assets/camaradabeok-avatar.jpg",
    },
    {
      network: "X",
      name: "gondorianⒶ",
      handle: "@mariluiuiu",
      bio: "eu provavelmente discordo de você",
      href: "https://x.com/mariluiuiu",
      banner: "/assets/mariluiuiu-banner.jpg",
      avatar: "/assets/mariluiuiu-avatar.jpg",
    },
    {
      network: "X",
      name: "Ame ☭",
      handle: "@Ateusacana876",
      bio: "💍 - 𝐈\nFoda-se sua opinião de merda\ncatarinense (infelizmente)",
      href: "https://x.com/Ateusacana876",
      banner: "/assets/ateusacana876-banner.jpg",
      avatar: "/assets/ateusacana876-avatar.jpg",
    },
    {
      network: "X",
      name: "Representante Tinoco",
      handle: "@tinoc0_0",
      bio: "getulista,brizolista,socialista moreno,flamenguista,carioca de subúrbio",
      href: "https://x.com/tinoc0_0",
      banner: "/assets/tinoc0_0-banner.jpg",
      avatar: "/assets/tinoc0_0-avatar.jpg",
    },
    {
      network: "X",
      name: "Frente Anti Fascista Brasileira",
      handle: "@frenteantifabr",
      bio: "✊ FAB | Frente Antifascista Brasileira\nPela luta, justiça social e direitos do trabalhador.\nOrganização popular contra o autoritarismo e toda forma de opressão.",
        verified: true,
      href: "https://x.com/frenteantifabr",
      banner: "/assets/frenteantifabr-banner.jpg",
      avatar: "/assets/frenteantifabr-avatar.png",
    },
    {
      network: "X",
      name: "V. ☭",
      handle: "@wokebaphomet",
      bio: "misândrica comunista; 🇵🇸 ☭",
      href: "https://x.com/wokebaphomet",
      banner: "/assets/wokebaphomet-banner.jpg",
      avatar: "/assets/wokebaphomet-avatar.jpg",
    },
    {
      network: "X",
      name: "𝙂𝘼𝘽𝙍𝙄𝙀𝙇 𝘽𝙊𝙏𝙀𝙇𝙃𝙊",
      handle: "@VernichtenKlass",
      bio: "“A desvalorização do mundo humano aumenta na razão direta do aumento de valor do mundo dos objetos.” - Karl Marx.",
        verified: true,
      href: "https://x.com/VernichtenKlass",
      banner: "/assets/vernichtenklass-banner.jpg",
      avatar: "/assets/vernichtenklass-avatar.jpg",
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
      #root section.campaign-hero .campaign-logo-heading {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
      }
      #root section.campaign-hero .campaign-logo-video {
        width: min(78vw, 760px);
        aspect-ratio: 1024 / 572;
        align-self: center;
        margin: 0 auto 18px;
        overflow: hidden;
        clip-path: inset(0 0 2px);
      }
      #root section.campaign-hero .campaign-logo-video__media {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        mask-image: url("/assets/logo2harpia-mask.png");
        mask-mode: alpha;
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: 100% 100%;
        -webkit-mask-image: url("/assets/logo2harpia-mask.png");
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        -webkit-mask-size: 100% 100%;
      }
      #root section.campaign-hero .campaign-logo-video:focus-visible {
        outline: 2px solid #fff8ed;
        outline-offset: 6px;
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
      #root section.blog-profiles[hidden] {
        display: none !important;
      }
      #root section.blog-profiles {
        box-sizing: border-box;
        padding: clamp(52px, 8vw, 96px) 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(8, 8, 8, 0.48);
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
      .social-profile-card__banner--contain {
        object-fit: contain;
        background: #a90d14;
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
        .social-profile-card__identity {
          display: block;
          align-self: flex-start;
          max-width: 100%;
          line-height: 1.2;
        }
      .social-profile-card__name {
          display: inline;
        color: #fff;
        font-size: 22px;
        font-weight: 900;
        line-height: 1.2;
      }
        .social-profile-card__verified {
          display: inline-flex;
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          margin-left: 6px;
          color: #fff;
          vertical-align: middle;
        }
        .social-profile-card__verified svg {
          display: block;
          width: 20px;
          height: 20px;
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
        white-space: pre-line;
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
      @media (prefers-reduced-motion: reduce) {
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
      #root nav button.nav-link:has(> img[alt="USA"]) > img[alt="USA"] {
        visibility: hidden;
      }
      #root nav button.nav-link:has(> img[alt="USA"])::after {
        position: absolute;
        top: 50%;
        left: 12px;
        color: #fff;
        content: "🌐";
        font-family: "Segoe UI Emoji", "Apple Color Emoji", sans-serif;
        font-size: 17px;
        letter-spacing: 0;
        line-height: 1;
        transform: translateY(-50%);
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
        position: relative;
        isolation: isolate;
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
      #root section.campaign-hero .fdc-points_wrapper {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }
      #root section.campaign-hero .fdc-point {
        position: absolute;
        bottom: -5px;
        left: var(--fdc-left);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #fff8ed;
        opacity: 0;
      }
      #root section.campaign-hero button[data-campaign-action="support"]:hover .fdc-point,
      #root section.campaign-hero button[data-campaign-action="support"]:focus-visible .fdc-point {
        animation: fdc-float 900ms ease-out var(--fdc-delay) infinite;
      }
      @keyframes fdc-float {
        0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.5); }
        18% { opacity: 0.9; }
        100% { opacity: 0; transform: translate3d(var(--fdc-drift), -52px, 0) scale(0); }
      }
      #root section.campaign-hero .fdc-inner {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      #root section.campaign-hero .fdc-icon {
        display: block;
        width: 18px;
        height: 18px;
        flex: 0 0 auto;
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
        #root section.campaign-hero button[data-campaign-action="support"] .fdc-point {
          animation: none !important;
        }
      }
        #campaign-join-dialog {
          position: fixed;
          width: min(460px, calc(100vw - 32px));
          max-width: 460px;
          max-height: min(88vh, 640px);
          padding: 30px;
          overflow: auto;
          border: 1px solid rgba(255, 248, 237, 0.72);
          background: #100e0e;
          color: #fff8ed;
          box-shadow: 12px 12px 0 rgba(104, 33, 35, 0.82);
        }
        #campaign-join-dialog[open] {
          animation: join-dialog-in 180ms ease-out both;
        }
        #campaign-join-dialog::backdrop {
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(3px);
        }
        @keyframes join-dialog-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        #campaign-join-dialog .join-dialog__close {
          position: absolute;
          top: 12px;
          right: 12px;
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 1px solid rgba(255, 248, 237, 0.35);
          background: transparent;
          color: inherit;
          cursor: pointer;
        }
        #campaign-join-dialog .join-dialog__close svg {
          width: 18px;
          height: 18px;
        }
        #campaign-join-dialog .join-dialog__title {
          margin: 0 42px 24px 0;
          color: #fff8ed;
          font: 900 22px/1.2 Inter, sans-serif;
        }
        #campaign-join-dialog .join-dialog__fields {
          display: grid;
          gap: 18px;
        }
        #campaign-join-dialog .join-dialog__honey {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          clip-path: inset(50%);
        }
        #campaign-join-dialog .join-dialog__field {
          display: grid;
          gap: 8px;
          color: #fff8ed;
          font: 700 13px/1.3 Inter, sans-serif;
        }
        #campaign-join-dialog .join-dialog__field input {
          box-sizing: border-box;
          width: 100%;
          min-height: 48px;
          padding: 0 12px;
          border: 1px solid rgba(255, 248, 237, 0.48);
          border-radius: 0;
          background: #070707;
          color: #fff;
          font: 500 16px/1.3 Inter, sans-serif;
        }
        #campaign-join-dialog .join-dialog__field input:focus-visible {
          outline: 2px solid #c3423f;
          outline-offset: 2px;
        }
        #campaign-join-dialog .join-dialog__submit {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 22px;
          padding: 0 18px;
          border: 1px solid #fff8ed;
          background: #a72e30;
          color: #fff;
          font: 900 13px/1 Inter, sans-serif;
          cursor: pointer;
        }
        #campaign-join-dialog .join-dialog__submit svg {
          width: 17px;
          height: 17px;
        }
        #campaign-join-dialog .join-dialog__status {
          min-height: 1.4em;
          margin: 14px 0 0;
          color: #ffd2cc;
          font: 500 13px/1.45 Inter, sans-serif;
        }
        @media (prefers-reduced-motion: reduce) {
          #campaign-join-dialog[open] {
            animation: none;
          }
        }
      #campaign-background-layer .campaign-background-image {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.68;
        pointer-events: none;
        user-select: none;
      }
      #campaign-link-preview {
        position: fixed;
        z-index: 20;
        display: block;
        width: min(200px, calc(100vw - 24px));
        aspect-ratio: 8 / 5;
        box-sizing: border-box;
        padding: 4px;
        border: 2px solid transparent;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.32);
        opacity: 0;
        visibility: hidden;
        transform: translate(-50%, -100%) translateY(20px) scale(0.6);
        transform-origin: center;
        transition: opacity 160ms ease, transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1), visibility 160ms;
      }
      #campaign-link-preview[data-visible="true"] {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -100%) scale(1);
      }
      #campaign-link-preview[data-placement="bottom"] {
        transform: translate(-50%, 0) translateY(-20px) scale(0.6);
      }
      #campaign-link-preview[data-placement="bottom"][data-visible="true"] {
        transform: translate(-50%, 0) scale(1);
      }
      #campaign-link-preview img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        object-fit: cover;
      }
      #campaign-link-preview[data-unavailable="true"] {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font: 600 12px/1.4 Inter, sans-serif;
        text-align: center;
      }
      #campaign-link-preview[data-unavailable="true"]::after {
        content: "Preview unavailable";
      }
      #campaign-link-preview[data-unavailable="true"] img {
        display: none;
      }
      @media (prefers-reduced-motion: reduce) {
        #campaign-link-preview {
          transition: none;
        }
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
          padding-top: 82px !important;
          padding-bottom: 32px !important;
        }
        #root section.campaign-hero .display-heading {
          font-size: 48px !important;
          line-height: 0.98 !important;
        }
        #root section.campaign-hero .campaign-logo-video {
          width: min(82vw, 600px);
        }
        #root section.campaign-hero p.label-caps.mb-8 {
          padding: 8px 11px;
          font-size: 14px !important;
        }
        #root section.campaign-hero p.max-w-md.leading-relaxed {
          width: min(100%, 560px);
          padding: 12px 15px;
          font-size: 16px !important;
          line-height: 1.4 !important;
        }
        #root section.campaign-hero button[data-campaign-action="support"] {
          min-width: min(168px, calc(100vw - 48px));
          min-height: 48px;
          padding-inline: 19px !important;
          font-size: 13px !important;
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
          padding: 68px 18px 26px !important;
        }
        #root section.campaign-hero .display-heading {
          font-size: 36px !important;
          line-height: 1 !important;
        }
        #root section.campaign-hero .campaign-logo-video {
          width: min(78vw, 420px);
          margin-bottom: 12px;
        }
        #root section.campaign-hero p.label-caps.mb-8 {
          padding: 7px 9px;
          font-size: 12px !important;
        }
        #root section.campaign-hero p.max-w-md.leading-relaxed {
          padding: 10px 12px;
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        #root section.campaign-hero button[data-campaign-action="support"] {
          min-width: min(148px, calc(100vw - 44px));
          min-height: 44px;
          padding-inline: 16px !important;
          font-size: 12px !important;
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
          openJoinDialog(button);
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

  function openJoinDialog(opener) {
    let dialog = document.getElementById("campaign-join-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "campaign-join-dialog";
      dialog.setAttribute("aria-labelledby", "campaign-join-title");
      dialog.innerHTML = `
        <button class="join-dialog__close" type="button" aria-label="Fechar formulário">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" aria-hidden="true">
            <path d="m18 6-12 12M6 6l12 12"></path>
          </svg>
        </button>
        <h2 class="join-dialog__title" id="campaign-join-title">Junte-se</h2>
        <form class="join-dialog__form">
          <div class="join-dialog__fields">
            <label class="join-dialog__field" for="campaign-join-name">
              Nome
              <input id="campaign-join-name" name="name" type="text" autocomplete="name" required>
            </label>
            <label class="join-dialog__field" for="campaign-join-email">
              E-mail
              <input id="campaign-join-email" name="email" type="email" autocomplete="email" required>
            </label>
          </div>
          <label class="join-dialog__honey" aria-hidden="true" for="campaign-join-website">
            Website
            <input id="campaign-join-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </label>
          <button class="join-dialog__submit" type="submit">
            Continuar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" aria-hidden="true">
              <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          <p class="join-dialog__status" role="status" aria-live="polite"></p>
        </form>
      `;

      dialog.querySelector(".join-dialog__close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dialog.close();
        }
      });
      dialog.querySelector(".join-dialog__form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const submit = form.querySelector(".join-dialog__submit");
        const status = form.querySelector(".join-dialog__status");
        if (submit.disabled) return;

        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
        status.textContent = "Enviando…";

        try {
          const response = await fetch("/api/join", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.elements.name.value,
              email: form.elements.email.value,
              website: form.elements.website.value,
            }),
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(result.error || "Não foi possível enviar. Tente novamente.");

          form.reset();
          status.textContent = "Cadastro recebido. Obrigado!";
        } catch (error) {
          status.textContent = error.message || "Não foi possível enviar. Tente novamente.";
        } finally {
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
        }
      });
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener("close", () => opener.focus());
      document.body.append(dialog);
    }

    dialog.querySelector(".join-dialog__status").textContent = "";
    if (!dialog.open) dialog.showModal();
    dialog.querySelector("#campaign-join-name").focus();
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
    if (action === "support") {
      button.closest("a[href]")?.removeAttribute("href");
      decorateFloatingDotsButton(button);
    }
    addActionHandler(button, action);
    return button;
  }

  function decorateFloatingDotsButton(button) {
    if (button.dataset.fdcReady === "true") return;

    const points = document.createElement("span");
    points.className = "fdc-points_wrapper";
    points.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 10; index += 1) {
      const point = document.createElement("i");
      point.className = "fdc-point";
      point.style.setProperty("--fdc-left", `${8 + index * 9.2}%`);
      point.style.setProperty("--fdc-drift", `${(index % 2 === 0 ? 1 : -1) * (8 + (index % 4) * 5)}px`);
      point.style.setProperty("--fdc-delay", `${index * 70}ms`);
      points.append(point);
    }

    const inner = document.createElement("span");
    inner.className = "fdc-inner";
    const label = document.createElement("span");
    label.className = "fdc-label";
    label.textContent = button.textContent.trim();
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.classList.add("fdc-icon");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("stroke-linecap", "round");
    icon.setAttribute("stroke-linejoin", "round");
    icon.setAttribute("stroke-width", "1.5");
    const horizontal = document.createElementNS("http://www.w3.org/2000/svg", "path");
    horizontal.setAttribute("d", "M5 12h14");
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute("d", "m12 5 7 7-7 7");
    icon.append(horizontal, arrow);
    inner.append(label, icon);
    button.replaceChildren(points, inner);
    button.dataset.fdcReady = "true";
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

  function ensureLinkPreviews() {
    if (document.getElementById("campaign-link-preview")) return;

    const preview = document.createElement("a");
    preview.id = "campaign-link-preview";
    preview.href = "#";
    preview.target = "_blank";
    preview.rel = "noopener noreferrer";
    preview.tabIndex = -1;
    preview.setAttribute("aria-hidden", "true");
    preview.dataset.visible = "false";
    preview.dataset.placement = "top";

    const image = document.createElement("img");
    image.alt = "";
    image.width = 200;
    image.height = 125;
    image.decoding = "async";
    preview.append(image);
    document.body.append(preview);

    let activeLink = null;
    let showTimer = 0;
    let hideTimer = 0;
    let requestId = 0;

    function getExternalLink(target) {
      if (!(target instanceof Element)) return null;
      const link = target.closest("a[href]");
      if (!link || link === preview) return null;
      if (
        !link.textContent.trim() ||
        link.querySelector("img, svg, video, canvas, picture") ||
        link.closest("nav, button, [role='button'], .social-profile-card")
      ) return null;

      try {
        const url = new URL(link.href, window.location.href);
        return ["http:", "https:"].includes(url.protocol) && url.origin !== window.location.origin
          ? link
          : null;
      } catch {
        return null;
      }
    }

    function positionPreview(link, pointerEvent) {
      const rect = link.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();
      const width = previewRect.width || 200;
      const height = previewRect.height || 125;
      const pointerOffset = pointerEvent && rect.width
        ? (pointerEvent.clientX - rect.left - rect.width / 2) / 2
        : 0;
      const minLeft = width / 2 + 12;
      const maxLeft = Math.max(minLeft, window.innerWidth - width / 2 - 12);
      const center = rect.left + rect.width / 2 + pointerOffset;
      const topPlacement = rect.top >= height + 20;

      preview.dataset.placement = topPlacement ? "top" : "bottom";
      preview.style.left = `${Math.min(Math.max(center, minLeft), maxLeft)}px`;
      preview.style.top = topPlacement
        ? `${rect.top - 12}px`
        : `${Math.max(12, Math.min(rect.bottom + 12, window.innerHeight - height - 12))}px`;
    }

    function hidePreview() {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        preview.dataset.visible = "false";
        activeLink = null;
      }, 100);
    }

    function showPreview(link, pointerEvent) {
      window.clearTimeout(hideTimer);
      if (activeLink !== link) {
        activeLink = link;
        requestId += 1;
        const currentRequest = requestId;
        const url = new URL(link.href, window.location.href);
        const params = new URLSearchParams({
          url: url.href,
          screenshot: "true",
          meta: "false",
          embed: "screenshot.url",
          colorScheme: "dark",
          "viewport.isMobile": "true",
          "viewport.deviceScaleFactor": "1",
          "viewport.width": "600",
          "viewport.height": "375",
        });

        preview.href = url.href;
        preview.target = link.target || "_blank";
        image.dataset.requestId = String(currentRequest);
        preview.dataset.unavailable = "false";
        image.onload = () => {
          if (image.dataset.requestId === String(currentRequest)) {
            preview.dataset.unavailable = "false";
          }
        };
        image.onerror = () => {
          if (image.dataset.requestId === String(currentRequest)) {
            preview.dataset.unavailable = "true";
          }
        };
        image.src = `https://api.microlink.io/?${params.toString()}`;
      }

      positionPreview(link, pointerEvent);
      window.clearTimeout(showTimer);
      if (preview.dataset.visible !== "true") {
        showTimer = window.setTimeout(() => {
          if (activeLink === link) preview.dataset.visible = "true";
        }, 50);
      }
    }

    document.addEventListener("pointerover", (event) => {
      if (event.pointerType === "touch") return;
      const link = getExternalLink(event.target);
      if (!link || (event.relatedTarget instanceof Node && link.contains(event.relatedTarget))) return;
      showPreview(link, event);
    });
    document.addEventListener("pointermove", (event) => {
      const link = getExternalLink(event.target);
      if (link && link === activeLink) positionPreview(link, event);
    });
    document.addEventListener("pointerout", (event) => {
      const link = getExternalLink(event.target);
      if (!link || link !== activeLink) return;
      if (
        event.relatedTarget instanceof Node &&
        (link.contains(event.relatedTarget) || preview.contains(event.relatedTarget))
      ) return;
      hidePreview();
    });
    document.addEventListener("focusin", (event) => {
      const link = getExternalLink(event.target);
      if (link) showPreview(link);
    });
    document.addEventListener("focusout", (event) => {
      const link = getExternalLink(event.target);
      if (!link || link !== activeLink) return;
      if (
        event.relatedTarget instanceof Node &&
        (link.contains(event.relatedTarget) || preview.contains(event.relatedTarget))
      ) return;
      hidePreview();
    });
    preview.addEventListener("pointerover", () => window.clearTimeout(hideTimer));
    preview.addEventListener("pointerout", (event) => {
      if (
        event.relatedTarget instanceof Node &&
        (preview.contains(event.relatedTarget) || activeLink?.contains(event.relatedTarget))
      ) return;
      hidePreview();
    });
    window.addEventListener("scroll", hidePreview, { passive: true });
    window.addEventListener("resize", hidePreview);
  }

  function createSocialProfileCard(profile) {
    const card = document.createElement("a");
    card.className = "social-profile-card";
    card.href = profile.href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `Abrir perfil ${profile.handle} no ${profile.network}`);

    const banner = document.createElement("img");
    banner.className = `social-profile-card__banner${profile.bannerFit === "contain" ? " social-profile-card__banner--contain" : ""}`;
    banner.src = profile.banner;
    banner.alt = profile.bannerAlt || `Banner do perfil ${profile.handle}`;
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
    const identity = document.createElement("span");
    identity.className = "social-profile-card__identity";
    identity.append(name);
    if (profile.verified) {
      const badge = document.createElement("span");
      badge.className = "social-profile-card__verified";
      badge.setAttribute("role", "img");
      badge.setAttribute("aria-label", "Conta verificada no X");
      badge.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1d9bf0"></circle><path d="m7.5 12.2 3 3 6-6.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"></path></svg>';
      identity.append(badge);
    }
    const handle = document.createElement("span");
    handle.className = "social-profile-card__handle";
    handle.textContent = profile.handle;
    const action = document.createElement("span");
    action.className = "social-profile-card__action";
    action.textContent = `Ver perfil no ${profile.network} ↗`;

    body.append(avatar, identity, handle);
    if (profile.bio) {
      const bio = document.createElement("span");
      bio.className = "social-profile-card__bio";
      bio.textContent = profile.bio;
      body.append(bio);
    }
    body.append(action);
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

  function createDocsSection() {
    const section = document.createElement("section");
    section.id = "docs";
    section.className = "blog-profiles docs-resources";
    section.setAttribute("aria-label", "Docs");

    const content = document.createElement("div");
    content.className = "blog-profiles__content";
    const heading = document.createElement("h2");
    heading.className = "blog-profiles__heading";
    heading.textContent = "Docs";
    content.append(heading);
    section.append(content);
    return section;
  }

  function ensureCampaignBackground() {
    let backgroundLayer = document.getElementById("campaign-background-layer");
    if (!backgroundLayer) {
      backgroundLayer = document.createElement("div");
      backgroundLayer.id = "campaign-background-layer";
      backgroundLayer.setAttribute("aria-hidden", "true");
      document.body.prepend(backgroundLayer);
    }

    let backgroundImage = backgroundLayer.querySelector(".campaign-background-image");
    if (!backgroundImage) {
      backgroundImage = document.createElement("img");
      backgroundImage.className = "campaign-background-image";
      backgroundImage.src = "/assets/bandeiracw.jpg";
      backgroundImage.alt = "";
      backgroundImage.loading = "eager";
      backgroundImage.decoding = "async";
      backgroundImage.setAttribute("aria-hidden", "true");
      backgroundImage.tabIndex = -1;
      backgroundLayer.replaceChildren(backgroundImage);
    }
  }

  function addLogoVideoTitle(hero) {
    const heading = hero.querySelector(".display-heading");
    if (!heading || hero.querySelector(".campaign-logo-video")) return;

    heading.classList.add("campaign-logo-heading");
    const frame = document.createElement("div");
    frame.className = "campaign-logo-video";
    frame.setAttribute("role", "button");
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("aria-label", "Ativar som no vídeo da logo");
    frame.setAttribute("aria-pressed", "false");

    const video = document.createElement("video");
    video.className = "campaign-logo-video__media";
    video.src = "/assets/campaign-logo-hover.mp4";
    video.poster = "/assets/campaign-logo-poster.jpg";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.volume = 0.45;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("aria-hidden", "true");
    const setLogoSound = (enabled) => {
      video.muted = !enabled;
      frame.setAttribute("aria-pressed", String(enabled));
      frame.setAttribute("aria-label", `${enabled ? "Silenciar" : "Ativar som no"} vídeo da logo`);
      if (enabled) {
        video.play().catch(() => setLogoSound(false));
      }
    };
    frame.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") setLogoSound(true);
    });
    frame.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") setLogoSound(false);
    });
    frame.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") setLogoSound(video.muted);
    });
    frame.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      setLogoSound(video.muted);
    });
    const resumeLogoVideo = () => {
      if (!document.hidden && video.paused) video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", resumeLogoVideo);
    video.addEventListener("canplay", resumeLogoVideo);
    window.addEventListener("pageshow", resumeLogoVideo);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        video.muted = true;
        return;
      }
      resumeLogoVideo();
    });
    window.addEventListener("hashchange", () => {
      if (!window.location.hash || window.location.hash === "#home") {
        resumeLogoVideo();
      }
    });
    frame.append(video);
    heading.insertAdjacentElement("beforebegin", frame);
    const logoVisibilityObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) resumeLogoVideo();
    });
    logoVisibilityObserver.observe(frame);
    video.play().catch(() => {});
  }

  function updateContentView(navigationMenu, blogProfiles, docsSection, shouldScroll = false) {
    const currentView = ["#blog", "#docs"].includes(window.location.hash)
      ? window.location.hash.slice(1)
      : "home";
    blogProfiles.hidden = currentView !== "blog";
    docsSection.hidden = currentView !== "docs";

    navigationMenu.querySelectorAll(".campaign-navigation__link").forEach((link) => {
      if (link.hash === `#${currentView}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (shouldScroll) {
      const activeSection = currentView === "blog"
        ? blogProfiles
        : currentView === "docs"
          ? docsSection
          : document.getElementById("home");
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
    ensureLinkPreviews();
    hero.id = "home";
    hero.classList.add("campaign-hero");
    addLogoVideoTitle(hero);
    ensureCampaignBackground();
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
    let docsSection = document.getElementById("docs");
    if (!docsSection) {
      docsSection = createDocsSection();
      blogProfiles.insertAdjacentElement("afterend", docsSection);
    }
    updateContentView(navigationMenu, blogProfiles, docsSection);
    if (navigationMenu.dataset.viewNavigation !== "true") {
      navigationMenu.dataset.viewNavigation = "true";
      window.addEventListener("hashchange", () => {
        updateContentView(navigationMenu, blogProfiles, docsSection, true);
      });
      if (window.location.hash) {
        requestAnimationFrame(() => {
          updateContentView(navigationMenu, blogProfiles, docsSection, true);
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

    const supportLabel = language === "PT" ? "UNI-VOS" : "SUPPORT";
    const sourceLabel = language === "PT" ? "Criar seu perfil" : "Create your profile";
    configureHeroAction(hero, sourceLabel, "support", supportLabel);

    root.querySelectorAll("section").forEach((section) => {
      if (section !== hero && section !== blogProfiles && section !== docsSection) {
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
      name.textContent = "Pátria Vermelha";
      name.className = "text-sm font-bold text-white";

      brandLink.replaceChildren(name);
      brandLink.className = "flex items-center gap-3 rounded-xl";
      brandLink.setAttribute("aria-label", "Pátria Vermelha — início");
      brandLink.dataset.flavioBrand = "true";
    }

    const tagline = document.querySelector("p.label-caps.mb-8");
    if (tagline) {
      if (tagline.textContent !== copy.tagline) {
        tagline.textContent = copy.tagline;
      }
      tagline.hidden = !copy.tagline;
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
    if (description) {
      if (description.textContent !== copy.description) {
        description.textContent = copy.description;
      }
      description.hidden = !copy.description;
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