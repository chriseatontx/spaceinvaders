"use strict";

// save/ — storage adapters only. Loaded by index.html after js/config.js and
// before the code that calls it.

function loadHiScore() {
  try {
    var v = Number(localStorage.getItem("si-hiscore"));
    return Number.isInteger(v) && v >= 0 ? v : 0;
  } catch (e) {
    return 0;
  }
}

function saveHiScore(v) {
  try {
    localStorage.setItem("si-hiscore", String(v));
  } catch (e) {}
}

function loadInteger(key) {
  try {
    var value = Number(localStorage.getItem(key));
    return Number.isInteger(value) && value >= 0 ? value : 0;
  } catch (e) {
    return 0;
  }
}

function saveInteger(key, value) {
  try { localStorage.setItem(key, String(value)); } catch (e) {}
}

function loadBoolean(key) {
  try { return localStorage.getItem(key) === "1"; } catch (e) { return false; }
}

function saveBoolean(key, value) {
  try { localStorage.setItem(key, value ? "1" : "0"); } catch (e) {}
}
