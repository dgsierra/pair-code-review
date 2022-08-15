import { MyTasks } from './ClassCall.js';

const myStorage = JSON.parse(localStorage.getItem('myArray'));
export default () => {
  if (myStorage !== null) {
    document.addEventListener('DOMContentLoaded', () => {
      myStorage.forEach((task) => {
        MyTasks.retriveStorage(task.task, task.done, task.index);
      });
      const checkElements = document.querySelectorAll('.active');
      checkElements.forEach((checkbox) => {
        checkbox.childNodes[0].childNodes[1].checked = true;
      });
    });
  }
};
