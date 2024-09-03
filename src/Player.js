class Player {
   constructor(GRID_SIZE, SPEED) {
     this.GRID_SIZE = GRID_SIZE;
     this.SPEED = SPEED;
 
     this.position = { x: 0, y: 0 };
     this.targetPosition = { x: 0, y: 0 };
     this.moveDirection = { x: 0, y: 0 };
     this.moving = false;
   }
 
   isCenteredOnGrid() {
     return (
       this.position.x % this.GRID_SIZE === 0 &&
       this.position.y % this.GRID_SIZE === 0
     );
   }
 
   update(p) {
     const distanceX = this.targetPosition.x - this.position.x;
     const distanceY = this.targetPosition.y - this.position.y;
     const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
 
     if (distance < this.SPEED) {
       this.position.x = this.targetPosition.x;
       this.position.y = this.targetPosition.y;
       this.moving = false;
 
       // If centered and no ongoing movement, apply the new direction
       if (this.isCenteredOnGrid() && (this.moveDirection.x !== 0 || this.moveDirection.y !== 0)) {
         this.targetPosition.x += this.moveDirection.x * this.GRID_SIZE;
         this.targetPosition.y += this.moveDirection.y * this.GRID_SIZE;
         this.moving = true;
       }
     } else {
       this.position.x += (distanceX / distance) * this.SPEED;
       this.position.y += (distanceY / distance) * this.SPEED;
     }
   }
 
   draw(p) {
     p.fill(255, 204, 0);
     p.square(this.position.x, this.position.y, this.GRID_SIZE);
   }
 
   handleKeyPressed(p) {
      if (p.key === "a") {
       this.moveDirection.x = -1;
     }
     if (p.key === "d") {
       this.moveDirection.x = 1;
     }
     if (p.key === "w") {
       this.moveDirection.y = -1;
     }
     if (p.key === "s") {
       this.moveDirection.y = 1;
     }
 
     // Set new target position based on the direction
     if (this.isCenteredOnGrid()) {
       this.targetPosition.x = this.position.x + this.moveDirection.x * this.GRID_SIZE;
       this.targetPosition.y = this.position.y + this.moveDirection.y * this.GRID_SIZE;
       this.moving = true;
     }
   }
 
   handleKeyReleased(p) {
     if (p.key === "a" || p.key === "d") {
       this.moveDirection.x = 0;
     }
     if (p.key === "w" || p.key === "s") {
       this.moveDirection.y = 0;
     }
   }
 }
 
 export default Player;
 