import FriendsList from '/js/FriendsList.js'

document.addEventListener('DOMContentLoaded', () => {

  const config = {}
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
    const data = await getData('https://randomuser.me/api/?page=1&results=20&seed=abc')
    if(data && data.results) config.daraList = data.results
    else return
    data.results.forEach(element => {
      const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
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
    const foundData = []
    if(config.daraList){
      config.daraList.forEach(element => {
        if(findByData === 'name' && searchElem.value.length && `${element.name.first} ${element.name.last}`.indexOf(searchElem.value) !== -1){
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
          foundData.push(user)
        }
        else if(findByData === 'phone' && searchElem.value.length && element.phone.indexOf(searchElem.value) !== -1){
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
          foundData.push(user)
        }
      })
    }
    friendsList.innerHTML = ''
    if(!foundData.length) {
      friendsList.insertAdjacentHTML('beforeend', userNodFound)
      return
    }
    foundData.forEach(user => {
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
  }

  // sort type sort

  function sortData(typeFilter, typeSort){
    if(config.daraList){
      if(typeFilter === 'age' && typeSort === 'asc'){
        const dataSort = [...config.daraList]
        dataSort.sort( (a, b) => a.dob.age - b.dob.age)
        friendsList.innerHTML = ''
        dataSort.forEach(element => {
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
      }

      else if(typeFilter === 'age' && typeSort === 'desc'){
        const dataSort = [...config.daraList]
        dataSort.sort( (a, b) => b.dob.age - a.dob.age)
        friendsList.innerHTML = ''
        dataSort.forEach(element => {
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
      }

      else if(typeFilter === 'name' && typeSort === 'asc'){
        const dataSort = [...config.daraList]
        dataSort.sort( (a, b) => { 
          let fa = a.name.first.toLowerCase(),
          fb = b.name.first.toLowerCase()
          if (fa < fb) { return -1 }
          if (fa > fb) { return 1 }
          return 0
        })
        friendsList.innerHTML = ''
        dataSort.forEach(element => {
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
      }

      else if(typeFilter === 'name' && typeSort === 'desc'){
        const dataSort = [...config.daraList]
        dataSort.sort( (a, b) => {
          let fa = a.name.first.toLowerCase(),
          fb = b.name.first.toLowerCase()
          if (fb < fa) { return -1 }
          if (fb > fa) { return 1 }
          return 0
        })
        friendsList.innerHTML = ''
        dataSort.forEach(element => {
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        })
      }
    }
  }

  // select by gender

  function genderData(parentWrapperSelector, inputSelector){
    const parentWrapper = document.querySelector(parentWrapperSelector)
    const listRadioBtn = parentWrapper.querySelectorAll(inputSelector)
    const selectedRadioBtn = [...listRadioBtn].find(item => item.checked)
    if(!selectedRadioBtn) return
    else if(selectedRadioBtn.id === 'all') return resetData() 
    const listGender = config.daraList.filter(item => item.gender === selectedRadioBtn.id)
    friendsList.innerHTML = ''
    listGender.forEach(element => {
      const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
  }

// select by age min and max

  function selectAgeMinMaxData(ageMinSelector, ageMaxSelector){
    const ageMinElem = document.querySelector(ageMinSelector)
    const ageMaxElem = document.querySelector(ageMaxSelector)
    if(!ageMinElem.value.trim() && !ageMaxElem.value.trim()) return
    if(ageMinElem.value && ageMaxElem.value && +ageMinElem.value > +ageMaxElem.value){
      [ageMinElem, ageMaxElem].forEach(elem => elem.style.border = '1px solid red')
      return
    }
    else {
      [ageMinElem, ageMaxElem].forEach(elem => elem.style.border = '1px solid #bebebe')
    }
    const findDiapasonAge = config.daraList.filter(element => +ageMinElem.value <= element.dob.age && +ageMaxElem.value >= element.dob.age)
    friendsList.innerHTML = ''
    findDiapasonAge.forEach(element => {
      const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
  }

  // reset
  function resetData(){
    friendsList.innerHTML = ''
    config.daraList.forEach(element => {
      const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
  }
})