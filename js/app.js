var panel = document.getElementById("list");
var idMask = "id_",
  id = 0;
var textbox = document.getElementById("txt");
var radioTask = document.getElementById("Task");
//var radioText=document.getElementById('Text');

loadStorageValues();

var Task = function(text, time, id, type, status) {
  this.text = text;
  this.time = time;
  this.id = id;
  this.type = type;
  this.status = status;
};

Task.prototype = {
  insertJSON: function() {
    return JSON.stringify(this);
  },
};

document.querySelector(".action_add").onclick = function() {
  var start = performance.now();

  var date = new Date();
  var task = new Task(textbox.value, date, id);
  if (radioTask.checked === true) task.type = "Task";
  BlockValue(textbox.value, id, date, task.type);
  localStorage.setItem(idMask + id, task.insertJSON());
  id++;
  textbox.value = "";
  var end = performance.now();
  console.log("This took " + (end - start) + "ms to complete Vanila JS");
};

function loadStorageValues() {
  for (var i = 0; i < localStorage.length; i++) {
    var taskJSON = JSON.parse(localStorage.getItem(localStorage.key(i)));
    BlockValue(
      taskJSON.text,
      taskJSON.id,
      taskJSON.time,
      taskJSON.type,
      taskJSON.status
    );
    id = localStorage.key(i).substring(3);
  }
  if (id.length > 0) id++;
}

function BlockValue(value, idItem, date, type, status) {
  var liEl = document.createElement("div");
  var divMainEl = document.createElement("div");
  divMainEl.className = "task_item";

  var spanEL = document.createElement("span");
  spanEL.innerHTML = date;
  var divUp = document.createElement("div");
  var btnDelete = document.createElement("button");
  btnDelete.classList.add("flat_button");
  btnDelete.classList.add("action_del");
  btnDelete.classList.add("fl_r");
  btnDelete.title = "Удалить из списка";
  btnDelete.innerHTML = "Delete";
  divUp.appendChild(spanEL);
  divUp.appendChild(btnDelete);
  divMainEl.appendChild(divUp);
  var divSpan = document.createElement("div");
  divSpan.className = "wall_post_text";
  var spanValue = document.createElement("span");
  spanValue.id = "txt_" + idItem;
  spanValue.innerHTML = value;
  divSpan.appendChild(spanValue);
  divMainEl.appendChild(divSpan);
  var divNav = document.createElement("div");
  var btnEdit = document.createElement("button");
  btnEdit.classList.add("flat_button");
  btnEdit.classList.add("action_edit");
  btnEdit.innerHTML = "Edit";
  divNav.appendChild(btnEdit);
  divMainEl.appendChild(divNav);

  if (type === "Task") {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = idItem;
    if (status === true) checkbox.checked = true;
    checkbox.classList.add("fl_r");
    checkbox.classList.add("ch");
    divNav.appendChild(checkbox);
  }

  btnEdit.onclick = function() {
    if (this.classList) {
      if (!this.classList.contains("Save")) {
        var idLi = this.closest(".tdItem").getAttribute("id");
        var element = document.getElementById("txt_" + idLi);
        element.outerHTML =
          "<textarea id='txt_" +
          idLi +
          "'>" +
          element.textContent +
          "</textarea>";
        this.innerHTML = "Save";
        this.classList.add("Save");
      } else {
        var idLi = this.closest(".tdItem").getAttribute("id");
        var element = document.getElementById("txt_" + idLi);
        EditLocalStorage(idLi, element.value);
        element.outerHTML =
          "<span id='txt_" + idLi + "'>" + element.value + "</span>";
        this.innerHTML = "Edit";
        this.classList.remove("Save");
      }
    }
  };

  btnDelete.onclick = function() {
    var liId = this.closest(".tdItem").getAttribute("id");
    this.closest(".tdItem").remove();
    localStorage.removeItem(idMask + liId);
  };

  liEl.appendChild(divMainEl);
  liEl.className = "tdItem";
  liEl.id = idItem;
  liEl.setAttribute("Name", "liItem");
  panel.appendChild(liEl);
}

function EditLocalStorage(idItem, value) {
  var taskJSON = JSON.parse(localStorage.getItem("id_" + idItem));
  taskJSON.text = value;
  var editValue = JSON.stringify(taskJSON);
  localStorage.removeItem("id_" + idItem);
  localStorage.setItem("id_" + idItem, editValue);
}

document.querySelectorAll(".ch").forEach(function(el) {
  el.onclick = function() {
    var idItem = this.getAttribute("id");
    var taskJSON = JSON.parse(localStorage.getItem("id_" + idItem));
    taskJSON.status = el.checked;
    var taskJSON = JSON.stringify(taskJSON);
    localStorage.removeItem("id_" + idItem);
    localStorage.setItem("id_" + idItem, taskJSON);
  };
});

// TEMPLATE
//

function initTemplate() {
  document.querySelector("#btn_add_template").onclick = function() {
    var start = performance.now();
    var date = new Date();
    var task = new Task(textbox.value, date, id);
    if (radioTask.checked === true) task.type = "Task";
    addByTemplate(textbox.value, id, date, task.type);
    localStorage.setItem(idMask + id, task.insertJSON());
    id++;
    textbox.value = "";
    var end = performance.now();
    console.log("This took " + (end - start) + "ms to complete template");
  };
}

function addByTemplate(value, id, date, type) {
  const clone = document.querySelector("#todo").content.cloneNode(true);

  const dateEl = clone.querySelector("#date_value");
  const content = clone.querySelector(".content");
  const wrapper = clone.querySelector(".tdItem");
  const btnDelete = clone.querySelector(".action_del");
  const btnEdit = clone.querySelector(".action_edit");

  wrapper.setAttribute("id", id);
  dateEl.innerHTML = date.toString();
  content.innerHTML = value;

  if (type === "Task") {
    const checkboxClone = document
      .querySelector("#input_task")
      .content.cloneNode(true);
    const inputEl = checkboxClone.querySelector("input");

    inputEl.setAttribute("id", id);

    // if (status === true) checkbox.checked = true;
    inputEl.classList.add("fl_r");
    inputEl.classList.add("ch");
    const footerTask = clone.querySelector(".footer_task");
    footerTask.appendChild(checkboxClone);
  }

  btnDelete.onclick = function() {
    var liId = this.closest(".tdItem").getAttribute("id");
    console.log(liId)
    this.closest(".tdItem").remove();
    localStorage.removeItem(idMask + liId);
  };

   btnEdit.onclick = function() {
    if (this.classList) {
      if (!this.classList.contains("Save")) {
        var idLi = this.closest(".tdItem").getAttribute("id");
        var element = document.getElementById("txt_" + idLi);
        element.outerHTML =
          "<textarea id='txt_" +
          idLi +
          "'>" +
          element.textContent +
          "</textarea>";
        this.innerHTML = "Save";
        this.classList.add("Save");
      } else {
        var idLi = this.closest(".tdItem").getAttribute("id");
        var element = document.getElementById("txt_" + idLi);
        EditLocalStorage(idLi, element.value);
        element.outerHTML =
          "<span id='txt_" + idLi + "'>" + element.value + "</span>";
        this.innerHTML = "Edit";
        this.classList.remove("Save");
      }
    }
  };

  panel.appendChild(clone);
}

initTemplate();
