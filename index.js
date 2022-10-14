
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

  const userNodFinded = '<h2>User not finded</h2>'
  function getData(url, method = "GET"){
    const data = fetch(url, {
      method: method
    })
    const res = data.then(result => result.json())
    res.then(data => {
      if(data.results) config.daraList = data.results
      data.results.forEach(element => {
        const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
        friendsList.insertAdjacentHTML('beforeend', user.render())
        
      });
    })
  }

  class FriendsList {
    constructor(nameUser, age, phone, gender, photo){
      this.nameUser = nameUser;
      this.age = age;
      this.phone = phone;
      this.gender = gender;
      this.photo = photo;
    }

    render(){
      return `
        <li class="friends-list__item">
          <div class="user_photo">
            <img src="${this.photo}" alt="${this.nameUser}">
          </div>
          <div class="user_content">
            <div class="user__name"> ${this.nameUser} </div>
            <div class="user__years">${this.age} years</div>
            <div class="user__phone">${this.phone} </div>
            <div class="user__gender">${this.gender} </div>
            
          </div>
        </li>
      `
    }

  }
  getData('https://randomuser.me/api/?page=3&results=20&seed=abc')
  searchByName.addEventListener('click', (e) => { searchData('.search_name', e.target.dataset.filter) })
  searchByPhone.addEventListener('click', (e) => { searchData('.search_phone', e.target.dataset.filter) })
  sortByAgeAsc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })
  sortByAgeDesc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })

  sortByNameAsc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })
  sortByNameDesc.addEventListener('click', (e) => { sortData(e.currentTarget.dataset.typefilter, e.currentTarget.dataset.typesort) })
  resetBtn.addEventListener('click', resetData)


  // search value

  function searchData(searchSelector, findByData){
    const searchElem = document.querySelector(searchSelector)
    const foundData = []
    if(config.daraList){
      config.daraList.forEach(element => {
        if(findByData === 'name' && searchElem.value.length && `${element.name.first} ${element.name.last}`.indexOf(searchElem.value) !== -1){
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.registered.age, element.phone, element.gender, element.picture.large)
          foundData.push(user)
        }
        else if(findByData === 'phone' && searchElem.value.length && element.phone.indexOf(searchElem.value) !== -1){
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.registered.age, element.phone, element.gender, element.picture.large)
          foundData.push(user)
        }
      })
    }
    if(!foundData.length) return
    friendsList.innerHTML = ''
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

  // reset
  function resetData(){
    friendsList.innerHTML = ''
    config.daraList.forEach(element => {
      const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
      friendsList.insertAdjacentHTML('beforeend', user.render())
    })
  }
})