import {markupMainMenu} from './components/main-menu.js';
import {markupSearch} from './components/search.js';
import {markupFilter} from './components/filter.js';
import {markupMainBoardContainer} from './components/board-container.js';
import {markupBoardfilter} from './components/board-filter.js';
import {markupBoardTasks} from './components/board-tasks.js';
import {markupLoadMore} from './components/load-more-btn.js';
import {getTask} from './data.js';
import {filterData} from './data.js';
import {render, Position} from './utils.js';
import {Task} from './components/card.js';
import {TaskEdit} from './components/card-edit.js';

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
addMarkupInMainBoardContainer(markupLoadMore());

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  const cardContainer = document.querySelector(`.board__tasks`);
  render(cardContainer, task.getElement(), Position.BEFOREEND);
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      cardContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      cardContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      cardContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
};
allTasks.slice(0, 8).forEach((it) => renderTask(it));


const loadMorebBTN = document.querySelector(`.load-more`);
let start = 8;
let end = 16;
loadMorebBTN.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  allTasks.slice(start, end).forEach((it) => renderTask(it));
  start += 8;
  end += 8;
  if (end >= allTasks.length) {
    end = allTasks.length;
    start = 8;
  }
});
