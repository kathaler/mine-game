import Tile from "./Tile.js";

class Grid {
  constructor(size, player) {
    this.GRID_SIZE = size;
    this.PLAYER = player;
    this.tiles = [];
    this.minedTiles = new Set();
  }

  generateGrid(width, height) {
    // Generate the grid only once
    const startX = this.PLAYER.position.x - 2 * this.GRID_SIZE;
    const endX = this.PLAYER.position.x + 2 * this.GRID_SIZE;
    const startY = this.PLAYER.position.y - 2 * this.GRID_SIZE;
    const endY = this.PLAYER.position.y + 2 * this.GRID_SIZE;

    for (let x = 0; x <= width; x += this.GRID_SIZE) {
      for (let y = 0; y <= height; y += this.GRID_SIZE) {
        if (x >= startX && x <= endX && y >= startY && y <= endY) {
          continue;
        }
        const tile = new Tile(x, y, this.GRID_SIZE);
        this.tiles.push(tile);
      }
    }
  }

  drawGrid(p) {
   p.push();
   p.stroke(75);

   const extra = this.GRID_SIZE * 2;
 
   const { x: playerX, y: playerY } = this.PLAYER.position;
   const viewLeft = (playerX - p.width / 2) - extra;
   const viewRight = (playerX + p.width / 2) + extra;
   const viewTop = (playerY - p.height / 2) - extra;
   const viewBottom = (playerY + p.height / 2) + extra;
 
   for (const tile of this.tiles) {
     if (tile.x + this.GRID_SIZE >= viewLeft && tile.x <= viewRight &&
         tile.y + this.GRID_SIZE >= viewTop && tile.y <= viewBottom) {
       tile.draw(p);
     }
   }
 
   p.pop();
 }

  updateGrid(p) {
    const { x: playerX, y: playerY } = this.PLAYER.position;

    const viewLeft =
      Math.floor((playerX - p.width / 2) / this.GRID_SIZE) * this.GRID_SIZE;
    const viewRight =
      Math.floor((playerX + p.width / 2) / this.GRID_SIZE) * this.GRID_SIZE;
    const viewTop =
      Math.floor((playerY - p.height / 2) / this.GRID_SIZE) * this.GRID_SIZE;
    const viewBottom =
      Math.floor((playerY + p.height / 2) / this.GRID_SIZE) * this.GRID_SIZE;

    this.generateNewTiles(viewLeft, viewRight, viewTop, viewBottom);
    this.removeTouchedTiles(playerX, playerY);
  }

  removeTouchedTiles(playerX, playerY) {
    const playerLeft = playerX;
    const playerRight = playerX + this.GRID_SIZE;
    const playerTop = playerY;
    const playerBottom = playerY + this.GRID_SIZE;

    this.tiles = this.tiles.filter((tile) => {
      const tileLeft = tile.x;
      const tileRight = tile.x + this.GRID_SIZE;
      const tileTop = tile.y;
      const tileBottom = tile.y + this.GRID_SIZE;

      const overlapX = playerRight > tileLeft && playerLeft < tileRight;
      const overlapY = playerBottom > tileTop && playerTop < tileBottom;

      if (overlapX && overlapY) {
        this.minedTiles.add(`${tile.x},${tile.y}`); // Add to mined tiles
      }

      return !(overlapX && overlapY);
    });
  }

  generateNewTiles(viewLeft, viewRight, viewTop, viewBottom) {
   const extra = this.GRID_SIZE * 2;
   for (let x = viewLeft; x <= viewRight+extra; x += this.GRID_SIZE) {
     if (!this.isTileMinedOrDoesTileExist(x, viewTop - this.GRID_SIZE)) {
       const tile = new Tile(x, viewTop - this.GRID_SIZE, this.GRID_SIZE);
       this.tiles.push(tile);
     }
     if (!this.isTileMinedOrDoesTileExist(x, viewBottom + this.GRID_SIZE)) {
       const tile = new Tile(x, viewBottom + this.GRID_SIZE, this.GRID_SIZE);
       this.tiles.push(tile);
     }
   }

   for (let y = viewTop; y <= viewBottom+extra; y += this.GRID_SIZE) {
     if (!this.isTileMinedOrDoesTileExist(viewLeft - this.GRID_SIZE, y)) {
       const tile = new Tile(viewLeft - this.GRID_SIZE, y, this.GRID_SIZE);
       this.tiles.push(tile);
     }
     if (!this.isTileMinedOrDoesTileExist(viewRight + this.GRID_SIZE, y)) {
       const tile = new Tile(viewRight + this.GRID_SIZE, y, this.GRID_SIZE);
       this.tiles.push(tile);
     }
   }
 }

  isTileMinedOrDoesTileExist(x, y) {
      return this.isTileMined(x, y) || this.doesTileExist(x, y);
  }

  isTileMined(x ,y) {
   return this.minedTiles.has(`${x},${y}`);
  }

  doesTileExist(x, y) {
      return this.tiles.some((tile) => tile.x === x && tile.y === y);
  }
}

export default Grid;
