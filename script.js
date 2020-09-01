// Select the todo input
const todoInput = document.querySelector(".todo-input");

//Select the todo button
const todoButton = document.querySelector(".todo-btn");

// Select the <ul> list
const todoList = document.querySelector("#todoList");


let todos = [];         // Creating an array, which will stores all of todo items


todoButton.addEventListener('click', () => {


    addTodoItem(todoInput.value);
});


// function to add todo
function addTodoItem(item) {

    if(item !== '') {

        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        // Pushing todo object in array todos
        todos.push(todo);
        // console.log(todos)
        renderTodoItem(todos);

        todoInput.value = '';       // finally clear the input box value
    } else alert("Write something in input");

}

function renderTodoItem(todos) {

    //Clear everything inside <ul>
    todoList.innerHTML = '';

    //run through each item inside todos
    todos.forEach((currentItem) => {

        //check if the item is completed
        let checked = currentItem.completed ? 'checked' : '';

        // Creating an <li> element
        const li = document.createElement('li');

        //creating and adding a class 'todo-item'
        li.setAttribute('class', 'todo-item');
        //creating and adding an Attribute 'data-key' with the value currentItem.id
        li.setAttribute('data-key', currentItem.id);

        //if item is completed, then add a class to <li> called 'checked', which will add line-through style
        if(currentItem.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type='checkbox' class='checkbox' ${checked}>
        <p>${currentItem.name}</p>
        <button class="delete-button btn btn-danger">Delete</button>
        `;

        todoList.append(li);
    })

}

function toggleItemComplete(itemId) {

    itemId = +itemId;       //Convert String Id to Number Id

    todos.forEach((currentItem) => {
        console.log(currentItem);

        if(currentItem.id === itemId) {
            console.log(currentItem.completed);
            currentItem.completed = !currentItem.completed;
        }
    });


    // console.log(itemId)
}

function removeTodoItem(clickedItem) {
    // console.log(clickedItem);

    todos.splice(clickedItem, 1);           //removing current element from array todos     (removing one element from clickedItem position(index))
    // console.log(todos);
    // clickedItem.parentElement.remove();    //removing parent of element (<li>), that was clicked
}

todoList.addEventListener('click', event => {

    if(event.target.type === 'checkbox') {
        toggleItemComplete(event.target.parentElement.getAttribute('data-key'));
    }


    if (event.target.classList.contains('delete-button')) {
        // todoList.remove();
        removeTodoItem(event.target.parentElement.getAttribute('data-key'));
    }
    // console.log(event.target.type);
});


