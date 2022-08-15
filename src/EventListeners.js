import { task } from './DOMElements.js';
import { MyTasks } from './ClassCall.js';

export default () => {
  task.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      MyTasks.addTask(task);
    }
  });
};