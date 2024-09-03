// Grid.js
class Grid {
   constructor(GRID_SIZE) {
     this.GRID_SIZE = GRID_SIZE;
   }
 
   drawGrid(p, width, height) {
     p.push();
     p.stroke(75);
 
     for (let x = 0; x <= width; x += this.GRID_SIZE) {
       p.line(x, 0, x, height);
     }
     for (let y = 0; y <= height; y += this.GRID_SIZE) {
       p.line(0, y, width, y);
     }
 
     p.pop();
   }
 }
 
 export default Grid;
 