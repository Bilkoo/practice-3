
const NORTH = "north",
    EAST = "east",
    SOUTH = "south",
    WEST = "west";

class Rover {
    constructor(x = 0, y = 0, direction = NORTH) {
      if (!Number.isInteger(x) || !Number.isInteger(y) || !(
        direction === NORTH || direction === EAST || direction === SOUTH
      || direction === WEST)) throw new TypeError();
      this.x = x;
      this.y = y;
      this.direction = direction;
    }

    left() {
      if (this.direction === NORTH) {
        this.direction = WEST;
        return this;
      }
      if (this.direction === WEST) {
        this.direction = SOUTH;
        return this;
      }
      if (this.direction === SOUTH) {
        this.direction = EAST;
        return this;
      }
      if (this.direction === EAST) {
        this.direction = NORTH;
        return this;
      }
    }

    right() {
      if (this.direction === NORTH) {
        this.direction = EAST;
        return this;
      }
      if (this.direction === WEST) {
        this.direction = NORTH;
        return this;
      }
      if (this.direction === SOUTH) {
        this.direction = WEST;
        return this;
      }
      if (this.direction === EAST) {
        this.direction = SOUTH;
        return this;
      }
    }

    move(n) {
        if (n == undefined) return this;
        if (!Number.isInteger(n)) throw new TypeError("kek");
        if (this.direction === NORTH) this.y += n;
        if (this.direction === SOUTH) this.y -= n;
        if (this.direction === EAST) this.x += n;
        if (this.direction === WEST) this.x -= n;
        return this;
    }

    getPosition() {
      return({x: this.x, y: this.y});
    }

    getDirection() {
      return(this.direction);
    }
}

export {NORTH, WEST, EAST, SOUTH, Rover};
