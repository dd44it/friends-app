import config from "./config.js"
import FriendsList from "./FriendsList.js"

export default class FilterUsed {
  constructor(nameFilter, resultFilter){
    this.nameFilter = nameFilter
    this.resultFilter = resultFilter
  }
  render(id){
    return `
    <div class="filter-used" data-id="${id}">
      <button class="btn-close"> X </button>
      <div class="name-filter"> ${this.nameFilter}: </div>
      <div class="result-filter"> ${this.resultFilter} </div>
    </div>
    `
  }
  remove(e, state){
    e.stopImmediatePropagation()
    const elem = e.currentTarget
    const parentWrapperFilter = elem.parentElement
    config.state = config.state.filter(item => item.id !== state.id)
    parentWrapperFilter.remove()
    if(config.error) delete config.error
  }
}