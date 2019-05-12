import TweenMax from "gsap/TweenMax";
import jsonData from "/json/data.json";

window.addEventListener("DOMContentLoaded", init);
const jsonArray = jsonData;

let seasonArray = [];

function init() {
  console.log("INIT");
  const seasons = document.querySelectorAll(".season");
  seasons.forEach(obj => {
    seasonArray.push(obj);
    addEventListener("click", resizeSeasonDiv);
  });
}

function resizeSeasonDiv() {
  let activeDiv = this.event.target;

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
  let selectedJsonObject;
  jsonArray.forEach(season => {
    if (season.id == expandedDiv.id) {
      selectedJsonObject = season;
    }
  });
  document
    .querySelector(`#${expandedDiv.id} .returnButton`)
    .addEventListener("click", () => {
      let menuFlag = false;
      closeActiveDiv(expandedDiv, returnBox, menuFlag);
    });
  let menuItem = document.querySelectorAll(".menuItem");
  menuItem.forEach(item => {
    item.addEventListener("click", () => {
      let menuFlag = true;
      closeActiveDiv(expandedDiv, returnBox, menuFlag, item);
    });
  });
  showTimeline(expandedDiv, selectedJsonObject);
}
function minimize(obj) {
  obj.style.width = "0vw";
  obj.style.pointerEvents = "none";
}
function showTimeline(div, obj) {
  let points = document.querySelectorAll(`#${div.id} .svgGroup`);
  console.log(div, obj);
  let animateCounter = 1;

  points.forEach(bullet => {
    animateCounter++;
    animateBullets(bullet, animateCounter, obj);
  });
}
function animateBullets(bullet, animateCounter, obj) {
  TweenMax.to(bullet, 0.3, {
    y: 15,
    opacity: 1,
    delay: animateCounter * 0.3
  });
  document.querySelector("#svgInfo").style.opacity = 1;

  bullet.addEventListener("click", () => {
    showData(bullet, obj);
  });
}
function closeActiveDiv(expandedDiv, returnBox, menuFlag, menuItem) {
  TweenMax.to(expandedDiv, 0.3, {
    width: "20vw"
  });

  document.querySelector("#svgInfo").style = "";
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
  console.log(menuFlag);
  if (menuFlag == true) {
    if (menuItem.id == "menu1") {
      let localDiv = document.querySelector("#season1");
      resizeSeasonDiv(localDiv);
    }
  }
}
function defaultSize(obj) {
  console.log("default size");
  obj.style.width = "20vw";
  obj.style.pointerEvents = "all";
}
function showData(bullet, obj) {
  const content = obj.info;

  const knap = bullet.dataset.jsoninfo;
  content.forEach(element => {
    if (element.id == knap) {
      selector(element);
    }
  });
}

function selector(element) {
  const selectorString = element.id;
  const selectorId = selectorString.slice(-4);
  const gameCard = document.querySelector("#gameCard");

  if (selectorId == "Plot") {
    showPlot(element, gameCard);
  }
  if (selectorId == "Char") {
    showChar(element, gameCard);
  }
  if (selectorId == "Card") {
    showCard(element, gameCard);
  }
  if (selectorId == "Info") {
    showInfo(element, gameCard);
  }
}

function showPlot(element, gameCard) {
  console.log("rotate1");
  console.log(element.plot, element.plot2, element.plot3);
  gameCard.style.opacity = 1;
  TweenMax.to(gameCard, 0.5, {
    rotationY: -90,
    onComplete: rotateCardPlot(element)
  });
}
function rotateCardPlot(element) {
  console.log("rotate2");
  const infoCard = document.querySelector("#infoCard");
  infoCard.style.opacity = 1;

  TweenMax.to(infoCard, 0.5, {
    rotationY: 0,
    width: "80vw",
    left: "10vw",
    height: "70vh",
    delay: 0.5,
    onComplete: addHTMLToPlot(element)
  });
}
function addHTMLToPlot(element) {
  console.log("DONE WITH ANIMATION, ADD", element);
  let div = document.createElement("div");
  div.classList.add("showPlot");
  let plot1 = document.createElement("p");

  plot1.textContent = element.plot;
  plot1.setAttribute("id", "plot1P");

  let plot2 = document.createElement("p");

  plot2.textContent = element.plot2;
  plot2.setAttribute("id", "plot2P");

  let plot3 = document.createElement("p");

  plot3.textContent = element.plot3;
  plot3.setAttribute("id", "plot3P");

  div.appendChild(plot1);
  div.appendChild(plot2);
  div.appendChild(plot3);
  document.querySelector("#infoCard").appendChild(div);
  document.querySelector("#infoCard").addEventListener("click", closeInfoCard);
  document.querySelector("#infoCard").style.pointerEvents = "all";
}

function closeInfoCard() {
  console.log("LUK");
  document.querySelector("#infoCard").innerHTML = "";
  document.querySelector("#infoCard").style = "";
  document.querySelector("#gameCard").style = "";
}

