// HOUR
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
    let t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

startTime();

// VIBRATION
let vibration = true;
let vibrationStateImage = document.getElementById("vibration-image");

function changeVibrationState() {

    vibration = !vibration;

    if (vibration === true) {
        vibrationStateImage.src = "../../assets/svg/volume-up.svg";
    } else {
        vibrationStateImage.src = "../../assets/svg/volume-mute.svg";
    }

}

function vibrate(ms) {
    console.log(vibration)
    if (vibration == true) {
        navigator.vibrate(ms);
    }
}

function vibratePattern() {
    if (vibration == true) {
        navigator.vibrate([300,100,300,100,300])
    }
}