(function () {
  function timeNow() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function appendMessage(container, text, type = "out") {
    const wrap = document.createElement("article");
    wrap.className = `message message--${type}`;
    wrap.innerHTML = `
      <div>
        <div class="message__bubble"></div>
        <div class="message__time"></div>
      </div>
    `;
    wrap.querySelector(".message__bubble").textContent = text;
    wrap.querySelector(".message__time").textContent = timeNow();
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  function initChat() {
    const form = document.querySelector("[data-chat-form]");
    const input = document.querySelector("[data-chat-input]");
    const list = document.querySelector("[data-messages]");
    if (!form || !input || !list) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      appendMessage(list, text, "out");
      input.value = "";
      input.focus();
    });

    document.querySelectorAll("[data-smart-reply]").forEach((chip) => {
      chip.addEventListener("click", () => {
        appendMessage(list, chip.textContent.trim(), "out");
      });
    });
  }

  function initOtp() {
    const inputs = [...document.querySelectorAll("[data-otp]")];
    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        if (input.value && inputs[index + 1]) inputs[index + 1].focus();
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && inputs[index - 1]) {
          inputs[index - 1].focus();
        }
      });
    });
  }

  function initPin() {
    const dots = [...document.querySelectorAll("[data-pin-dot]")];
    const keys = document.querySelectorAll("[data-pin-key]");
    let pin = "";

    function render() {
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-filled", i < pin.length);
      });
      if (pin.length === dots.length) {
        setTimeout(() => {
          pin = "";
          render();
          window.EChatRouter.go("profile-setup");
        }, 250);
      }
    }

    keys.forEach((key) => {
      key.addEventListener("click", () => {
        const value = key.dataset.pinKey;
        if (value === "del") {
          pin = pin.slice(0, -1);
        } else if (pin.length < dots.length) {
          pin += value;
        }
        render();
      });
    });
  }

  function initSearchFilters() {
    document.querySelectorAll("[data-search]").forEach((input) => {
      const target = document.querySelector(input.dataset.search);
      if (!target) return;
      input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        target.querySelectorAll("[data-search-item]").forEach((row) => {
          const hay = row.textContent.toLowerCase();
          row.hidden = q !== "" && !hay.includes(q);
        });
      });
    });
  }

  window.EChatChat = { initChat, initOtp, initPin, initSearchFilters };
})();
