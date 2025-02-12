export default function decorate(block) {
    let url = block.querySelector("a").href;
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = "640";
    iframe.height = "480";
    iframe.allow = "autoplay";

    block.replaceWith(iframe);
}