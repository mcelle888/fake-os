// Function to remove items (to close apps and tabs)
export function removeContainer(elementOne, elementTwo) {
    const container = document.querySelector(elementOne)
    if (container) {
        container.remove()
    }

    const tab = document.querySelector(elementTwo)
    if (tab) {
        tab.remove()
    }
}