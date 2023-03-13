class GridLayout {
  gridX: number;
  gridY: number;
  cellWidth: number;
  cellHeight: number;
  grid: any[];

  constructor(rect: number, width: number, height: number) {
    this.gridX = Math.floor(width / rect);
    this.gridY = Math.floor(height / rect);
    this.cellWidth = width / this.gridX;
    this.cellHeight = height / this.gridY;
    this.grid = [];
    for (let i = 0; i < this.gridY; i += 1) {
      this.grid[i] = [];
      for (let s = 0; s < this.gridX; s += 1) {
        this.grid[i][s] = [];
      }
    }
  }

  getCells = (e: any) => {
    const gridArray = [];
    const w1 = Math.floor((e.x - e.radius) / this.cellWidth);
    const w2 = Math.ceil((e.x + e.radius) / this.cellWidth);
    const h1 = Math.floor((e.y - e.radius) / this.cellHeight);
    const h2 = Math.ceil((e.y + e.radius) / this.cellHeight);
    for (let c = h1; c < h2; c += 1) {
      for (let l = w1; l < w2; l += 1) {
        gridArray.push(this.grid[c][l]);
      }
    }
    return gridArray;
  };

  hasCollisions = (t: any) =>
    this.getCells(t).some((e) => e.some((v: any) => this.collides(t, v)));

  collides = (t: any, a: any) => {
    if (t === a) {
      return false;
    }
    const n = t.x - a.x;
    const i = t.y - a.y;
    const r = t.radius + a.radius;
    return n * n + i * i < r * r;
  };

  add = (value: any) => {
    this.getCells(value).forEach((item) => {
      item.push(value);
    });
  };
}

const getPointPos = (width: number, height: number, length: number) => {
  const grid = new GridLayout(150, width, height);
  const posArray = [];
  const num = 500;
  const radiusArray = [20, 35, 60];
  for (let i = 0; i < length; i += 1) {
    let radius;
    let pos;
    let j = 0;
    for (let j = 0; j < num; j += 1) {
      radius = radiusArray[Math.floor(Math.random() * radiusArray.length)];
      pos = {
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        radius,
      };
      if (!grid.hasCollisions(pos)) {
        break;
      }
    }
    posArray.push(pos);
    grid.add(pos);
  }
  return posArray;
};

const getDistance = (t: any, a: any) =>
  Math.sqrt((t.x - a.x) * (t.x - a.x) + (t.y - a.y) * (t.y - a.y));

export { getDistance, getPointPos };
