console.log('ddddd')
// Define ui vars

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listioners

loadEventListioners();

function loadEventListioners() {   //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //add tasks
    form.addEventListener('submit', addtask);
    //remove tasks
    tasklist.addEventListener('click', removeTask)
    //clear task event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)

}

//get tasks from ls
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //create li element
        const li = document.createElement('li');

        //add class 
        li.className = 'collection-item';

        //create text node and append li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');

        //add class
        link.className = 'delete-item';

        // append the link to li
        li.appendChild(link);

        tasklist.appendChild(li);
    });
}

//add task

function addtask(e) {
    let flag = 0;
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task)
    {
        if(taskInput.value === task){
            flag = 1;
        }
    })

    if(flag === 1){
        alert('task already exists');
     }else{

        //create li element
        const li = document.createElement('li');

        //add class 
        li.className = 'collection-item';

        //create text node and append li
        li.appendChild(document.createTextNode(taskInput.value));

        // create new link element
        const link = document.createElement('a');

        //add class
        link.className = 'delete-item';

        // append the link to li
        li.appendChild(link);

        tasklist.appendChild(li);

        //store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //clear input
        taskInput.value = '';


        e.preventDefault();
     }
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task

function removeTask(e) {
    if (e.target.classList.contains('delete-item')) {
        if (confirm('are you sure ?')) {
            e.target.parentElement.remove();

            //Remove from ls
            removeTaskfromls(e.target.parentElement)
        }
    }
}
//remove from ls
function removeTaskfromls(taskitem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
   tasks.forEach(function(task, index){
       if(taskitem.textContent === task){
           tasks.splice(index,1);
       }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks

function clearTasks() {
    //tasklist.innerHTML = '';

    //faster
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
    //clear from ls
    cleartasksfromlocalstorage()
}

//clear from ls
function cleartasksfromlocalstorage(){
    localStorage.clear();

}
//filter tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

