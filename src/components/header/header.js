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
    } else {
        vibrationStateImage.src = "../../assets/svg/mute.svg";
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
            for (var i in batteryLevels) {
                if (batteryLevel <= i) {
                    batteryImage.src = batteryLevels[i];
                    break;
                }
            }
        }
        batteryImage.title = batteryPercentage;

        // détecte si le PC est en charge ou non (en direct)
        battery.addEventListener('chargingchange', function() {
            if (battery.charging) {
                batteryImage.title = 'en charge : ' + batteryPercentage;
                batteryImage.src = "../../assets/svg/Recharge Battery.svg";
            } else {
                for (var i in batteryLevels) {
                    if (batteryLevel <= i) {
                        batteryImage.src = batteryLevels[i];
                        break;
                    }
                }
            }
        });
        

    });
} else {
    batteryImage.title = "Désolé, l'état de votre batterie n'est pas disponible";
    batteryImage.src = "../../assets/svg/Battery Alert.svg";
}
