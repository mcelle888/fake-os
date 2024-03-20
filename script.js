// Display current time

function getTime(time) {
    let hour = time.getHours();
    let minutes = time.getMinutes()
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    const stringTime = hour + ':' + minutes + ' ' + ampm;
    return stringTime

}


document.getElementById("time").innerHTML = getTime(new Date)