import { convertToGridPosition } from './utils';
import Coordinates from './Coordinates';

class Tile {
   constructor(x, y, size) {
      this.size = size;
      this.isMined = false;
      this.coords = new Coordinates(x, y, size);
      this.mineProgress = 0;
      this.timeToMine = 1000;
   }

   draw(p) {
      const screenPosition = this.coords.screenPosition();

      p.fill(211, 211, 211);
      p.square(screenPosition.x, screenPosition.y, this.size);

      p.textSize(12);
      p.fill(0);

      const gridPosition = this.coords.gridPosition();
      let textX = screenPosition.x + this.size / 2;
      let textY = screenPosition.y + this.size / 2 + p.textSize() / 3;

      p.textAlign(p.CENTER, p.CENTER);
      p.text(gridPosition.x + "," + gridPosition.y, textX, textY);
   }

   updateMiningProgress(deltaTime) {
      if (this.isMined) {
         return;
      }

      this.mineProgress += deltaTime;

      if (this.mineProgress >= this.timeToMine) {
         this.mine();
      }
   }

   mine() {
      this.isMined = true;
   }
}

export default Tile;