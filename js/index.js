'use strict';

{
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

  const renderTodo = (app) => {
    const header = createHeader();
    const logo = createLogo();
    const form = createForm();
    const main = createMain();
    const table = createTable();

    header.headerContainer.append(logo, form);
    main.mainContainer.append(table.tableWrapper);
    const list = table.list;

    app.append(header, main);

    return {
      form,
      list,
    };
  };

  const addTaskPage = (task, list) => {
    list.append(createRow(task));
  };

  const getUserName = () => {
    const userName = prompt('Введите имя');
    const localName = localStorage.getItem(userName);

    if (userName === null || userName === '') {
      getUserName();
    } else {
      if (localName === null) {
        localStorage.setItem(userName, JSON.stringify([]));
      }
    }

    return userName;
  };

  const addLocalList = (newTask, userName) => {
    const localList = localStorage.getItem(userName);
    const localArr = JSON.parse(localList);

    localArr.push(newTask);
    localStorage.setItem(userName, JSON.stringify(localArr));
  };

  const printLocalList = (list, userName) => {
    const localList = localStorage.getItem(userName);
    const localListArr = JSON.parse(localList);

    localListArr.forEach(elem => {
      list.append(createRow(elem));
    });
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

  const delLocalTask = (num, userName) => {
    const local = localStorage.getItem(userName);
    const localParse = JSON.parse(local);
    console.log(localParse);
    localParse.splice(num - 1, 1);
    console.log(localParse);

    localStorage.setItem(userName, JSON.stringify(localParse));
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

  const init = (selectorApp) => {
    const userName = getUserName();
    const app = document.querySelector(selectorApp);
    const {form, list} = renderTodo(app);

    printLocalList(list, userName);
    formControl(form, list, userName);
    listBtnControl(list, userName);
    getListCount();
  };

  window.todoInit = init;
}


