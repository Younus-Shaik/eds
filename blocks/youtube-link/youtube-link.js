export default function decorate(block) {
  const url = block.querySelector("a").href;
  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = url;
  iframe.title = "YouTube video player";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;

  // Ensure 'block' exists before replacing it
  if (block) {
    block.replaceWith(iframe);
  } else {
    console.warn("Element 'block' not found!");
  }
}
