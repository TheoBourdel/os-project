const showBtn = document.querySelector('#toggle-on');
const hideBtn = document.querySelector('#toggle-off');

showBtn.addEventListener('click', () => {
    myDiv.style.display = 'block';
});

hideBtn.addEventListener('click', () => {
    myDiv.style.display = 'none';
});

function displayElement(element) {
    const div = document.querySelector(element);
    div.style.opacity = '1';
}

function hideElement(element) {
    const div = document.querySelector(element);
    div.style.opacity = '0';
}

function toggleDarkMode() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
























function displayTime(format) {
    const timeElement = document.getElementById('time');
    const now = new Date();
    let time;
  
    switch (format) {
      case 'hour':
        time = now.getHours();
        break;
      case 'minute':
        time = now.getMinutes();
        break;
      case 'second':
        time = now.getSeconds();
        break;
      default:
        time = now.getHours();
    }
  
    timeElement.textContent = time;
  }
  