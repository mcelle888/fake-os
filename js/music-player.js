// Double click music app:
export function createMusicPlayer() {
    const musicIcon = document.querySelector('.icons--music-player')
    const tabsContainer = document.querySelector('.tabs-container')

    musicIcon.addEventListener('dblclick', (event) => {
        event.stopPropagation()
    
        const applicationContainer = document.querySelector('.application-container')
        applicationContainer.classList.toggle('visible') 
        applicationContainer.style.width = '40%'
        applicationContainer.style.height = '80%'
    
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
            audioElement.volume = 0.02  
    
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
                const playButtonImg = './assets/music-icons/play.png'
                const pauseButtonImg = './assets/music-icons/pause.png'
            
                if (controlMusic.classList.contains('music-controls-pause')) {
                    song.pause()
                    controlMusic.classList.remove('music-controls-pause')
                    controlMusic.classList.add('music-controls-play')
                    controlMusic.src = playButtonImg 
                } else {
                    song.play()
                    controlMusic.classList.add('music-controls-pause')
                    controlMusic.classList.remove('music-controls-play')
                    controlMusic.src = pauseButtonImg 
                }
            }
            
    
}
