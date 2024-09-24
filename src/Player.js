class Player {
  constructor(GRID_SIZE, SPEED) {
    this.GRID_SIZE = GRID_SIZE;
    this.SPEED = SPEED;

    this.position = { x: 0, y: 0 };
    this.targetPosition = { x: 0, y: 0 };
    this.moveDirection = { x: 0, y: 0 };
    this.playerSize = GRID_SIZE / 2;
    this.isMining = false;

    this.activeKeys = new Set();
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
    if (!this.isMining) {
      if (this.isCenteredOnGrid()) {
        if (this.isKeyPressed()) {
          this.targetPosition.x =
            this.position.x + this.moveDirection.x * this.GRID_SIZE;
          this.targetPosition.y =
            this.position.y + this.moveDirection.y * this.GRID_SIZE;
        }
      }

      const distanceX = this.targetPosition.x - this.position.x;
      const distanceY = this.targetPosition.y - this.position.y;

      if (Math.abs(distanceX) > 0 || Math.abs(distanceY) > 0) {
        this.position.x +=
          Math.sign(distanceX) * Math.min(this.SPEED, Math.abs(distanceX));
        this.position.y +=
          Math.sign(distanceY) * Math.min(this.SPEED, Math.abs(distanceY));
      }
    }
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
    this.activeKeys.add(p.key);
    this.updateMoveDirection();
  }

  handleKeyReleased(p) {
    this.activeKeys.delete(p.key);
    this.updateMoveDirection();
  }

  updateMoveDirection() {
    this.moveDirection.x = 0;
    this.moveDirection.y = 0;

    if (this.activeKeys.has("a") && !this.activeKeys.has("d")) {
      this.moveDirection.x = -1;
    } else if (this.activeKeys.has("d") && !this.activeKeys.has("a")) {
      this.moveDirection.x = 1;
    }

    if (this.activeKeys.has("w") && !this.activeKeys.has("s")) {
      this.moveDirection.y = -1;
    } else if (this.activeKeys.has("s") && !this.activeKeys.has("w")) {
      this.moveDirection.y = 1;
    }

    if (!this.isKeyPressed()) {
      this.isMining = false;
    }
  }

  clampMoveDirection() {
    this.moveDirection.x = Math.max(-1, Math.min(1, this.moveDirection.x));
    this.moveDirection.y = Math.max(-1, Math.min(1, this.moveDirection.y));
  }
}

export default Player;
