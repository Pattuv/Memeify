async function init_memes() {
  memes_json = await fetch("memes.json");
  memes = await memes_json.json();
  if (memes.length === 0) {
    console.log("Empty json file or empty list.");
  }

  return memes;
}

async function get_random_meme() {
  let memes = await init_memes();
  let img = document.getElementById("memeImage");

  const clickSound = new Audio("sounds/apple-typing.mp3");
  clickSound.play().catch(() => {
    console.warn("Audio file failed to play. Using Web Audio API instead.");
    playTypingClick();
  });

  if (memes.length > 0) {
    let index = Math.floor(Math.random() * memes.length);
    random_meme = memes[index];
    img.src = `memes/${random_meme}`;
  } else {
    alert("No memes available currently. Check back later. :/");
  }
}

function playTypingClick() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(450, audioCtx.currentTime);
  oscillator.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.1);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

get_random_meme();
