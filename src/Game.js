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
    this.grid = new Grid(
      GRID_SIZE,
      this.player,
      this.GAME_WIDTH,
      this.GAME_HEIGHT
    );
    this.camera = new Camera();
  }

  setup(p, sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current;
    p.createCanvas(clientWidth, clientHeight);
    p.background(135, 206, 235);
    this.grid.initializeGrid();

    this.offSetX = Math.floor(clientWidth / 2) - this.GRID_SIZE / 2;
    this.offSetY = Math.floor(clientHeight / 2);

    this.camera.position = {
      x: this.player.position.x - this.offSetX,
      y: this.player.position.y - this.offSetY,
    };
    this.camera.targetPosition = {
      x: this.player.position.x - this.offSetX,
      y: this.player.position.y - this.offSetY,
    };
  }

  windowResized(p, sketchRef) {
    const { clientWidth, clientHeight } = sketchRef.current;
    p.resizeCanvas(clientWidth, clientHeight);
    this.offSetX = Math.floor(clientWidth / 2);
    this.offSetY = Math.floor(clientHeight / 2);
  }

  draw(p) {
   const deltaTime = p.deltaTime;
    p.background(135, 206, 235);

    // Calculate the target camera position (centered on the player)
    this.camera.targetPosition.x = this.player.position.x - this.offSetX;
    this.camera.targetPosition.y = this.player.position.y - this.offSetY;

    this.camera.position.x +=
      (this.camera.targetPosition.x - this.camera.position.x) *
      this.camera.speed;
    this.camera.position.y +=
      (this.camera.targetPosition.y - this.camera.position.y) *
      this.camera.speed;

    p.translate(-this.camera.position.x, -this.camera.position.y);

    this.grid.updateGrid(p, deltaTime);
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
