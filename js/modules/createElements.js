const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContainer = createContainer();
  header.append(headerContainer);

  header.headerContainer = headerContainer;

  return header;
};

const createLogo = () => {
  const logo = document.createElement('h1');
  logo.textContent = 'Todo App';

  return logo;
};

const createButtonGroup = (params) => {
  const btns = params.map(({className, text, type}) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = type;
    button.textContent = text;

    return button;
  });

  return btns;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  form.insertAdjacentHTML('afterbegin', `
    <label class="form-group me-3 mb-0" for="task">
      <input type="text" id="task" class="form-control" required
        name="task" placeholder="ввести задачу">
    </label>
  `);

  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(...buttonGroup);

  return form;
};

const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <th>№</th>
    <th>Задача</th>
    <th>Статус</th>
    <th>Действия</th>    
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  tableWrapper.append(table);

  return {
    tableWrapper,
    list: table.tbody,
  };
};

const getcount = () => {
  let num = 1;

  return function() {
    return num++;
  };
};

const getListCount = () => {
  const listCountArr = document.querySelectorAll('.num-item');
  const count = getcount();

  for (const elem of listCountArr) {
    elem.textContent = count();
  }
};

const createRow = ({task}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light');

  const tdNum = document.createElement('td');
  tdNum.classList.add('num-item');

  const tdTask = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = task;

  const tdProgress = document.createElement('td');
  tdProgress.textContent = 'В процессе';

  const tdBtns = document.createElement('td');
  const buttonGroup = createButtonGroup([
    {
      className: 'btn btn-danger me-3',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },
  ]);
  tdBtns.append(...buttonGroup);

  tr.append(tdNum, tdTask, tdProgress, tdBtns);

  return tr;
};

export default {
  createContainer,
  createHeader,
  createLogo,
  createButtonGroup,
  createForm,
  createMain,
  createTable,
  getcount,
  getListCount,
  createRow,
};
