let cityInput = document.getElementById("city");
let button = document.getElementById("btn");

let icon = document.getElementById("icon");
let tempDiv = document.getElementById("temp");
let conditionDiv = document.getElementById("condition");
let cityDiv = document.getElementById("cityName");
let body = document.getElementById("body");

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", function ()
{
  let city = cityInput.value.trim();

  if (city === "") {
    conditionDiv.innerText = "Please enter a city";
    return;
  }


  let loadingText = "Loading";
  let index = 0;

  let loader = setInterval(() => {
    conditionDiv.innerText = loadingText.slice(0, index + 1);
    index++;

    if (index === loadingText.length) {
      index = 0;
    }
  }, 300);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1c06cea78646257c05d6db679d180510`)
    .then(response => response.json())
    .then(data => {

clearInterval(loader);

  let temperature = Math.round(data.main.temp);
  let condition = data.weather[0].main;
  let cityName = data.name;
  let isDay = data.weather[0].icon.includes("d");
  let animationBox = document.getElementById("weatherAnimation");

function clearAnimation()
{
  animationBox.innerHTML = "";
}

function createSun() {
  clearAnimation();
  let sun = document.createElement("div");
  sun.className = "sun";
  animationBox.appendChild(sun);
}
function createHaze() {
  clearAnimation();

  let haze = document.createElement("div");
  haze.className = "haze";
  animationBox.appendChild(haze);
}
function createHazeClouds() {
  clearAnimation();

function spawnCloud(direction) {
  let cloud = document.createElement("div");
  cloud.className = `cloud cloud-${direction}`;

  let puff = document.createElement("div");
  puff.className = "puff";
  cloud.appendChild(puff);

  cloud.style.top = Math.random() * 40 + "vh";

  let scale = Math.random() * 0.4 + 0.7;
  cloud.style.transform = `scale(${scale})`;

  cloud.style.animationDuration = Math.random() * 40 + 60 + "s";
  cloud.style.animationDelay = `-${Math.random() * 80}s`;
  cloud.style.opacity = 0.5;

  animationBox.appendChild(cloud);
  }

  // Continuous flow
  for (let i = 0; i < 6; i++) spawnCloud("left");
  for (let i = 0; i < 6; i++) spawnCloud("right");

  // Haze layers
  let hazeL = document.createElement("div");
  hazeL.className = "haze-left";

  let hazeR = document.createElement("div");
  hazeR.className = "haze-right";

  animationBox.appendChild(hazeL);
  animationBox.appendChild(hazeR);
}


function createRain() {
  clearAnimation();
  for (let i = 0; i < 100; i++) {
  let drop = document.createElement("div");
  drop.className = "rain";
  drop.style.left = Math.random() * 100 + "vw";
  drop.style.animationDelay = Math.random() + "s";
  animationBox.appendChild(drop);
  }
  }
function createSnow() {
  clearAnimation();
  for (let i = 0; i < 50; i++) {
  let flake = document.createElement("div");
  flake.className = "snow";
  flake.style.left = Math.random() * 100 + "vw";
  flake.style.animationDelay = Math.random() * 5 + "s";
  animationBox.appendChild(flake);
  }
  }

function createClouds() {
  clearAnimation();
for (let i = 0; i < 4; i++) {
  let cloud = document.createElement("div");
  cloud.className = "cloud cloud-left";

  cloud.style.top = Math.random() * 30 + "vh";
  cloud.style.animationDuration = Math.random() * 40 + 80 + "s"; // 80–120s
  cloud.style.animationDelay = `-${Math.random() * 120}s`;
  cloud.style.opacity = Math.random() * 0.3 + 0.5;

  animationBox.appendChild(cloud);
  }

for (let i = 0; i < 4; i++) {
  let cloud = document.createElement("div");
  cloud.className = "cloud cloud-right";
    
  cloud.style.top = Math.random() * 30 + "vh";
  cloud.style.animationDuration = Math.random() * 30 + 40 + "s";
  cloud.style.animationDelay = Math.random() * 5 + "s";
  cloud.style.opacity = Math.random() * 0.3 + 0.5;

animationBox.appendChild(cloud);
}
}
tempDiv.innerText = temperature + "°C";
conditionDiv.innerText = condition;
cityDiv.innerText = cityName;

if (condition === "Clear") {
  icon.innerText = isDay ? "☀️" : "🌙";
  body.style.background = isDay ? "#87CEEB" : "#0D1B2A";
  createSun();
}
else if (condition === "Clouds") {
  icon.innerText = "☁️";
  body.style.background = "#B0BEC5";
  createClouds();
}
else if (condition === "Rain") {
  icon.innerText = "🌧️";
  body.style.background = "#607D8B";
  createRain();
}
else if (condition === "Snow") {
  icon.innerText = "❄️";
  body.style.background = "#ECEFF1";
  createSnow();
}
else if (
  condition === "Haze" ||
  condition === "Mist" ||
  condition === "Fog" ||
  condition === "Smoke"
) {
  icon.innerText = "🌫️";
  body.style.background = "#CFD8DC";
  createHazeClouds();
}


else {
  clearAnimation();
}

})
.catch(() => {
  clearInterval(loader);
  conditionDiv.innerText = "City not found ❌";
    });
});
