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
  remove(e, state, parentCardWrapper){
    e.stopImmediatePropagation()
    const elem = e.currentTarget
    const parentWrapperFilter = elem.parentElement
    config.state = config.state.filter(item => item.id !== state.id)
    parentWrapperFilter.remove()
    this.update(config.state, parentCardWrapper)
  }

  update(state, parentCardWrapper){
    parentCardWrapper.innerHTML = ''
    if(state.length){
      state[state.length - 1].listResult.forEach(element => {
        element.forEach(elem => {
          parentCardWrapper.insertAdjacentHTML('beforeend', elem.render())
        })
      })
    }
    else{
      config.daraList.forEach(element => {
        const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
        parentCardWrapper.insertAdjacentHTML('beforeend', user.render())
      })
    }
  }
}