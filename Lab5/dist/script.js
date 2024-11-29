/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var msg = "Hello!";
alert(msg);
var appState = {
  currentStyle: "css/styl1.css",
  styles: {
    "Styl1": "css/styl1.css",
    "Styl2": "css/styl2.css",
    "Styl3": "css/styl3.css"
  }
};
function changeStyle(styleName) {
  var linkElement = document.querySelector('link[rel="stylesheet"]');
  if (linkElement) {
    var newHref = appState.styles[styleName];
    if (newHref) {
      linkElement.setAttribute("href", newHref);
      appState.currentStyle = newHref;
    } else {
      console.error("Style ".concat(styleName, " not found in appState."));
    }
  }
}
function createStyleLinks() {
  // W tej funkcji znajduje się dynamiczne generowanie linków do styli, 
  // nasłuchiwanie eventu kliknięcia na link 
  var list = document.querySelector(".list");
  if (!list) return;
  list.innerHTML = '';
  Object.keys(appState.styles).forEach(function (styleName) {
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = styleName;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      changeStyle(styleName);
    });
    var listItem = document.createElement("li");
    listItem.appendChild(link);
    list.appendChild(listItem);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  createStyleLinks();
  changeStyle("Styl1"); // Domyślny styl
});
/******/ })()
;