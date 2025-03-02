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
  if (memes.length > 0) {
    let index = Math.floor(Math.random() * memes.length);
    random_meme = memes[index];
    img.src = `memes/${random_meme}`;
  } else {
    alert("No memes available currently. Check back later. :/");
  }
}

get_random_meme();
