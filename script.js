document.addEventListener('DOMContentLoaded', () => {
    // AUDIO CONTROLS
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('play-pause');
    const slider = document.getElementById('volume');
  
    btn.addEventListener('click', () => {
      if (music.paused) {
        music.play();
        btn.textContent = 'Pause';
      } else {
        music.pause();
        btn.textContent = 'Play';
      }
    });
  
    slider.addEventListener('input', (e) => {
      music.volume = e.target.value;
    });
  
    // CAROUSEL
    const track = document.querySelector('.cards');
    const total = track.children.length;
    let idx = 0;
    document.querySelector('.nav.next').addEventListener('click', () => {
      if (idx < total - 1) idx++;
      track.style.transform = `translateX(-${idx * 100}%)`;
    });
    document.querySelector('.nav.prev').addEventListener('click', () => {
      if (idx > 0) idx--;
      track.style.transform = `translateX(-${idx * 100}%)`;
    });
  
    // GIFT BOX
    const lid = document.querySelector('.lid');
    const msg = document.getElementById('gift-message');
    document.querySelector('.gift-box').onclick = () => {
      lid.style.transform = 'rotateX(75deg)';
      setTimeout(() => msg.classList.remove('hidden'), 600);
    };
  
    // PUZZLE
    const puzzleImg = new Image();
    puzzleImg.src = 'image5.jpg'; // Your 1242x2208 image
    puzzleImg.onload = () => {
      const canvas = document.getElementById('puzCanvas');
      const ctx = canvas.getContext('2d');
      const size = 2;
      const S = Math.min(puzzleImg.width, puzzleImg.height); // Crop to square
      const tile = S / size;
      canvas.width = S;
      canvas.height = S;
  
      let arr = [1, 2, 3, 4]; // No blank tile
  
      function draw() {
        ctx.clearRect(0, 0, S, S);
        arr.forEach((val, i) => {
          const sx = ((val - 1) % size) * tile;
          const sy = Math.floor((val - 1) / size) * tile;
          const dx = (i % size) * tile;
          const dy = Math.floor(i / size) * tile;
          ctx.drawImage(puzzleImg, sx, sy, tile, tile, dx, dy, tile, tile);
        });
      }
  
      function shuffle() {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        draw();
      }
  
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const col = Math.floor(x / tile), row = Math.floor(y / tile);
        const idx = row * size + col;
        const swapWith = (idx + 1) % arr.length;
        [arr[idx], arr[swapWith]] = [arr[swapWith], arr[idx]];
        draw();
      });
  
      document.getElementById('shuffle').onclick = shuffle;
      shuffle();
    };
  
    // EMOJI RAIN
    const rain = document.getElementById('emoji-rain');
    function makeEmoji() {
      const e = document.createElement('div');
      e.textContent = ['💖','🎉','🌸'][Math.floor(Math.random() * 3)];
      e.style.position = 'absolute';
      e.style.left = (Math.random() * window.innerWidth) + 'px';
      e.style.top = '-50px';
      e.style.fontSize = '2rem';
      rain.append(e);
      let y = -50;
      const id = setInterval(() => {
        y += 5;
        e.style.top = y + 'px';
        if (y > window.innerHeight) {
          clearInterval(id);
          e.remove();
        }
      }, 20);
    }
  
    document.getElementById('sendMsg').onclick = () => {
      document.getElementById('msgInput').value = '';
      for (let i = 0; i < 30; i++) setTimeout(makeEmoji, i * 100);
    };
  });
  