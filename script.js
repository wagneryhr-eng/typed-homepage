const headerMount = document.querySelector("#site-header");

if (headerMount) {
  const currentPage = headerMount.dataset.current || "";
  const navItems = [
    { key: "about", label: "About", href: "./about.html" },
    { key: "works", label: "Movie", href: "./works.html" },
    { key: "sns", label: "SNS", href: "./sns.html" },
    { key: "novels", label: "Novels", href: "./novels.html" },
    { key: "apps", label: "Apps", href: "./apps.html" }
  ];

  const links = navItems
    .map((item) => {
      const current = item.key === currentPage ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${current}>${item.label}</a>`;
    })
    .join("");

  headerMount.innerHTML = `
    <header class="site-header">
      <nav class="nav" aria-label="メインナビゲーション">
        <a class="brand" href="./index.html">
          <span class="brand-mark">
            <span class="brand-letter">T</span>
            <img src="./assets/icons/header-icon.png" alt="" aria-hidden="true" onload="this.parentElement.classList.add('has-image')" onerror="this.remove()">
          </span>
          <span>TYPED Homepage</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="メニューを開閉"><span></span></button>
        <div class="nav-links" id="nav-links">${links}</div>
      </nav>
    </header>
  `;
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("Service worker registration failed:", error);
    });
  });
}
