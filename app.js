let taskInput = document.getElementById("newTask");//input add a new task.
let addButton = document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder = document.getElementById("incompletedTasks");//ul
let completedTasksHolder = document.getElementById("completedTasks");//completed-tasks ul

//New task list item
function createNewTaskElement(taskString) {

  let listItem = document.createElement("li");
  listItem.classList.add("list__item", "list-form");

  //input (checkbox)
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("input-checkbox");

  //label
  let label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task", "list-form__label");

  //input (text)
  let editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task", "input-text", "list-form__input_text");

  //button.edit
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("button", "list-form__button_edit");

  //button.delete
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "list-form__button_delete");
  let deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("button_delete");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Close-icon";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function () {
  console.log("Add Task...");
  //Create a new list item with the text from the #newTask:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var ajaxRequest = function () {
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

/*---------------------------------------------------------*/

//Edit an existing task.
var textDecoration = function () {
  let label = this.getElementsByClassName("list-form__label");
  let listItem = this.parentNode;
  let ul = listItem.parentNode;

  if (ul === completedTasksHolder) {
      label.classList.add("list-form__label_complete");
  } else {
    label.classList.remove("list-form__label_complete");
  }
}

var editTask = function () {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector('input[type=text]');
  let label = listItem.querySelector("label");
  let editBtn = listItem.querySelector(".list-form__button_edit");
  let containsClass = listItem.classList.contains("list-form_edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.classList.remove("list-form__label_edit");
    editInput.classList.remove("list-form__input_edit");
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    label.classList.add("list-form__label_edit");
    editInput.classList.add("list-form__input_edit");
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
}

  //toggle .editmode on the parent.
  listItem.classList.toggle("list-form_edit-mode");
};


//Delete task.
var deleteTask = function () {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  let label = listItem.getElementsByClassName("list-form__label");
  label[0].classList.add("list-form__label_complete"); 
}


var taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompletedTasks.
  
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  // textDecoration;
  bindTaskEvents(listItem, taskCompleted);
  let label = listItem.getElementsByClassName("list-form__label");
  label[0].classList.remove("list-form__label_complete"); 
}

//The glue to hold it all together.

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  console.log(222, taskListItem)
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  let editButton = taskListItem.querySelector(".list-form__button_edit");
  let deleteButton = taskListItem.querySelector(".list-form__button_delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

