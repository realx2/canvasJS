const canvas = document.querySelector(".jsCanvas");
const colors = document.querySelector(".colors");
const range = document.querySelector(".jsRange");

const ctx = canvas.getContext('2d');

const CANVAS_WEIGHT = 500;
const CANVAS_HEIGHT = 700;

// canvas setting
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WEIGHT, CANVAS_HEIGHT);
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";


