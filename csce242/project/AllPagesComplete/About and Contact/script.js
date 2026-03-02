document.addEventListener("DOMContentLoaded", function(){
    const t=document.getElementById("navToggle");
    const n=document.getElementById("mainNav");
    if(!t||!n) return;
    t.setAttribute("aria-expanded","false");
    t.setAttribute("aria-controls","mainNav");
    t.addEventListener("click",function(){
      const s=n.classList.toggle("active");
      t.setAttribute("aria-expanded",String(s));
      t.focus();
    });
    n.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click",function(){
        if(n.classList.contains("active")){
          n.classList.remove("active");
          t.setAttribute("aria-expanded","false");
        }
      });
    });
    document.addEventListener("click",function(e){
      if(!n.contains(e.target) && !t.contains(e.target) && n.classList.contains("active")){
        n.classList.remove("active");
        t.setAttribute("aria-expanded","false");
      }
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape" && n.classList.contains("active")){
        n.classList.remove("active");
        t.setAttribute("aria-expanded","false");
        t.focus();
      }
    });
  });