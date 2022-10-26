import FriendsList from '/js/FriendsList.js'
import FilterUsed from '/js/FilterUsed.js'
import config from '/js/config.js'
import Pagination from './js/Pagination.js'

document.addEventListener('DOMContentLoaded', () => {

  const friendsList = document.querySelector('.friends-list')
  const searchByName = document.querySelector('.filter-search__name .btn')
  const searchByPhone = document.querySelector('.filter-search__phone .btn')
  const sortByAgeAsc = document.querySelector('.btn-asc-age')
  const sortByAgeDesc = document.querySelector('.btn-desc-age')

  const sortByNameAsc = document.querySelector('.btn-asc-name')
  const sortByNameDesc = document.querySelector('.btn-desc-name')
  const resetBtn = document.querySelector('.btn-reset')
  const genderBtn = document.querySelector('.btn-gender')
  const selectAgeMinMaxBtn = document.querySelector('.btn-age')
  const wrapperFilterUsed = document.querySelector('.filter-used-wrapper')
  const paginationWrapper = document.querySelector('.pagination')

  const userNodFound = '<h2>User not found</h2>'

  async function getData(url){
    try{
      const response = await fetch(url)
      const result = await response.json()
      return result
    }
    catch(error){
      console.log(error)
    }
  }

  async function drawCard(){
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
    dataPage.forEach( (elem, index) => {
      if(index < config.countBtnPagination){
        const pagination = new Pagination( index + 1 )
        paginationWrapper.insertAdjacentHTML('beforeend', pagination.render())
        const buttonsPagination = paginationWrapper.querySelectorAll('.btn-pagination')
        buttonsPagination.forEach(btn => btn.addEventListener('click', e => { renderLayout(e, btn.dataset.index, buttonsPagination) }))
        renderLayout(buttonsPagination[0], config.initialBtnPaginationIndex, buttonsPagination)
      }
    })
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

  drawCard()
  searchByName.addEventListener('click', (e) => { searchData('.search_name', e.target.dataset.filter) })
  searchByPhone.addEventListener('click', (e) => { searchData('.search_phone', e.target.dataset.filter) })
  sortByAgeAsc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })
  sortByAgeDesc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })

  sortByNameAsc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })
  sortByNameDesc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })
  resetBtn.addEventListener('click', resetData)
  genderBtn.addEventListener('click', (e) => { genderData('.radio_wrapper', 'input[type="radio"]') })
  selectAgeMinMaxBtn.addEventListener('click', (e) => { selectAgeMinMaxData('.age_start', '.age_end') })


  // search value

  function searchData(searchSelector, findByData){
    const searchElem = document.querySelector(searchSelector)
    const obj = {}
    obj.id = config.state.length + 1
    obj.type = 'searching'
    obj.searching = searchElem.value
    obj.findByData = findByData
    obj.listResult = []
    obj.listResultElements = []
    if(!searchElem.value.trim() || !config.initialListUsers.length) return
    const dataSearch = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
    dataSearch.forEach(element => {
      if(findByData === 'name' && `${element.name.first} ${element.name.last}`.indexOf(searchElem.value) !== -1){
        const user = createUser(element)
        obj.listResult.push(user)
        obj.listResultElements.push(element)
      }
      else if(findByData === 'phone' && element.phone.indexOf(searchElem.value) !== -1){
        const user = createUser(element)
        obj.listResult.push(user)
        obj.listResultElements.push(element)
      }
    })
    config.state.push(obj)

    friendsList.innerHTML = ''
    if(!obj.listResult.length) {
      friendsList.insertAdjacentHTML('beforeend', userNodFound)
      const filterUsed = new FilterUsed('searching', searchElem.value)
      wrapperFilterUsed.insertAdjacentHTML('beforeend', filterUsed.render())
      return
    }
    obj.listResult.forEach(user => {
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
    drawFilterUsedCard(config.state)
  }

  // sort type sort

  function sortData(typeFilter, typeSort){
    const obj = {}
    obj.id = config.state.length + 1
    obj.type = 'sort'
    obj.typeFilter = typeFilter
    obj.searching = typeSort

    if(config.initialListUsers){
      if(typeFilter === 'age' && typeSort === 'asc'){
        const dataSort = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
        console.log(dataSort)
        dataSort.sort( (a, b) => a.dob.age - b.dob.age)
        friendsList.innerHTML = ''
        obj.listResultElements = dataSort
        config.state.push(obj)
        dataSort.forEach(element => {
          const user = createUser(element)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
        drawFilterUsedCard(config.state)
      }

      else if(typeFilter === 'age' && typeSort === 'desc'){
        const dataSort = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
        dataSort.sort( (a, b) => b.dob.age - a.dob.age)
        friendsList.innerHTML = ''
        obj.listResultElements = dataSort
        config.state.push(obj)
        dataSort.forEach(element => {
          const user = createUser(element)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
        drawFilterUsedCard(config.state)
      }

      else if(typeFilter === 'name' && typeSort === 'asc'){
        const dataSort = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
        dataSort.sort( (a, b) => { 
          let fa = a.name.first.toLowerCase(),
          fb = b.name.first.toLowerCase()
          if (fa < fb) { return -1 }
          if (fa > fb) { return 1 }
          return 0
        })
        friendsList.innerHTML = ''
        obj.listResultElements = dataSort
        config.state.push(obj)
        dataSort.forEach(element => {
          const user = createUser(element)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
        drawFilterUsedCard(config.state)
      }

      else if(typeFilter === 'name' && typeSort === 'desc'){
        const dataSort = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
        dataSort.sort( (a, b) => {
          let fa = a.name.first.toLowerCase(),
          fb = b.name.first.toLowerCase()
          if (fb < fa) { return -1 }
          if (fb > fa) { return 1 }
          return 0
        })
        friendsList.innerHTML = ''
        obj.listResultElements = dataSort
        config.state.push(obj)
        dataSort.forEach(element => {
          const user = createUser(element)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
        drawFilterUsedCard(config.state)
      }
    }
  }

  // select by gender

  function genderData(parentWrapperSelector, inputSelector){
    const obj = {}
    obj.id = config.state.length + 1
    obj.type = 'selectByGender'
    const parentWrapper = document.querySelector(parentWrapperSelector)
    const listRadioBtn = parentWrapper.querySelectorAll(inputSelector)
    const selectedRadioBtn = [...listRadioBtn].find(item => item.checked)
    if(!selectedRadioBtn) return
    obj.searching = selectedRadioBtn.id
    const dataSelectByGender = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
    const listGender = dataSelectByGender.filter(item => item.gender !== 'all' ? item.gender === selectedRadioBtn.id : item)
    friendsList.innerHTML = ''
    obj.listResultElements = listGender.length ? listGender : config.initialListUsers
    config.state.push(obj)
    obj.listResultElements.forEach(element => {
      const user = createUser(element)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
    drawFilterUsedCard(config.state)
  }

// select by age min and max

  function selectAgeMinMaxData(ageMinSelector, ageMaxSelector){
    const obj = {}
    obj.id = config.state.length + 1
    obj.type = 'selectByAge'
    const ageMinElem = document.querySelector(ageMinSelector)
    const ageMaxElem = document.querySelector(ageMaxSelector)
    if(!ageMinElem.value.trim() && !ageMaxElem.value.trim()) return
    obj.searching = `from ${ageMinElem.value} to ${ageMaxElem.value}`
    if(ageMinElem.value && ageMaxElem.value && +ageMinElem.value > +ageMaxElem.value){
      [ageMinElem, ageMaxElem].forEach(elem => elem.style.border = '1px solid red')
      return
    }
    else {
      [ageMinElem, ageMaxElem].forEach(elem => elem.style.border = '1px solid #bebebe')
    }
    const dataSelectByAge = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
    const findDiapasonAge = dataSelectByAge.filter(element => +ageMinElem.value <= element.dob.age && +ageMaxElem.value >= element.dob.age)
    friendsList.innerHTML = ''
    obj.listResultElements = findDiapasonAge
    config.state.push(obj)
    obj.listResultElements.forEach(element => {
      const user = createUser(element)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
    drawFilterUsedCard(config.state)
  }

  // reset
  function resetData(){
    friendsList.innerHTML = ''
    config.initialListUsers.forEach(element => {
      const user = createUser(element)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
  }

  function createUser(element){
    return new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
  }

  function drawFilterUsedCard(state){
    console.log(state)
    if(!state.length) return
    wrapperFilterUsed.innerHTML = ''
    for(let elemState of state){
      const filterUsed = new FilterUsed(elemState.type, elemState.searching)
      wrapperFilterUsed.insertAdjacentHTML('beforeend', filterUsed.render(elemState.id))
      const btnsClose = wrapperFilterUsed.querySelectorAll('.btn-close')
      btnsClose.forEach(close => close.addEventListener('click', (e) => { filterUsed.remove(e, elemState, friendsList) }))
    }
  }

})