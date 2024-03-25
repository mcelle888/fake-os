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
    
        // Check if the calculator container is already created (to stop multiple calculator elements from being made)
        if (!document.querySelector('.calculator-container')) {
            const calculatorDiv = document.createElement('div')
            calculatorDiv.classList.add('calculator-container')
            
            // top display on calc
            const display = document.createElement('input');
            display.type = 'text';
            display.disabld = true;
            display.className = 'calculator-display';
    
            calculatorDiv.appendChild(display)
            
            // create buttons
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
                                display.value = calculate(display.value)
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

// Function for calculator
function calculate(expression) {
    const regex = /(\d+\.?\d*)([*/+-])(\d+\.?\d*)/
    const match = expression.match(regex)
    if (!match) throw new Error('Invalid expression')
    
    const num1 = parseFloat(match[1])
    const operator = match[2]
    const num2 = parseFloat(match[3])

    switch (operator) {
        case '+':
            return num1 + num2
        case '-':
            return num1 - num2
        case '*':
            return num1 * num2
        case '/':
            if (num2 === 0) throw new Error('Invalid')
            return num1 / num2
        default:
            throw new Error('Must be operator')
    }
}

export default createCalc
