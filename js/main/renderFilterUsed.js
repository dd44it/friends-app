import FilterUsed from '../FilterUsed.js'
import { createPageCard } from '../main/renderCards.js'

const wrapperFilterUsed = document.querySelector('.filter-used-wrapper')

function drawFilterUsedCard(state){
  if(!state.length) return
  wrapperFilterUsed.innerHTML = ''
  for(let elemState of state){
    const filterUsed = new FilterUsed(elemState.type, elemState.searching)
    wrapperFilterUsed.insertAdjacentHTML('beforeend', filterUsed.render(elemState.id))
    const btnsClose = wrapperFilterUsed.querySelectorAll('.btn-close')
    btnsClose.forEach(close => close.addEventListener('click', (e) => { 
      filterUsed.remove(e, elemState)
      createPageCard()
     }))
  }
}

export { drawFilterUsedCard, wrapperFilterUsed}