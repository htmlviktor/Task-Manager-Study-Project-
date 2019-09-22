import {Board} from "../components/board.js";
import {TaskList} from "../components/task-list.js";
import {render, unrender, Position} from '../utils/utils.js';
import {Sort} from "../components/sort";
import {LoadMoreBtn} from "../components/load-more-btn.js";
import {TaskController} from "../controllers/tasks.js";

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sort = new Sort();
    this._board = new Board();
    this._taskList = new TaskList();
    this._moreBtn = new LoadMoreBtn();
    this._count = 8;
    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
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
  _renderBoard(tasks) {
    unrender(this._taskList.getElement());

    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._moreBtn.getElement(), Position.BEFOREEND);
    this._tasks.slice(0, this._count).forEach((taskMock) => this._renderTask(taskMock));
  }
  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }
  _onChangeView(){
    this._subscriptions.forEach((it) => it());
  }
  _onDataChange(newData, oldData){
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tasks)
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
  // клик по кнопе load more
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
