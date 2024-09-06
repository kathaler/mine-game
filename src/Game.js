// Game.js
import Player from "./Player";
import Grid from "./Grid";
import Camera from "./Camera";

class Game {
  constructor(GAME_WIDTH, GAME_HEIGHT, GRID_SIZE, SPEED) {
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GRID_SIZE = GRID_SIZE;
    this.SPEED = SPEED;

    this.player = new Player(GRID_SIZE, SPEED);
    this.grid = new Grid(GRID_SIZE, this.player, this.GAME_WIDTH, this.GAME_HEIGHT);
    this.camera = new Camera();

    this.offSetX = (this.GAME_WIDTH * this.GRID_SIZE) / 2;
      this.offSetY = (this.GAME_HEIGHT * this.GRID_SIZE) / 2;
  }

  setup(p) {
    p.createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
    p.background(135, 206, 235);
    this.grid.initializeGrid();

    this.camera.position = { x: this.player.position.x - this.offSetX, y: this.player.position.y - this.offSetY };
   this.camera.targetPosition = { x: this.player.position.x - this.offSetX, y: this.player.position.y - this.offSetY };
  }

  windowResized(p) {
    this.GAME_WIDTH = window.innerWidth;
    this.GAME_HEIGHT = window.innerHeight;
    p.resizeCanvas(this.GAME_WIDTH, this.GAME_HEIGHT);
  }

  draw(p) {
    p.background(135, 206, 235);

    // Calculate the target camera position (centered on the player)
    this.camera.targetPosition.x =
      this.player.position.x - this.offSetX;
    this.camera.targetPosition.y =
      this.player.position.y - this.offSetY;

    this.camera.position.x +=
    (this.camera.targetPosition.x - this.camera.position.x) * this.camera.speed;
  this.camera.position.y +=
    (this.camera.targetPosition.y - this.camera.position.y) * this.camera.speed;
  
    p.translate(-this.camera.position.x, -this.camera.position.y);

    this.grid.updateGrid(p);
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
