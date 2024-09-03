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
     this.grid = new Grid(GRID_SIZE, this.player);
 
     // Camera position and target position
     this.cameraPosition = { x: 0, y: 0 };
     this.cameraTarget = { x: 0, y: 0 };
     this.cameraSpeed = 0.1; // Adjust this value to control lag
   }
 
   setup(p) {
     p.createCanvas(this.GAME_WIDTH, this.GAME_HEIGHT);
     p.background(135, 206, 235);
     this.grid.generateGrid(this.GAME_WIDTH, this.GAME_HEIGHT);
   }
 
   windowResized(p) {
     this.GAME_WIDTH = window.innerWidth;
     this.GAME_HEIGHT = window.innerHeight;
     p.resizeCanvas(this.GAME_WIDTH, this.GAME_HEIGHT);
   }
 
   draw(p) {
     p.background(135, 206, 235);
 
     // Calculate the target camera position (centered on the player)
     this.cameraTarget.x = this.player.position.x - this.GAME_WIDTH / 2 + this.GRID_SIZE / 2;
     this.cameraTarget.y = this.player.position.y - this.GAME_HEIGHT / 2 + this.GRID_SIZE / 2;
 
     // Smoothly move the camera position towards the target position
     this.cameraPosition.x += (this.cameraTarget.x - this.cameraPosition.x) * this.cameraSpeed;
     this.cameraPosition.y += (this.cameraTarget.y - this.cameraPosition.y) * this.cameraSpeed;
 
     // Apply camera translation
     p.translate(-this.cameraPosition.x, -this.cameraPosition.y);

     this.grid.updateGrid();
 
     // Draw the grid and player with the camera translation applied
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
 