//# sourceMappingURL=app.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attr from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $builtins from "./builtins.mjs";
import * as $data from "./data.mjs";
import * as $drawing from "./drawing.mjs";
import * as $editor from "./editor.mjs";
import * as $errors from "./errors.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  divideInt,
} from "./gleam.mjs";
import * as $parser from "./parser.mjs";
import * as $render from "./render.mjs";
import * as $shape from "./shape.mjs";

const FILEPATH = "src/app.gleam";

export class Model extends $CustomType {
  constructor(source, drawings, current, code_open, shape_slider, speed, error) {
    super();
    this.source = source;
    this.drawings = drawings;
    this.current = current;
    this.code_open = code_open;
    this.shape_slider = shape_slider;
    this.speed = speed;
    this.error = error;
  }
}
export const Model$Model = (source, drawings, current, code_open, shape_slider, speed, error) =>
  new Model(source, drawings, current, code_open, shape_slider, speed, error);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$source = (value) => value.source;
export const Model$Model$0 = (value) => value.source;
export const Model$Model$drawings = (value) => value.drawings;
export const Model$Model$1 = (value) => value.drawings;
export const Model$Model$current = (value) => value.current;
export const Model$Model$2 = (value) => value.current;
export const Model$Model$code_open = (value) => value.code_open;
export const Model$Model$3 = (value) => value.code_open;
export const Model$Model$shape_slider = (value) => value.shape_slider;
export const Model$Model$4 = (value) => value.shape_slider;
export const Model$Model$speed = (value) => value.speed;
export const Model$Model$5 = (value) => value.speed;
export const Model$Model$error = (value) => value.error;
export const Model$Model$6 = (value) => value.error;

export class SetCode extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetCode = ($0) => new SetCode($0);
export const Msg$isSetCode = (value) => value instanceof SetCode;
export const Msg$SetCode$0 = (value) => value[0];

export class SelectDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectDrawing = ($0) => new SelectDrawing($0);
export const Msg$isSelectDrawing = (value) => value instanceof SelectDrawing;
export const Msg$SelectDrawing$0 = (value) => value[0];

export class PromptNew extends $CustomType {}
export const Msg$PromptNew$const = new PromptNew();
export const Msg$PromptNew = () => Msg$PromptNew$const;
export const Msg$isPromptNew = (value) => value instanceof PromptNew;

export class NewDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$NewDrawing = ($0) => new NewDrawing($0);
export const Msg$isNewDrawing = (value) => value instanceof NewDrawing;
export const Msg$NewDrawing$0 = (value) => value[0];

export class SetShape extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetShape = ($0) => new SetShape($0);
export const Msg$isSetShape = (value) => value instanceof SetShape;
export const Msg$SetShape$0 = (value) => value[0];

export class SetSpeed extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetSpeed = ($0) => new SetSpeed($0);
export const Msg$isSetSpeed = (value) => value instanceof SetSpeed;
export const Msg$SetSpeed$0 = (value) => value[0];

export class ToggleCode extends $CustomType {}
export const Msg$ToggleCode$const = new ToggleCode();
export const Msg$ToggleCode = () => Msg$ToggleCode$const;
export const Msg$isToggleCode = (value) => value instanceof ToggleCode;

const default_code = "fn draw(shape_slider: Int) -> List(Path) {\n  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]\n}\n";

/**
 * Your app's public address, once you've deployed it in Problem 13, such as
 * "https://your-username.github.io/animator/".
 */
export const public_url = "https://mallard64.github.io/animator/";

/**
 * Set to True if you would like your app's URL included in the course gallery.
 */
export const include_app_in_gallery = false;

/**
 * A link to your video from Problem 14, which anyone with the link can watch.
 */
export const video_url = "https://drive.google.com/file/d/1OaqmgNrdkYYm8vNTIZdAPq6q17thSAaU/view?usp=sharing";

/**
 * Set to True if you would like your video included in the course gallery.
 */
export const include_video_in_gallery = false;

function first_drawing(drawings) {
  if (drawings instanceof $Empty) {
    return ["untitled", default_code];
  } else {
    let first = drawings.head;
    return first;
  }
}

export function init(_) {
  let drawings = $data.load_drawings();
  let _block;
  let $1 = $data.load_current();
  if ($1 instanceof Ok) {
    let name = $1[0];
    let $2 = $list.key_find(drawings, name);
    if ($2 instanceof Ok) {
      let source = $2[0];
      _block = [name, source];
    } else {
      _block = first_drawing(drawings);
    }
  } else {
    _block = first_drawing(drawings);
  }
  let $ = _block;
  let current = $[0];
  let source = $[1];
  return [
    new Model(source, drawings, current, true, 10, 1.0, ""),
    $effect.batch(
      listPrepend(
        $editor.mount(source, (var0) => { return new SetCode(var0); }),
        listPrepend(
          $effect.from((dispatch) => { return dispatch(new SetCode(source)); }),
          $List$Empty$const,
        ),
      ),
    ),
  ];
}

