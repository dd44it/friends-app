
document.addEventListener('DOMContentLoaded', () => {

  const config = {}
  const friendsList = document.querySelector('.friends-list')
  const searchByName = document.querySelector('.filter-search__name .btn')
  const searchByPhone = document.querySelector('.filter-search__phone .btn')

  const userNodFinded = '<h2>User not finded</h2>'
  function getData(url, method = "GET"){
    const data = fetch(url, {
      method: method
    })
    const res = data.then(result => result.json())
    res.then(data => {
      if(data.results) config.daraList = data.results
      data.results.forEach(element => {
        const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.registered.age, element.phone, element.gender, element.picture.large)
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

  // search value

  function searchData(searchSelector, findByData){
    const searchElem = document.querySelector(searchSelector)
    if(config.daraList){
      config.daraList.forEach(element => {
        if(findByData === 'name' && searchElem.value.length && `${element.name.first} ${element.name.last}`.indexOf(searchElem.value) !== -1){
          friendsList.innerHTML = ''
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.registered.age, element.phone, element.gender, element.picture.large)
          friendsList.insertAdjacentHTML('beforeend', user.render())
          // console.log(element.name.first, element.name.last)
        }
        else if(findByData === 'phone' && searchElem.value.length && element.phone.indexOf(searchElem.value) !== -1){
          friendsList.innerHTML = ''
          const user = new FriendsList(`${element.name.first} ${element.name.last}`, element.registered.age, element.phone, element.gender, element.picture.large)
          friendsList.insertAdjacentHTML('beforeend', user.render())
        }
      })
    }
  }

  // sort type sort

  // select by gender

  // reset
})