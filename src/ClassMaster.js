/* eslint-disable semi */
import { container } from './DOMElements.js'
import { myArray } from './GlobalArray.js'

const myStorage = JSON.parse(localStorage.getItem('myArray'));
export default class MyTasksToDo {
  constructor() {
    this.counter = 1;
    this.tasks = [];
  }

  addTask(task) {
    const newDiv = document.createElement('div')
    this.myobject = {};
    this.myobject.index = myArray.length + 1;
    this.myobject.task = task.value;
    this.myobject.done = false;
    newDiv.innerHTML = `
        <div class="taskcheck"> <input type="checkbox" class="checkbox" id="task_${this.counter}" name="task_${this.counter}">
        <label class="tasktext myedit" for="task_${this.counter}">${task.value}</label></div><button id="${this.counter - 1}" class="delete"><i class="fa-solid fa-trash-can edit"></i></button>`
    task.value = ''
    newDiv.classList.add('task');
    container.appendChild(newDiv);
    myArray.push(this.myobject);
    this.deleteTask();
    this.counter += 1;
    this.saveStorage()
    this.checkBox();
    this.editTask();
  }

  retriveStorage(oldtask, status) {
    this.newDiv = document.createElement('div');
    this.myobject = {};
    this.myobject.index = this.counter;
    this.myobject.task = oldtask;
    this.myobject.done = status;
    this.newDiv.innerHTML = `<div class="taskcheck"> <input type="checkbox" class="checkbox" id="task_${this.counter}" name="task_${this.counter}">
    <label class="tasktext myedit" for="task_${this.counter}">${this.myobject.task}</label></div><button id="${this.counter - 1}" class="delete"><i class="fa-solid fa-trash-can edit"></i></button>`
    if (status === true) {
      this.newDiv.classList.add('active');
    }
    this.newDiv.classList.add('task');
    container.appendChild(this.newDiv);
    this.counter += 1;
    this.deleteTask();
    myArray.push(this.myobject);
    if (this.counter === myStorage.length + 1) {
      this.editTask();
      this.checkBox();
    }
  }

  deleteTask() {
    this.deleteButtons = document.querySelectorAll('.delete');
    this.current = this.deleteButtons[this.deleteButtons.length - 1];
    this.current.addEventListener('click', (e) => {
      this.die = e.target.parentNode.id;
      e.preventDefault();
      e.target.parentNode.parentNode.remove();
      myArray.splice(this.die, 1);
      this.counter -= 1;
      // updated index of elements in the array
      for (let i = 0; i < myArray.length; i += 1) {
        myArray[i].index = i + 1;
        e.target.parentNode.id = i;
      }
      this.saveStorage();
      window.location.reload()
    })
  }

  checkBox() {
    this.checkbox = document.querySelectorAll('.checkbox');
    this.checkbox.forEach((check, index) => {
      check.addEventListener('change', (e) => {
        e.preventDefault();
        this.index = index;
        if (e.target.checked) {
          e.target.parentNode.parentNode.classList.add('active');
          myArray[this.index].done = true;
          this.saveStorage();
        } else {
          e.target.parentNode.parentNode.classList.remove('active');
          myArray[this.index].done = false;
          this.saveStorage();
        }
      })
    })
  }

  editTask() {
    this.editField = document.querySelectorAll('.myedit');
    this.editField.forEach((edit) => {
      edit.addEventListener('click', (e) => {
        e.preventDefault();
        this.parent = e.target.parentNode;
        this.form = document.createElement('input');
        this.form.classList.add('editform');
        this.form.type = 'text';
        this.form.value = e.target.innerText;
        e.target.innerHTML = '';
        this.parent.appendChild(this.form)
        this.form.focus();
        this.form.addEventListener('blur', (e2) => {
          e2.preventDefault();
          e.target.innerHTML = e2.target.value;
          this.index = myArray.length - 1;
          myArray[this.index].task = e2.target.value;
          this.saveStorage();
          this.form.remove()
        })
      })
    });
  }

  clearCompleted() {
    this.completedElements = document.querySelectorAll('.active');
    this.completedElements.forEach((element) => {
      element.remove();
    })
    const filterArray = myArray.filter((element) => {
      if (element.done !== true) {
        return element
      } return false;
    })
    myArray.splice(0, myArray.length);
    for (let i = 0; i < filterArray.length; i += 1) {
      myArray.push(filterArray[i]);
    }
    for (let i = 0; i < myArray.length; i += 1) {
      myArray[i].index = i + 1;
    }
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('myArray', JSON.stringify(myArray));
  }
}