function run_source(shape_slider, source) {
  let $ = $parser.parse_program(source, $builtins.global_frame());
  if ($ instanceof Ok) {
    let program = $[0];
    let _pipe = $drawing.try_draw(shape_slider, program);
    return $result.map_error(_pipe, $errors.error_message);
  } else {
    return $;
  }
}

function rainbow(paths) {
  let count = $int.max($list.length(paths), 1);
  return $list.index_map(
    paths,
    (path, i) => {
      let hue = divideInt(i * 360, count);
      return $render.render_path(path, "rainbow:" + $int.to_string(hue));
    },
  );
}

function redraw(model, restart) {
  let $ = run_source(model.shape_slider, model.source);
  if ($ instanceof Ok) {
    let paths = $[0];
    return [
      new Model(
        model.source,
        model.drawings,
        model.current,
        model.code_open,
        model.shape_slider,
        model.speed,
        "",
      ),
      $effect.from(
        (_) => {
          if (restart) {
            $render.reset_clock();
          } else {
            undefined;
          }
          return $render.set_drawing(rainbow(paths));
        },
      ),
    ];
  } else {
    let msg = $[0];
    return [
      new Model(
        model.source,
        model.drawings,
        model.current,
        model.code_open,
        model.shape_slider,
        model.speed,
        msg,
      ),
      $effect.none(),
    ];
  }
}

function open_drawing(model, name) {
  let source = $result.unwrap(
    $list.key_find(model.drawings, name),
    default_code,
  );
  $data.save_drawings(model.drawings);
  $data.save_current(name);
  return [
    new Model(
      source,
      model.drawings,
      name,
      model.code_open,
      model.shape_slider,
      model.speed,
      model.error,
    ),
    $effect.batch(
      listPrepend(
        $editor.mount(source, (var0) => { return new SetCode(var0); }),
        listPrepend(
          $effect.from((dispatch) => { return dispatch(new SetCode(source)); }),
          $List$Empty$const,
        ),
      ),
    ),
  ];
}

export function update(model, msg) {
  if (msg instanceof SetCode) {
    let text = msg[0];
    let drawings = $list.key_set(model.drawings, model.current, text);
    $data.save_drawings(drawings);
    return redraw(
      new Model(
        text,
        drawings,
        model.current,
        model.code_open,
        model.shape_slider,
        model.speed,
        model.error,
      ),
      true,
    );
  } else if (msg instanceof SelectDrawing) {
    let name = msg[0];
    return open_drawing(model, name);
  } else if (msg instanceof PromptNew) {
    return [
      model,
      $effect.from(
        (dispatch) => {
          return dispatch(new NewDrawing($data.prompt_drawing_name()));
        },
      ),
    ];
  } else if (msg instanceof NewDrawing) {
    let $ = msg[0];
    if ($ === "") {
      return [
        model,
        $effect.from((_) => { return $data.sync_select(model.current); }),
      ];
    } else {
      let name = $;
      let $1 = $list.key_find(model.drawings, name);
      if ($1 instanceof Ok) {
        return open_drawing(model, name);
      } else {
        return open_drawing(
          new Model(
            model.source,
            $list.append(
              model.drawings,
              listPrepend([name, default_code], $List$Empty$const),
            ),
            model.current,
            model.code_open,
            model.shape_slider,
            model.speed,
            model.error,
          ),
          name,
        );
      }
    }
  } else if (msg instanceof SetShape) {
    let n = msg[0];
    return redraw(
      new Model(
        model.source,
        model.drawings,
        model.current,
        model.code_open,
        n,
        model.speed,
        model.error,
      ),
      false,
    );
  } else if (msg instanceof SetSpeed) {
    let rate = msg[0];
    return [
      new Model(
        model.source,
        model.drawings,
        model.current,
        model.code_open,
        model.shape_slider,
        rate,
        model.error,
      ),
      $effect.from((_) => { return $render.set_speed(rate); }),
    ];
  } else {
    return [
      new Model(
        model.source,
        model.drawings,
        model.current,
        !model.code_open,
        model.shape_slider,
        model.speed,
        model.error,
      ),
      $effect.none(),
    ];
  }
}

function view_error(model) {
  let $ = model.error;
  if ($ === "") {
    return $element.none();
  } else {
    let msg = $;
    return $html.pre(
      listPrepend($attr.class$("error"), $List$Empty$const),
      listPrepend($html.text(msg), $List$Empty$const),
    );
  }
}

