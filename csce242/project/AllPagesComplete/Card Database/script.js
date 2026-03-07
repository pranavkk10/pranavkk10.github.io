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
    //json parsing
    fetch("https://pranavkk10.github.io/csce242/project/Card Database/json/cards.json")
    .then(response => response.json())
    .then(data => {

      const grid = document.querySelector(".card-grid");
      const count = document.querySelector(".count");

      if (!grid) return; 

      grid.innerHTML = "";
      if (count) {
        count.textContent = `Showing ${data.length} of ${data.length} cards`;
      }

      data.forEach(card => {

        const article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
          <img src="https://pranavkk10.github.io/csce242/project/AllPagesComplete/${card.img_name}" alt="${card.name}" />
          <div class="card-body">
            <h2>${card.name}</h2>
            <p class="meta">${card.brand} ${card.year} ${card.card_number}</p>
            <div class="tags">
              <span class="tag sport">${card.sport}</span>
              <span class="tag grade">${card.grade}</span>
            </div>
            <p class="price">$${card.price.toLocaleString()}</p>
          </div>
        `;

        grid.appendChild(article);
      });

    })
    .catch(error => {
      console.error("Error loading JSON:", error);
    });

  
  });

    