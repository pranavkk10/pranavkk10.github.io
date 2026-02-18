document.addEventListener('DOMContentLoaded', () => {
  const water = document.getElementById('water');
  const START_BUBBLES = 14;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));

  const computeWaterHeight = () => water.clientHeight;

  const createBubble = () => {
    const b = document.createElement('div');
    b.className = 'bubble';

    const sizePx = rand(8, 30).toFixed(1);
    const size = `${sizePx}px`;

    const left = `${rand(8, 92).toFixed(2)}%`;
    const duration = `${rand(4.5, 11).toFixed(2)}s`;
    const delay = `${(-rand(0, 9)).toFixed(2)}s`;
    const driftStart = `${rand(-18, 18).toFixed(1)}px`;
    const driftEnd = `${rand(-36, 36).toFixed(1)}px`;

    
    const waterH = computeWaterHeight();
    const bottomOffset = 8;
    const numericSize = parseFloat(sizePx);
    const margin = 6; 
    const risePx = Math.max(0, waterH - bottomOffset - numericSize - margin);

    b.style.setProperty('--size', size);
    b.style.setProperty('--left', left);
    b.style.setProperty('--drift-start', driftStart);
    b.style.setProperty('--drift-end', driftEnd);
    b.style.setProperty('--rise', `${risePx}px`);

    b.style.animationDuration = duration;
    b.style.animationDelay = delay;

    water.appendChild(b);

    return b;
  };

  for (let i = 0; i < START_BUBBLES; i++) {
    createBubble();
  }

  setInterval(() => {
    createBubble();
    const bubbles = water.querySelectorAll('.bubble');
    if (bubbles.length > START_BUBBLES + 8) {
      if (bubbles[0]) bubbles[0].remove();
      if (bubbles[1]) bubbles[1].remove();
    }
  }, 1800);

  window.addEventListener('resize', () => {
    const waterH = computeWaterHeight();
    const bubbles = water.querySelectorAll('.bubble');
    bubbles.forEach(b => {
      const sizeStr = getComputedStyle(b).getPropertyValue('--size').trim() || b.style.width;
      const px = parseFloat(sizeStr);
      const bottomOffset = 8;
      const margin = 6;
      const risePx = Math.max(0, waterH - bottomOffset - px - margin);
      b.style.setProperty('--rise', `${risePx}px`);
    });
  });
});
