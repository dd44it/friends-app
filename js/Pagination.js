export default class Pagination{
  constructor(index){
    this.index = index
  }
  render(){
    return `
      <div class="btn btn-pagination" data-index=${this.index}> ${this.index} </div>
    `
  }
}