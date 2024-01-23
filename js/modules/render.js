import moduleCreateElements from './createElements.js';
const {
  createHeader,
  createLogo,
  createForm,
  createMain,
  createTable,
} = moduleCreateElements;

export const renderTodo = (app) => {
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

