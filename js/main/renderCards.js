import config from '../config.js'
import FriendsList from '../FriendsList.js'
import Loader from '../Loader.js'
import Pagination from '../Pagination.js'
import ErrorMessage from '../ErrorMessage.js'

const loader = new Loader('.loader')
const friendsList = document.querySelector('.friends-list')
const paginationWrapper = document.querySelector('.pagination')

async function getData(url){
  try{
    const response = await fetch(url)
    const result = await response.json()
    return result
  }
  catch(error){
    loader.hide()
    const errorEx = new ErrorMessage(error.message)
    friendsList.insertAdjacentHTML('beforeend', errorEx.render())
  }
}

async function drawCard(){
  friendsList.insertAdjacentHTML('afterbegin', loader.render())
  const data = await getData('https://randomuser.me/api/?page=1&results=50&seed=abc')
  if(data && data.results){ 
    config.initialListUsers = data.results
    config.countBtnPagination = Math.floor(config.initialListUsers.length / config.showCard) || 1
  }
  else return
  createPageCard()
}

function createPageCard(){
  const dataPage = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
  if(config.error) {
    paginationWrapper.innerHTML = ''
    friendsList.innerHTML = `<h2>${config.error}</h2>`
    return false
  }
  else {
    config.countBtnPagination = Math.floor(dataPage.length / config.showCard) || 1
    paginationWrapper.innerHTML = ''
    setTimeout(() => {
      dataPage.forEach( (elem, index) => {
        if(index < config.countBtnPagination){
          const pagination = new Pagination( index + 1 )
          paginationWrapper.insertAdjacentHTML('beforeend', pagination.render())
          const buttonsPagination = paginationWrapper.querySelectorAll('.btn-pagination')
          buttonsPagination.forEach(btn => btn.addEventListener('click', e => { renderLayout(e, btn.dataset.index, buttonsPagination) }))
          renderLayout(buttonsPagination[0], config.initialBtnPaginationIndex, buttonsPagination)
        }
      })
    }, 1000)
  }
}

function renderLayout(e, numPage, paginationList){
  friendsList.innerHTML = ''
  paginationList.forEach(btn => btn.classList.remove('active'))
  const paginationBtn = e.target ?? e
  paginationBtn.classList.add('active')
  const dataPage = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
  for(let i = numPage * config.showCard - config.showCard; i < dataPage.length; i++){
    if(i < numPage * config.showCard){
      const user = createUser(dataPage[i])
      friendsList.insertAdjacentHTML('beforeend', user.render())
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }
}

function createUser(element){
  return new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
}

export {drawCard, createPageCard}