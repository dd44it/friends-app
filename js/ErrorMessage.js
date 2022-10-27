export default class ErrorMessage{
  constructor(errorText){
    this.errorText = errorText
  }
  render(){
    return ` <div class="card"> ${this.errorText} </div> `
  }
}