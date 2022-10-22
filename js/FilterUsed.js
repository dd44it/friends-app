export default class FilterUsed {
  constructor(nameFilter, resultFilter){
    this.nameFilter = nameFilter
    this.resultFilter = resultFilter
  }
  render(){
    return `
    <div class="filter-used">
      <button class="btn-close"> X </button>
      <div class="name-filter"> ${this.nameFilter}: </div>
      <div class="result-filter"> ${this.resultFilter} </div>
    </div>
    `
  }
}