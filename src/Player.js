class Player {
   constructor(GRID_SIZE, SPEED) {
     this.GRID_SIZE = GRID_SIZE;
     this.SPEED = SPEED;
 
     this.position = { x: 0, y: 0 };
     this.targetPosition = { x: 0, y: 0 };
     this.moveDirection = { x: 0, y: 0 };
     this.moving = false;
   }
 
   update(p) {
     if (this.moving) {
       const distanceX = this.targetPosition.x - this.position.x;
       const distanceY = this.targetPosition.y - this.position.y;
 
       const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
 
       if (distance < this.SPEED) {
         this.position.x = this.targetPosition.x;
         this.position.y = this.targetPosition.y;
 
         if (this.moveDirection.x !== 0 || this.moveDirection.y !== 0) {
           this.targetPosition.x += this.moveDirection.x * this.GRID_SIZE;
           this.targetPosition.y += this.moveDirection.y * this.GRID_SIZE;
         } else {
           this.moving = false;
         }
       } else {
         this.position.x += (distanceX / distance) * this.SPEED;
         this.position.y += (distanceY / distance) * this.SPEED;
       }
     }
   }
 
   draw(p) {
     p.fill(255, 204, 0);
     p.square(this.position.x, this.position.y, this.GRID_SIZE);
   }
 
   handleKeyPressed(p) {
     if (!this.moving) {
       if (p.key === 'a') {
         this.moveDirection.x = -1;
         this.moveDirection.y = 0;
       } else if (p.key === 'd') {
         this.moveDirection.x = 1;
         this.moveDirection.y = 0;
       }
 
       if (p.key === 'w') {
         this.moveDirection.y = -1;
         this.moveDirection.x = 0;
       } else if (p.key === 's') {
         this.moveDirection.y = 1;
         this.moveDirection.x = 0;
       }
 
       this.targetPosition.x = this.position.x + this.moveDirection.x * this.GRID_SIZE;
       this.targetPosition.y = this.position.y + this.moveDirection.y * this.GRID_SIZE;
 
       this.moving = true;
     } else {
       if (p.key === 'a' && this.moveDirection.y !== 0) {
         this.moveDirection.x = -1;
       } else if (p.key === 'd' && this.moveDirection.y !== 0) {
         this.moveDirection.x = 1;
       }
 
       if (p.key === 'w' && this.moveDirection.x !== 0) {
         this.moveDirection.y = -1;
       } else if (p.key === 's' && this.moveDirection.x !== 0) {
         this.moveDirection.y = 1;
       }
     }
   }
 
   handleKeyReleased(p) {
     if (p.key === 'a' || p.key === 'd') {
       this.moveDirection.x = 0;
     }
     if (p.key === 'w' || p.key === 's') {
       this.moveDirection.y = 0;
     }
   }
 }
 
 export default Player;
 