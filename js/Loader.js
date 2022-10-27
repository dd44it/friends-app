export default class Loader{
  constructor(loaderSelector){
    this.loaderSelector = loaderSelector
  }
  render(){
    return `
      <div class="loader" id="loader-4">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `
  }
  hide(){
    const loader = document.querySelector(this.loaderSelector)
    loader.remove()
  }
}