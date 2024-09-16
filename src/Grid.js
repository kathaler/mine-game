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
    // Generate the grid only once
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

    const viewLeft = Math.floor(playerX - this.width / 2);
    const viewRight = Math.floor(playerX + this.width / 2);
    const viewTop = Math.floor(playerY - this.height / 2);
    const viewBottom = Math.floor(playerY + this.height / 2);

    this.generateNewTiles(viewLeft, viewRight, viewTop, viewBottom);

    this.drawGrid(p, viewLeft, viewRight, viewTop, viewBottom);
  }

  checkPlayerMining(playerX, playerY, deltaTime) {
    if (this.PLAYER.isKeyPressed()) {
      const moveDirection = this.PLAYER.moveDirection;
      const xTile = playerX + moveDirection.x;
      const yTile = playerY + moveDirection.y;

      const tile = this.tiles.get(`${xTile},${yTile}`);
      if (this.isPlayerTouchingTile(tile)) {
        this.PLAYER.isMining = true;
        tile.updateMiningProgress(deltaTime);
      }
    }
  }

  isPlayerTouchingTile(tile) {
    return tile && !tile.isMined;
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
    return this.tiles.has(`${x},${y}`);
  }
}

export default Grid;
