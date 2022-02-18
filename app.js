const lifterForm = document.querySelector('#lifterForm');
const lifterContainer = document.querySelector('#lifters');
const deleteList = document.querySelector('#deleteList');
const nextButton = document.querySelector('#nextLifter');
const weightNum = document.querySelector('#weightNum');
const attNum = document.querySelector('#attNum');
const famName = document.querySelector('#famName');
const givenName = document.querySelector('#givenName');
const time = document.querySelector('#time');
const resetTimer = document.querySelector('#resetTimer');
const pauseTimer = document.querySelector('#pauseTimer');
const startTimer = document.querySelector('#startTimer');
const lifterList = [];
lifterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const lifterData = {
    weight : parseInt(lifterForm.weight.value),
    attempt : parseInt(lifterForm.attempt.value),
    famName : lifterForm.famName.value,
    givenName : lifterForm.givenName.value
  }
  if (lifterList.length === 0)
      lifterList.push(lifterData);
  else {
    lifterList.push(lifterData);
    lifterList.sort((a, b) => a.weight - b.weight);
  }
  console.log(lifterList);
  newLifters();
  lifterForm.weight.value = '';
  lifterForm.attempt.value = '';
  lifterForm.famName.value = '';
  lifterForm.givenName.value = '';
});

const resetLifters = () => {
    const lifters = document.querySelectorAll('li')
    for (let lifter of lifters) 
        lifter.remove();  
}

const newLifters = () => {
  resetLifters();
  for (let index of lifterList) {
    const newLifter = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(index.famName.toUpperCase());
    newLifter.append(bTag);
    newLifter.append(`, ${index.givenName}- ${index.weight} kg, att. ${index.attempt}`);
    lifterContainer.append(newLifter);
  }
}

const deleteLifters = () => {
  resetLifters();
  lifterList.length = 0;
}
deleteList.addEventListener('click', deleteLifters);

const switchLifters = () => {
  const nextLifter = lifterList.shift();
  weightNum.textContent = nextLifter.weight;
  attNum.textContent = nextLifter.attempt;
  famName.textContent = nextLifter.famName.toUpperCase();
  givenName.textContent = nextLifter.givenName;
  newLifters();
}
nextButton.addEventListener('click', switchLifters);

var CCOUNT = 60;
    
var t, count;

function cddisplay() {
    // displays time in span
    //document.getElementById('timespan').innerHTML = count;
    minutes = parseInt(count / 60, 10);
    seconds = parseInt(count % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    time.textContent = minutes + ":" + seconds;
};

function countdown() {
    // starts countdown
    cddisplay();
    if (count == 0) {
        // time is up
    } else {
        count--;
        t = setTimeout("countdown()", 1000);
    }
};

function cdpause() {
    // pauses countdown
    clearTimeout(t);
};

function cdreset() {
    // resets countdown
    cdpause();
    count = CCOUNT;
    cddisplay();
};

startTimer.addEventListener('click', countdown);
pauseTimer.addEventListener('click', cdpause);
resetTimer.addEventListener('click', cdreset);


