import Tile from "./Tile.js";
import { convertToScreenPosition } from "./utils";

class Grid {
  constructor(size, player, width, height) {
    this.GRID_SIZE = size;
    this.PLAYER = player;

    this.width = width;
    this.height = height;

    this.tiles = new Map();
  }

  initializeGrid() {
    const startX = this.PLAYER.position.x - 2;
    const endX = this.PLAYER.position.x + 2;
    const startY = this.PLAYER.position.y - 2;
    const endY = this.PLAYER.position.y + 2;

    for (let x = -this.width / 2; x <= this.width / 2; x += 1) {
      for (let y = -this.height / 2; y <= this.height / 2; y += 1) {
        const tile = new Tile(x, y, this.GRID_SIZE);
        if (x >= startX && x <= endX && y >= startY && y <= endY) {
          tile.mine();
        }
        this.tiles.set(`${x},${y}`, tile);
      }
    }
  }

  drawGrid(p, viewLeft, viewRight, viewTop, viewBottom) {
    p.push();
    p.stroke(75);

    for (let x = viewLeft; x <= viewRight; x++) {
      for (let y = viewTop; y <= viewBottom; y++) {
        const tile = this.tiles.get(`${x},${y}`);
        if (tile && !tile.isMined) {
          tile.draw(p);
        }
      }
    }

    p.pop();
  }

  updateGrid(p) {
    const deltaTime = p.deltaTime;
    const { x: playerX, y: playerY } = convertToScreenPosition(
      this.PLAYER.position.x,
      this.PLAYER.position.y,
      this.GRID_SIZE
    );

    this.checkPlayerMining(playerX, playerY, deltaTime);
    this.PLAYER.moveDirection = this.isMovementBlocked(
      this.PLAYER.position,
      this.PLAYER.moveDirection
    );

    const viewLeft = Math.floor(playerX - this.width / 2);
    const viewRight = Math.floor(playerX + this.width / 2);
    const viewTop = Math.floor(playerY - this.height / 2);
    const viewBottom = Math.floor(playerY + this.height / 2);

    this.generateNewTiles(viewLeft, viewRight, viewTop, viewBottom);

    this.drawGrid(p, viewLeft, viewRight, viewTop, viewBottom);
  }

  isMovementBlocked(playerPosition, moveDirection) {
    const { x, y } = convertToScreenPosition(
      playerPosition.x,
      playerPosition.y,
      this.GRID_SIZE
    );
    const { x: moveX, y: moveY } = moveDirection;

    console.log(x, y, moveX, moveY);

    if (moveX !== 0 && moveY !== 0) {
      const horizontalTile = this.doesTileExist(x + moveX, y);
      const verticalTile = this.doesTileExist(x, y + moveY);

      if (horizontalTile && verticalTile) {
        return { x: moveX, y: 0 };
      }

      if (horizontalTile) {
        return { x: 0, y: moveY };
      }

      if (verticalTile) {
        return { x: moveX, y: 0 };
      }
    }

    return moveDirection;
  }

  checkPlayerMining(playerX, playerY, deltaTime) {
    if (!this.PLAYER.isKeyPressed()) {
      this.PLAYER.isMining = false;
      return;
    }

    const { x, y } = this.PLAYER.moveDirection;
    const miningDirection = x !== 0 && y !== 0 ? { x: 0, y } : { x, y };

    if (miningDirection.x === 0 && miningDirection.y === 0) {
      this.PLAYER.isMining = false;
      return;
    }

    const xTile = playerX + miningDirection.x;
    const yTile = playerY + miningDirection.y;
    const tile = this.tiles.get(`${xTile},${yTile}`);

    if (tile && !tile.isMined) {
      this.PLAYER.isMining = true;
      tile.updateMiningProgress(deltaTime);
      if (tile.isMined) {
        this.PLAYER.isMining = false;
      }
    } else {
      this.PLAYER.isMining = false;
    }
  }

  generateNewTiles(viewLeft, viewRight, viewTop, viewBottom) {
    const extra = this.GRID_SIZE * 2;
    let tileCount = 0;
    const maxTilesPerFrame = 10;

    for (
      let x = viewLeft;
      x <= viewRight && tileCount < maxTilesPerFrame;
      x += 1
    ) {
      if (!this.doesTileExist(x, viewTop)) {
        const tile = new Tile(x, viewTop, this.GRID_SIZE);
        this.tiles.set(`${x},${viewTop}`, tile);
        tileCount++;
      }
      if (!this.doesTileExist(x, viewBottom) && tileCount < maxTilesPerFrame) {
        const tile = new Tile(x, viewBottom, this.GRID_SIZE);
        this.tiles.set(`${x},${viewBottom}`, tile);
        tileCount++;
      }
    }

    for (
      let y = viewTop;
      y <= viewBottom && tileCount < maxTilesPerFrame;
      y += 1
    ) {
      if (!this.doesTileExist(viewLeft, y)) {
        const tile = new Tile(viewLeft, y, this.GRID_SIZE);
        this.tiles.set(`${viewLeft},${y}`, tile);
        tileCount++;
      }
      if (!this.doesTileExist(viewRight, y) && tileCount < maxTilesPerFrame) {
        const tile = new Tile(viewRight, y, this.GRID_SIZE);
        this.tiles.set(`${viewRight},${y}`, tile);
        tileCount++;
      }
    }
  }

  doesTileExist(x, y) {
    return this.tiles.has(`${x},${y}`) && !this.tiles.get(`${x},${y}`).isMined;
  }
}

export default Grid;
