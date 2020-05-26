document.addEventListener('DOMContentLoaded', () => { //keeps code running even if script tag is moved anywhere within HTML
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');
    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');
    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckbox = document.createElement('input');
    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckbox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckbox);
    mainDiv.insertBefore(div, ul);


    /*
     *FILTER CHECKBOX EVENT HANDLER
     */
    filterCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const list = ul.children;
        if (isChecked) { //checks if filterCheckbox is checked
            for (let i = 0; i < list.length; i += 1) {
                let li = list[i]; //goes through all names in the list
                if (li.className === 'responded') { //checks if class name is responded
                    li.style.display = ''; //displays responded names
                } else {
                    li.style.display = 'none'; //hides names that haven't responded 
                }
            }
        } else { //if filterCheckbox is not checked
            for (let i = 0; i < list.length; i += 1) {
                let li = list[i]; //goes through all names on the list
                li.style.display = ''; //displays all names
            }
        }
    });


    /*Function Name: createLi - creates the format for the list element that is entered by the user
     *@text [string] - entered name 
     *@returns [li element] - the full contents of the list element
     */
    function createLi(text) {
        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        }

        function appendToLi(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element); //attaches span elemend to li element
            return element;
        }

        const li = document.createElement('li'); //create list element
        appendToLi('span', 'textContent', text);
        appendToLi('label', 'textContent', 'Coming')
            .appendChild(createElement('input', 'type', 'checkbox'));
        appendToLi('label', 'textContent', 'Not Coming')
            .appendChild(createElement('input', 'type', 'checkbox'));
        appendToLi('button', 'textContent', 'edit'); //creates edit button
        appendToLi('button', 'textContent', 'remove'); //creates remove button
        return li;
    }
    /*
     *ENTER ON KEYBOARD: submit EVENT HANDLER
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault(); //makes sure page does not refresh every time submit action is triggered
        const text = input.value; //the name added by user
        input.value = ''; //makes input box empty after a name is entered and added to the page 
        const li = createLi(text); //calls createLi function to make the contents of the name box appear to screen
        ul.appendChild(li); //attaches ul to the li for bubbling
        if (text === '') {
            alert('Please enter a name.');
            ul.removeChild(li);
        }
    });
    /*
     * CHECKBOX CREATION AND EVENT HANDLER
     */
    ul.addEventListener('change', (e) => {
        const checkbox = event.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;

        if (checked) {
            listItem.className = 'responded';
        } else {
            listItem.className = '';
        }
    });
    /*
     *BUTTON CLICK EVENT HANDLER
     */
    ul.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") { //button event handler
            const button = e.target;
            const li = button.parentNode; //creates li variable and connects button to li parent element
            const ul = li.parentNode; //creates ul variable and connects button to ul element
            const action = button.textContent;
            const nameActions = {
                    remove: () => { //remove button event handler
                        ul.removeChild(li);
                    },

                    edit: () => { //edit button event handler
                        const span = li.firstElementChild; //to make the text for the name accessible in the DOM
                        const input = document.createElement('input'); //allows you to change the text
                        input.type = 'text';
                        input.value = span.textContent; //connects the new text to the span element
                        li.insertBefore(input, span);
                        li.removeChild(span); //removes span element
                        button.textContent = 'save'; //changes edit button text to save
                    },

                    save: () => { //save button event handler
                        const input = li.firstElementChild;
                        const span = document.createElement('span'); //creates span element
                        span.textContent = input.value; //sets span as the new text content of the list item
                        li.insertBefore(span, input);
                        li.removeChild(input);
                        button.textContent = 'edit'; //changes button text back to edit after the text has been saved
                    }
                }
                //select and run action in buttons name
            nameActions[action]();
        }
    });
});