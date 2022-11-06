export default class Sort{
  constructor(typeSort){
    this.typeSort = typeSort
  }
  render(){
    return `
      <li class="filter-friends__item flex_column filter-sort__${this.typeSort}">
        <span class="filter_title">sort by ${this.typeSort}</span>
        <div class="wrapper-btn">
          <button class="btn btn-sort btn-asc-${this.typeSort}" data-typesort="asc" data-typefilter="${this.typeSort}"></button>
          <button class="btn btn-sort btn-desc-${this.typeSort}" data-typesort="desc" data-typefilter="${this.typeSort}"></button>
        </div>
      </li>
    `
  }
}