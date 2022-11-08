import config from './js/config.js'
import { drawCard, createPageCard } from './js/main/renderCards.js'
import { drawFilter } from './js/main/renderFilter.js'
import { drawFilterUsedCard } from './js/main/renderFilterUsed.js'
import resetData from './js/main/resetData.js'
import createUser from './js/main/createUser.js'


import renderHeader from './js/header/renderHeader.js'

document.addEventListener('DOMContentLoaded', () => {
  renderHeader()
  drawCard()
  // drawFilter()
  const filterWrapper = document.querySelector('.filter-friends')
  const searchByName = filterWrapper.querySelector('.filter-search__name .btn')
  const searchByPhone = filterWrapper.querySelector('.filter-search__phone .btn')

  const resetBtn = filterWrapper.querySelector('.btn-reset')
  const genderBtn = filterWrapper.querySelector('.btn-gender')
  const selectAgeMinMaxBtn = filterWrapper.querySelector('.btn-age')
  
  searchByName.addEventListener('click', (e) => { searchData('.search_name', e.target.dataset.filter) })
  searchByPhone.addEventListener('click', (e) => { searchData('.search_phone', e.target.dataset.filter) })
  filterWrapper.addEventListener('click',  function(e) { sortData(e, e.target.dataset.typefilter, e.target.dataset.typesort) } )

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
      if(findByData === 'name' && `${element.name.first} ${element.name.last}`.indexOf(searchElem.value.trim()) !== -1){
        const user = createUser(element)
        obj.listResult.push(user)
        obj.listResultElements.push(element)
      }
      else if(findByData === 'phone' && element.phone.indexOf(searchElem.value.trim()) !== -1){
        const user = createUser(element)
        obj.listResult.push(user)
        obj.listResultElements.push(element)
      }
    })
    if(!obj.listResultElements.length) config.error = 'Data not found' 
    config.state.push(obj)

    createPageCard()
    drawFilterUsedCard(config.state)
  }

  // sort type sort

  function sortData(e, typeFilter, typeSort){
    const obj = {}
    obj.id = config.state.length + 1
    obj.type = `sortBy${typeFilter}`
    obj.typeFilter = typeFilter
    obj.searching = typeSort

    if(config.initialListUsers){
      if(typeFilter === 'age' && typeSort === 'asc'){
        const dataSort = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
        dataSort.sort( (a, b) => a.dob.age - b.dob.age)
        obj.listResultElements = dataSort
        config.state.push(obj)
        createPageCard()
        drawFilterUsedCard(config.state)
      }

      else if(typeFilter === 'age' && typeSort === 'desc'){
        const dataSort = config.state.length ? [...config.state[config.state.length - 1].listResultElements] : [...config.initialListUsers]
        dataSort.sort( (a, b) => b.dob.age - a.dob.age)
        obj.listResultElements = dataSort
        config.state.push(obj)
        createPageCard()
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
        obj.listResultElements = dataSort
        config.state.push(obj)
        createPageCard()
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
        obj.listResultElements = dataSort
        config.state.push(obj)
        createPageCard()
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
    const dataSelectByGender = [...config.initialListUsers]
    const listGender = dataSelectByGender.filter(item => item.gender !== 'all' ? item.gender === selectedRadioBtn.id : item)
    obj.listResultElements = listGender.length ? listGender : config.initialListUsers
    config.state.push(obj)
    createPageCard()
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
    obj.listResultElements = findDiapasonAge
    config.state.push(obj)
    createPageCard()
    drawFilterUsedCard(config.state)
  }

})