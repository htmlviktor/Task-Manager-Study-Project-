import {Task} from "../components/card.js";
import {TaskEdit} from "../components/card-edit.js";
import {render, unrender, Position} from '../utils/utils.js';
import {callFlatpickr} from '../utils/flatpickr.js';

export class TaskController {
  constructor(container, data, onDataChange, onChangeView){
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);

    this.create();
  }

  create(){
    callFlatpickr(this._taskEdit.getElement().querySelector(`.card__date`),{
      altInput: true,
      allowInput: true,
      defaultDate: this._data.dueDate,
    });
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, (evt) => {
      (evt).preventDefault();

      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: new Date(formData.get(`date`)),
        repeatingDays: formData.getAll(`repeat`).reduce((acc,it) => {
          acc[it] = true;
          return acc
        },{
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        })
      }
      this._onDataChange(entry, this._data);

      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }
  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}
