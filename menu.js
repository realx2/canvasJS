const menu = document.querySelector(".menu__icon");
const colorPalete = document.querySelector(".controls-colors");


function activeMenu() {
  if (menu.value === 'open') {
    menu.style['transform'] = "rotate(360deg)";
    colorPalete.style['transform'] = "translateY(70%)";
    colorPalete.style['opacity'] = "1";

    menu.value = 'close';
  } else {
    menu.style['transform'] = "rotate(-360deg)";
    colorPalete.style['top'] = "-150%";
    colorPalete.style['opacity'] = "0";

    menu.value = 'open';
  }
}