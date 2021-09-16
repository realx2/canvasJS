const canvas = document.querySelector(".jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector(".range__jsRange");
const pen = document.querySelector(".range__jsPen");
const eraser = document.querySelector(".range__jsEraser");
const paint = document.querySelector(".range__jsPaint");
const saveBtn = document.querySelector(".button__jsSave");
const clear = document.querySelector(".button__jsClear");

const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WITH_SIZE = 500;
const CANVAS_HEIGHT_SIZE = 700;

// canvas setting
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WITH_SIZE , CANVAS_HEIGHT_SIZE);
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";

let painting = false;
let filling = false; // filling mode인지 아닌지 구분



function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// drawing
function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y); 
  } else {
    ctx.lineTo(x, y); // painting = true
    ctx.stroke();
  }
}

// change color when click
function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// change range
function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

// paint canvas
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WITH_SIZE , CANVAS_HEIGHT_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault(); // 우클릭 방지
}

// save할 image를 data URL로 받기
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a"); // a: anchor, like a href
  link.href = image; // url
  link.download = "You paing this!";
  link.click(); // download img
}

// delete all canvas
function deleteCanvas(e) {
  ctx.clearRect(0, 0, CANVAS_WITH_SIZE, CANVAS_HEIGHT_SIZE);
  ctx.beginPath();
}

function fillingBtn() {
  filling = true;
}

function paintingBtn(e) {
  filling = false;
}

// mouse event 관리
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => // color는 임의로 만든 변수명
  color.addEventListener("click", handleColorClick)
);

if (pen) paint.addEventListener("click", paintingBtn);
if (paint) paint.addEventListener("click", fillingBtn); 
if (range) range.addEventListener("input", handleRangeChange);
if (saveBtn) saveBtn.addEventListener("click", handleSaveClick);
if (clear) clear.addEventListener("click", deleteCanvas);