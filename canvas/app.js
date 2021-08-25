const canvas = document.querySelector(".jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector(".range__jsRange");
const pen = document.querySelector(".range__jsPen");
const eraser = document.querySelector(".range__jsEraser");
const paint = document.querySelector(".range__jsPaint");
const saveBtn = document.querySelector(".button__jsSave");
const clear = document.querySelector(".button__jsClear");

const ctx = canvas.getContext("2d"); // context : 요소 안에서 픽셀에 접근할 수 있는 방법

// canvas element must have two size
// 1. CSS size
// 2. manipulate the pixels size (실제 픽셀 사이즈~~)
// canvas.width = 500; 
// canvas.height = 700; >> html에서 지정해줬기 때문에 필요없다!

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WITH_SIZE = 500;
const CANVAS_HEIGHT_SIZE = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WITH_SIZE , CANVAS_HEIGHT_SIZE); // set defalt white background
ctx.lineWidth = 2.5;
ctx.fillStyle = "";

let painting = false;
let filling = false; // filling mode인지 아닌지 구분



function stopPainting(e) {
  painting = false;
}


function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

// when mouse moved on canvas
function onMouseMove(e) {
  const x = e.offsetX; // offset : relative value with canvas
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath(); // beginPath() : 경로 생성, 마우스는 계속 움직이면서 path를 만든다.
    ctx.moveTo(x, y); // moveTo() : start line, 마우스가 멈춘 곳이 시작점
  } else {
    ctx.lineTo(x, y); // lineTo() : end line, 마우스를 움직이는 내내 move event가 발생한다.
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function handleCanvasClick() {
  // handleModeClick()에서 filling이 true일 때 Paint가 되도록 한 상태.
  // 때문에 filling = true = handleCanvasClick() 작동
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


if (range) range.addEventListener("input", handleRangeChange);

if (saveBtn) saveBtn.addEventListener("click", handleSaveClick);

if (clear) clear.addEventListener("click", deleteCanvas);