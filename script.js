document.addEventListener('DOMContentLoaded', () => {
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

    // Event listener for the close button x for calculator
    const closeButton = document.getElementById('close')
    closeButton.addEventListener('click', () => {
        const calculatorContainer = document.querySelector('.calculator-container')
        const applicationContainer = document.querySelector('.application-container')

        if (calculatorContainer) {
            calculatorContainer.remove()
        }

        if (applicationContainer) {
            applicationContainer.classList.remove('visible')
        }

        // Delete the calculator tab in tabsContainer 
        const calculatorTab = document.querySelector('.calculator-tab')
        if (calculatorTab) {
            calculatorTab.remove()
        }
    })
})
