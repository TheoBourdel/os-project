var clickType;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    clickType = 'touchstart';
    console.log('touch')
} else {
    clickType = 'click';
    console.log('click')
}

const syntheseDate =  document.getElementById('clock_syntese_date');
syntheseDate.innerHTML = new Date().toLocaleDateString('fr-FR', { weekday: 'long',  month: 'long', day: 'numeric' });

const hours = document.getElementById('clock_hours');
hours.innerHTML = new Date().getHours();

const munites = document.getElementById('clock_munites');
munites.innerHTML = new Date().getMinutes();

const colock_hour_button = document.getElementById('clock_hour_btn');
const colock_chrono_button = document.getElementById('clock_chrono_btn');
const colock_minutes_button = document.getElementById('clock_minute_btn');

const clock_container_hour = document.getElementById('clock_container_hour');
const clock_container_chrono = document.getElementById('clock_container_chrono');
const clock_container_minutes = document.getElementById('clock_container_minutes');

clock_container_chrono.style.display = 'none';
clock_container_minutes.style.display = 'none';

colock_hour_button.addEventListener(clickType, function() {
    clock_container_hour.style.display = 'flex';
    clock_container_chrono.style.display = 'none';
    clock_container_minutes.style.display = 'none';
});

colock_chrono_button.addEventListener(clickType, function() {
    clock_container_hour.style.display = 'none';
    clock_container_chrono.style.display = 'flex';
    clock_container_minutes.style.display = 'none';
});

colock_minutes_button.addEventListener(clickType, function() {
    clock_container_hour.style.display = 'none';
    clock_container_chrono.style.display = 'none';
    clock_container_minutes.style.display = 'flex';
});






var h1 = document.getElementById('clock_chrono_time');
var start = document.querySelector('.clock_chrono_play');
var stops = document.querySelector('.clock_chrono_pause');
var reset = document.querySelector('.clock_chrono_stop');
var sec = 0;
var min = 0;
var hrs = 0;
var centi = 0;
var t;

document.getElementById('clock_chrono_time').style.display = 'none';
document.querySelector('.clock_chrono_play').addEventListener(clickType, function() {
    chrono()
    start.style.display = 'none';
    document.getElementById('clock_chrono_time').style.display = 'block';
})

document.querySelector('.clock_chrono_pause').addEventListener(clickType, function() {
    arret()
})

document.querySelector('.clock_chrono_stop').addEventListener(clickType, function() {
    start.style.display = 'flex';
    document.getElementById('clock_chrono_time').style.display = 'none';
    raz()
})

var centi = 0;
var mili = 0;
var sec = 0;
var sec_;
var afficher;
var compteur;

document.getElementById('clock_chrono_time').innerHTML = "0" + sec + ":" + "0" + mili;

function chrono() {
    setInterval(function (){
        mili++;
            if (mili > 9) {
                mili = 0;
            }
    }, 1);
    
    centi++;
    centi*10;

    if (centi > 9) {
        centi = 0;
        sec++;
    }  

    if (sec < 10) {
        sec_ = "0" + sec;
    }
    else {
        sec_ = sec;
    }
        
    afficher = sec_ + ":" + centi + mili;
    document.getElementById("clock_chrono_time").innerHTML = afficher;
    
    reglage = window.setTimeout("chrono();",100);
} 


function arret() 
{	
    window.clearTimeout(reglage);
    document.parametre.lance.disabled = "";
    document.parametre.pause.disabled = "disabled";
    document.parametre.zero.disabled = "";
    document.parametre.intermediaire.disabled = "";
    document.parametre.rappel.disabled = "";
}
    
function raz()
{ 
    centi = 0;
    mili = 0;
    sec = 0;
    afficher = sec + "0:" + centi + mili;	
    document.getElementById("clock_chrono_time").innerHTML = afficher;
}

/////////MUNITEUR
document.querySelector(".clock_timer").style.display = 'none';
document.querySelector(".clock_timer_message").style.display = 'none';


var seconds;

document.getElementById("clock_timer_button").addEventListener(clickType, function() {

    const promptValue = prompt("Enter the time in minutes");
    seconds = promptValue * 60 * 1000;
    
    document.querySelector(".clock_timer").style.display = 'flex';
    document.getElementById("clock_timer_button").style.display = 'none';

const time = new Date(seconds);


let countDownSeconds = seconds / 1000;

var inst = setInterval(change, 1000);

function change() {

    countDownSeconds--;

    if(countDownSeconds < 0) {

        const audio = new Audio('./assets/sounds/alarm.mp3');
        audio.play();
        clearInterval(inst);
        document.querySelector(".clock_timer").style.display = 'none';
        document.querySelector(".clock_timer_message").style.display = 'block';

        setTimeout(function() {
            document.getElementById("clock_timer_button").style.display = 'flex';
        document.querySelector(".clock_timer_message").style.display = 'none';

        },6000);

        return;
    }

    const date = new Date(countDownSeconds * 1000);
    document.getElementById("clock_timer").innerHTML = `${date.getMinutes()}:${date.getSeconds()}`;
}

});

