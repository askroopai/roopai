(function () {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
  
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        toggle.setAttribute(
          "aria-expanded",
          nav.classList.contains("is-open") ? "true" : "false"
        );
      });
    }
  
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("form-status");
  
    if (form && statusEl) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        statusEl.textContent = "Sending…";
        statusEl.className = "form-status";
  
        const formData = new FormData(form);
  
        try {
          const res = await fetch(form.action, {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
  
          if (data.success) {
            statusEl.textContent = "Thanks — your message was sent.";
            statusEl.classList.add("success");
            form.reset();
          } else {
            statusEl.textContent =
              data.message || "Something went wrong. Please try again.";
            statusEl.classList.add("error");
          }
        } catch (err) {
          statusEl.textContent =
            "Network error. Check your connection and try again.";
          statusEl.classList.add("error");
        }
      });
    }
  })();
  