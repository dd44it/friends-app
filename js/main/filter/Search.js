export default class Search{
  constructor(typeSearch){
    this.typeSearch = typeSearch
  }
  render(){
    return `
      <li class="filter-friends__item flex_column filter-search__${this.typeSearch}">
        <div class="search_wrapper">
          <label class="label_search" for="search_${this.typeSearch}">Search by ${this.typeSearch}</label>
          <input type="text" id="search_${this.typeSearch}" class="search search_${this.typeSearch}">
        </div>
        <button class="btn btn-${this.typeSearch}" data-filter="${this.typeSearch}">Filter by ${this.typeSearch}</button>
       </li>
    `
  }
}