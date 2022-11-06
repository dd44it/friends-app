export default class RadioButton{
  constructor(typeRadioButton){
    this.typeRadioButton = typeRadioButton
  }
  render(){
    return `
      <li class="filter-friends__item flex_column filter-select__${this.typeRadioButton}">
        <span class="filter_title">Search by ${this.typeRadioButton}</span>
        <div class="radio_wrapper">
          <div class="radio_item">
            <label for="male">Male</label>
            <input type="radio" id="male" class="radio-btn pick_male" name="choice">
          </div>
          <div class="radio_item">
            <label for="female">Female</label>
            <input type="radio" id="female" class="radio-btn pick_female" name="choice">
          </div>
          <div class="radio_item">
            <label for="all">All</label>
            <input type="radio" id="all" class="radio-btn pick_all" name="choice">
          </div>
        </div>
        <button class="btn btn-${this.typeRadioButton}">Filter by ${this.typeRadioButton}</button>
      </li>
    `
  }
}