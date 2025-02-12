export default function decorate(block) {
    const iframe = document.createElement('iframe');
    iframe.src = "https://drive.google.com/file/d/1Z4MJ6swaf3HYaYdo6YZ83MhC4KJpPsau/preview";
    iframe.width = "640";
    iframe.height = "480";
    iframe.allow = "autoplay";

    block.replaceWith(iframe);
}