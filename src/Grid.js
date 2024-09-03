// Grid.js
class Grid {
   constructor(size, player) {
     this.GRID_SIZE = size;
     this.PLAYER = player;
     this.squares = [];
   }
 
   generateGrid(width, height) {
     // Generate the grid only once
     const startX = this.PLAYER.position.x - 4 * this.GRID_SIZE;
     const endX = this.PLAYER.position.x + 4 * this.GRID_SIZE;
     const startY = this.PLAYER.position.y - 4 * this.GRID_SIZE;
     const endY = this.PLAYER.position.y + 4 * this.GRID_SIZE;
 
     for (let x = 0; x <= width; x += this.GRID_SIZE) {
       for (let y = 0; y <= height; y += this.GRID_SIZE) {
 
         // Skip squares within the 9x9 area around the player
         if (x >= startX && x <= endX && y >= startY && y <= endY) {
           continue;
         }
 
         // Store square data instead of drawing immediately
         this.squares.push({ x, y });
       }
     }
   }
 
   drawGrid(p) {
     p.push();
     p.stroke(75);
 
     // Draw grid lines
     for (let x = 0; x <= p.width; x += this.GRID_SIZE) {
       p.line(x, 0, x, p.height);
     }
     for (let y = 0; y <= p.height; y += this.GRID_SIZE) {
       p.line(0, y, p.width, y);
     }
 
     // Draw stored squares
     for (const square of this.squares) {
       p.fill(211, 211, 211);
       p.square(square.x, square.y, this.GRID_SIZE);
 
       p.textSize(12);
       p.fill(0);
 
       // Calculate text position to be in the center of the square
       let textX = square.x + this.GRID_SIZE / 2;
       let textY = square.y + this.GRID_SIZE / 2 + p.textSize() / 3; // Adjust for text height
 
       p.textAlign(p.CENTER, p.CENTER);
       p.text(square.x / this.GRID_SIZE + "," + square.y / this.GRID_SIZE, textX, textY);
     }
 
     p.pop();
   }

   updateGrid() {
      // Update stored squares
      this.squares = this.squares.filter(square => {
          // Calculate the range of overlap
          const playerLeft = this.PLAYER.position.x;
          const playerRight = this.PLAYER.position.x + this.GRID_SIZE;
          const playerTop = this.PLAYER.position.y;
          const playerBottom = this.PLAYER.position.y + this.GRID_SIZE;

          const squareLeft = square.x;
          const squareRight = square.x + this.GRID_SIZE;
          const squareTop = square.y;
          const squareBottom = square.y + this.GRID_SIZE;

          // Check for overlap in both x and y directions
          const overlapX = playerRight > squareLeft && playerLeft < squareRight;
          const overlapY = playerBottom > squareTop && playerTop < squareBottom;

          // If there is overlap in both directions, remove the square
          return !(overlapX && overlapY);
      });
  }
 }
 
 export default Grid;
 