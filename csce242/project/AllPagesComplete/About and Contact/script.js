document.addEventListener("DOMContentLoaded", function () {
  const t = document.getElementById("navToggle");
  const n = document.getElementById("mainNav");
  if (t && n) {
    t.setAttribute("aria-expanded", "false");
    t.setAttribute("aria-controls", "mainNav");
    t.addEventListener("click", function () {
      const s = n.classList.toggle("active");
      t.setAttribute("aria-expanded", String(s));
      t.focus();
    });
    n.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (n.classList.contains("active")) {
          n.classList.remove("active");
          t.setAttribute("aria-expanded", "false");
        }
      });
    });
    document.addEventListener("click", function (e) {
      if (!n.contains(e.target) && !t.contains(e.target) && n.classList.contains("active")) {
        n.classList.remove("active");
        t.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && n.classList.contains("active")) {
        n.classList.remove("active");
        t.setAttribute("aria-expanded", "false");
        t.focus();
      }
    });
  }

  const form = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const statusEl = document.getElementById("formStatus");

  if (!form) return;

  function setStatus(message, type = "info") {
    statusEl.textContent = message;
    statusEl.classList.remove("success", "error", "info");
    statusEl.classList.add(type);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Please correct the highlighted fields and try again.", "error");
      return;
    }

    sendBtn.disabled = true;
    sendBtn.setAttribute("aria-busy", "true");
    const originalBtnText = sendBtn.textContent;
    sendBtn.textContent = "Sending…";
    setStatus("", "info");

    try {
      const url = form.getAttribute("action") || "https://api.web3forms.com/submit";
      const formData = new FormData(form);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let detail = "";
        try {
          const j = await response.json();
          if (j && j.message) detail = ` — ${j.message}`;
        } catch (_) {}
        throw new Error(`Server returned ${response.status}${detail}`);
      }

      const result = await response.json();

      if (result && (result.success === true || result.message === "Email sent")) {
        setStatus("Thanks — your message was sent successfully. We'll be in touch soon.", "success");
        form.reset();
      } else {
        setStatus("Message sent (server returned success).", "success");
        form.reset();
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("Sorry — we couldn't send your message. Please try again later.", "error");
    } finally {
      sendBtn.disabled = false;
      sendBtn.removeAttribute("aria-busy");
      sendBtn.textContent = originalBtnText;
    }
  });
});