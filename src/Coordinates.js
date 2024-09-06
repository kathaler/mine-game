class Coordinates {
   constructor(x, y, size) {
      this.x = x;
      this.y = y;

      this.screenX = x * size;
      this.screenY = y * size;
   }

   screenPosition() {
      return { x: this.screenX, y: this.screenY };
   }  

   gridPosition() {
      return { x: this.x, y: this.y };
   }
}

export default Coordinates;