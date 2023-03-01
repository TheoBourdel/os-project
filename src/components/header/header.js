// HOUR
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    // Récupérer les valeurs stockées dans le localStorage pour les cases à cocher
    var showHour = JSON.parse(localStorage.getItem("showHour"));
    var showMinute = JSON.parse(localStorage.getItem("showMinute"));
    var showSecond = JSON.parse(localStorage.getItem("showSecond"));

    // Cocher ou décocher les cases en fonction des valeurs récupérées
    document.getElementById("showHour").checked = showHour;
    document.getElementById("showMinute").checked = showMinute;
    document.getElementById("showSecond").checked = showSecond;

    // Afficher ou masquer les heures
    if (showHour) {
        document.getElementById("hour").style.display = "inline";
    } else {
        document.getElementById("hour").style.display = "none";
    
    }
    // Afficher ou masquer les minutes
    if (showMinute) {
        document.getElementById("minute").style.display = "inline";
    } else {
        document.getElementById("minute").style.display = "none";
    }

    // Afficher ou masquer les secondes
    if (showSecond) {
        document.getElementById("second").style.display = "inline";
    } else {
        document.getElementById("second").style.display = "none";
    }

    m = checkTime(m);
    // document.getElementById('time').innerHTML = h + ":" + m;
    document.getElementById("hour").textContent = h + "h";
    document.getElementById("minute").textContent = m + "m";
    document.getElementById("second").textContent = s + "s";
    let t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function updateDisplay() {
    var showDay = document.getElementById("showHour").checked;
    var showMonth = document.getElementById("showMinute").checked;
    var showYear = document.getElementById("showSecond").checked;

    // sauvegarder les choix de l'utilisateur
    localStorage.setItem("showHour", showDay);
    localStorage.setItem("showMinute", showMonth);
    localStorage.setItem("showSecond", showYear);

    // mettre à jour l'affichage
    startTime();
}

// attacher l'événement de clic aux cases à cocher
document.getElementById("showHour").addEventListener("click", updateDisplay);
document.getElementById("showMinute").addEventListener("click", updateDisplay);
document.getElementById("showSecond").addEventListener("click", updateDisplay);

// attacher l'événement de modification de la case à cocher
document.getElementById("showHour").addEventListener("change", function() {
    updateLocalStorage();
    startTime();
  });
  
  document.getElementById("showMinute").addEventListener("change", function() {
    updateLocalStorage();
    startTime();
  });
  
  document.getElementById("showSecond").addEventListener("change", function() {
    updateLocalStorage();
    startTime();
  });

// appeler la fonction startTime pour afficher l'horloge
startTime();





// VIBRATION
let vibration = true;
let vibrationStateImage = document.getElementById("vibration-image");

function changeVibrationState() {

    vibration = !vibration;

    if (vibration === true) {
        vibrationStateImage.src = "../../assets/svg/unmute.svg";
        vibrationStateImage.title = "vibration : ON"
        document.querySelector('#vibrationButton').innerHTML = 'Désactiver';
    } else {
        vibrationStateImage.src = "../../assets/svg/mute.svg";
        vibrationStateImage.title = "vibration : OFF"
        document.querySelector('#vibrationButton').innerHTML = 'Activer';
        gainNode.gain.value = 0;
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
let toggleOn = document.getElementById("toggle-on");
let toggleOff = document.getElementById("toggle-off");

// Vérifier l'état enregistré dans le localStorage
let savedState = localStorage.getItem("signalState");
if (savedState === "hidden") {
  hideElement('#signal');
  toggleOff.checked = true;
} else {
  //displayElement('#signal');
  toggleOn.checked = true;
}

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

toggleOn.addEventListener('click', function() {
    localStorage.setItem("signalState", "visible");
  });
  
  toggleOff.addEventListener('click', function() {
    localStorage.setItem("signalState", "hidden");
  });

//DATE
var date = new Date();
var date = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
// let t = setTimeout(startDate, 500);
console.log(date)
document.getElementById('date').innerHTML = date;
// function startDate() {
//     var today = new Date();
//     var day = today.getDate();
//     var month = today.getMonth() + 1;
//     var year = today.getFullYear();

//     // Récupérer les valeurs du localStorage
//     // var showDay = localStorage.getItem("show-day") === "true";
//     // var showMonth = localStorage.getItem("show-month") === "true";
//     // var showYear = localStorage.getItem("show-year") === "true";

//     // Cocher ou décocher les cases en fonction des valeurs du localStorage
//     // document.getElementById("show-day").checked = showDay;
//     // document.getElementById("show-month").checked = showMonth;
//     // document.getElementById("show-year").checked = showYear;

//     // Ajouter les événements pour mettre à jour l'affichage
//     document.getElementById("show-day").addEventListener("change", function() {
//         // localStorage.setItem("show-day", this.checked);
//         document.getElementById("day").style.display = this.checked ? "inline" : "none";
//       });
//       document.getElementById("show-month").addEventListener("change", function() {
//         // localStorage.setItem("show-month", this.checked);
//         document.getElementById("month").style.display = this.checked ? "inline" : "none";
//       });
//       document.getElementById("show-year").addEventListener("change", function() {
//         // localStorage.setItem("show-year", this.checked);
//         document.getElementById("year").style.display = this.checked ? "inline" : "none";
//       });

//     // Afficher ou masquer le jour
//     // if (showDay) {
//     //     document.getElementById("day").style.display = "inline";
//     // } else {
//     //     document.getElementById("day").style.display = "none";
//     // }
    
//     // // Afficher ou masquer le mois
//     // if (showMonth) {
//     //     document.getElementById("month").style.display = "inline";
//     // } else {
//     //     document.getElementById("month").style.display = "none";
//     // }

//     // // Afficher ou masquer l'année
//     // if (showYear) {
//     //     document.getElementById("year").style.display = "inline";
//     // } else {
//     //     document.getElementById("year").style.display = "none";
//     // }

//     document.getElementById("day").textContent = day + "/";
//     document.getElementById("month").textContent = month + "/";
//     document.getElementById("year").textContent = year;


//     let t = setTimeout(startDate, 500);
// }

// startDate();

