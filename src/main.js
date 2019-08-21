import {markupMainMenu} from './components/main-menu.js';
import {markupSearch} from './components/search.js';
import {markupFilter} from './components/filter.js';
import {markupMainBoardContainer} from './components/board-container.js';
import {markupBoardfilter} from './components/board-filter.js';
import {markupBoardTasks} from './components/board-tasks.js';
import {markupCard} from './components/card.js';
import {markupCardEdit} from './components/card-edit.js';
import {markupLoadMore} from './components/load-more-btn.js';
import {getTask} from './data.js';
import {filterData} from './data.js';

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

const addTasks = (task) => {
  for (let i = 0; i < 7; i++) {
    addMarkupCard(markupCard(task[i]));
  }
};
addTasks(allTasks);

const loadMorebBTN = document.querySelector(`.load-more`);

loadMorebBTN.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const tasks = allTasks;
  const cardsInDom = document.querySelectorAll(`.card`);
  let countCard = cardsInDom.length;
  countCard += 8;
  if (countCard >= tasks.length) {
    countCard = tasks.length;
    loadMorebBTN.style.display = `none`;
  }
  for (let card of cardsInDom) {
    card.remove();
  }
  tasks.slice(0, countCard).forEach((it) => {
    addMarkupCard(markupCard(it));
  });
});
