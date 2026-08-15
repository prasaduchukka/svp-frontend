function renderNav(activePage) {
  const user = getUser();
  const lang = getLang();
  const isTE = lang === "te";

  const links = [
    { href:"index.html",       label: t("home"),       id:"home"       },
    { href:"meetings.html",    label: t("meetings"),   id:"meetings"   },
    { href:"complaints.html",  label: t("complaints"), id:"complaints" },
    { href:"businesses.html",  label: t("businesses"), id:"businesses" },
    { href:"schemes.html",     label: t("schemes"),    id:"schemes"    },
    { href:"budget.html",      label: t("budget"),     id:"budget"     },
    { href:"festivals.html",   label: t("festivals"),  id:"festivals"  },
    { href:"education.html",   label: t("education"),  id:"education"  },
    { href:"tourists.html",    label: t("tourism"),    id:"tourists"   },
  ];

  const icons = { home:"🏠", meetings:"📅", complaints:"📢", businesses:"🛒",
                  schemes:"📋", budget:"💰", festivals:"🎉", education:"📚", tourists:"📍" };

  const linksHtml = links.map(l =>
    `<a href="${l.href}" class="${activePage===l.id?'active':''}">${icons[l.id]||""} ${l.label}</a>`
  ).join("");

  const mobileLinks = links.map(l =>
    `<a href="${l.href}" class="${activePage===l.id?'active':''}">${icons[l.id]||""} ${l.label}</a>`
  ).join("");

  const adminLink = (user && isAdmin())
    ? `<a href="admin.html" class="nav-btn ${activePage==='admin'?'active':''}">⚙️ ${t("admin")}</a>` : "";

  const mobileAdminLink = (user && isAdmin())
    ? `<a href="admin.html">⚙️ ${t("admin")}</a>` : "";

  const langBtnLabel = isTE
    ? `<span class="flag">🇮🇳</span> English`
    : `<span class="flag">🇮🇳</span> తెలుగు`;

  const rightHtml = user
    ? `<div class="user-pill"><div class="dot"></div><span class="name-text">${user.fullName}</span></div>
       ${adminLink}
       <button class="lang-btn" onclick="toggleLang()">${langBtnLabel}</button>
       <button class="nav-btn" onclick="logout()">${t("logout")}</button>`
    : `<button class="lang-btn" onclick="toggleLang()">${langBtnLabel}</button>
       <a href="login.html" class="nav-btn-login">${t("login")}</a>`;

  document.body.insertAdjacentHTML("afterbegin", `
    <nav>
      <a class="brand" href="index.html">
        <div class="brand-icon">🏡</div>
        <span>${isTE ? "స్మార్ట్ విలేజ్" : "Smart Village"}</span>
      </a>
      <div class="nav-links">${linksHtml}</div>
      <div class="nav-right">${rightHtml}</div>
      <button class="hamburger" id="hamburgerBtn" onclick="toggleMobileMenu()">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileLinks}
      ${mobileAdminLink}
      <div class="mob-lang">
        <button onclick="toggleLang()">${isTE ? "🇮🇳 Switch to English" : "🇮🇳 తెలుగులో చూడు"}</button>
      </div>
      ${user ? `<div style="margin-top:12px"><button onclick="logout()" style="width:100%;padding:12px;background:rgba(255,0,0,.2);border:none;color:#fff;border-radius:10px;font-size:14px;cursor:pointer">${t("logout")}</button></div>` : `<div style="margin-top:12px"><a href="login.html" style="display:block;text-align:center;padding:12px;background:rgba(255,255,255,.15);border-radius:10px;color:#fff;text-decoration:none;font-size:14px">${t("login")}</a></div>`}
    </div>`);
}

function toggleMobileMenu() {
  const btn  = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");
  btn.classList.toggle("open");
  menu.classList.toggle("open");
}
