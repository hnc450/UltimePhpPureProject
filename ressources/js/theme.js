(function () {
  const KEY = "echat-theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    document.querySelectorAll("[data-theme-icon]").forEach((el) => {
      el.innerHTML =
        next === "dark"
          ? '<use href="#i-sun"></use>'
          : '<use href="#i-moon"></use>';
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(KEY);
    applyTheme(saved || systemTheme());
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  }

  window.EChatTheme = { initTheme, toggleTheme, applyTheme };
})();
