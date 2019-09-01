import {markupMainMenu} from './components/main-menu.js';
import {markupSearch} from './components/search.js';
import {markupFilter} from './components/filter.js';
import {getTask} from './data.js';
import {filterData} from './data.js';
import {BoardController} from './controllers/board.js';


const mainControl = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
const createTasksArray = (count) => {
  let tasksArray = [];
  for (let i = 0; i < count; i++) {
    tasksArray.push(getTask());
  }
  return tasksArray;
};
const allTasks = createTasksArray(21);
const dataFilter = filterData(allTasks);

// ф-ция для вставки елемента на страницу
const addMarkupElement = (container, markup) => {
  container.insertAdjacentHTML(`beforeend`, markup);
};

// вставляем елементы
addMarkupElement(mainControl, markupMainMenu());
addMarkupElement(main, markupSearch());
addMarkupElement(main, markupFilter(dataFilter));

const tasksContainer = document.querySelector(`main`);
const boardController = new BoardController(tasksContainer, allTasks);
boardController.init();
