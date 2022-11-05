import FriendsList from "../FriendsList.js"

export default function createUser(element){
  return new FriendsList(`${element.name.first} ${element.name.last}`, element.dob.age, element.phone, element.gender, element.picture.large)
}