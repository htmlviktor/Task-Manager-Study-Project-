import {Board} from "../components/board.js";
import {TaskList} from "../components/task-list.js";
import {Task} from "../components/card.js";
import {TaskEdit} from "../components/card-edit.js";
import {render, Position} from '../utils.js';
import {Sort} from "../components/sort";
import {LoadMoreBtn} from "../components/load-more-btn.js";

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sort = new Sort();
    this._board = new Board();
    this._taskList = new TaskList();
    this._moreBtn = new LoadMoreBtn();
    this._count = 8;
  }
  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._moreBtn.getElement(), Position.BEFOREEND);

    this._tasks.slice(0, this._count).forEach((taskMock) => this._renderTask(taskMock));
    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._moreBtn.getElement()
    .addEventListener(`click`, (evt) => this._onLoadMoreBtnClick(evt));
  }
  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
  _onLoadMoreBtnClick(evt) {
    evt.preventDefault();
    this._count = this._count += 8;
    this._taskList.getElement().innerHTML = ``;
    const sortedLoadMore = this._tasks.slice(0, this._count);
    sortedLoadMore.forEach((taskMock) => this._renderTask(taskMock));
    if (this._count >= this._tasks.length) {
      evt.target.style.display = `none`;
    }
  }
}
