export default class FilterUsed {
  constructor(nameFilter, resultFilter){
    this.nameFilter = nameFilter
    this.resultFilter = resultFilter
  }
  render(){
    return `
    <div class="filter-item">
      <div class="name-filter"> ${this.nameFilter} </div>
      <div class="result-filter"> ${this.resultFilter} </div>
    </div>
    `
  }
}