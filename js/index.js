
import moduleCreateElements from './modules/createElements.js';
const {
  getListCount,
} = moduleCreateElements;

import {renderTodo} from './modules/render.js';

import moduleStorage from './modules/storage.js';
const {
  getUserName,
  printLocalList,
} = moduleStorage;

import moduleEvent from './modules/event.js';
const {
  formControl,
  listBtnControl,
} = moduleEvent;

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

