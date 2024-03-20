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