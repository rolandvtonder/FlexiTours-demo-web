/* Flexi Tours — interactions
   Progressive enhancement only: every page works with JS disabled. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile drawer ---------- */
  var burger = document.querySelector(".burger");
  var drawer = document.getElementById("drawer");
  var closeBtn = document.querySelector(".drawer-close");

  if (burger && drawer) {
    var lastFocus = null;

    var focusables = function () {
      return Array.prototype.filter.call(
        drawer.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetParent !== null; }
      );
    };

    var openDrawer = function () {
      lastFocus = document.activeElement;
      drawer.classList.add("is-open");
      drawer.removeAttribute("inert");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var f = focusables();
      if (f.length) f[0].focus();
    };

    var closeDrawer = function () {
      drawer.classList.remove("is-open");
      drawer.setAttribute("inert", "");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    drawer.setAttribute("inert", "");
    burger.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) closeDrawer(); else openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeDrawer();
    });

    document.addEventListener("keydown", function (e) {
      if (!drawer.classList.contains("is-open")) return;

      if (e.key === "Escape") { closeDrawer(); return; }

      if (e.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });

    // Close if resized up to desktop while open
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1000 && drawer.classList.contains("is-open")) closeDrawer();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var items = document.querySelectorAll("[data-reveal]");

  if (!items.length) return;

  if (reduced.matches || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
      if (delay) el.style.transitionDelay = delay + "ms";
      el.classList.add("in");
      io.unobserve(el);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  Array.prototype.forEach.call(items, function (el) { io.observe(el); });

  // If the user switches on reduced motion mid-session, stop animating.
  var onPrefChange = function () {
    if (!reduced.matches) return;
    Array.prototype.forEach.call(items, function (el) {
      el.style.transitionDelay = "";
      el.classList.add("in");
    });
    io.disconnect();
  };
  if (reduced.addEventListener) reduced.addEventListener("change", onPrefChange);
  else if (reduced.addListener) reduced.addListener(onPrefChange);
})();
