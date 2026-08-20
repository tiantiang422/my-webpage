(function () {
  "use strict";

  const content = window.SITE_CONTENT;
  if (!content) {
    document.body.innerHTML = '<p class="fatal-error">页面内容配置未加载，请检查 js/content.js。</p>';
    return;
  }

  const main = document.getElementById("main-content");
  const nav = document.getElementById("bottom-nav");

  document.title = `${content.site.title} ${content.site.version}`;

  function media(imageKey, options) {
    const image = content.images[imageKey];
    const opts = options || {};
    const priority = opts.priority === true;
    const hasImage = Boolean(image && image.src);
    const style = image && image.position ? `object-position:${image.position}` : "";
    return `
      <figure class="media-frame ${hasImage ? "has-image" : "is-placeholder"} ${opts.className || ""}">
        ${hasImage ? `<img src="${image.src}" alt="${image.alt}" style="${style}" loading="${priority ? "eager" : "lazy"}" ${priority ? 'fetchpriority="high"' : 'decoding="async"'} />` : ""}
        <div class="media-placeholder" aria-label="${image.alt}" role="img">
          <span class="placeholder-grid" aria-hidden="true"></span>
          <span class="placeholder-folder">素材目录 · ${image.sourceFolder}</span>
          <strong>${image.status}</strong>
        </div>
        ${opts.caption ? `<figcaption>${opts.caption}</figcaption>` : ""}
      </figure>`;
  }

  function sectionHeading(block, extraClass) {
    return `
      <header class="section-heading ${extraClass || ""}">
        <p class="kicker">${block.kicker}</p>
        <h2>${block.title}</h2>
        ${block.intro ? `<p class="section-intro">${block.intro}</p>` : ""}
      </header>`;
  }

  function renderHero() {
    const h = content.hero;
    return `
      <section class="hero" id="home" data-nav-section="home" aria-labelledby="hero-title">
        <div class="hero-media" aria-hidden="true">${media("hero", { priority: true, className: "hero-figure" })}</div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="hero-topline">
          <a class="brand" href="#home" aria-label="${content.site.shortName}首页">
            <span class="brand-mark">镇</span><span>${content.site.shortName}</span>
          </a>
          <span class="version-chip">${content.site.version}</span>
        </div>
        <div class="hero-content">
          <p class="hero-eyebrow">${content.site.eyebrow}</p>
          <p class="hero-badge">${h.badge}</p>
          <h1 id="hero-title"><span>${h.titleTop}</span>${h.titleBottom}</h1>
          <p class="hero-summary">${h.summary}</p>
          <div class="hero-fact"><span>${h.factLabel}</span><strong>${h.fact}</strong></div>
          <div class="hero-actions">
            ${h.actions.map((action) => `<a class="button button-${action.style}" href="${action.href}">${action.label}<span aria-hidden="true">↗</span></a>`).join("")}
          </div>
        </div>
        <a class="scroll-cue" href="#overview"><span>向下阅读</span><i aria-hidden="true"></i></a>
      </section>`;
  }

  function renderOverview() {
    const o = content.overview;
    return `
      <section class="section overview" id="overview" data-nav-section="overview">
        <div class="container">
          ${sectionHeading(o)}
          <div class="overview-grid">
            ${o.points.map((point) => `
              <article class="overview-card">
                <span class="card-index">${point.index}</span>
                <h3>${point.title}</h3>
                <p>${point.text}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderStats() {
    const s = content.stats;
    return `
      <section class="section stats-section" aria-labelledby="stats-title">
        <div class="container">
          <div class="stats-header">
            <div><p class="kicker">${s.kicker}</p><h2 id="stats-title">${s.title}</h2></div>
            <p class="data-note">${s.note}</p>
          </div>
          <div class="stats-grid">
            ${s.items.map((item) => `
              <article class="stat-card">
                <p class="stat-label">${item.label}</p>
                <p class="stat-value">${item.value}<small>${item.unit}</small></p>
                <div class="stat-meta"><span>${item.year}</span><span>${item.source}</span></div>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderIndustry(item, index) {
    return `
      <article class="industry-story" id="industry-${item.id}">
        <div class="industry-media-wrap">
          ${media(item.imageKey, { caption: `${item.title} · ${content.images[item.imageKey].status}` })}
          <span class="industry-number" aria-hidden="true">${item.number}</span>
        </div>
        <div class="industry-copy">
          <p class="eyebrow-line"><span>${item.tag}</span><i></i><span>${item.number}</span></p>
          <h3>${item.title}</h3>
          <p class="industry-subtitle">${item.subtitle}</p>
          <p class="industry-description">${item.description}</p>
          <div class="value-chain" aria-label="${item.title}价值链">
            ${item.chain.map((step, stepIndex) => `<span><b>${String(stepIndex + 1).padStart(2, "0")}</b>${step}</span>`).join("")}
          </div>
          <div class="industry-lenses">
            <div><span class="lens-label">${item.financeTitle}</span><p>${item.financeText}</p></div>
            <div><span class="lens-label">${item.inclusionTitle}</span><p>${item.inclusionText}</p></div>
          </div>
          <p class="status-line"><span aria-hidden="true"></span>${item.status}</p>
        </div>
      </article>`;
  }

  function renderIndustries() {
    const i = content.industries;
    return `
      <section class="section industries" id="industries" data-nav-section="industries">
        <div class="container">
          ${sectionHeading(i)}
          <div class="industry-list">${i.items.map(renderIndustry).join("")}</div>
          <div class="reserved-grid" aria-label="后续产业专题入口">
            ${i.reserved.map((item) => `
              <article class="reserved-card ${item.imageKey ? "has-reserved-image" : ""}">
                ${item.imageKey ? `<div class="reserved-card-media">${media(item.imageKey)}</div>` : ""}
                <div><span class="reserved-label">${item.label}</span><h3>${item.title}</h3><p>${item.text}</p></div>
                <span class="reserved-status">${item.status}<i aria-hidden="true">→</i></span>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderPeople() {
    const p = content.people;
    return `
      <section class="section people-section" id="people">
        <div class="container">
          ${sectionHeading(p)}
          <div class="people-grid">
            ${p.cards.map((card, index) => `
              <article class="person-card">
                ${card.imageKey ? media(card.imageKey) : `<div class="person-placeholder" aria-hidden="true"><span>${String(index + 1).padStart(2, "0")}</span></div>`}
                <p class="person-role">${card.role}</p>
                <p class="person-status">${card.status}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderOpportunities() {
    const o = content.opportunities;
    return `
      <section class="section opportunities" id="opportunities" data-nav-section="opportunities">
        <div class="container">
          ${sectionHeading(o, "light-heading")}
          <div class="opportunity-grid">
            ${o.items.map((item) => `
              <article class="opportunity-card">
                <span class="opportunity-code">${item.code}</span><h3>${item.title}</h3><p>${item.text}</p>
              </article>`).join("")}
          </div>
          <div class="opportunity-notice">
            <div><span>${o.notice}</span><strong>${o.contactLabel}</strong></div>
            <span class="notice-mark" aria-hidden="true">核</span>
          </div>
        </div>
      </section>`;
  }

  function renderUpdates() {
    const u = content.updates;
    return `
      <section class="section updates" id="updates">
        <div class="container">
          ${sectionHeading(u)}
          <div class="update-list">
            ${u.items.map((item) => `
              <article class="update-row">
                <span class="update-date">${item.date}</span>
                <span class="update-type">${item.type}</span>
                <h3>${item.title}</h3>
                <span class="update-status">${item.status}</span>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function renderYouth() {
    const y = content.youth;
    return `
      <section class="section youth" id="youth" data-nav-section="youth">
        <div class="container youth-layout">
          <div class="youth-copy">
            ${sectionHeading(y)}
            <div class="youth-steps">
              ${y.steps.map((step) => `<div><span>${step.number}</span><p><strong>${step.title}</strong>${step.text}</p></div>`).join("")}
            </div>
            <p class="youth-note">${y.note}</p>
          </div>
          ${media(y.imageKey, { caption: content.images[y.imageKey].status, className: "youth-media" })}
        </div>
      </section>`;
  }

  function renderFooter() {
    const f = content.footer;
    const s = content.site;
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand"><span class="brand-mark">镇</span><h2>${f.title}</h2><p>${f.tagline}</p></div>
          <div class="footer-meta">
            <p><span>地区</span><strong>${s.region}</strong></p>
            <p><span>版本</span><strong>${s.version}</strong></p>
            <p><span>最近更新</span><strong>${s.updatedAt}</strong></p>
          </div>
          <div class="verification"><h3>${f.verificationTitle}</h3><p>${f.verificationText}</p><p>${s.sourceNote}</p></div>
        </div>
        <div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${s.shortName}</span><a href="#home">返回顶部 ↑</a></div>
      </footer>`;
  }

  function renderNav() {
    nav.innerHTML = `<div class="bottom-nav-inner">${content.navigation.map((item, index) => `
      <a href="${item.href}" data-target="${item.target}" class="${index === 0 ? "is-active" : ""}">
        <i aria-hidden="true"></i><span>${item.label}</span>
      </a>`).join("")}</div>`;
  }

  main.innerHTML = [
    renderHero(),
    renderOverview(),
    renderStats(),
    renderIndustries(),
    renderPeople(),
    renderOpportunities(),
    renderUpdates(),
    renderYouth(),
    renderFooter(),
  ].join("");
  renderNav();
  main.setAttribute("aria-busy", "false");

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      const frame = img.closest(".media-frame");
      if (frame) {
        frame.classList.remove("has-image");
        frame.classList.add("is-placeholder");
      }
      img.remove();
    });
  });

  const navLinks = Array.from(nav.querySelectorAll("a[data-target]"));
  const observedSections = Array.from(document.querySelectorAll("[data-nav-section]"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.getAttribute("data-nav-section");
      navLinks.forEach((link) => {
        const active = link.dataset.target === id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.1, 0.3] });
    observedSections.forEach((section) => observer.observe(section));
  }
})();
