(function () {
  "use strict";

  const IMG_BASE = "images/projects/";

  const PROJECTS = [
    { title: "Cedar Ridge High School", image: "cedar-ridge-high-school.jpg" },
    { title: "Austin Community College Canopy", image: "austin-community-college-canopy.jpg" },
    { title: "Live Roof", image: "live-roof.jpg" },
    { title: "Leander Vista Ridge High School", image: "leander-vista-ridge-high-school.jpg" },
    { title: "Williamson County Appraisal District", image: "williamson-county-appraisal-district.jpg" },
    { title: "Leander Elementary #10", image: "leander-elementary-10.jpg" },
    { title: "Leander High School", image: "leander-high-school.jpg" },
    { title: "Round Rock High School", image: "round-rock-high-school.jpg" },
    { title: "Kinder Elementary", image: "kinder-elementary.jpg" },
    { title: "Special Skylight Flashing", image: "special-skylight-flashing.jpg" }
  ];

  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About Us" },
    { href: "certifications.html", label: "Certifications" },
    { href: "projects.html", label: "Projects" },
    { href: "contact.html", label: "Contact" }
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return path === "" ? "index.html" : path;
  }

  function buildHeader() {
    const page = currentPage();
    const navLinks = NAV_LINKS.map(
      (l) => `<a href="${l.href}" class="nav__link${page === l.href ? " active" : ""}">${l.label}</a>`
    ).join("");
    const mobileLinks = NAV_LINKS.map(
      (l) => `<a href="${l.href}" class="mobile-nav__link${page === l.href ? " active" : ""}">${l.label}</a>`
    ).join("");

    return `
      <header class="site-header" id="site-header">
        <div class="container site-header__inner">
          <a href="index.html" class="logo">
            <span class="logo__name">Dean Contracting Co.</span>
            <span class="logo__tag">Commercial Roofing &amp; Sheet Metal</span>
          </a>
          <nav class="nav" aria-label="Main navigation">${navLinks}</nav>
          <a href="tel:5122681233" class="btn btn--primary header-cta">512-268-1233</a>
          <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false">
            <span class="menu-toggle__bar"></span>
            <span class="menu-toggle__bar"></span>
            <span class="menu-toggle__bar"></span>
          </button>
        </div>
      </header>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        ${mobileLinks}
        <div class="mobile-nav__cta">
          <a href="contact.html" class="btn btn--primary" style="width:100%">Request a Quote</a>
          <a href="tel:5122681233" class="mobile-nav__phone">512-268-1233</a>
        </div>
      </nav>`;
  }

  function buildFooter() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <p class="footer__brand-name">Dean Contracting Company, Inc.</p>
              <p class="footer__brand-desc">Commercial roofing, sheet metal, siding, waterproofing, plaza decks, and green roofs. Serving Central Texas since 1987.</p>
            </div>
            <div>
              <p class="footer__heading">Quick Links</p>
              <div class="footer__links">
                <a href="index.html">Home</a>
                <a href="about.html">About Us</a>
                <a href="certifications.html">Certifications</a>
                <a href="projects.html">Projects</a>
                <a href="contact.html">Contact Us</a>
              </div>
            </div>
            <div class="footer__contact">
              <p class="footer__heading">Contact</p>
              <p>340 County Road 158<br>Kyle, TX 78640</p>
              <p><a href="tel:5122681233">512-268-1233</a></p>
              <p><a href="tel:8008900220">800-890-0220</a></p>
              <p><a href="mailto:info@deancoroof.com">info@deancoroof.com</a></p>
            </div>
          </div>
          <div class="footer__bottom">
            <span>&copy; ${new Date().getFullYear()} Dean Contracting Company, Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>`;
  }

  function initLayout() {
    const headerSlot = document.getElementById("site-header-slot");
    const footerSlot = document.getElementById("site-footer-slot");
    if (headerSlot) headerSlot.innerHTML = buildHeader();
    if (footerSlot) footerSlot.innerHTML = buildFooter();
  }

  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });
  }

  function initGallery() {
    const container = document.getElementById("project-gallery");
    if (!container) return;

    container.innerHTML = PROJECTS.map((p, i) => `
      <button class="gallery__item" data-index="${i}" aria-label="View ${p.title}">
        <img src="${IMG_BASE}${p.image}" alt="${p.title}" loading="lazy" decoding="async">
        <div class="gallery__overlay"><span class="gallery__caption">${p.title}</span></div>
      </button>
    `).join("");

    let currentIndex = 0;
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Close">&times;</button>
      <button class="lightbox__prev" aria-label="Previous">&#8249;</button>
      <img class="lightbox__img" src="" alt="">
      <button class="lightbox__next" aria-label="Next">&#8250;</button>
      <p class="lightbox__caption"></p>`;
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector(".lightbox__img");
    const caption = lightbox.querySelector(".lightbox__caption");

    function show(index) {
      currentIndex = (index + PROJECTS.length) % PROJECTS.length;
      const p = PROJECTS[currentIndex];
      img.src = IMG_BASE + p.image;
      img.alt = p.title;
      caption.textContent = p.title;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery__item");
      if (btn) show(parseInt(btn.dataset.index, 10));
    });

    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", () => show(currentIndex - 1));
    lightbox.querySelector(".lightbox__next").addEventListener("click", () => show(currentIndex + 1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name");
      const email = data.get("email");
      const company = data.get("company") || "N/A";
      const phone = data.get("phone");
      const address = data.get("address") || "N/A";
      const message = data.get("message");

      const subject = encodeURIComponent(`Information Request from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nAddress: ${address}\n\nRequest:\n${message}`
      );

      window.location.href = `mailto:info@deancoroof.com?subject=${subject}&body=${body}`;

      const success = document.getElementById("form-success");
      if (success) success.classList.add("show");
    });
  }

  function initHomePreview() {
    const preview = document.getElementById("home-project-preview");
    if (!preview) return;

    const featured = PROJECTS.slice(0, 4);
    preview.innerHTML = featured.map((p) => `
      <a href="projects.html" class="gallery__item gallery__item--static">
        <img src="${IMG_BASE}${p.image}" alt="${p.title}" loading="lazy" decoding="async">
        <div class="gallery__overlay"><span class="gallery__caption">${p.title}</span></div>
      </a>
    `).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLayout();
    initMobileMenu();
    initHeaderScroll();
    initGallery();
    initContactForm();
    initHomePreview();
  });
})();
