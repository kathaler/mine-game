class Player {
  constructor(GRID_SIZE, SPEED) {
    this.GRID_SIZE = GRID_SIZE;
    this.SPEED = SPEED;

    this.position = { x: 0, y: 0 };
    this.targetPosition = { x: 0, y: 0 };
    this.moveDirection = { x: 0, y: 0 };
    this.moving = false;
    this.keysReleased = false;
    this.lastKeys = [];
  }

  update(p) {
    if (!this.keysReleased) {
      this.position.x += this.moveDirection.x * this.SPEED;
      this.position.y += this.moveDirection.y * this.SPEED;
    } else {
      const distanceX = this.targetPosition.x - this.position.x;
      const distanceY = this.targetPosition.y - this.position.y;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < this.SPEED) {
        this.position.x = this.targetPosition.x;
        this.position.y = this.targetPosition.y;
        this.moving = false;
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
    this.keysReleased = false;

    if (p.key === "a") {
      this.moveDirection.x -= 1;
    }
    if (p.key === "d") {
      this.moveDirection.x += 1;
    }
    if (p.key === "w") {
      this.moveDirection.y -= 1;
    }
    if (p.key === "s") {
      this.moveDirection.y += 1;
    }
  }

  handleKeyReleased(p) {
    if (p.key === "a" || p.key === "d") {
      this.moveDirection.x = 0;
    }
    if (p.key === "w" || p.key === "s") {
      this.moveDirection.y = 0;
    }

    // Snap to the closest grid unit
    if (this.moveDirection.x === 0 && this.moveDirection.y === 0) {
      this.keysReleased = true;
      let closestGridX =
        Math.round(this.position.x / this.GRID_SIZE) * this.GRID_SIZE;
      let closestGridY =
        Math.round(this.position.y / this.GRID_SIZE) * this.GRID_SIZE;


      if (p.key === "a") {
        closestGridX -= this.GRID_SIZE;
      }
      if (p.key === "d") {
        closestGridX += this.GRID_SIZE;
      }
      if (p.key === "w") {
        closestGridY -= this.GRID_SIZE;
      }
      if (p.key === "s") {
        closestGridY += this.GRID_SIZE;
      }

      this.targetPosition.x = closestGridX;
      this.targetPosition.y = closestGridY;
    }
  }
}

export default Player;
