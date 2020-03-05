//console.log('Client side JS file loaded');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');
const messageThree = document.querySelector('#msg3');
var rand = Math.floor(Math.random() * 38);
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetch('/weather?address=' + location +'').then((res) => {
    res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.innerHTML = `<i class="fas fa-temperature-high"></i>` + data.temperature +'';
                // messageOne.textContent= 'Daily Forecast: ' + data.dailySummary;
                // messageOne.innerHTML += `<i class="fas fa-temperature-high"></i>`;
                messageTwo.innerHTML = `<i class="fas fa-tint"></i>` + data.rainChance +`<i class="fas fa-percent"></i>` ;
                messageThree.innerHTML = `<i class="fas fa-cloud-meatball"></i>` + data.dailySummary + ' BEWARE: '+ rand + '% chance of meatballs!';
            }
        })
    })
})