//Current time
let currentTime = new Date();
console.log(currentTime);

let now = document.querySelector("#now");
now.innerHTML = currentTime;

// Current Weather in Austin TX
const weatherApiKey = "50fa4024e3b1d5eac2f51ab18a47e997";