function showChar(element, gameCard) {
  console.log("SHOW CHARACTERS");
  console.log(element.card1, element.card2, element.char3);
  gameCard.style.opacity = 1;
  TweenMax.to(gameCard, 0.5, {
    rotationY: -90,
    onComplete: rotateCardChar(element)
  });
}
function rotateCardChar(element) {
  console.log("rotate2");
  const infoCard = document.querySelector("#infoCard");
  infoCard.style.opacity = 1;

  TweenMax.to(infoCard, 0.5, {
    rotationY: 0,
    width: "80vw",
    left: "10vw",
    height: "70vh",
    delay: 0.5,
    onComplete: addHTMLToChar(element)
  });
}
function addHTMLToChar(element) {
  console.log("DONE WITH ANIMATION, ADD", element);
  let div = document.createElement("div");
  div.classList.add("showChar");
  let char1 = document.createElement("div");
  let char1Img = document.createElement("img");
  char1Img.src = `imgs/char/${element.char1.image}`;
  char1.append(char1Img);
  let char1Name = document.createElement("h1");
  char1Name.textContent = element.char1.name;
  char1.append(char1Name);
  let char1Info = document.createElement("p");
  char1Info.textContent = element.char1.info;
  char1.append(char1Info);

  let char2 = document.createElement("div");
  let char2Img = document.createElement("img");
  char2Img.src = `imgs/char/${element.char2.image}`;
  char2.append(char2Img);
  let char2Name = document.createElement("h1");
  char2Name.textContent = element.char2.name;
  char2.append(char2Name);
  let char2Info = document.createElement("p");
  char2Info.textContent = element.char2.info;
  char2.append(char2Info);

  let char3 = document.createElement("div");
  let char3Img = document.createElement("img");
  char3Img.src = `imgs/char/${element.char3.image}`;
  char3.append(char3Img);
  let char3Name = document.createElement("h1");
  char3Name.textContent = element.char3.name;
  char3.append(char3Name);
  let char3Info = document.createElement("p");
  char3Info.textContent = element.char3.info;
  char3.append(char3Info);

  char1.classList.add("char");
  char2.classList.add("char");
  char3.classList.add("char");
  div.appendChild(char1);
  div.appendChild(char2);
  div.appendChild(char3);
  document.querySelector("#infoCard").appendChild(div);
  document.querySelector("#infoCard").addEventListener("click", closeInfoCard);
  document.querySelector("#infoCard").style.pointerEvents = "all";
}

function showCard(element, gameCard) {
  console.log("SHOW THE CARDS");
  console.log(element.cards.card1, element.cards.card2, element.cards.card3);
  gameCard.style.opacity = 1;
  TweenMax.to(gameCard, 0.5, {
    rotationY: -90,
    onComplete: rotateCardCard(element)
  });
}
function rotateCardCard(element) {
  console.log("rotate2");
  const infoCard = document.querySelector("#infoCard");
  infoCard.style.opacity = 1;

  TweenMax.to(infoCard, 0.5, {
    rotationY: 0,
    width: "80vw",
    left: "10vw",
    height: "70vh",
    delay: 0.5,
    onComplete: addHTMLToCard(element)
  });
}

function addHTMLToCard(element) {
  console.log("DONE WITH ANIMATION, ADD", element);
  let div = document.createElement("div");
  div.classList.add("showCard");
  let card1 = document.createElement("div");
  let card1Img = document.createElement("img");
  card1Img.src = `imgs/cards/${element.cards.card1.img}`;
  card1.append(card1Img);
  let card1Name = document.createElement("h1");
  card1Name.textContent = element.cards.card1.name;
  card1.append(card1Name);
  let card1Info = document.createElement("p");
  card1Info.textContent = element.cards.card1.info;
  card1.append(card1Info);

  let card2 = document.createElement("div");
  let card2Img = document.createElement("img");
  card2Img.src = `imgs/cards/${element.cards.card2.img}`;
  card2.append(card2Img);
  let card2Name = document.createElement("h1");
  card2Name.textContent = element.cards.card2.name;
  card2.append(card2Name);
  let card2Info = document.createElement("p");
  card2Info.textContent = element.cards.card2.info;
  card2.append(card2Info);

  let char3 = document.createElement("div");
  let char3Img = document.createElement("img");
  char3Img.src = `imgs/cards/${element.cards.card3.img}`;
  char3.append(char3Img);
  let char3Name = document.createElement("h1");
  char3Name.textContent = element.cards.card3.name;
  char3.append(char3Name);
  let char3Info = document.createElement("p");
  char3Info.textContent = element.cards.card3.info;
  char3.append(char3Info);

  card1.classList.add("card");
  card2.classList.add("card");
  char3.classList.add("card");
  div.appendChild(card1);
  div.appendChild(card2);
  div.appendChild(char3);
  document.querySelector("#infoCard").appendChild(div);
  document.querySelector("#infoCard").addEventListener("click", closeInfoCard);
  document.querySelector("#infoCard").style.pointerEvents = "all";
}

function showInfo(element, gameCard) {
  console.log("SHOW THE INFO");
  console.log(element.info.releaseDateJ, element.info.releaseDateA);
  gameCard.style.opacity = 1;
  TweenMax.to(gameCard, 0.5, {
    rotationY: -90,
    onComplete: rotateCardInfo(element)
  });
}
function rotateCardInfo(element) {
  console.log("rotate2");
  const infoCard = document.querySelector("#infoCard");
  infoCard.style.opacity = 1;

  TweenMax.to(infoCard, 0.5, {
    rotationY: 0,
    width: "80vw",
    left: "10vw",
    height: "70vh",
    delay: 0.5,
    onComplete: addHTMLToInfo(element)
  });
}
function addHTMLToInfo(element) {
  console.log("DONE WITH ANIMATION, ADD", element);
  let div = document.createElement("div");
  div.classList.add("showInfo");
  let info1 = document.createElement("p");
  let info2 = document.createElement("p");
  info1.textContent = element.info.releaseDateJ;
  info2.textContent = element.info.releaseDateA;
  div.append(info1);
  div.append(info2);
  document.querySelector("#infoCard").append(div);
  document.querySelector("#infoCard").addEventListener("click", closeInfoCard);
  document.querySelector("#infoCard").style.pointerEvents = "all";
}
