"use strict";

const grid = document.querySelector(".grid");
const btnColor = document.querySelector(".btn--draw");
const btnRainbow = document.querySelector(".btn--rainbow");
const btnSize = document.querySelector(".btn--size");
const btnEraser = document.querySelector(".btn--eraser");
const btnClear = document.querySelector(".btn--clear");
const btnCircle = document.querySelector(".btn--circle");
const btn = document.querySelector(".btn");
let gridSize = btnSize.innerText.slice(0, 2);

const colorPicker = document.querySelector("#color");

let state = "color";

btnSize.addEventListener("click", () => {
  if (btnSize.innerText == "16x16") {
    btnSize.innerText = "32x32";
  } else if (btnSize.innerText == "32x32") {
    btnSize.innerText = "64x64";
  } else if (btnSize.innerText == "64x64") {
    btnSize.innerText = "16x16";
  }
  gridSize = btnSize.innerText.slice(0, 2);
  //   console.log("test");
  updateGrid();
});
// gridSize = btnSize.innerText.slice(0, 2);

function updateGrid() {
  //   console.log("test");
  grid.innerHTML = "";
  grid.style.setProperty("grid-template-columns", `repeat(${gridSize}, 1fr)`);
  grid.style.setProperty("grid-template-rows", `repeat(${gridSize}, 1fr)`);

  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    div.classList.add("square");
    grid.appendChild(div);
  }
}

function randomColor() {
  const R = Math.floor(Math.random() * 256) + 1;
  const G = Math.floor(Math.random() * 256) + 1;
  const B = Math.floor(Math.random() * 256) + 1;

  return `rgb(${R},${G},${B})`;
}

function gridColor(e) {
  if (state == "color" && e.target.classList.value === "color") {
    e.target.setAttribute("style", "border: 0.1px rgb(176, 176, 176);");
    e.target.style.backgroundColor = colorPicker.value;
  } else if (state == "rainbow" && e.target.classList.value === "color") {
    e.target.setAttribute("style", "border: 0.1px rgb(176, 176, 176);");
    e.target.style.backgroundColor = randomColor();
  } else if (state == "eraser" && e.target.classList.value === "color") {
    e.target.style.backgroundColor = "#fff";
    e.target.setAttribute(
      "style",
      "border: 0.1px solid rgb(176, 176, 176); background-color: white;"
    );
  }
}

btnClear.addEventListener("click", function () {
  updateGrid();
});

// Mouse Events

let isDrawing = false;
let divSquare = document.querySelector("div");

divSquare.addEventListener("mousedown", function (e) {
  isDrawing = true;
  e.target.classList.replace("square", "color");
  gridColor(e);
});

divSquare.addEventListener("mousemove", function (e) {
  if (isDrawing) {
    e.target.classList.replace("square", "color");
    gridColor(e);
  }
});

divSquare.addEventListener("mouseup", () => {
  if (isDrawing) {
    isDrawing = false;
  }
});

// Buttons Events

btnEraser.addEventListener("click", () => {
  btnEraser.classList.add("active");
  btnColor.classList.remove("active");
  btnRainbow.classList.remove("active");

  state = "eraser";
});

btnColor.addEventListener("click", () => {
  btnEraser.classList.remove("active");
  btnColor.classList.add("active");
  btnRainbow.classList.remove("active");

  state = "color";
});

btnRainbow.addEventListener("click", () => {
  btnEraser.classList.remove("active");
  btnColor.classList.remove("active");
  btnRainbow.classList.add("active");

  state = "rainbow";
});

updateGrid();
btnColor.classList.add("active");
year.textContent = new Date().getFullYear();
