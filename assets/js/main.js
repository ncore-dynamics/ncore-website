(function () {
  var CFG = window.NCORE_CONFIG || {};
  var root = (document.body.getAttribute("data-root") || "");

  /* ---------- Logo loader: uses your real files, falls back to a labelled placeholder ---------- */
  function mountLogo(el) {
    var name = el.getAttribute("data-logo");           // e.g. "ncore"
    var label = el.getAttribute("data-label") || name;
    var exts = CFG.logoExtensions || ["svg", "png", "webp", "jpg"];
    var base = root + "assets/logos/" + name;
    var i = 0;
    var img = new Image();
    img.className = "logo-img";
    img.alt = label + " logo";
    img.decoding = "async";
    function tryNext() {
      if (i >= exts.length) { placeholder(); return; }
      img.src = base + "." + exts[i++];
    }
    function placeholder() {
      var d = document.createElement("div");
      d.className = "logo-placeholder";
      d.setAttribute("role", "img");
      d.setAttribute("aria-label", label + " logo placeholder");
      d.innerHTML = "<strong>" + label.toUpperCase() + " LOGO</strong><span>Placeholder — add your file at</span><code>assets/logos/" + name + ".png</code>";
      el.replaceChildren(d);
    }
    img.onerror = tryNext;
    img.onload = function () { el.replaceChildren(img); };
    tryNext();
  }
  document.querySelectorAll("[data-logo]").forEach(mountLogo);

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* ---------- Core Dynamics: services + demo projects ---------- */
  var sv = document.getElementById("services-grid");
  if (sv && CFG.services) {
    sv.innerHTML = CFG.services.map(function (s) {
      var planned = s.status !== "offered";
      return '<article class="card with-badge"><div class="tick"></div>' +
        '<span class="badge ' + (planned ? "" : "green") + '">' + (planned ? "Planned" : "Service") + "</span>" +
        "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></article>";
    }).join("");
  }
  var pj = document.getElementById("projects-grid");
  if (pj) {
    var list = CFG.demoProjects || [];
    if (!list.length) {
      var slots = ["Café / restaurant demo", "Small-business demo", "Portfolio demo"];
      pj.innerHTML = slots.map(function (t) {
        return '<article class="card with-badge"><span class="badge">Coming soon</span>' +
          '<div class="concept"><div><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="9" width="36" height="26" rx="3"/><path d="M16 41h16M24 35v6"/></svg>Demo preview slot</div></div>' +
          "<h3>" + t + "</h3><p>A demo site is being prepared. It will be labelled as a demo, not client work.</p></article>";
      }).join("");
    } else {
      pj.innerHTML = list.map(function (p) {
        var isClient = p.type === "client";
        return '<article class="card with-badge"><span class="badge ' + (isClient ? "green" : "") + '">' + (isClient ? "Client project" : "Demo project") + "</span>" +
          "<h3>" + esc(p.title) + "</h3><p>" + esc(p.description || "") + "</p>" +
          (p.tags ? "<p>" + p.tags.map(function (t) { return '<span class="badge">' + esc(t) + "</span> "; }).join("") + "</p>" : "") +
          (p.url ? '<p><a href="' + encodeURI(p.url) + '" target="_blank" rel="noopener">View ' + (isClient ? "project" : "demo") + " →</a></p>" : "") + "</article>";
      }).join("");
    }
  }

  /* ---------- Honest contact form ---------- */
  var form = document.getElementById("quote-form");
  if (form) {
    var status = document.getElementById("form-status");
    var banner = document.getElementById("form-banner");
    var hasEmail = !!CFG.contactEmail, hasEndpoint = !!CFG.formEndpoint;
    banner.textContent = hasEndpoint
      ? "This form sends your message to Core Dynamics' inbox via a form service."
      : hasEmail
        ? "This form does not send automatically. Pressing the button opens your email app with the message ready to send to " + CFG.contactEmail + ". Nothing is delivered until you press Send there."
        : "Heads up: a contact email has not been set up on this site yet, so this form cannot deliver messages. You can copy your message and send it once an address is published.";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = "Name: " + d.get("name") + "\nEmail: " + d.get("email") + "\nProject type: " + d.get("type") + "\nBudget range: " + (d.get("budget") || "Not specified") + "\n\n" + d.get("message");
      if (hasEndpoint) {
        status.textContent = "Sending…";
        fetch(CFG.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: d })
          .then(function (r) { if (!r.ok) throw 0; status.textContent = "Message sent. Thank you."; form.reset(); })
          .catch(function () { status.textContent = "Sending failed. Please try again later."; });
      } else if (hasEmail) {
        location.href = "mailto:" + CFG.contactEmail + "?subject=" + encodeURIComponent("Project enquiry: " + d.get("type")) + "&body=" + encodeURIComponent(body);
        status.textContent = "Your email app should open. Your message has not been sent until you send it from there.";
      } else {
        (navigator.clipboard ? navigator.clipboard.writeText(body) : Promise.reject()).then(
          function () { status.textContent = "Message copied to your clipboard. It has NOT been sent."; },
          function () { status.textContent = "Could not copy automatically. Nothing has been sent."; });
      }
    });
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
})();
