(function () {
  function icon(name, className = "icon") {
    return `<svg class="${className}" aria-hidden="true"><use href="#${name}"></use></svg>`;
  }

  function hydrateIcons() {
    document.querySelectorAll("[data-icon]").forEach((el) => {
      const name = el.dataset.icon;
      const size = el.dataset.iconSize;
      const cls = size ? `icon icon--${size}` : "icon";
      el.innerHTML = icon(name, cls);
    });
  }

  function initToggles() {
    document.querySelectorAll(".list-row[data-go], .feature-card[data-go], .story[data-go], .btn[data-go], a[data-go]").forEach(() => {});
  }

  function initModal() {
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = document.querySelector(btn.dataset.modalOpen);
        if (modal) modal.classList.add("is-open");
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".modal")?.classList.remove("is-open");
      });
    });
  }

  function initGroupSelect() {
    const selected = document.querySelector("[data-group-selected]");
    document.querySelectorAll("[data-group-toggle]").forEach((row) => {
      row.addEventListener("click", () => {
        const mark = row.querySelector(".check-mark");
        const checked = mark.classList.toggle("is-checked");
        const id = row.dataset.groupToggle;
        if (!selected) return;
        const existing = selected.querySelector(`[data-selected="${id}"]`);
        if (checked && !existing) {
          const name = row.dataset.name || "User";
          const chip = document.createElement("div");
          chip.className = "group-chip";
          chip.dataset.selected = id;
          chip.innerHTML = `
            <div class="avatar avatar--sm avatar--initials">${name
              .slice(0, 1)
              .toUpperCase()}</div>
            <span>${name.split(" ")[0]}</span>
          `;
          selected.appendChild(chip);
        } else if (!checked && existing) {
          existing.remove();
        }
      });
    });
  }

  function initAuthForms() {
    document.querySelectorAll("[data-auth-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const next = form.dataset.authForm || "chats";
        window.EChatRouter.go(next);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydrateIcons();
    window.EChatTheme.initTheme();
    window.EChatRouter.initRouter();
    window.EChatChat.initChat();
    window.EChatChat.initOtp();
    window.EChatChat.initPin();
    window.EChatChat.initSearchFilters();
    initToggles();
    initModal();
    initGroupSelect();
    initAuthForms();

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => window.EChatTheme.toggleTheme());
    });

    // Splash auto-advance once per session load
    if (window.EChatRouter.currentView() === "splash") {
      setTimeout(() => {
        if (window.EChatRouter.currentView() === "splash") {
          window.EChatRouter.go("onboarding");
        }
      }, 1400);
    }
  });
})();
