(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var C = window.NW27 || {};
  var get = function (path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Config bindings ---------- */
  $$("[data-bind]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind"));
    if (v) el.textContent = v;
    else if (el.hasAttribute("data-empty")) el.textContent = el.getAttribute("data-empty");
  });
  $$("[data-bind-href]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind-href"));
    if (v) el.href = v;
  });
  $$("[data-programme]").forEach(function (el) {
    var v = get("programme." + el.getAttribute("data-programme"));
    if (v) el.textContent = v;
  });

  var links = C.links || {};
  if (links.register) $$("[data-register-link]").forEach(function (a) { a.href = links.register; });
  // Hackathon button stays "Opening soon" (not clickable) until a portal link is set in config.js
  var h = $("[data-hack-link]");
  if (h && links.hackathonRegister) {
    var a = document.createElement("a");
    a.className = "btn btn--signal";
    a.href = links.hackathonRegister;
    a.textContent = "Register for the hackathon";
    h.replaceWith(a);
  }

  // mailto links: fall back to the contact footer when no address is set
  $$("[data-mail]").forEach(function (a) {
    var addr = links[a.getAttribute("data-mail")] || links.generalEmail;
    if (addr) {
      var subj = a.getAttribute("data-subject");
      a.href = "mailto:" + addr + (subj ? "?subject=" + encodeURIComponent(subj) : "");
    }
  });

  var brochure = $("[data-brochure]");
  if (brochure) {
    if (links.brochure) { brochure.href = links.brochure; brochure.setAttribute("download", ""); }
    else { brochure.textContent = "Brochure coming soon"; brochure.setAttribute("aria-disabled", "true"); brochure.addEventListener("click", function (e) { e.preventDefault(); }); }
  }

  // Payment account (association account only)
  var acct = $("[data-account]");
  var p = C.payment || {};
  if (acct) {
    acct.textContent = (p.accountNumber && p.accountName)
      ? "Account: " + p.accountName + ", " + p.accountNumber + (p.bank ? ", " + p.bank : "") + "."
      : "Account details are shared on confirmation.";
  }

  /* ---------- Footer contacts ---------- */
  var ICONS = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>'
  };
  var handle = function (url) { return "@" + (url || "").replace(/\/+$/, "").split("/").pop(); };

  var direct = $("[data-contact-direct]");
  if (direct) {
    var emails = [links.generalEmail || links.sponsorEmail];
    if (links.sponsorEmail && links.sponsorEmail !== emails[0]) emails.push(links.sponsorEmail);
    var rows = [];
    emails.forEach(function (e) { if (e) rows.push(["mail", "mailto:" + e, e]); });
    if (links.phone) rows.push(["phone", "tel:" + links.phone.replace(/[^\d+]/g, ""), links.phone]);
    rows.forEach(function (r) {
      var a = document.createElement("a");
      a.className = "footer__line";
      a.href = r[1];
      a.innerHTML = '<span class="footer__line-icon" aria-hidden="true">' + ICONS[r[0]] + "</span>";
      a.appendChild(document.createTextNode(r[2]));
      direct.appendChild(a);
    });
    if (!rows.length) direct.textContent = "Official email and phone to be added.";
  }

  var social = $("[data-contact-social]");
  if (social) {
    [
      ["instagram", "Instagram", links.instagram],
      ["x", "X", links.x],
      ["whatsapp", "WhatsApp channel", links.whatsapp],
      ["linkedin", "LinkedIn", links.linkedin],
      ["tiktok", "TikTok", links.tiktok]
    ].forEach(function (s) {
      if (!s[2]) return;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "footer__icon";
      a.href = s[2];
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", s[1] + (s[0] === "whatsapp" ? "" : " " + handle(s[2])));
      a.title = s[1];
      a.innerHTML = ICONS[s[0]];
      li.appendChild(a);
      social.appendChild(li);
    });
    var h = links.instagram || links.x;
    if (h) {
      var tag = document.createElement("li");
      tag.className = "footer__handle";
      tag.textContent = handle(h);
      social.appendChild(tag);
    }
  }

  /* ---------- Phone register bar ---------- */
  // Shown once the hero has scrolled away; hidden while the form, closer or footer is on screen.
  var mbar = $("[data-mbar]");
  if (mbar && "IntersectionObserver" in window) {
    var watched = [$(".hero"), $("#register"), $(".closer"), $(".footer")].filter(Boolean);
    var seen = watched.map(function () { return true; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen[watched.indexOf(en.target)] = en.isIntersecting; });
      mbar.classList.toggle("is-shown", seen.indexOf(true) === -1);
    });
    watched.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Carousel ---------- */
  var car = $("[data-carousel]");
  if (car) {
    var trackEl = $("[data-carousel-track]", car);
    var slidesEl = $$(".carousel__slide", trackEl);
    var dotsEl = $("[data-carousel-dots]", car);
    var current = 0;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var go = function (i) {
      current = (i + slidesEl.length) % slidesEl.length;
      trackEl.scrollTo({ left: slidesEl[current].offsetLeft - slidesEl[0].offsetLeft, behavior: reduce ? "auto" : "smooth" });
    };
    var dots = slidesEl.map(function (_, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "carousel__dot";
      d.setAttribute("aria-label", "Go to photo " + (i + 1));
      d.addEventListener("click", function () { go(i); });
      dotsEl.appendChild(d);
      return d;
    });
    var sync = function () {
      var w = slidesEl[0].offsetWidth || 1;
      current = Math.min(slidesEl.length - 1, Math.round(trackEl.scrollLeft / w));
      dots.forEach(function (d, i) { d.setAttribute("aria-current", i === current ? "true" : "false"); });
    };
    trackEl.addEventListener("scroll", function () { window.requestAnimationFrame(sync); }, { passive: true });
    $("[data-carousel-prev]", car).addEventListener("click", function () { go(current - 1); });
    $("[data-carousel-next]", car).addEventListener("click", function () { go(current + 1); });
    trackEl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
    });
    // Auto-advance every 6s; pauses on hover, focus, or when off screen. Off for reduced motion.
    var paused = false, visible = false;
    car.addEventListener("mouseenter", function () { paused = true; });
    car.addEventListener("mouseleave", function () { paused = false; });
    car.addEventListener("focusin", function () { paused = true; });
    car.addEventListener("focusout", function () { paused = false; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.4 }).observe(car);
    }
    if (!reduce) setInterval(function () { if (!paused && visible && !document.hidden) go(current + 1); }, 6000);
    sync();
  }

  var year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sponsorship tiers ---------- */
  var sp = C.sponsorship || {};
  var tiersEl = $("[data-tiers]");
  if (tiersEl && sp.tiers && sp.tiers.length) {
    var max = Math.max.apply(null, sp.tiers.map(function (t) { return t.price || 0; }));
    var fmt = function (n) { return (sp.currency || "₦") + Number(n).toLocaleString("en-NG"); };
    sp.tiers.forEach(function (t, i) {
      var li = document.createElement("li");
      li.className = "tier" + (i === 0 ? " tier--title" : "");
      var w = max ? Math.max(4, Math.round((t.price / max) * 100)) : 0;
      li.innerHTML =
        '<div><h4 class="tier__name"></h4><p class="tier__owns"></p></div>' +
        '<div><p class="tier__price"></p><div class="tier__bar" aria-hidden="true"><span></span></div><ul class="tier__perks"></ul></div>' +
        '<p class="tier__slots"><strong></strong></p>';
      $(".tier__name", li).textContent = t.name;
      $(".tier__owns", li).textContent = t.owns || "";
      $(".tier__price", li).textContent = fmt(t.price);
      $(".tier__bar span", li).style.setProperty("--w", w + "%");
      $(".tier__slots strong", li).textContent = t.slots;
      $(".tier__slots", li).appendChild(document.createTextNode(t.slots === 1 ? "slot" : "slots"));
      var perks = $(".tier__perks", li);
      (t.perks || []).forEach(function (pk) {
        var x = document.createElement("li");
        x.textContent = pk;
        perks.appendChild(x);
      });
      tiersEl.appendChild(li);
    });
    var status = $("[data-tier-status]");
    if (status && sp.status === "provisional") {
      status.textContent = sp.statusNote || "Provisional pricing, pending approval.";
      status.hidden = false;
    }
  }

  /* ---------- Past sponsors marquee ---------- */
  var pastEl = $("[data-past-sponsors]");
  if (pastEl) {
    var brands = (C.pastSponsors || []).filter(function (b) { return b && b.logo; });
    var placeholder = !brands.length;
    if (placeholder) { for (var k = 0; k < 18; k++) brands.push(null); }
    var rowCount = brands.length >= 9 ? 3 : brands.length >= 4 ? 2 : 1;
    var rows = [];
    for (var r = 0; r < rowCount; r++) rows.push([]);
    brands.forEach(function (b, i) { rows[i % rowCount].push(b); });
    var makeTile = function (b) {
      var li = document.createElement("li");
      li.className = "past__logo" + (b ? (b.dark ? " past__logo--dark" : "") : " past__logo--empty");
      if (b) {
        var img = document.createElement("img");
        img.src = b.logo;
        img.alt = b.name || "";
        img.decoding = "async";
        li.appendChild(img);
      } else {
        li.textContent = "Logo";
      }
      return li;
    };
    rows.forEach(function (row, ri) {
      var wrap = document.createElement("div");
      wrap.className = "past__row" + (ri % 2 ? " past__row--reverse" : "");
      var track = document.createElement("ul");
      track.className = "past__track";
      // Repeat short rows so one half always fills the panel, then add a second half
      // so the loop is seamless. Only the first set is read by screen readers.
      var reps = Math.max(1, Math.ceil(10 / row.length));
      var half = [];
      for (var rep = 0; rep < reps; rep++) half = half.concat(row);
      [0, 1].forEach(function (copy) {
        half.forEach(function (b, bi) {
          var t = makeTile(b);
          if (copy || bi >= row.length) { t.setAttribute("aria-hidden", "true"); t.classList.add("past__logo--echo"); }
          track.appendChild(t);
        });
      });
      track.style.setProperty("--past-dur", Math.max(30, half.length * 5) + "s");
      wrap.appendChild(track);
      pastEl.appendChild(wrap);
    });
    if (placeholder) pastEl.setAttribute("aria-label", "Partner logos to be added");
  }

  /* ---------- Asset placeholders ---------- */
  // Each .ph shows a labelled slot until the file at data-src exists, then shows the image.
  $$(".ph[data-src]").forEach(function (el) {
    var src = el.getAttribute("data-src");
    var label = el.getAttribute("data-label") || "Image";
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", label + " (placeholder)");
    el.innerHTML = '<span class="ph__label"></span><span class="ph__path"></span><span class="ph__spec"></span>';
    el.children[0].textContent = label;
    el.children[1].textContent = src;
    el.children[2].textContent = el.getAttribute("data-spec") || "";
    // The img lives inside the slot (hidden) so native lazy loading can see it scroll into view.
    var img = document.createElement("img");
    img.className = "ph__img";
    img.decoding = "async";
    img.loading = "lazy";
    img.alt = label;
    img.onload = function () {
      $$(".ph__label, .ph__path, .ph__spec", el).forEach(function (n) { n.remove(); });
      el.removeAttribute("role");
      el.removeAttribute("aria-label");
      el.classList.add("is-loaded");
    };
    img.onerror = function () { img.remove(); };
    // Optional smaller files for phones: data-srcset="file-800.jpg 800w, file.jpg 1600w"
    if (el.hasAttribute("data-srcset")) {
      img.sizes = el.getAttribute("data-sizes") || "100vw";
      img.srcset = el.getAttribute("data-srcset");
    }
    img.src = src;
    el.appendChild(img);
  });

  $$(".logo-slot[data-logo]").forEach(function (el) {
    var img = new Image();
    img.alt = "NACOS Week 27";
    img.onload = function () { el.innerHTML = ""; el.appendChild(img); };
    img.src = el.getAttribute("data-logo");
  });

  /* ---------- Nav ---------- */
  var nav = $("[data-nav]");
  var toggle = $("[data-menu-toggle]");
  var menu = $("[data-menu]");
  if (menu) menu.id = "menu";
  var closeMenu = function () {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  };
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Current-section highlight
  var navLinks = $$('.nav__links a[href^="#"]:not(.btn)');
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = byId[en.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Countdown (only when a start date is set) ---------- */
  var start = C.event && C.event.start ? new Date(C.event.start) : null;
  var cd = $("[data-countdown]");
  if (cd && start && !isNaN(start)) {
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var tick = function () {
      var diff = start - new Date();
      if (diff <= 0) { cd.hidden = true; clearInterval(timer); return; }
      var s = Math.floor(diff / 1000);
      $('[data-cd="d"]', cd).textContent = pad(Math.floor(s / 86400));
      $('[data-cd="h"]', cd).textContent = pad(Math.floor(s / 3600) % 24);
      $('[data-cd="m"]', cd).textContent = pad(Math.floor(s / 60) % 60);
      $('[data-cd="s"]', cd).textContent = pad(s % 60);
    };
    cd.hidden = false;
    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------- Registration form ---------- */
  var form = $("[data-register-form]");
  if (form) {
    var statusEl = $("[data-form-status]", form);
    var submit = $("[data-submit]", form);
    var label = $(".btn__label", submit);
    var rules = [
      ["f-name", function (v) { return v.trim().length > 1; }],
      ["f-email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }],
      ["f-phone", function (v) { return v.replace(/[^\d]/g, "").length >= 10; }],
      ["f-dept", function (v) { return v.trim().length > 1; }]
    ];
    var setError = function (input, errId, bad) {
      var err = document.getElementById(errId);
      input.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) input.setAttribute("aria-describedby", errId); else input.removeAttribute("aria-describedby");
      if (err) err.hidden = !bad;
    };
    var validate = function () {
      var firstBad = null;
      rules.forEach(function (r) {
        var input = document.getElementById(r[0]);
        var bad = !r[1](input.value);
        setError(input, r[0] + "-err", bad);
        if (bad && !firstBad) firstBad = input;
      });
      var ok = form.elements.contact_ok;
      var badOk = !ok.checked;
      setError(ok, "f-contact-err", badOk);
      if (badOk && !firstBad) firstBad = ok;
      return firstBad;
    };
    // Re-check a field once the user leaves it, only after a failed submit
    var tried = false;
    form.addEventListener("focusout", function () { if (tried) validate(); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      tried = true;
      statusEl.textContent = "";
      statusEl.removeAttribute("data-tone");
      var bad = validate();
      if (bad) { bad.focus(); return; }

      var endpoint = C.forms && C.forms.registrationEndpoint;
      if (!endpoint) {
        statusEl.dataset.tone = "ok";
        statusEl.textContent = "Registration opens soon. Nothing was sent yet. Check back when dates are announced.";
        return;
      }

      var data = new FormData(form);
      data.set("share_with_partners", form.elements.share_with_partners.checked ? "yes" : "no");
      data.set("interests", data.getAll("interests").join(", "));
      submit.disabled = true;
      submit.dataset.state = "loading";
      label.textContent = "Sending";
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); })
        .then(function () {
          form.reset();
          tried = false;
          statusEl.dataset.tone = "ok";
          statusEl.textContent = "You're on the list. We'll be in touch on WhatsApp and email.";
          submit.dataset.state = "success";
          label.textContent = "Sent";
        })
        .catch(function () {
          statusEl.dataset.tone = "error";
          statusEl.textContent = "That didn't go through. Check your connection and send again.";
          submit.dataset.state = "error";
          label.textContent = "Send again";
        })
        .then(function () { submit.disabled = false; if (submit.dataset.state !== "error") delete submit.dataset.state; });
    });
  }
})();
