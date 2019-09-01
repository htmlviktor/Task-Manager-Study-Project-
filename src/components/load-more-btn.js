import {AbstractComponent} from "./abstract-component";


export class LoadMoreBtn extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
