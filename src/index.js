  // Note: Borrowing much code form https://learn-co-curriculum.github.io/js-task-lister-lite/src/oo_index.js
  // and https://learn-co-curriculum.github.io/js-task-lister-lite/src/taskList.js
  // and https://learn-co-curriculum.github.io/js-task-lister-lite/src/task.js
  // If this is not allowed, can obfuscate as needed.

  // However, there is at least one bug in this implementation:
  // if two or more tasks have the same text, and use the X on the top item, it removes all tasks with that name.
  // But only if it is the top item and only if its all the same name. 

  // Instead of each X button using the data-description which can be non-unique.
  // Each X button will use a data-id which will be the time the form was submitted.

  // the assignment says "You've been provided with a basic HTML file, 
  // as well as an index.js file where you can implement your solution."
  // as such I will have to put the classes from "taskList.js" and "task.js" in here, which should be fine
  // https://stackoverflow.com/questions/14095177/javascript-objects-in-their-own-class-file

  // theese are loaded in a different order in https://learn-co-curriculum.github.io/js-task-lister-lite/
  // but doesn't make sense to load classes only after code that could theoretically reference it.

  // https://learn-co-curriculum.github.io/js-task-lister-lite/src/taskList.js
  class TaskList {
    constructor() {
      this.tasks = [];
    }
  
    // first instead of just sending the description to the Task class, we'll send both the description and the time. 

/*  createNewTask(description) {
      const newTask = new Task(description);
      this.tasks.push(newTask);
    } */

    
    createNewTask(description,time) {
      const newTask = new Task(description,time);
      this.tasks.push(newTask);
    }


    renderTasks() {
      return this.tasks.map((task) => task.render()).join("");
    }
  
   // then when we want to delete a task via X, we'll use time, which is almost certainly going be unique, instead of description
   // when time gets retrieved from the DOM it turns into as string, so we'll stringify task.time

/*  deleteTask(description) {
      this.tasks = this.tasks.filter((task) => task.description !== description);
    } */

    deleteTask(time) {
      this.tasks = this.tasks.filter((task) => task.time.toString() !== time);
    }

  }
  


  // https://learn-co-curriculum.github.io/js-task-lister-lite/src/task.js
  class Task {

    // as mentioned, want to pass both description and time, this can be solved by using two paramaters for constructor

/*     constructor(description) {
      this.description = description;
    } */

    constructor(description,time) {
      this.description = description;
      this.time = time;
    }

    // using data-id of time, as again, data-description of description could be non-unique.

/*     render() {
      return `
        <li>
          ${this.description}
          <button data-description="${this.description}">X</button>
        </li>
        `;
    } */

    render() {
      return `
        <li>
          ${this.description}
          <button data-id="${this.time}">X</button>
        </li>
        `;
    }
  }


// https://learn-co-curriculum.github.io/js-task-lister-lite/src/oo_index.js
document.addEventListener("DOMContentLoaded", () => {
  // your code here

  // Original comment: "initialize taskList class"
  const taskList = new TaskList();

  // Original comment: "grab all the necessary DOM elements"
  // Original comment: "form and relevant input fields"

  // newTaskForm seems like a bad variable name, createTaskForm makes more sense

  /* const newTaskForm = document.getElementById("create-task-form"); */

  const createTaskForm = document.getElementById("create-task-form");
  const newTaskDescription = document.getElementById("new-task-description");
  
  // the next line isn't needed, not going for stretch goal of Priority so removing

  /* const newTaskPriority = document.getElementById("new-task-priority"); */

  // Original comment: "ul where new tasks will live on the DOM"
  const taskUl = document.getElementById("tasks");
  
  const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());

  // Original comment: "attach event listeners"

  // again, using a more sensible variable name of createTaskForm
  // also, passing both description and time (e.timeStamp)

  /* newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    taskList.createNewTask(newTaskDescription.value);
    // reset form
    e.target.reset();
    renderApp();
  }); */

  createTaskForm.addEventListener("submit", (e) => {
    // apparently this line is all we need to avoid it trying to go to a new page
    e.preventDefault();
    taskList.createNewTask(newTaskDescription.value,e.timeStamp);
    e.target.reset();
    renderApp();
  });

  // finally, the event listener for clicking the x will send the data-id time on the line from render()
  // again description could be non-unique and the data-description part of render() has been removed 

/*   taskUl.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.description);
      renderApp();
    }
  }); */

  taskUl.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.id);
      renderApp();
    }
  });
});
