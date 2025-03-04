const memeImage = document.getElementById("memeImage");

async function get_random_meme() {
  try {
    const response = await fetch(
      "https://www.reddit.com/r/memes/hot.json?limit=50"
    );
    const data = await response.json();
    const posts = data.data.children;

    const memePosts = posts.filter((post) =>
      post.data.url.match(/\.(jpg|jpeg|png|gif)$/)
    );

    if (memePosts.length > 0) {
      const randomMeme =
        memePosts[Math.floor(Math.random() * memePosts.length)];
      memeImage.src = randomMeme.data.url;
    } else {
      console.error("No image memes found!");
    }
  } catch (error) {
    console.error("Error fetching meme:", error);
  }
}

get_random_meme();
