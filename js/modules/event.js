import moduleCreateElements from './createElements.js';
const {
  getListCount,
  createRow,
} = moduleCreateElements;

import moduleStorage from './storage.js';
const {
  addLocalList,
  delLocalTask,
} = moduleStorage;

const addTaskPage = (task, list) => {
  list.append(createRow(task));
};

const formControl = (form, list, userName) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    console.log(newTask);

    addLocalList(newTask, userName);
    addTaskPage(newTask, list);
    getListCount();

    form.reset();
  });
};

const listBtnControl = (list, userName) => {
  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.btn-danger')) {
      const rowNum = target.closest('.table-light').childNodes[0].textContent;
      console.log(rowNum);
      delLocalTask(rowNum, userName);

      target.closest('.table-light').remove();
      getListCount();
    }

    if (target.closest('.btn-success')) {
      const row = target.closest('.table-light');

      row.children[1].classList.toggle('line-through');

      if (row.children[1].classList.contains('line-through')) {
        row.children[2].textContent = 'Выполнено';
      } else {
        row.children[2].textContent = 'В процессе';
      }
    }
  });
};

export default {
  addTaskPage,
  formControl,
  listBtnControl,
};

