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
        vibrationStateImage.src = "../../assets/svg/unmute.svg";
        vibrationStateImage.title = "vibration : ON"
    } else {
        vibrationStateImage.src = "../../assets/svg/mute.svg";
        vibrationStateImage.title = "vibration : OFF"
    }

}

function vibrate(ms) {
    if (vibration == true) {
        navigator.vibrate(ms);
    }
}

function vibratePattern() {
    if (vibration == true) {
        navigator.vibrate([300,100,300,100,300])
    }
}


// BATTERY
let batteryImage = document.getElementById("battery");
// vérifie si l'API peut-être utilisé
if ('getBattery' in navigator) {

    navigator.getBattery().then(function(battery) {
        
        var batteryLevel = battery.level;
        var batteryPercentage = Math.round(batteryLevel * 100) + "%";
        batteryImage.title = batteryPercentage;
        
        var batteryLevels = {
            0.1: "../../assets/svg/Empty Battery.svg",
            0.3: "../../assets/svg/Low Battery.svg",
            0.6: "../../assets/svg/Medium Battery.svg",
            0.9: "../../assets/svg/Intermediate Battery.svg",
            1: "../../assets/svg/Full Battery.svg"
        };

        // détecte si le PC est en charge ou non (en arrivant sur le site, ou apres refresh)
        if (battery.charging) {
            
            batteryImage.title = 'en charge : ' + batteryPercentage;
            batteryImage.src = "../../assets/svg/Recharge Battery.svg";
        } else {
            
            var keysSorted = Object.keys(batteryLevels).sort(function(a, b) {
                return parseFloat(a) - parseFloat(b);
            });
            
            var condition = false;
            
            keysSorted.forEach(function (i) {
                if (batteryLevel <= parseFloat(i) && !condition) {
                    batteryImage.src = batteryLevels[i];
                    condition = true;
                }
            });
            
        }
        batteryImage.title = batteryPercentage;

        // détecte si le PC est en charge ou non (en direct)
        battery.addEventListener('chargingchange', function() {
            if (battery.charging) {
                batteryImage.title = 'en charge : ' + batteryPercentage;
                batteryImage.src = "../../assets/svg/Recharge Battery.svg";
            } else {
                var condition = false;
            
                var keysSorted = Object.keys(batteryLevels).sort(function(a, b) {
                    return parseFloat(a) - parseFloat(b);
                });
            keysSorted.forEach(function (i) {

                if (batteryLevel <= parseFloat(i) && !condition) {
                    batteryImage.title = batteryPercentage;
                    batteryImage.src = batteryLevels[i];
                    condition = true;
                }
            });
            }
        });
        

    });
} else {
    batteryImage.title = "Désolé, l'état de votre batterie n'est pas disponible";
    batteryImage.src = "../../assets/svg/Battery Alert.svg";
}

// NETWORK
let signalImage = document.getElementById("signal");

function getLatency() {
    const start = performance.now();

    return fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.text())
    .then(data => {
        const end = performance.now();
        const latency = parseInt(end) - parseInt(start);
        signalImage.title = `${latency} ms`;
        return latency;
    });
}

setInterval(() => {
    getLatency();
}, 5000);


// DATE
var date = new Date();
var date = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();

document.getElementById('date').innerHTML = date;
