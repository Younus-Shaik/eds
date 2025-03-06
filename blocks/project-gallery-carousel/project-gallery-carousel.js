export default function decorate(block) {

    // Create title element
    const titleDiv = document.createElement('div');
    titleDiv.className = 'project-slider__title';
    titleDiv.textContent = 'Our Projects';

    // Create cards container
    
    let cards = document.createElement('div');
    
    Array.from(block.children).forEach(child => {
        const cardsDiv = document.createElement('div');
        cardsDiv.className = 'project-card';
        Array.from(child.children).forEach(child => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'project-card__' + (child.querySelector('picture') ? 'image' : 'content');
            cardDiv.appendChild(child);
            cardsDiv.appendChild(cardDiv);
        });
        cards.appendChild(cardsDiv);
    });
    
    block.textContent = '';

    // // Append elements to slider
    // block.appendChild(titleDiv);
    while (cards.firstElementChild) {
        block.appendChild(cards.firstElementChild);
    }
}
