import {markupMainMenu} from './components/main-menu.js';
import {markupSearch} from './components/search.js';
import {markupFilter} from './components/filter.js';
import {markupMainBoardContainer} from './components/board-container.js';
import {markupBoardfilter} from './components/board-filter.js';
import {markupBoardTasks} from './components/board-tasks.js';
import {markupCrad} from './components/card.js';
import {markupCardEdit} from './components/card-edit.js';
import {markupLoadMore} from './components/load-more-btn.js';
import {getTask} from './components/data.js';
import {filterData} from './components/data.js';

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
// ф-ция для отрисовки карточек в контейнер
const addMarkupCard = (cardMarkup) => {
  const cardContainer = document.querySelector(`.board__tasks`);
  cardContainer.insertAdjacentHTML(`beforeend`, cardMarkup);
};
// ф-ция для вставки елементов ".board container"
const addMarkupInMainBoardContainer = (element) => {
  const boardContainer = document.querySelector(`.board`);
  boardContainer.insertAdjacentHTML(`beforeend`, element);
};
// вставляем елементы
addMarkupElement(mainControl, markupMainMenu());
addMarkupElement(main, markupSearch());
addMarkupElement(main, markupFilter(dataFilter));
addMarkupElement(main, markupMainBoardContainer());
addMarkupInMainBoardContainer(markupBoardfilter());
addMarkupInMainBoardContainer(markupBoardTasks());
addMarkupCard(markupCardEdit());
addMarkupInMainBoardContainer(markupLoadMore());

const addTasks = (tasks) => {
  for (let task of tasks) {
    addMarkupCard(markupCrad(task.description, task.dueDate, task.tags, task.color, task.repeatingDays, task.isFavorite, task.isActive));
  }
};

addTasks(allTasks);
