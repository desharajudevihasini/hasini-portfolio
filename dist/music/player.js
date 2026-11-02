/* Hasini's music shelf: three original instrumental loops bundled locally.
   Browser autoplay restrictions are respected: playback begins only on click. */
(() => {
  const tracks = [
    { title: 'Blue Hour', mood: 'quiet / piano-like', file: '/hasini-portfolio/music/blue-hour.mp3' },
    { title: 'Copper Current', mood: 'rhythmic / kinetic', file: '/hasini-portfolio/music/copper-current.mp3' },
    { title: 'Afterglow', mood: 'warm / late evening', file: '/hasini-portfolio/music/afterglow.mp3' }
  ];
  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = '/hasini-portfolio/music/player.css';
  document.head.appendChild(style);
  const dock = document.createElement('aside');
  dock.className = 'music-dock'; dock.setAttribute('aria-label', 'Music player');
  dock.innerHTML = `
    <button type="button" class="music-launch" aria-expanded="false" aria-controls="music-panel"><span class="music-icon" aria-hidden="true">♫</span><span>MUSIC</span><span class="music-indicator" aria-hidden="true"></span></button>
    <div class="music-panel" id="music-panel" hidden>
      <div class="music-heading"><div><span class="music-eyebrow">SOUNDTRACK / VOL. 01</span><strong>Something for the journey.</strong></div><button type="button" class="music-close" aria-label="Close music panel">×</button></div>
      <div class="music-record" aria-hidden="true"><div class="record-grooves"><span>H.</span></div></div>
      <div class="music-current"><span class="music-count">01 / 03</span><strong class="music-title">Blue Hour</strong><span class="music-mood">quiet / piano-like</span></div>
      <div class="music-controls"><button type="button" class="music-prev" aria-label="Previous song">‹</button><button type="button" class="music-toggle" aria-label="Play song">▶</button><button type="button" class="music-next" aria-label="Next song">›</button></div>
      <label class="music-progress-label"><span>00:00</span><input type="range" class="music-progress" min="0" max="100" step="0.1" value="0" aria-label="Song progress"><span class="music-duration">00:00</span></label>
      <div class="music-list" role="group" aria-label="Select song"></div>
      <label class="music-volume">VOLUME <input type="range" min="0" max="1" step="0.05" value="0.55" aria-label="Music volume"></label>
      <p class="music-credit">Three original instrumentals. Press play to listen; the site never autoplays.</p>
      <div class="music-status" role="status" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(dock);
  const $ = selector => dock.querySelector(selector);
  const audio = new Audio(); audio.preload = 'metadata'; audio.volume = .55;
  let index = 0, playing = false;
  const list = $('.music-list');
  const time = seconds => {
    if (!Number.isFinite(seconds)) return '00:00';
    const n = Math.max(0, Math.floor(seconds));
    return String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0');
  };
  const pause = () => { audio.pause(); playing = false; render(); };
  const stopAmbient = () => {
    const btn = [...document.querySelectorAll('button')].find(el => el.textContent.trim() === 'Sound' && el.getAttribute('aria-pressed') === 'true');
    if (btn) btn.click();
  };
  function render() {
    const track = tracks[index];
    $('.music-count').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(tracks.length).padStart(2, '0');
    $('.music-title').textContent = track.title;
    $('.music-mood').textContent = track.mood;
    $('.music-toggle').textContent = playing ? '❚❚' : '▶';
    $('.music-toggle').setAttribute('aria-label', playing ? 'Pause song' : 'Play song');
    dock.classList.toggle('is-playing', playing);
    list.querySelectorAll('button').forEach((btn, i) => btn.setAttribute('aria-pressed', String(i === index)));
    $('.music-progress-label span:first-child').textContent = time(audio.currentTime);
    $('.music-duration').textContent = time(audio.duration);
    $('.music-progress').value = Number.isFinite(audio.duration) && audio.duration ? String(audio.currentTime / audio.duration * 100) : '0';
  }
  async function play() {
    stopAmbient();
    try {
      await audio.play(); playing = true; $('.music-status').textContent = '';
    } catch {
      playing = false; $('.music-status').textContent = 'Playback could not start. Select a track and try again.';
    }
    render();
  }
  async function select(i, shouldPlay = playing) {
    index = (i + tracks.length) % tracks.length;
    audio.src = tracks[index].file; audio.load(); playing = false;
    render(); if (shouldPlay) await play();
  }
  for (let i = 0; i < tracks.length; i++) {
    const b = document.createElement('button'); b.type = 'button';
    b.innerHTML = `<span class="music-list-number">${String(i + 1).padStart(2, '0')}</span><span>${tracks[i].title}</span><span class="music-arrow">↗</span>`;
    b.addEventListener('click', () => select(i, true)); list.appendChild(b);
  }
  $('.music-launch').addEventListener('click', () => {
    const show = $('.music-panel').hidden;
    $('.music-panel').hidden = !show;
    $('.music-launch').setAttribute('aria-expanded', String(show));
  });
  $('.music-close').addEventListener('click', () => {
    $('.music-panel').hidden = true; $('.music-launch').setAttribute('aria-expanded', 'false');
    $('.music-launch').focus();
  });
  $('.music-toggle').addEventListener('click', () => playing ? pause() : play());
  $('.music-prev').addEventListener('click', () => select(index - 1));
  $('.music-next').addEventListener('click', () => select(index + 1));
  $('.music-volume input').addEventListener('input', e => { audio.volume = Number(e.target.value); });
  $('.music-progress').addEventListener('input', e => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = Number(e.target.value) / 100 * audio.duration;
    render();
  });
  audio.addEventListener('timeupdate', render);
  audio.addEventListener('loadedmetadata', render);
  audio.addEventListener('ended', () => select(index + 1, true));
  audio.addEventListener('error', () => { playing = false; $('.music-status').textContent = 'This audio file is unavailable.'; render(); });
  document.addEventListener('click', e => {
    const b = e.target.closest?.('button');
    if (b?.textContent.trim() === 'Sound' && !audio.paused) pause();
  }, true);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('.music-panel').hidden) $('.music-close').click();
  });
  audio.src = tracks[index].file; render();
})();
