export default function decorate(block) {
  const url = block.querySelector("a").href;
  const tweetBlock = document.createElement("blockquote");
  tweetBlock.className = "twitter-tweet";

  const tweetLink = document.createElement("a");
  tweetLink.href =url;

  tweetBlock.appendChild(tweetLink);

  // Ensure 'block' exists before replacing it
  if (block) {
    block.replaceWith(tweetBlock);
  } else {
    console.warn("Element 'block' not found!");
  }

  // Load Twitter embed script dynamically
  const twitterScript = document.createElement("script");
  twitterScript.src = "https://platform.twitter.com/widgets.js";
  twitterScript.async = true;
  document.body.appendChild(twitterScript);
}
