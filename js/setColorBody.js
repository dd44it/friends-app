function setColorBody(){
  const body = document.querySelector('body')
  const toggleBtn = document.querySelector('.toggle-btn')
  const toggleIcon = toggleBtn.querySelector('img')
  const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)')

  const setColorScheme = e => e.matches ? setDarkMode() : setLigthMode()

  function toggleMode(){
    body.classList.contains('dark') ? setLigthMode() : setDarkMode()
  }

  function setDarkMode(){
    toggleIcon.setAttribute('src', 'images/moon_icon.svg')
    body.classList.remove('light')
    body.classList.add('dark')
  }

  function setLigthMode(){
    toggleIcon.setAttribute('src', 'images/sun_icon.svg')
    body.classList.remove('dark')
    body.classList.add('light')
  }
    
  setColorScheme(colorSchemeQueryList)
  colorSchemeQueryList.addEventListener('change', setColorScheme)
  toggleBtn.addEventListener('click', toggleMode)

}

export default setColorBody