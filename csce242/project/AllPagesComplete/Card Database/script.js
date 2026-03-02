document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
  
    if (!toggleBtn || !nav) {
      return;
    }
  
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "mainNav");
  
    toggleBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("active");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.focus();
    });
  
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  
    document.addEventListener("click", function (e) {
      if (
        !nav.contains(e.target) &&
        !toggleBtn.contains(e.target) &&
        nav.classList.contains("active")
      ) {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.focus();
      }
    });
  
  });