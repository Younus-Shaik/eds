import {createInputField} from '../simple-data/simple-data.js';
export default async function decorate(block) {
    const fragment = document.createRange().createContextualFragment(createFormField());
    const newElement = fragment.firstElementChild;
    
    await block.closest('.feedback-form').replaceWith(newElement);
    listenEvents(block);
}   
function listenEvents(block) {
    document.querySelector('.form').addEventListener('submit', (e) => {
        e.preventDefault();
        // perform form validation and submission logic here
        let form = document.querySelector('.form');
        let user = {
            name: form.querySelector('.form-Name-input').value,
            email: form.querySelector('.form-Email-input').value,
            experience: form.querySelector('.form-dropdown').value,
            comments: form.querySelector('.form-textarea').value
        }
        
        const submitUrl = 'https://script.google.com/macros/s/AKfycbyZp0mqFAJlKJQMReWGJz_1CoSL-z1ZSGx84FC9WPuh44v9CEoFPG6c_UFrOGuX_9i3fg/exec';
        fetch(submitUrl, {
            method: 'POST', // Lowercase 'method'
            mode: 'no-cors', // No 'mode'
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(()=>{
            alert("Successfully submitted")
            form.reset();
        })
        .catch(()=>{alert("Form submition Faild", error)});
    });
}
function createFormField() {
    return `<form class="form" method='POST'>
    <div class="form-group">
    ${createLableAndIputField('Name')}
    </div>
    <div class="form-group">
    ${createLableAndIputField('Email')}
    </div>
    <div class="form-group">
    ${createLable('Over All Experience') + createDropdown()}
    </div>
    <div class="form-group">
    ${createLable('Comments') + createTextArea()}
    </div>
    <button type='submit' class="form-submit">Submit</button>
    </form>
    `
}
function createLableAndIputField(text) {
    return createLable(text) + createInputField(`form-${text}`)?.outerHTML;
}

function createLable(text) {
    return `<label for='form-${text}'>${text}: </label>`
}
function createDropdown() {
    return `<select class='form-dropdown'>
    <option value="">Default</option>
    <option value="Good">Good</option>
    <option value="Modurate">Modurate</option>
    <option value="Bad">Bad</option>
    </select>`
}

function createTextArea() {
    return `<textarea class='form-textarea' placeholder='Tell us more about your experience'></textarea>`
}