function parse_speed(v, default$) {
  let $ = $float.parse(v);
  if ($ instanceof Ok) {
    let f = $[0];
    return f;
  } else {
    let $1 = $int.parse(v);
    if ($1 instanceof Ok) {
      let i = $1[0];
      return $int.to_float(i);
    } else {
      return default$;
    }
  }
}

function view_controls(model) {
  return $html.div(
    listPrepend($attr.class$("controls"), $List$Empty$const),
    listPrepend(
      $html.label(
        $List$Empty$const,
        listPrepend(
          $html.text("Shape " + $int.to_string(model.shape_slider)),
          listPrepend(
            $html.input(
              listPrepend(
                $attr.type_("range"),
                listPrepend(
                  $attr.attribute("data-test-id", "shape-slider"),
                  listPrepend(
                    $attr.min("0"),
                    listPrepend(
                      $attr.max("100"),
                      listPrepend(
                        $attr.step("1"),
                        listPrepend(
                          $attr.value($int.to_string(model.shape_slider)),
                          listPrepend(
                            $event.on_input(
                              (v) => {
                                return new SetShape(
                                  $result.unwrap(
                                    $int.parse(v),
                                    model.shape_slider,
                                  ),
                                );
                              },
                            ),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(
        $html.label(
          $List$Empty$const,
          listPrepend(
            $html.text(("Speed " + $float.to_string(model.speed)) + "x"),
            listPrepend(
              $html.input(
                listPrepend(
                  $attr.type_("range"),
                  listPrepend(
                    $attr.attribute("data-test-id", "speed-slider"),
                    listPrepend(
                      $attr.min("-3"),
                      listPrepend(
                        $attr.max("3"),
                        listPrepend(
                          $attr.step("0.1"),
                          listPrepend(
                            $attr.value($float.to_string(model.speed)),
                            listPrepend(
                              $event.on_input(
                                (v) => {
                                  return new SetSpeed(
                                    parse_speed(v, model.speed),
                                  );
                                },
                              ),
                              $List$Empty$const,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              $List$Empty$const,
            ),
          ),
        ),
        $List$Empty$const,
      ),
    ),
  );
}

function view_drawing_select(model) {
  let options = $list.map(
    model.drawings,
    (d) => {
      return $html.option(
        listPrepend(
          $attr.value(d[0]),
          listPrepend($attr.selected(d[0] === model.current), $List$Empty$const),
        ),
        d[0],
      );
    },
  );
  return $html.select(
    listPrepend(
      $attr.class$("drawing-select"),
      listPrepend(
        $attr.attribute("data-test-id", "drawing-select"),
        listPrepend(
          $event.on_change(
            (value) => {
              if (value === "") {
                return Msg$PromptNew$const;
              } else {
                let name = value;
                return new SelectDrawing(name);
              }
            },
          ),
          $List$Empty$const,
        ),
      ),
    ),
    $list.append(
      options,
      listPrepend(
        $html.option(
          listPrepend($attr.value(""), $List$Empty$const),
          "+ New drawing…",
        ),
        $List$Empty$const,
      ),
    ),
  );
}

function view_reveal_code(model) {
  let $ = model.code_open;
  if ($) {
    return $element.none();
  } else {
    return $html.button(
      listPrepend(
        $attr.class$("icon-btn reveal-code"),
        listPrepend(
          $attr.attribute("title", "Show code"),
          listPrepend($event.on_click(Msg$ToggleCode$const), $List$Empty$const),
        ),
      ),
      listPrepend($html.text("⟩"), $List$Empty$const),
    );
  }
}

function view_anim(model) {
  return $html.div(
    listPrepend($attr.class$("canvas-area"), $List$Empty$const),
    listPrepend(
      view_reveal_code(model),
      listPrepend(
        $html.canvas(
          listPrepend(
            $attr.id("animation-canvas"),
            listPrepend($attr.class$("canvas"), $List$Empty$const),
          ),
        ),
        listPrepend(
          view_drawing_select(model),
          listPrepend(
            view_controls(model),
            listPrepend(view_error(model), $List$Empty$const),
          ),
        ),
      ),
    ),
  );
}

export function view(model) {
  let _block;
  let $ = model.code_open;
  if ($) {
    _block = "app";
  } else {
    _block = "app code-hidden";
  }
  let app_class = _block;
  return $html.div(
    listPrepend($attr.class$(app_class), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("code-col"), $List$Empty$const),
        listPrepend($editor.view_panel(Msg$ToggleCode$const), $List$Empty$const),
      ),
      listPrepend(view_anim(model), $List$Empty$const),
    ),
  );
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      338,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 10882,
        end: 10931,
        pattern_start: 10893,
        pattern_end: 10898
      }
    )
  }
  return undefined;
}
