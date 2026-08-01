/* =========================================================
   Tarek Saleh — Housing Portfolio — script.js
   ========================================================= */
(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-hidden"), 500);
  });

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById("progressBar");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  /* ---------- Sticky nav background + active link ---------- */
  const nav = document.getElementById("nav");
  function updateNav() {
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
  }

  window.addEventListener(
    "scroll",
    () => {
      updateProgress();
      updateNav();
    },
    { passive: true }
  );
  updateProgress();
  updateNav();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .zoom");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- Budget bar fill ---------- */
  const budgetFill = document.getElementById("budgetFill");
  if (budgetFill) {
    const budgetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            budgetFill.style.width = "100%";
            budgetObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    budgetObserver.observe(budgetFill);
  }

  /* ---------- Parallax on hero portrait ---------- */
  const heroPortrait = document.querySelector(".hero__portrait");
  if (heroPortrait && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroPortrait.style.transform = `translateY(${y * 0.15}px)`;
        }
      },
      { passive: true }
    );
  }

  /* ---------- Button ripple ---------- */
  document.querySelectorAll(".ripple").forEach((btn) => {
    btn.style.position = btn.style.position || "relative";
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      circle.className = "ripple-circle";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(circle);
      circle.addEventListener("animationend", () => circle.remove());
    });
  });

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const panel = trigger.nextElementSibling;

      document.querySelectorAll(".accordion__trigger").forEach((t) => {
        if (t !== trigger) {
          t.setAttribute("aria-expanded", "false");
          t.nextElementSibling.style.maxHeight = null;
          t.nextElementSibling.style.padding = "0 4px";
        }
      });

      trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (!expanded) {
        panel.style.padding = "0 4px 22px";
        panel.style.maxHeight = panel.scrollHeight + 40 + "px";
      } else {
        panel.style.maxHeight = null;
        panel.style.padding = "0 4px";
      }
    });
  });

  /* ---------- Lightbox gallery ---------- */
  const items = Array.from(document.querySelectorAll(".masonry__item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = items[currentIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector("img").alt;
    lightboxCaption.textContent = item.dataset.caption || "";
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => (lightbox.hidden = true), 350);
  }
  function showRelative(offset) {
    currentIndex = (currentIndex + offset + items.length) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => showRelative(-1));
  lightboxNext.addEventListener("click", () => showRelative(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showRelative(-1);
    if (e.key === "ArrowRight") showRelative(1);
  });
})();
