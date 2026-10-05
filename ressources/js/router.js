(function () {
  const DEFAULT = "splash";
  let historyStack = [];

  function currentView() {
    return (location.hash.replace(/^#\/?/, "") || DEFAULT).split("?")[0];
  }

  function showView(name, { push = true } = {}) {
    const views = document.querySelectorAll(".view[data-view]");
    let found = false;

    views.forEach((view) => {
      const active = view.dataset.view === name;
      view.classList.toggle("is-active", active);
      if (active) found = true;
    });

    if (!found) {
      showView(DEFAULT, { push: false });
      return;
    }

    if (push) {
      const hash = `#/${name}`;
      if (location.hash !== hash) {
        historyStack.push(currentView());
        location.hash = hash;
      }
    }

    document.querySelectorAll("[data-nav]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.nav === name);
    });

    document.dispatchEvent(
      new CustomEvent("echat:viewchange", { detail: { view: name } })
    );
  }

  function go(name) {
    showView(name, { push: true });
  }

  function back() {
    if (historyStack.length) {
      const prev = historyStack.pop();
      showView(prev, { push: false });
      location.hash = `#/${prev}`;
      return;
    }
    history.back();
  }

  function initRouter() {
    document.addEventListener("click", (e) => {
      const goEl = e.target.closest("[data-go]");
      if (goEl) {
        e.preventDefault();
        go(goEl.dataset.go);
        return;
      }
      const backEl = e.target.closest("[data-back]");
      if (backEl) {
        e.preventDefault();
        back();
      }
    });

    window.addEventListener("hashchange", () => {
      showView(currentView(), { push: false });
    });

    showView(currentView(), { push: false });
  }

  window.EChatRouter = { initRouter, go, back, currentView };
})();
