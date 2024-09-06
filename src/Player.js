class Player {
  constructor(GRID_SIZE, SPEED) {
    this.GRID_SIZE = GRID_SIZE;
    this.SPEED = SPEED;

    this.position = { x: 0, y: 0 };
    this.targetPosition = { x: 0, y: 0 };
    this.moveDirection = { x: 0, y: 0 };
    this.playerSize = GRID_SIZE / 2;
    this.isMining = false;

    this.currentTile = { x: 0, y: 0 };

    this.miningKey = null;
  }

  isCenteredOnGrid() {
    return (
      this.position.x % this.GRID_SIZE === 0 &&
      this.position.y % this.GRID_SIZE === 0
    );
  }

  isKeyPressed() {
    return this.moveDirection.x !== 0 || this.moveDirection.y !== 0;
  }

  update(p) {
    if (this.isMining) return;
    const distanceX = this.targetPosition.x - this.position.x;
    const distanceY = this.targetPosition.y - this.position.y;

    if (Math.abs(distanceX) > 0 || Math.abs(distanceY) > 0) {
      this.position.x +=
        Math.sign(distanceX) * Math.min(this.SPEED, Math.abs(distanceX));
      this.position.y +=
        Math.sign(distanceY) * Math.min(this.SPEED, Math.abs(distanceY));
    }

    if (this.isCenteredOnGrid() && this.isKeyPressed()) {
      this.currentTile.x = this.targetPosition.x;
      this.currentTile.y = this.targetPosition.y;
      this.targetPosition.x += this.moveDirection.x * this.GRID_SIZE;
      this.targetPosition.y += this.moveDirection.y * this.GRID_SIZE;
    }

    console.log(this.currentTile);
  }

  draw(p) {
    p.fill(255, 204, 0);
    p.square(
      this.position.x + this.playerSize / 2,
      this.position.y + this.playerSize / 2,
      this.playerSize
    );
  }

  handleKeyPressed(p) {
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
    if (p.key === "a") {
      this.moveDirection.x += 1;
    }
    if (p.key == "d") {
      this.moveDirection.x -= 1;
    }
    if (p.key === "w") {
      this.moveDirection.y += 1;
    }
    if (p.key === "s") {
      this.moveDirection.y -= 1;
    }

    if (!this.isKeyPressed() && this.isMining) {
      this.isMining = false;
      this.targetPosition.x = this.currentTile.x;
      this.targetPosition.y = this.currentTile.y;
    }
  }
}

export default Player;
