import moduleCreateElements from './createElements.js';
const {createRow} = moduleCreateElements;

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

const delLocalTask = (num, userName) => {
  const local = localStorage.getItem(userName);
  const localParse = JSON.parse(local);
  console.log(localParse);
  localParse.splice(num - 1, 1);
  console.log(localParse);

  localStorage.setItem(userName, JSON.stringify(localParse));
};

export default {
  getUserName,
  addLocalList,
  printLocalList,
  delLocalTask,
};

