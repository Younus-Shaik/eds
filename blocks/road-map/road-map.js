export default function decorate(block) {
    const personDiv = document.createElement('div');
    personDiv.classList.add('person-icon');
    personDiv.innerHTML = `<img src="/icons/person.svg" alt="person icon">`;
    const learnDiv = document.createElement('div');
    learnDiv.className = 'learn-icon';
    learnDiv.innerHTML = `<img src="/icons/learn.svg" alt="learn icon">`;
    block.append(personDiv);
    block.append(learnDiv);
}

