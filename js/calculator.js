// double click calc icon: 
export function createCalc() {
    const calculatorIcon = document.querySelector('.icons--calculator')
    const tabsContainer = document.querySelector('.tabs-container')
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
}

