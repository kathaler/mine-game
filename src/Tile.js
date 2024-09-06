import { convertToGridPosition } from './utils';

class Tile {
   constructor(x, y, size) {
      this.size = size;
      this.isMined = false;
      this.position = convertToGridPosition(x, y, size);
   }

   draw(p) {
      p.fill(211, 211, 211);
      p.square(this.position.x, this.position.y, this.size);

      p.textSize(12);
      p.fill(0);

      let textX = this.position.x + this.size / 2;
      let textY = this.position.y + this.size / 2 + p.textSize() / 3;

      p.textAlign(p.CENTER, p.CENTER);
      p.text(this.position.x / this.size + "," + this.position.y / this.size, textX, textY);
   }

   mine() {
      this.isMined = true;
   }
}

export default Tile;