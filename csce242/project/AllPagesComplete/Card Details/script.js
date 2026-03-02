document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
  
    if (!toggleBtn || !nav) {
      console.error("Toggle nav: missing #navToggle or #mainNav in the DOM");
      return;
    }
  
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "mainNav");
  
    toggleBtn.addEventListener("click", (e) => {
      const isOpen = nav.classList.toggle("active");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.focus();
    });
  
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target) && nav.classList.contains("active")) {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.focus();
      }
    });
  });