import Search from './filter/Search.js'
import Sort from './filter/Sort.js'
import TwoSearch from './filter/TwoSearch.js'

function drawFilter(){
  const filterWrapper = document.querySelector('.filter-friends')
  const sortAge = new Sort('age')
  filterWrapper.insertAdjacentHTML('beforeend', sortAge.render())
  const sortName = new Sort('name')
  filterWrapper.insertAdjacentHTML('beforeend', sortName.render())
  const searchName = new Search('name')
  filterWrapper.insertAdjacentHTML('beforeend', searchName.render())
  const searchPhone = new Search('phone')
  filterWrapper.insertAdjacentHTML('beforeend', searchPhone.render())
  const selectAgeRadioButton = new TwoSearch('age')
  filterWrapper.insertAdjacentHTML('beforeend', selectAgeRadioButton.render())

}

export { drawFilter }