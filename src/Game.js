// Game.js
import Player from "./Player";
import Grid from "./Grid";

class Game {
  constructor(GAME_WIDTH, GAME_HEIGHT, GRID_SIZE, SPEED) {
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GRID_SIZE = GRID_SIZE;
    this.SPEED = SPEED;

    this.player = new Player(GRID_SIZE, SPEED);
    this.grid = new Grid(GRID_SIZE);
  }

  setup(p) {
    p.createCanvas(this.GAME_WIDTH, this.GAME_HEIGHT);
    p.background(135, 206, 235);
  }

  windowResized(p) {
    this.GAME_WIDTH = window.innerWidth;
    this.GAME_HEIGHT = window.innerHeight;
    p.resizeCanvas(this.GAME_WIDTH, this.GAME_HEIGHT);
  }

  draw(p) {
    p.background(135, 206, 235);
    this.grid.drawGrid(p, this.GAME_WIDTH, this.GAME_HEIGHT);

    this.player.update(p);
    this.player.draw(p);
  }

  keyPressed(p) {
    this.player.handleKeyPressed(p);
  }

  keyReleased(p) {
    this.player.handleKeyReleased(p);
  }
}

export default Game;
