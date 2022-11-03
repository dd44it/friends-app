import setColorBody from '../setColorBody.js'

class Header{
  render(){
    return `
      <header class="header">
        <div class="container">
          <div class="title-wrapper">
            <h1 class="title">friends app</h1>
            <button class="toggle-btn" title="change mode">
              <img src="images/sun_icon.svg" alt="">
            </button>
          </div>
        </div>
      </header>
    `
  }
}

function renderHeader(){
  const body = document.querySelector('body')
  const header = new Header()
  body.insertAdjacentHTML('afterbegin', header.render())
  setColorBody()
}

export default renderHeader