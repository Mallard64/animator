//# sourceMappingURL=shape.mjs.map
import { CustomType as $CustomType } from "./gleam.mjs";

export class Point extends $CustomType {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}
export const Point$Point = (x, y) => new Point(x, y);
export const Point$isPoint = (value) => value instanceof Point;
export const Point$Point$x = (value) => value.x;
export const Point$Point$0 = (value) => value.x;
export const Point$Point$y = (value) => value.y;
export const Point$Point$1 = (value) => value.y;

export class Line extends $CustomType {
  constructor(start, end) {
    super();
    this.start = start;
    this.end = end;
  }
}
export const Shape$Line = (start, end) => new Line(start, end);
export const Shape$isLine = (value) => value instanceof Line;
export const Shape$Line$start = (value) => value.start;
export const Shape$Line$0 = (value) => value.start;
export const Shape$Line$end = (value) => value.end;
export const Shape$Line$1 = (value) => value.end;

export class Path extends $CustomType {
  constructor(shape, start, end, thickness) {
    super();
    this.shape = shape;
    this.start = start;
    this.end = end;
    this.thickness = thickness;
  }
}
export const Path$Path = (shape, start, end, thickness) =>
  new Path(shape, start, end, thickness);
export const Path$isPath = (value) => value instanceof Path;
export const Path$Path$shape = (value) => value.shape;
export const Path$Path$0 = (value) => value.shape;
export const Path$Path$start = (value) => value.start;
export const Path$Path$1 = (value) => value.start;
export const Path$Path$end = (value) => value.end;
export const Path$Path$2 = (value) => value.end;
export const Path$Path$thickness = (value) => value.thickness;
export const Path$Path$3 = (value) => value.thickness;
