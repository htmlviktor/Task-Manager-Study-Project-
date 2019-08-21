// ф-ция возвращает список фильтров в гл. контейнере плриложения ".board__filter-list"
export const markupBoardfilter = () => {
  return `<div class="board__filter-list">
  <a href="#" class="board__filter">SORT BY DEFAULT</a>
  <a href="#" class="board__filter">SORT BY DATE up</a>
  <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`;
};
