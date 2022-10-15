export default class FriendsList {
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