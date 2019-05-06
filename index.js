import TweenMax from "gsap/TweenMax";

window.addEventListener("DOMContentLoaded", init);
let seasonArray = [];

function init() {
  const seasons = document.querySelectorAll(".season");
  seasons.forEach(obj => {
    seasonArray.push(obj);
    addEventListener("click", resizeSeasonDiv);
  });
}

function resizeSeasonDiv() {
  const activeDiv = this.event.target;

  let index = seasonArray.indexOf(activeDiv);
  let expandedDiv;

  seasonArray.forEach(season => {
    if (season.id === activeDiv.id) {
      if (season.dataset.seasonDiv === activeDiv.dataset.seasonDiv) {
        expandedDiv = season;
        seasonArray.splice(index, 1);
      } else {
      }
    }
  });

  TweenMax.to(expandedDiv, 0.3, {
    width: "100vw",
    zIndex: 3,
    opacity: 1
  });

  seasonArray.forEach(minimize);
  expandedDiv.style.cursor = "default";
  let returnBox = document.querySelector(`#${expandedDiv.id} .returnButton`);

  showInformation(returnBox, expandedDiv);
}
function showInformation(returnBox, expandedDiv) {
  returnBox.style.opacity = 1;
  returnBox.style.pointerEvents = "all";
  returnBox.style.cursor = "pointer";
  document
    .querySelector(`#${expandedDiv.id} .returnButton`)
    .addEventListener("click", () => {
      closeActiveDiv(expandedDiv, returnBox);
    });
  showTimeline(expandedDiv);
}
function minimize(obj) {
  obj.style.width = "0vw";
  obj.style.pointerEvents = "none";
}
function showTimeline(div) {
  let points = document.querySelectorAll(`#${div.id} .svgGroup`);
  let animateCounter = 1;
  points.forEach(bullet => {
    animateCounter++;
    animateBullets(bullet, animateCounter);
  });
}
function animateBullets(bullet, animateCounter) {
  console.log(bullet);
  TweenMax.to(bullet, 0.3, {
    y: 15,
    opacity: 1,
    delay: animateCounter * 0.3,
    onComplete: () => {
      showData;
    }
  });
  bullet.addEventListener("click", () => {
    showData(bullet);
  });
}
function closeActiveDiv(expandedDiv, returnBox) {
  TweenMax.to(expandedDiv, 0.3, {
    width: "20vw"
  });
  expandedDiv.style = null;
  seasonArray.forEach(defaultSize);
  returnBox.style.opacity = 0;
  returnBox.style.pointerEvents = "none";
  returnBox.style.cursor = "default";
  let points = document.querySelectorAll(`#${expandedDiv.id} .svgGroup`);
  points.forEach(bullet => {
    bullet.style = null;
  });
  seasonArray.push(expandedDiv);
}
function defaultSize(obj) {
  obj.style.width = "20vw";
  obj.style.pointerEvents = "all";
}
function showData(bullet) {
  console.log(bullet);
  console.log("show data for:", bullet.dataset.jsoninfo);
}
