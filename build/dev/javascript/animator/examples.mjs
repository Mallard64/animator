//# sourceMappingURL=examples.mjs.map
import { List$Empty$const as $List$Empty$const, prepend as listPrepend } from "./gleam.mjs";

export const all = /* @__PURE__ */ listPrepend(
  [
    "fan",
    "fn draw(shape_slider: Int) -> List(Path) {\n  fan(30, Point(-200, -200))\n}\n\nfn fan(n: Int, start: Point) -> List(Path) {\n  case n > 0 {\n    True -> [Path(Line(start, Point(n * 10, 200)), 0, 30, 3), ..fan(n - 1, start)]\n    False -> []\n  }\n}\n",
  ],
  listPrepend(
    [
      "square_spiral",
      "fn draw(shape_slider: Int) -> List(Path) {\n  let turns = 20 + shape_slider / 4\n  spiral(Point(0, 0), Point(1, 0), 0, turns)\n}\n\nfn spiral(p: Point, d: Point, i: Int, n: Int) -> List(Path) {\n  case i == n {\n    True -> []\n    False -> {\n      let len = { i / 2 + 1 } * 24\n      let q = Point(p.x + d.x * len, p.y + d.y * len)\n      [\n        Path(Line(p, q), i * 3, i * 3 + 3, 3),\n        ..spiral(q, Point(0 - d.y, d.x), i + 1, n)\n      ]\n    }\n  }\n}\n",
    ],
    listPrepend(
      [
        "string_art",
        "fn draw(shape_slider: Int) -> List(Path) {\n  let n = 8 + shape_slider / 10\n  list.flatten([\n    quadrant(1, 1, n, 0),\n    quadrant(-1, 1, n, n + 1),\n    quadrant(-1, -1, n, { n + 1 } * 2),\n    quadrant(1, -1, n, { n + 1 } * 3),\n  ])\n}\n\nfn quadrant(sx: Int, sy: Int, n: Int, base: Int) -> List(Path) {\n  strings(0, sx, sy, n, base)\n}\n\nfn strings(i: Int, sx: Int, sy: Int, n: Int, base: Int) -> List(Path) {\n  case i > n {\n    True -> []\n    False -> {\n      let a = Point(sx * 420 * i / n, 0)\n      let b = Point(0, sy * 420 * { n - i } / n)\n      let t = { base + i } * 2\n      [Path(Line(a, b), t, t + 8, 2), ..strings(i + 1, sx, sy, n, base)]\n    }\n  }\n}\n",
      ],
      listPrepend(
        [
          "tree",
          "fn draw(shape_slider: Int) -> List(Path) {\n  let depth = 4 + shape_slider / 20\n  branch(Point(0, 420), Point(0, -220), 0, depth)\n}\n\nfn branch(p: Point, d: Point, level: Int, depth: Int) -> List(Path) {\n  case level == depth {\n    True -> []\n    False -> {\n      let q = Point(p.x + d.x, p.y + d.y)\n      let left = Point({ d.x - d.y } / 2, { d.y + d.x } / 2)\n      let right = Point({ d.x + d.y } / 2, { d.y - d.x } / 2)\n      [\n        Path(Line(p, q), level * 4, level * 4 + 4, depth - level),\n        ..list.append(\n          branch(q, left, level + 1, depth),\n          branch(q, right, level + 1, depth),\n        )\n      ]\n    }\n  }\n}\n",
        ],
        $List$Empty$const,
      ),
    ),
  ),
);
