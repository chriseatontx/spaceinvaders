"use strict";

// arcade/ — audio presentation (module map step 4). Loaded by index.html after
// js/save.js and before the code that calls it. The Game simulation and render
// methods stay in index.html until step 7.

var audioCtx = null;
var muted = false;
var ufoSound = null;

function initAudio() {
  try {
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  } catch (e) {
    audioCtx = null;
  }
}

function wakeAudio() {
  if (audioCtx && audioCtx.state === "suspended") {
    try { audioCtx.resume(); } catch (e) {}
  }
}

function toggleMute() {
  muted = !muted;
  if (muted) stopUfoSound();
}

function stopUfoSound() {
  if (!ufoSound) return;
  try {
    if (ufoSound.osc) ufoSound.osc.stop();
  } catch (e) {}
  ufoSound = null;
}

function playNote(freq, delay, dur, type, vol, freqEnd) {
  if (!audioCtx || muted) return;
  try {
    var start = audioCtx.currentTime + delay;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), start + dur);
    }
    gain.gain.setValueAtTime(vol, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + dur);
  } catch (e) {}
}

function playFire() {
  playNote(900, 0, 0.08, "square", 0.08, 300);
}

function playQuarter() {
  if (!audioCtx || muted) return;
  playNote(950, 0, 0.05, "square", 0.1, 1200);
  playNote(1600, 0.06, 0.06, "square", 0.07, 1700);
}

function playServiceInstall() {
  if (!audioCtx || muted) return;
  playNote(330, 0, 0.08, "square", 0.08, null);
  playNote(660, 0.09, 0.08, "square", 0.08, null);
  playNote(990, 0.18, 0.14, "square", 0.08, null);
}

function playExplosion() {
  playNote(180, 0, 0.18, "sawtooth", 0.12, 40);
}

function playDeath() {
  playNote(320, 0, 0.35, "triangle", 0.12, 80);
}

function playPlayerExplosion() {
  playNote(200, 0, 0.3, "sawtooth", 0.16, 30);
  playNote(120, 0.12, 0.35, "sawtooth", 0.14, 25);
}

function playUfoSpawn() {
  playNote(160, 0, 0.25, "sine", 0.08, 520);
}

function playUfoHit() {
  playNote(520, 0, 0.22, "sawtooth", 0.14, 120);
}

function playWaveJingle() {
  if (!audioCtx || muted) return;
  try {
    playNote(523, 0, 0.12, "square", 0.08, null);
    playNote(659, 0.12, 0.12, "square", 0.08, null);
    playNote(784, 0.24, 0.16, "square", 0.08, null);
  } catch (e) {}
}

function playGameOver() {
  if (!audioCtx || muted) return;
  try {
    playNote(300, 0, 0.25, "triangle", 0.12, 120);
    playNote(220, 0.25, 0.25, "triangle", 0.12, 90);
    playNote(150, 0.5, 0.35, "triangle", 0.12, 60);
  } catch (e) {}
}

function startUfoSound() {
  if (!audioCtx || muted || ufoSound) return;
  try {
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 220;
    gain.gain.value = 0.06;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    ufoSound = { osc: osc, gain: gain, started: audioCtx.currentTime };
  } catch (e) {
    ufoSound = null;
  }
}

function updateUfoSound(u) {
  if (!ufoSound) {
    startUfoSound();
    return;
  }
  try {
    var t = audioCtx.currentTime - ufoSound.started;
    var freq = 180 + 120 * Math.sin(t * 18) + (u.x / W) * 80;
    ufoSound.osc.frequency.setValueAtTime(Math.max(50, freq), audioCtx.currentTime);
    ufoSound.gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  } catch (e) {}
}
