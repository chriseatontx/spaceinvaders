const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const match = /<script>([\s\S]*?)<\/script>/.exec(html);
if (!match) throw new Error('No inline script found in index.html');

const canvas = { width: 800, height: 600, getContext: function () { return {}; }, addEventListener: function () {} };
function stubElement() {
  return { firstChild: { nodeValue: '' }, textContent: '', innerHTML: '', hidden: false, disabled: false, addEventListener: function () {} };
}
const sandbox = {
  document: { getElementById: function (id) { return id === 'game' ? canvas : stubElement(); } },
  window: { addEventListener: function () {} },
  localStorage: { getItem: function () { return null; }, setItem: function () {} },
  performance: { now: function () { return 0; } },
  requestAnimationFrame: function () {},
  console: console,
};

vm.runInNewContext(match[1], sandbox);
const Game = sandbox.Game || vm.runInNewContext('Game', sandbox);

function freshGame() {
  const game = new Game(canvas);
  game.state = 'playing';
  game.invaders = [];
  game.alive = 0;
  game.total = 0;
  game.ufo = null;
  game.ufoTimer = 100;
  game.enemyFireTimer = 100;
  game.fireCooldown = 100;
  game.enemyBullets = [];
  game.playerBullet = null;
  game.player = { x: 10, y: 560, w: 36, h: 16, speed: 260, invuln: 100 };
  return game;
}

function testPlayerBullet() {
  const game = freshGame();
  const shield = game.shields[0];
  const shieldsBefore = game.shields.length;
  game.playerBullet = { x: shield.x + 1, y: shield.y + shield.h, w: 2, h: 8, vy: -420 };
  game.update(0.05);
  assert.strictEqual(game.playerBullet, null, 'player bullet should be consumed by shield hit');
  assert.strictEqual(game.shields.length, shieldsBefore - 1, 'player bullet should remove one shield cell');
}

function testEnemyBullet() {
  const game = freshGame();
  const shield = game.shields[0];
  const shieldsBefore = game.shields.length;
  game.enemyBullets = [{ x: shield.x + 1, y: shield.y - 8, w: 3, h: 8, vy: 420 }];
  game.update(0.05);
  assert.strictEqual(game.enemyBullets.length, 0, 'enemy bullet should be consumed by shield hit');
  assert.strictEqual(game.shields.length, shieldsBefore - 1, 'enemy bullet should remove one shield cell');
}

testPlayerBullet();
testEnemyBullet();
console.log('collision regression checks passed');
