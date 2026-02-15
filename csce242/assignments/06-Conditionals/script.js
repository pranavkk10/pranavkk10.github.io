const ex1 = document.getElementById('ex1');
const ex2 = document.getElementById('ex2');
const ex1Link = document.getElementById('ex1Link');
const ex2Link = document.getElementById('ex2Link');

const minsRange = document.getElementById('minsRange');
const minsValue = document.getElementById('minsValue');
const rangeMessage = document.getElementById('rangeMessage');

const countdownMessage = document.getElementById('countdownMessage');

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function showExercise(n){
  if(n===1){
    ex1.classList.remove('hidden');
    ex2.classList.add('hidden');
  } else {
    ex2.classList.remove('hidden');
    ex1.classList.add('hidden');
    updateCountdown();
  }
}

showExercise(1);

ex1Link.addEventListener('click', ()=> showExercise(1));
ex2Link.addEventListener('click', ()=> showExercise(2));

function updateRangeUI(){
  const v = Number(minsRange.value);
  minsValue.textContent = v + (v===1? " minute":" minutes");

  let msg="", emoji="";
  if(v > 45){
    emoji = "🥓";
    msg = "Let's have bacon and eggs you've got time for a hearty breakfast.";
  } else if(v > 30){
    emoji = "🥐";
    msg = "Fresh pastry stop? You've got time to treat yourself.";
  } else if(v > 15){
    emoji = "☕️";
    msg = "Grab your coffee. No one will judge if you're 5 minutes late.";
  } else {
    emoji = "🏃‍♂️";
    msg = "Run! Quick shoes + jacket you're cutting it close.";
  }
  rangeMessage.innerHTML = `<span class="emoji">${emoji}</span>${msg}`;
}

minsRange.addEventListener('input', updateRangeUI);
updateRangeUI();

function toggleMenu(){
  const isOpen = mainNav.classList.toggle('show');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}
menuToggle.addEventListener('click', toggleMenu);
menuToggle.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' ') toggleMenu();
});
mainNav.addEventListener('click', (e)=>{
  if(window.innerWidth <= 640){
    mainNav.classList.remove('show');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

function minutesUntilClassFromNow(){
  const now = new Date();
  const classDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30, 0, 0);
  const diffMs = classDate - now;
  return Math.round(diffMs / 60000);
}

function humanReadableAgo(minutesAgo) {
    const mins = Math.abs(minutesAgo);
    if (mins < 60) {
      return `${mins} minute${mins === 1 ? '' : 's'} ago`;
    }
    const hours = Math.floor(mins / 60);
    const remM = mins % 60;
    if (remM === 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    return `${hours}h ${remM}m ago`;
  }
  
  function updateCountdown() {
    if (!countdownMessage) return;
    const m = minutesUntilClassFromNow(); 
  
    let text = "";
  
    if (m > 15) {
      text = `🌅 You have ${m} minutes until class — plenty of time to get ready.`;
    } else if (m > 10 && m <= 15) {
      text = `🎧 ${m} minutes — perfect for a short playlist and prep.`;
    } else if (m > 5 && m <= 10) {
      text = `⏱️ ${m} minutes — time to hustle; head out now!`;
    } else if (m >= 0 && m <= 5) {
      text = `🚪 You only have ${m} minute${m === 1 ? '' : 's'} left, let's get moving`;
    } else if (m < 0 && m >= -5) {
      const ago = Math.abs(m);
      text = `😅 Class started ${ago} minute${ago === 1 ? '' : 's'} ago slip in quietly.`;
    } else if (m < -5 && m >= -15) {
      const ago = Math.abs(m);
      text = `😬 Class started ${ago} minutes ago you missed a bit; catch up after.`;
    } else {
      
      const readable = humanReadableAgo(m);
      text = `💤 Class started more than 15 minutes ago it was ${readable}.`;
      
    }
  
    countdownMessage.textContent = text;
  }
  

let countdownInterval = null;
function startCountdownInterval(){
  if(countdownInterval) return;
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 20000);
}
function stopCountdownInterval(){
  if(countdownInterval){ clearInterval(countdownInterval); countdownInterval = null; }
}

const observer = new MutationObserver(()=> {
  if(!ex2.classList.contains('hidden')){
    startCountdownInterval();
  } else {
    stopCountdownInterval();
  }
});
observer.observe(ex2, { attributes: true, attributeFilter: ['class'] });

window.addEventListener('focus', ()=> {
  if(!ex2.classList.contains('hidden')) updateCountdown();
});
