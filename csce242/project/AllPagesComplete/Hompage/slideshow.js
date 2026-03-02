
document.addEventListener('DOMContentLoaded', function () {

    const cardImages = [
      'images/Michael.jpeg', 
      'images/Wayne.jpeg',
      'images/Tom.jpeg',
      'images/Kobe.jpeg',
      'images/Messi.jpeg',
      'images/derek.jpeg'
    ];
    const captions = [
      'Michael Jordan — 1987 Fleer',
      'Wayne Gretzky — 1979 OPC',
      'Tom Brady — 2000 Playoff Contenders',
      'Kobe Bryant — 1996 Oberto',
      'Lionel Messi — 2011 Tops',
      'Derek Jeter — 1993 SP Foil'
    ];
  
    if (!cardImages || !cardImages.length) return;
  
    const slidesTrack = document.getElementById('slidesTrack');
    const thumbnails = document.getElementById('thumbnails');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const slideshowEl = document.getElementById('slideshow');
  
    if (!slidesTrack || !thumbnails || !prevBtn || !nextBtn || !playPauseBtn || !slideshowEl) {
      console.warn('Slideshow: required DOM elements missing.');
      return;
    }
  
    let autoplayInterval = null;
    let isPlaying = true;
    let currentIndex = 0;
  
    cardImages.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.setAttribute('data-index', i);
  
      const img = document.createElement('img');
      img.src = src;
      img.alt = captions[i] || `Card ${i + 1}`;
  
      slide.appendChild(img);
  
      if (captions[i]) {
        const cap = document.createElement('div');
        cap.className = 'caption';
        cap.textContent = captions[i];
        slide.appendChild(cap);
      }
  
      slidesTrack.appendChild(slide);
  
      const thumb = document.createElement('button');
      thumb.className = 'thumb';
      thumb.setAttribute('data-index', i);
      thumb.setAttribute('aria-label', `Show ${captions[i] || 'card ' + (i + 1)}`);
      thumb.type = 'button';
      const timg = document.createElement('img');
      timg.src = src;
      timg.alt = captions[i] || `Thumb ${i + 1}`;
      thumb.appendChild(timg);
      thumbnails.appendChild(thumb);
  
      thumb.addEventListener('click', () => {
        scrollToIndex(i);
        pauseAutoplay();
      });
    });
  
    const slideElements = slidesTrack.querySelectorAll('.slide');
    const thumbElements = thumbnails.querySelectorAll('.thumb');
  
    function setActiveThumb(idx) {
      thumbElements.forEach(t => t.classList.remove('active'));
      if (thumbElements[idx]) thumbElements[idx].classList.add('active');
    }
  
    function scrollToIndex(idx) {
      const target = slideElements[idx];
      if (!target) return;
      const offsetLeft = target.offsetLeft - (slidesTrack.clientWidth - target.clientWidth) / 2;
      slidesTrack.scrollTo({ left: offsetLeft, behavior: 'smooth' });
      currentIndex = idx;
      setActiveThumb(currentIndex);
    }
  
    prevBtn.addEventListener('click', () => {
      const nextIdx = (currentIndex - 1 + slideElements.length) % slideElements.length;
      scrollToIndex(nextIdx);
      pauseAutoplay();
    });
  
    nextBtn.addEventListener('click', () => {
      const nextIdx = (currentIndex + 1) % slideElements.length;
      scrollToIndex(nextIdx);
      pauseAutoplay();
    });
  
    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
        const nextIdx = (currentIndex + 1) % slideElements.length;
        scrollToIndex(nextIdx);
      }, 2000);
      isPlaying = true;
      playPauseBtn.textContent = '❚❚';
      playPauseBtn.setAttribute('aria-pressed', 'false');
    }
  
    function pauseAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = null;
      isPlaying = false;
      playPauseBtn.textContent = '▶';
      playPauseBtn.setAttribute('aria-pressed', 'true');
    }
  
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAutoplay();
      } else {
        startAutoplay();
      }
    });
  
    slideshowEl.addEventListener('mouseenter', pauseAutoplay);
    slideshowEl.addEventListener('mouseleave', () => { if (!isPlaying) startAutoplay(); });
    slideshowEl.addEventListener('focusin', pauseAutoplay);
    slideshowEl.addEventListener('focusout', () => { if (!isPlaying) startAutoplay(); });
  
    slideshowEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prevBtn.click(); }
      if (e.key === 'ArrowRight') { nextBtn.click(); }
    });
  
    let scrollTimeout = null;
    slidesTrack.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const center = slidesTrack.scrollLeft + slidesTrack.clientWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        slideElements.forEach((s, idx) => {
          const slideCenter = s.offsetLeft + s.clientWidth / 2;
          const dist = Math.abs(center - slideCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = idx;
          }
        });
        currentIndex = closestIdx;
        setActiveThumb(currentIndex);
      }, 120);
    });
  
    let touchStartX = 0;
    let touchEndX = 0;
    slidesTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    slidesTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const dx = touchEndX - touchStartX;
      if (Math.abs(dx) > 30) {
        if (dx < 0) nextBtn.click(); else prevBtn.click();
      }
    });
  
    setActiveThumb(0);
    scrollToIndex(0);
    startAutoplay();
  
    window.cardSlideshow = {
      goTo: scrollToIndex,
      next: () => nextBtn.click(),
      prev: () => prevBtn.click(),
      play: startAutoplay,
      pause: pauseAutoplay
    };
  });