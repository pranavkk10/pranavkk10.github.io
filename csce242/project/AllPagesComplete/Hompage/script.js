document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
  
    if (!toggleBtn || !nav) {
      console.error("Toggle nav: missing #navToggle or #mainNav in the DOM");
      return;
    }
  
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "mainNav");
  
    toggleBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
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

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('videoThumb');
    if (!btn) return;
  
    btn.addEventListener('click', function once() {
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.paddingTop = '56.25%'; 
      wrapper.style.borderRadius = '10px';
      wrapper.style.overflow = 'hidden';
  
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/x8Jya9I1ZyE?autoplay=1&rel=0';
      iframe.title = 'Featured walkthrough video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.position = 'absolute';
      iframe.style.inset = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = '0';
  
      wrapper.appendChild(iframe);
  
      btn.parentNode.replaceChild(wrapper, btn);
    }, { once: true });
  });