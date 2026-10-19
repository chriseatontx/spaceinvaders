"use strict";

// config/ — tunable data only. Loaded by index.html before the code that reads it.

var VERSION = "1.6.2";

var CABINET_CONFIG = {
  quarterCost: 1,
  scoreCreditRate: 1,
  scoreCreditLabel: "SCORE CREDITS",
  fireControl: { id: "fire_control_1", cost: 120, cooldownMultiplier: 0.8 },
  storage: { plays: "si-cabinet-plays", scoreCredits: "si-score-credits", fireControl: "si-fire-control-1" }
};

var DEBUG_CONFIG = { speedMultiplier: 2 };

var COLS = 11;
var ROWS = 5;
var CELL_W = 32;
var CELL_H = 24;
var INV_W = 24;
var INV_H = 16;
var MARGIN = 16;
var DROP = 12;
var GAME_OVER_FLOOR_MARGIN = 20;
var SHIP_EXPLOSION_PARTICLES = 18;
var SHIP_EXPLOSION_LIFE = 1.1;
var SHIP_EXPLOSION_SPEED = 150;
var ROW_POINTS = [30, 20, 20, 10, 10];
var ROW_COLORS = ["#ff4fd8", "#7f7fff", "#4fd8ff", "#4fff4f", "#d8ff4f"];
var SHIELD_COLOR = "#3fae5f";
var UFO_W = 24;
var UFO_H = 12;
var UFO_Y = 36;
var UFO_SPEED = 90;
var UFO_POINTS = [100, 200, 300];
