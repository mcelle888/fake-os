import { createCalc } from "./calculator.js"
import { createGallery } from "./gallery.js"
import { createMusicPlayer } from "./music-player.js"
import { removeContainer } from "./doms-utils.js"

// Displays current time
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

// CREATES calc, music and gallery app functions
createCalc()
createMusicPlayer()
createGallery()


// CLOSE Apps
const closeButton = document.getElementById('close')
closeButton.addEventListener('click', () => {
    removeContainer('.gallery-container', '.gallery-tab')
    removeContainer('.music-container', '.music-tab')
    removeContainer('.calculator-container', '.calculator-tab')
    const applicationContainer = document.querySelector('.application-container')
    applicationContainer.classList.remove('visible')
})


// Left bottom MENU
const startButton = document.querySelector('.start-button')
const menuContainer = document.querySelector('.menu-container')
const icons = document.querySelectorAll('.icons')


// Double clicking menu:
startButton.addEventListener('click', (event) => {
    event.stopPropagation()

    menuContainer.classList.toggle('show-menu')
})

// HIDE menu when user clicks outside menu
document.body.addEventListener('click', (event) => {
    if (!menuContainer.contains(event.target) && event.target !== startButton) {
        menuContainer.classList.remove('show-menu')
    }
})

// Event listener for icons to toggle 'icon-clicked' class
icons.forEach(icon => {
    icon.addEventListener('dblclick', (event) => {
        icon.classList.toggle('icon-clicked')
        event.stopPropagation()  
    })
})

// Function to remove 'icon-clicked' class from all icons
const removeIconClickedClass = () => {
    icons.forEach(icon => {
        icon.classList.remove('icon-clicked')
    })
}

// event listener for clicking outside 
document.addEventListener('click', () => {
    removeIconClickedClass()
})