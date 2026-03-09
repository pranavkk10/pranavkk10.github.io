document.addEventListener("DOMContentLoaded", async () => {
  const toggleBtn = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (toggleBtn && nav) {
    toggleBtn.setAttribute("aria-expanded","false");
    toggleBtn.setAttribute("aria-controls","mainNav");
    toggleBtn.addEventListener("click", () => {
      toggleBtn.setAttribute("aria-expanded", String(nav.classList.toggle("active")));
      toggleBtn.focus();
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          toggleBtn.setAttribute("aria-expanded","false");
        }
      });
    });
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target) && nav.classList.contains("active")) {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded","false");
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        nav.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded","false");
        toggleBtn.focus();
      }
    });
  }

  const grid = document.querySelector(".card-grid");
  const countEl = document.querySelector(".count");
  const searchInput = document.getElementById("searchInput");
  const sportFilter = document.getElementById("sportFilter");
  const gradeFilter = document.getElementById("gradeFilter");

  if (!grid) {
    console.error("No .card-grid element found.");
    return;
  }

  const localJson = "json/cards.json";
  const fallbackJson = "https://pranavkk10.github.io/csce242/project/AllPagesComplete/Card%20Database/json/cards.json";
  let jsonUrl = localJson;

  const imagesBase = "./";

  console.log("Attempting to load JSON from (local preferred):", localJson);

  async function loadJson(url) {
    try {
      const resp = await fetch(url, { cache: "no-store" });
      console.log("fetch status for", url, ":", resp.status, resp.statusText);
      if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.warn("Failed to load JSON from", url, err.message);
      throw err;
    }
  }

  let data;
  try {
    try {
      data = await loadJson(localJson);
      jsonUrl = localJson;
    } catch (_) {
      data = await loadJson(fallbackJson);
      jsonUrl = fallbackJson;
    }
  } catch (err) {
    console.error("Error loading cards JSON (both attempts):", err);
    grid.innerHTML = `<p style="grid-column:1/-1;color:#b00020;padding:16px">Error loading cards: ${err.message}. Check that json/cards.json exists (Live Server) or network is available.</p>`;
    if (countEl) countEl.textContent = `Showing 0 of 0 cards`;
    return;
  }

  if (!Array.isArray(data) || data.length === 0) {
    console.error("JSON loaded but not an array or empty:", data);
    grid.innerHTML = `<p style="grid-column:1/-1;color:#b00020;padding:16px">No cards found in JSON.</p>`;
    if (countEl) countEl.textContent = `Showing 0 of 0 cards`;
    return;
  }

  grid.innerHTML = "";
  const cardNodes = [];
  const sportsSet = new Set();
  const gradesSet = new Set();

  data.forEach(card => {
    if (card.sport) sportsSet.add(card.sport);
    if (card.grade) gradesSet.add(card.grade);

    const article = document.createElement("article");
    article.className = "card";

    let imgSrc = String(card.img_name || "");
    if (!imgSrc.startsWith("http://") && !imgSrc.startsWith("https://") && !imgSrc.startsWith("/")) {
      imgSrc = imagesBase + imgSrc;
    }

    const priceDisplay = (typeof card.price === "number") ? card.price.toLocaleString() : (card.price || "");

    article.innerHTML = `
      <img src="${imgSrc}" alt="${(card.name || 'card image')}" />
      <div class="card-body">
        <h2>${card.name || ""}</h2>
        <p class="meta">${[card.brand, card.year, card.card_number].filter(Boolean).join(" ")}</p>
        <div class="tags">
          <span class="tag sport">${card.sport || ""}</span>
          <span class="tag grade">${card.grade || ""}</span>
        </div>
        <p class="price">$${priceDisplay}</p>
      </div>
    `;

    const nameForMatch = (card.name || "").toString().trim().toLowerCase();
    if (nameForMatch.includes("michael jordan")) {
      article.style.cursor = "pointer";
      article.setAttribute("role", "button");
      article.setAttribute("tabindex", "0");
      article.addEventListener("click", () => {
        window.location.href = "../Card Details/index.html";
      });
      article.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          article.click();
        }
      });
    }

    const imgEl = article.querySelector("img");
    if (imgEl) {
      Object.assign(imgEl.style, {
        display: "block",
        width: "100%",
        height: "350px",
        objectFit: "cover",
        objectPosition: "center"
      });
    }

    grid.appendChild(article);

    cardNodes.push({
      node: article,
      name: (card.name || "").toLowerCase(),
      meta: ([card.brand, card.year, card.card_number].filter(Boolean).join(" ")).toLowerCase(),
      sport: (card.sport || "").toLowerCase(),
      grade: (card.grade || "").toLowerCase()
    });
  });

  function populateSelect(selectEl, valuesSet, placeholder) {
    if (!selectEl) return;
    selectEl.innerHTML = "";
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = placeholder || "All";
    selectEl.appendChild(allOpt);
    Array.from(valuesSet).sort().forEach(v => {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      selectEl.appendChild(o);
    });
  }
  populateSelect(sportFilter, sportsSet, "All sports");
  populateSelect(gradeFilter, gradesSet, "All grades");

  if (countEl) countEl.textContent = `Showing ${cardNodes.length} of ${cardNodes.length} cards`;

  function updateVisibleCards() {
    const q = (searchInput ? searchInput.value : "").toLowerCase();
    const sport = (sportFilter ? sportFilter.value : "").toLowerCase();
    const grade = (gradeFilter ? gradeFilter.value : "").toLowerCase();
    let shown = 0;
    cardNodes.forEach(item => {
      const matchesSearch = !q || item.name.includes(q) || item.meta.includes(q);
      const matchesSport = !sport || item.sport === sport;
      const matchesGrade = !grade || item.grade === grade;
      const visible = matchesSearch && matchesSport && matchesGrade;
      item.node.style.display = visible ? "" : "none";
      if (visible) shown++;
    });
    if (countEl) countEl.textContent = `Showing ${shown} of ${cardNodes.length} cards`;
  }

  if (searchInput) searchInput.addEventListener("input", updateVisibleCards);
  if (sportFilter) sportFilter.addEventListener("change", updateVisibleCards);
  if (gradeFilter) gradeFilter.addEventListener("change", updateVisibleCards);
  updateVisibleCards();
});