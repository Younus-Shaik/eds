export default function decorate(block) { 
    // Create container for carousel
    const carousel = document.createElement('div');
    carousel.className = 'department-carousel';
    
    // Create inner wrapper for transform animation
    const wrapper = document.createElement('div');
    wrapper.className = 'department-carousel__wrapper';
    carousel.appendChild(wrapper);
    
    // Get all images from picture elements and create slides
    const originalSlides = [...block.querySelectorAll('picture')].map(picture => {
        const slide = document.createElement('div');
        slide.className = 'department-carousel__slide';
        slide.appendChild(picture);
        return slide;
    });

    // Function to clone slides
    function cloneSlides(slides) {
        return slides.map(slide => slide.cloneNode(true));
    }

    // Add multiple sets of slides for seamless infinite effect
    const numberOfSets = 4; // Create 4 sets of slides
    for (let i = 0; i < numberOfSets; i++) {
        const slidesToAdd = i === 0 ? originalSlides : cloneSlides(originalSlides);
        slidesToAdd.forEach(slide => {
            wrapper.appendChild(slide);
        });
    }

    // Clear block and add carousel
    block.textContent = '';
    block.appendChild(carousel);

    // Animation variables
    let position = block.classList.contains('scroll-fast') ? 0 : -50; // Different starting position for slow scroll
    const speed = block.classList.contains('scroll-fast') ? 1.7 : 1.2; // Reduced speed for slow scroll
    let totalWidth = 0;
    let setWidth = 0;

    function updateWidths() {
        const slides = wrapper.querySelectorAll('.department-carousel__slide');
        totalWidth = Array.from(slides).reduce((sum, slide) => sum + slide.offsetWidth, 0);
        setWidth = totalWidth / numberOfSets;
    }

    function animate() {
        position -= speed;
        
        // Reset position when reaching one set width
        if (Math.abs(position) >= setWidth) {
            position += setWidth; // Move back by one set width
        }
        
        wrapper.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    // Add responsive behavior
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            const width = entry.contentRect.width;
            let slidesToShow;
            
            if (width > 1144) slidesToShow = 3.5;
            else if (width > 1070) slidesToShow = 4;
            else if (width > 920) slidesToShow = 3.5;
            else if (width > 700) slidesToShow = 3;
            else if (width > 560) slidesToShow = 2;
            else if (width > 477) slidesToShow = 2;
            else if (width > 407) slidesToShow = 1.7;
            else if (width > 367) slidesToShow = 1.5;
            else slidesToShow = 1;

            const slideWidth = `${100 / slidesToShow}%`;
            wrapper.querySelectorAll('.department-carousel__slide').forEach(slide => {
                slide.style.width = slideWidth;
            });

            // Update widths after resize
            updateWidths();
        }
    });

    resizeObserver.observe(block);

    // Initial width calculation
    setTimeout(updateWidths, 100);

    // Start animation
    requestAnimationFrame(animate);
}