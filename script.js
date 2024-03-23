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
const icons = document.querySelectorAll('.icons')
const tabsContainer = document.querySelector('.tabs-container')

// Event listener for clicking menu
startButton.addEventListener('click', (event) => {
    event.stopPropagation()

    menuContainer.classList.toggle('show-menu')
})

// Function to hide menu when user clicks outside menu
document.body.addEventListener('click', (event) => {
    if (!menuContainer.contains(event.target) && event.target !== startButton) {
        menuContainer.classList.remove('show-menu')
    }
})

// Event listener for icons to toggle 'icon-clicked' class
icons.forEach(icon => {
    icon.addEventListener('dblclick', (event) => {
        icon.classList.toggle('icon-clicked')
        event.stopPropagation() // Prevents click event from bubbling up
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

// double click calc icon
const calculatorIcon = document.querySelector('.icons--calculator')
calculatorIcon.addEventListener('dblclick', (event) => {
    event.stopPropagation()

    // toggling the app visibility
    const applicationContainer = document.querySelector('.application-container')
    applicationContainer.classList.toggle('visible')
    applicationContainer.style.width = '20rem'

    // Change the .app-name text to "Calculator"
    const appName = document.querySelector('.app-name')
    appName.textContent = 'Calculator'

    // Check if the calculator container is already created  (to stop multiple calculator elements from being made)
    if (!document.querySelector('.calculator-container')) {
        // Create a new div element for the calculator
        const calculatorDiv = document.createElement('div')
        calculatorDiv.classList.add('calculator-container')

        const display = document.createElement('input')
        Object.assign(display, {
            type: 'text',
            disabled: true,
            className: 'calculator-display'
        })

        calculatorDiv.appendChild(display)

        const buttons = [
            ['/', '7', '8', '9'],
            ['*', '4', '5', '6'],
            ['-', '1', '2', '3'],
            ['+', '.', '0', 'C'],
            ['=']
        ]
        buttons.forEach(row => {
            const buttonBox = document.createElement('div')
            buttonBox.classList.add('button-box')

            row.forEach(buttonText => {
                const button = document.createElement('button')
                button.textContent = buttonText
                button.className = 'calculator-button'
                button.addEventListener('click', () => {
                    if (buttonText === '=') {
                        try {
                            display.value = eval(display.value)
                        } catch (error) {
                            display.value = 'Error'
                        }
                    } else if (buttonText === 'C') {
                        display.value = ''
                    } else {
                        display.value += buttonText
                    }
                })
                buttonBox.appendChild(button)
            })

            calculatorDiv.appendChild(buttonBox)
        })

        // add calculator into the application container
        applicationContainer.appendChild(calculatorDiv)

        // make tab for calculator
        const newTab = document.createElement('div')
        newTab.className = 'tab-item calculator-tab'  

        const tabText = document.createElement('p')
        tabText.textContent = 'Calculator'

        newTab.appendChild(tabText)
        tabsContainer.appendChild(newTab)
    }
})

// Double click music app: Open music app 
const musicIcon = document.querySelector('.icons--music-player')

musicIcon.addEventListener('dblclick', (event) => {
    event.stopPropagation()

    const applicationContainer = document.querySelector('.application-container')
    applicationContainer.classList.toggle('visible') 
    applicationContainer.style.width = '40%'
    applicationContainer.style.height = '70%'

    // change app title
    const appName = document.querySelector('.app-name')
    appName.textContent = 'Media Player'

    // Check if music container already exists
    if (!document.querySelector('.music-container')) {
        // Create music container div
        const musicContainer = document.createElement('div')
        musicContainer.classList.add('music-container')

        // Create music player div
        const musicPlayer = document.createElement('div')
        musicPlayer.classList.add('music-player')

        // Create music nav
        const musicNav = document.createElement('nav')
        musicNav.classList.add('music-nav')

        // back button 
        const backButtonDiv = document.createElement('div')
        backButtonDiv.classList.add('square-button')
        const backButtonImg = document.createElement('img')
        backButtonImg.classList.add('back')
        backButtonImg.src = './assets/music-icons/left-angle.png'
        backButtonImg.alt = 'back-button'
        backButtonDiv.appendChild(backButtonImg)
        musicNav.appendChild(backButtonDiv)

        // menu button for music player
        const menuButtonDiv = document.createElement('div')
        menuButtonDiv.classList.add('square-button')
        const menuButtonImg = document.createElement('img')
        menuButtonImg.classList.add('back')
        menuButtonImg.src = '../assets/music-icons/menu.png'
        menuButtonImg.alt = 'menu-button'
        menuButtonDiv.appendChild(menuButtonImg)
        musicNav.appendChild(menuButtonDiv)

        // song image
        const songImg = document.createElement('img')
        songImg.classList.add('song-img')
        songImg.src = './assets/music-icons/album.jpg'
        songImg.alt = 'album'

        // song title
        const h2Element = document.createElement('h2')
        h2Element.textContent = "Can't Help Falling in Love"

        // song artist
        const paragraph = document.createElement('p')
        paragraph.textContent = 'Elvis Presley'

        // song element
        const audioElement = document.createElement('audio')
        audioElement.id = 'song'
        const sourceElement = document.createElement('source')
        sourceElement.src = './assets/music-icons/elvis.mp3'
        sourceElement.type = 'audio/mpeg'
        audioElement.appendChild(sourceElement)
        audioElement.volume = 0.01;  

        // progress bar
        const inputElement = document.createElement('input')
        inputElement.id = 'progress'
        inputElement.type = 'range'
        inputElement.value = '0'
        inputElement.max = '100'
        inputElement.addEventListener('input', () => {
            const progressValue = inputElement.value
            const duration = audioElement.duration
            const currentTime = (progressValue * duration) / 100
            audioElement.currentTime = currentTime
        })

        // music control buttons
        const musicControlsDiv = document.createElement('div')
        musicControlsDiv.classList.add('music-controls')

        // container for control buttons
        const controlsInnerDiv = document.createElement('div')

        // previous button
        const controlsBackImg = document.createElement('img')
        controlsBackImg.classList.add('music-controls-back')
        controlsBackImg.src = './assets/music-icons/previous.png'
        controlsBackImg.alt = 'previous'
        controlsInnerDiv.appendChild(controlsBackImg)

        // play button
        const controlsPlayImg = document.createElement('img')
        controlsPlayImg.classList.add('music-controls-play')
        controlsPlayImg.id = 'controlMusic'
        controlsPlayImg.src = './assets/music-icons/play.png'
        controlsPlayImg.alt = 'play'
        controlsPlayImg.addEventListener('click', playPause)
        controlsInnerDiv.appendChild(controlsPlayImg)
        

        // next button
        const controlsNextImg = document.createElement('img')
        controlsNextImg.classList.add('music-controls-next')
        controlsNextImg.src = './assets/music-icons/forward.png'
        controlsNextImg.alt = 'next'
        controlsInnerDiv.appendChild(controlsNextImg)

        musicControlsDiv.appendChild(controlsInnerDiv)

        // add all elements to musicPlayer 
        musicPlayer.appendChild(musicNav)
        musicPlayer.appendChild(songImg)
        musicPlayer.appendChild(h2Element)
        musicPlayer.appendChild(paragraph)
        musicPlayer.appendChild(audioElement)
        musicPlayer.appendChild(inputElement)
        musicPlayer.appendChild(musicControlsDiv)

        // add musicPlayer to musicContainer
        musicContainer.appendChild(musicPlayer)

        // add musicContainer to applicationContainer
        applicationContainer.appendChild(musicContainer)

        // create a music player tab on the taskbar
        const newTab = document.createElement('div')
        newTab.className = 'tab-item music-tab'  

        const tabText = document.createElement('p')
        tabText.textContent = 'Music Player'

        newTab.appendChild(tabText)
        tabsContainer.appendChild(newTab)

        // Updates the progress of the thumb
        audioElement.addEventListener('timeupdate', () => {
            const currentTime = audioElement.currentTime
            const duration = audioElement.duration
            const progress = (currentTime / duration) * 100
            inputElement.value = progress
            })

        // When the song ends, start again
        audioElement.addEventListener('ended', () => {
            audioElement.currentTime = 0
            audioElement.play()
        })}
    })
        
        // Play and pause buttons
        function playPause() {
            const controlMusic = document.getElementById('controlMusic')
            const song = document.getElementById('song')
        
            if (controlMusic.classList.contains("music-controls-pause")) {
                song.pause()
                controlMusic.classList.remove('music-controls-pause')
                controlMusic.classList.add('music-controls-play')
            } else {
                song.play()
                controlMusic.classList.add('music-controls-pause')
                controlMusic.classList.remove('music-controls-play')
            }
        }
        


// GALLERY

// Declare index variable outside the event listener
let index = 0;

// Double click gallery app: Open gallery app 
const galleryIcon = document.querySelector('.icons--gallery');

galleryIcon.addEventListener('dblclick', (event) => {
    event.stopPropagation();

    const applicationContainer = document.querySelector('.application-container');
    applicationContainer.classList.toggle('visible'); 
    applicationContainer.style.width = '65%';
    applicationContainer.style.height = '85%';

    // change app title
    const appName = document.querySelector('.app-name');
    appName.textContent = 'Gallery';

    // Check if gallery container already exists
    if (!document.querySelector('.gallery-container')) {
        // Create gallery container div
        const galleryContainer = document.createElement('div');
        galleryContainer.classList.add('gallery-container');

        // Make gallery header
        const galleryHeader = document.createElement('div');
        galleryHeader.classList.add('gallery-header');

        // Make nav buttons to move back and forth
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => switchImages(-1));

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => switchImages(1));

        galleryHeader.appendChild(prevButton);

        // Make image containers
        const images = [
            {src: './assets/gallery/pikachu.jpg', alt: 'pika', text: 'Image1.jpeg'},
            {src: './assets/gallery/eevee.jpg', alt: 'eevee', text: 'Image2.jpeg' },
            {src: './assets/gallery/snorlax.jpg', alt: 'snorlax', text: 'Image3.jpeg' },
            {src: './assets/gallery/jigglypuff.jpg', alt: 'jiggly', text: 'Image4.jpeg'},
            {src: './assets/gallery/ditto.jpg', alt: 'ditto', text: 'Image5.jpeg'}
        ];

        const zoomDiv = document.createElement('div');
        zoomDiv.classList.add('zoom');

        // Set the zoom div as the first image
        const firstImg = document.createElement('img');
        firstImg.classList.add('view-img');
        firstImg.src = images[0].src;
        firstImg.alt = images[0].alt;

        zoomDiv.appendChild(firstImg);

        galleryHeader.appendChild(zoomDiv);
        galleryHeader.appendChild(nextButton);

        // Create gallery-box div to wrap img-container elements
        const galleryBox = document.createElement('div');
        galleryBox.classList.add('gallery-box');

        images.forEach(image => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            const img = document.createElement('img');
            img.classList.add('gallery-img');
            img.src = image.src;
            img.alt = image.alt;

            img.addEventListener('click', () => {
                const zoomImg = document.querySelector('.view-img');
                zoomImg.src = image.src;
                zoomImg.alt = image.alt;
            });

            const paragraph = document.createElement('p');
            paragraph.textContent = image.text;

            imgContainer.appendChild(img);
            imgContainer.appendChild(paragraph);

            galleryBox.appendChild(imgContainer);
        });

        galleryContainer.appendChild(galleryHeader);
        galleryContainer.appendChild(galleryBox);

        // Add gallery container to applicationContainer
        applicationContainer.appendChild(galleryContainer);

        // create a gallery tab on the taskbar
        const newTab = document.createElement('div');
        newTab.className = 'tab-item gallery-tab';  

        const tabText = document.createElement('p');
        tabText.textContent = 'Gallery';

        newTab.appendChild(tabText);
        tabsContainer.appendChild(newTab);
    }
});

// function to move between images
function switchImages(direction) {
    index += direction;
    const images = document.querySelectorAll('.gallery-img');

    if (index < 0) {
        index = images.length - 1;
    } else if (index >= images.length) {
        index = 0;
    }

    const zoomImg = document.querySelector('.view-img');
    zoomImg.src = images[index].src;
    zoomImg.alt = images[index].alt;
}



// CLOSE APPS
const closeButton = document.getElementById('close')
closeButton.addEventListener('click', () => {
    // Remove gallery container
    const galleryContainer = document.querySelector('.gallery-container')
    if (galleryContainer) {
        galleryContainer.remove()
    }

    // Remove music container
    const musicContainer = document.querySelector('.music-container')
    if (musicContainer) {
        musicContainer.remove()
    }

    // Remove calculator container
    const calculatorContainer = document.querySelector('.calculator-container')
    if (calculatorContainer) {
        calculatorContainer.remove()
    }

    // Remove gallery tab
    const galleryTab = document.querySelector('.gallery-tab')
    if (galleryTab) {
        galleryTab.remove()
    }

    // Remove music tab
    const musicTab = document.querySelector('.music-tab')
    if (musicTab) {
        musicTab.remove()
    }

    // Remove calculator tab
    const calculatorTab = document.querySelector('.calculator-tab')
    if (calculatorTab) {
        calculatorTab.remove()
    }

    // Hide application container
    const applicationContainer = document.querySelector('.application-container')
    applicationContainer.classList.remove('visible')
})
