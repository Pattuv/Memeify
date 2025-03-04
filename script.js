let after = null;
const memeImage = document.getElementById("memeImage");

// Function to fetch and display a random meme
async function get_random_meme() {
  try {
    // Build the request URL with the "after" parameter (for pagination)
    let url = "https://www.reddit.com/r/memes/hot.json?limit=10"; // Fetch 10 memes at a time
    if (after) url += `&after=${after}`;

    const response = await fetch(url);
    const data = await response.json();

    // Save the "after" value to request the next batch of memes in the future
    after = data.data.after;

    const posts = data.data.children;

    // Filter only image posts (jpg, png, gif)
    const memePosts = posts.filter((post) =>
      post.data.url.match(/\.(jpg|jpeg|png|gif)$/)
    );

    if (memePosts.length > 0) {
      // Select a random meme
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

// Function to load memes when the user scrolls to the bottom of the page
function checkScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    get_random_meme(); // Load the next meme batch when the user scrolls near the bottom
  }
}

// Initial meme load
get_random_meme();

// Set up infinite scroll event listener
window.addEventListener("scroll", checkScroll);
