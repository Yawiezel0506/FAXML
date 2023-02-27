import FakeServer from "./server.js";  

const taskList = document.querySelector("#task_list");
const addTaskButton = document.querySelector("#add_task_button");
const deleteAllButton = document.querySelector("#delete_all_button");
const taskName = document.querySelector("#task_name");
const taskTime = document.querySelector("#task_time");

let tasksArr = [{ 'name':'yonathan', "time":555}];
const doApi = async () => {
  let newARR = new FakeServer();
  let responsText = await newARR.get("yonathan");
  console.log(responsText);
};

doApi();

const renderTasks = async () => {
  console.log(tasksArr);
  let newPost = await new FakeServer();
  newPost.post("yonathan", tasksArr);
  await newPost.get('yonathan')
  tasksArr = await newPost.data;
  await console.log(tasksArr);
  taskList.innerHTML = "";
  await tasksArr.forEach((task, index) => {
    const { name, time } = task;
    const taskElement = document.createElement("div");
    taskElement.classList.add("task", "border", "p-2", "my-3");
    taskElement.id = `task_${index}`;
    taskElement.innerHTML = `
      <div class="task-info">
        <h4 id="id_name_${index}">${name}</h4>
        <p>Do it at ${time}</p>
      </div>
      <div class="task-actions">
        <button class="btn btn-danger remove-task" data-task-id="${index}">Remove</button>
        <button class="btn btn-secondary add-details" data-task-id="${index}">Add details</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
};

addTaskButton.addEventListener("click", () => {
  const name = taskName.value;
  const time = taskTime.value;
  tasksArr.push({ name, time });
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const { target } = event;
  if (target.classList.contains("remove-task")) {
    const taskId = target.getAttribute("data-task-id");
    tasksArr.splice(taskId, 1);
    renderTasks();
  } else if (target.classList.contains("add-details")) {
    const taskId = target.getAttribute("data-task-id");
    const newName = prompt("Enter new task name:");
    tasksArr[taskId].name = newName;
    renderTasks();
  }
});

deleteAllButton.addEventListener("click", () => {
  tasksArr = [];
  renderTasks();
});

renderTasks();
