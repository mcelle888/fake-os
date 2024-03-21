// Display current time

function updateTime() {
    const time = new Date()
    let hour = time.getHours()
    let minutes = time.getMinutes()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    const stringTime = hour + ':' + minutes + ' ' + ampm
    document.getElementById("time").innerHTML = stringTime
}

updateTime()


setInterval(updateTime, 1000)



const startButton = document.querySelector('.start-button')
const menuContainer = document.querySelector('.menu-container')

startButton.addEventListener('click', function () {
    menuContainer.classList.toggle('show-menu')
})

// function to hide menu if user clicks outside the menu container
document.body.addEventListener('click', function (event) {
    if (!menuContainer.contains(event.target) && event.target !== startButton) {
        menuContainer.classList.remove('show-menu')
    }
})