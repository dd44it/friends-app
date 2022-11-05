import config from '../config.js'
import { wrapperFilterUsed } from '../main/renderFilterUsed.js'
import { createPageCard } from '../main/renderCards.js'

export default function resetData(){
  const filterWrapper = document.querySelector('.filter-friends')
  wrapperFilterUsed.innerHTML = ''
  if(config.error) delete config.error
  config.state.length = 0
  createPageCard()
  const allInput = filterWrapper.querySelectorAll('input')
  allInput.forEach(item => {
    item.value = ''
    item.checked = false
  })
}