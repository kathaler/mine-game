class Tile {
   constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
   }

   draw(p) {
      p.fill(211, 211, 211);
      p.square(this.x, this.y, this.size);

      p.textSize(12);
      p.fill(0);

      let textX = this.x + this.size / 2;
      let textY = this.y + this.size / 2 + p.textSize() / 3;

      p.textAlign(p.CENTER, p.CENTER);
      p.text(this.x / this.size + "," + this.y / this.size, textX, textY);
   }
}

export default Tile;