function renderNav(activePage) {
  const user = getUser();
  const links = [
    { href:"index.html",       label:"🏠 Home",       id:"home"       },
    { href:"meetings.html",    label:"📅 Meetings",   id:"meetings"   },
    { href:"complaints.html",  label:"📢 Complaints", id:"complaints" },
    { href:"businesses.html",  label:"🛒 Businesses", id:"businesses" },
    { href:"schemes.html",     label:"📋 Schemes",    id:"schemes"    },
    { href:"budget.html",      label:"💰 Budget",     id:"budget"     },
    { href:"festivals.html",   label:"🎉 Festivals",  id:"festivals"  },
    { href:"education.html",   label:"📚 Education",  id:"education"  },
    { href:"tourists.html",    label:"📍 Tourism",    id:"tourists"   },
  ];
  const linksHtml = links.map(l =>
    `<a href="${l.href}" class="${activePage===l.id?'active':''}">${l.label}</a>`
  ).join("");

  const adminHtml = (user && isAdmin())
    ? `<a href="admin.html" class="nav-btn ${activePage==='admin'?'active':''}">⚙️ Admin</a>` : "";

  const rightHtml = user
    ? `<div class="user-pill"><div class="dot"></div>${user.fullName}</div>
       ${adminHtml}
       <button class="nav-btn" onclick="logout()">Sign out</button>`
    : `<a href="login.html" class="nav-btn-login">Login</a>`;

  document.body.insertAdjacentHTML("afterbegin", `
    <nav>
      <a class="brand" href="index.html">
        <div class="brand-icon">🏡</div>
        Smart Village
      </a>
      <div class="nav-links">${linksHtml}</div>
      <div class="nav-right">${rightHtml}</div>
    </nav>`);
}
