
document.addEventListener('DOMContentLoaded', () => {

  const friendsList = document.querySelector('.friends-list')
  function getData(url, method = "GET"){
    const data = fetch(url, {
      method: method
    })
    const res = data.then(result => result.json())
    res.then(data => {
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
})