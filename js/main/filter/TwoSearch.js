export default class TwoSearch{
  constructor(typeRadioButton){
    this.typeRadioButton = typeRadioButton
  }
  render(){
    return `
      <li class="filter-friends__item  filter-search__${this.typeRadioButton}">
        <span class="filter_title">Search by ${this.typeRadioButton}</span>
        <div class="search_wrapper">
          <label for="${this.typeRadioButton}_start">${this.typeRadioButton} start</label>
          <input type="text" id="${this.typeRadioButton}_start" class="search ${this.typeRadioButton}_start">
        </div>
        <div class="search_wrapper">
          <label for="${this.typeRadioButton}_end">${this.typeRadioButton} end</label>
          <input type="text" id="${this.typeRadioButton}_end" class="search ${this.typeRadioButton}_end">
        </div>
        <button class="btn btn-${this.typeRadioButton}">Filter by ${this.typeRadioButton}</button>
      </li>
    `
  }
}