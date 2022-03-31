export class GooglePoint {
  constructor(public x: number, public y: number) {}

  equals(other: GooglePoint | null): boolean {
    return !!other && other.x === this.x && other.y === this.y
  }

  toString(): string {
    return JSON.stringify({ x: this.x, y: this.y })
  }
}
