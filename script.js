const music = document.getElementById('birthdayMusic');
const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

musicBtn.addEventListener('click', async () => {
  if (!music.getAttribute('src') || music.getAttribute('src').includes('music.mp3') && music.readyState === 0) {
    try {
      await music.play();
      musicText.textContent = 'Выключить музыку';
      musicBtn.setAttribute('aria-pressed', 'true');
    } catch {
      showToast('Добавь свой файл assets/music.mp3, чтобы включить музыку ♡');
    }
    return;
  }
  if (music.paused) {
    try { await music.play(); musicText.textContent = 'Выключить музыку'; musicBtn.setAttribute('aria-pressed','true'); }
    catch { showToast('Не удалось воспроизвести аудио. Проверь assets/music.mp3'); }
  } else {
    music.pause(); musicText.textContent = 'Включить музыку'; musicBtn.setAttribute('aria-pressed','false');
  }
});
music.addEventListener('play', () => { musicText.textContent = 'Выключить музыку'; });
music.addEventListener('pause', () => { musicText.textContent = 'Включить музыку'; });

const modal = document.getElementById('modal');
const gift = document.getElementById('gift');
function openModal() { modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); }
function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }
gift.addEventListener('click', () => { gift.classList.add('open'); openModal(); celebrate(45); });
document.getElementById('close').addEventListener('click', closeModal);
document.getElementById('modalDone').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

const flowers = [...document.querySelectorAll('.hidden-flower')];
let found = 0;
flowers.forEach(flower => flower.addEventListener('click', () => {
  if (flower.classList.contains('found')) return;
  flower.classList.add('found');
  found++;
  document.getElementById('progressText').textContent = `Найдено ${found} из 5 цветочков`;
  document.getElementById('progressBar').style.width = `${found * 20}%`;
  showToast(found === 5 ? 'Все цветочки найдены! Ты умничка 🌷' : 'Нашёлся ещё один цветочек! ✿');
  if (found === 5) celebrate(35);
}));

function celebrate(amount = 30) {
  const symbols = ['✿','♡','✦','❀','·'];
  for (let i=0; i<amount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    piece.style.left = `${Math.random()*100}vw`;
    piece.style.color = ['#d97898','#e9b2c4','#c88aa2','#e6c4a8'][Math.floor(Math.random()*4)];
    piece.style.animationDuration = `${2.4 + Math.random()*2}s`;
    piece.style.fontSize = `${12 + Math.random()*16}px`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4700);
  }
}
document.getElementById('confetti').addEventListener('click', () => celebrate(65));

document.getElementById('editLetter').addEventListener('click', () => {
  const current = document.querySelector('.letter-body').innerText;
  const replacement = prompt('Можешь вписать своё поздравление. Переносы строк сохраняются:', current);
  if (replacement !== null && replacement.trim()) {
    const body = document.querySelector('.letter-body');
    body.innerHTML = '';
    replacement.split('\n').forEach(line => {
      const p = document.createElement('p');
      p.textContent = line;
      body.appendChild(p);
    });
    showToast('Поздравление изменено на этой странице ♡');
  }
});