document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
  
    if (!toggleBtn || !nav) return;
  
    toggleBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("active");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });
  
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  
  });