//// Animator -- an application for program-generated drawings.

import builtins
import data
import drawing
import editor
import errors
import gleam/float
import gleam/int
import gleam/list
import gleam/result
import lustre
import lustre/attribute as attr
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import parser
import render
import shape.{type Path}

/// Your app's public address, once you've deployed it in Problem 13, such as
/// "https://your-username.github.io/animator/".
pub const public_url = "https://mallard64.github.io/animator/"

/// Set to True if you would like your app's URL included in the course gallery.
pub const include_app_in_gallery = False

/// A link to your video from Problem 14, which anyone with the link can watch.
pub const video_url =
  "https://drive.google.com/file/d/1OaqmgNrdkYYm8vNTIZdAPq6q17thSAaU/view?usp=sharing"

/// Set to True if you would like your video included in the course gallery.
pub const include_video_in_gallery = False

const default_code =
  "fn draw(shape_slider: Int) -> List(Path) {\n  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]\n}\n"

// ── Model ──────────────────────────────────────────────────────────────────────

pub type Model {
  Model(
    // The code in the editor.
    source: String,
    // Every saved drawing as #(name, source), and the name of the open one.
    drawings: List(#(String, String)),
    current: String,
    // Whether the code editor is shown.
    code_open: Bool,
    // The value passed to draw.
    shape_slider: Int,
    // The animation speed as a multiple of normal; negative plays backward.
    speed: Float,
    // The message for the latest parse or evaluation error, or "" if none.
    error: String,
  )
}

pub type Msg {
  SetCode(String)
  SelectDrawing(String)
  PromptNew
  NewDrawing(String)
  SetShape(Int)
  SetSpeed(Float)

  // Layout controls
  ToggleCode
}

// ── Init ───────────────────────────────────────────────────────────────────────

pub fn init(_flags: Nil) -> #(Model, Effect(Msg)) {
  let drawings = data.load_drawings()
  let #(current, source) = case data.load_current() {
    Ok(name) ->
      case list.key_find(drawings, name) {
        Ok(source) -> #(name, source)
        Error(_) -> first_drawing(drawings)
      }
    Error(_) -> first_drawing(drawings)
  }
  #(
    Model(
      source: source,
      drawings: drawings,
      current: current,
      code_open: True,
      shape_slider: 10,
      speed: 1.0,
      error: "",
    ),
    // Effects that happen automatically at the start go here.
    effect.batch([
      editor.mount(source, SetCode),
      effect.from(fn(dispatch) { dispatch(SetCode(source)) }),
    ]),
  )
}

fn first_drawing(drawings: List(#(String, String))) -> #(String, String) {
  case drawings {
    [first, ..] -> first
    [] -> #("untitled", default_code)
  }
}

// Parse and evaluate a draw function at the given shape-slider value, returning
// the rendered paths on success, or a human-readable message on failure.
fn run_source(shape_slider: Int, source: String) -> Result(List(Path), String) {
  case parser.parse_program(source, builtins.global_frame()) {
    Error(msg) -> Error(msg)
    Ok(program) ->
      drawing.try_draw(shape_slider, program)
      // Convert Error(EvalError) to Error(String) with a useful error message.
      |> result.map_error(errors.error_message)
  }
}

// ── Update ─────────────────────────────────────────────────────────────────────

pub fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    ToggleCode -> #(Model(..model, code_open: !model.code_open), effect.none())

    // After each keystroke in the editor, evaluate user code and restart the
    // animation.
    SetCode(text) -> {
      let drawings = list.key_set(model.drawings, model.current, text)
      data.save_drawings(drawings)
      redraw(Model(..model, source: text, drawings: drawings), True)
    }

    // Open a saved drawing: show its code in a fresh editor and animate it.
    SelectDrawing(name) -> open_drawing(model, name)

    PromptNew -> #(
      model,
      effect.from(fn(dispatch) {
        dispatch(NewDrawing(data.prompt_drawing_name()))
      }),
    )

    // The dropdown's last option asks for a name, then makes an empty drawing.
    NewDrawing("") -> #(
      model,
      effect.from(fn(_) { data.sync_select(model.current) }),
    )
    NewDrawing(name) ->
      case list.key_find(model.drawings, name) {
        Ok(_) -> open_drawing(model, name)
        Error(_) ->
          open_drawing(
            Model(
              ..model,
              drawings: list.append(model.drawings, [#(name, default_code)]),
            ),
            name,
          )
      }

    // Moving the shape slider redraws without restarting the clock.
    SetShape(n) -> redraw(Model(..model, shape_slider: n), False)

    SetSpeed(rate) -> #(
      Model(..model, speed: rate),
      effect.from(fn(_) { render.set_speed(rate) }),
    )
  }
}

fn open_drawing(model: Model, name: String) -> #(Model, Effect(Msg)) {
  let source = result.unwrap(list.key_find(model.drawings, name), default_code)
  data.save_drawings(model.drawings)
  data.save_current(name)
  #(
    Model(..model, current: name, source: source),
    effect.batch([
      editor.mount(source, SetCode),
      effect.from(fn(dispatch) { dispatch(SetCode(source)) }),
    ]),
  )
}

// Evaluate the model's source at its shape slider value, then animate the
// result or report the error (keeping the last drawing).
fn redraw(model: Model, restart: Bool) -> #(Model, Effect(Msg)) {
  case run_source(model.shape_slider, model.source) {
    Ok(paths) -> #(
      Model(..model, error: ""),
      effect.from(fn(_) {
        case restart {
          True -> render.reset_clock()
          False -> Nil
        }
        render.set_drawing(rainbow(paths))
      }),
    )
    Error(msg) -> #(Model(..model, error: msg), effect.none())
  }
}

// Give each path its own starting hue, spread around the colour wheel in order;
// the canvas then cycles every hue over time.
fn rainbow(paths: List(Path)) -> List(render.RenderPath) {
  let count = int.max(list.length(paths), 1)
  list.index_map(paths, fn(path, i) {
    let hue = i * 360 / count
    render.render_path(path, "rainbow:" <> int.to_string(hue))
  })
}

// ── View ──────────────────────────────────────────────────────────────────
//
// Two side-by-side panes: the code editor on the left and its rendered output on
// the right. The code column can be hidden to expand the right pane.

pub fn view(model: Model) -> Element(Msg) {
  let app_class = case model.code_open {
    True -> "app"
    False -> "app code-hidden"
  }
  // The code column still exists even when hidden (CSS collapses it) so the
  // mounted CodeMirror editor keeps its state across show/hide.
  html.div([attr.class(app_class)], [
    html.div([attr.class("code-col")], [
      editor.view_panel(ToggleCode),
    ]),
    view_anim(model),
  ])
}

fn view_anim(model: Model) -> Element(Msg) {
  html.div([attr.class("canvas-area")], [
    view_reveal_code(model),
    html.canvas([attr.id("animation-canvas"), attr.class("canvas")]),
    view_drawing_select(model),
    view_controls(model),
    view_error(model),
  ])
}

// The dropdown of saved drawings, ending with an option to make a new one.
fn view_drawing_select(model: Model) -> Element(Msg) {
  let options =
    list.map(model.drawings, fn(d) {
      html.option([attr.value(d.0), attr.selected(d.0 == model.current)], d.0)
    })
  html.select(
    [
      attr.class("drawing-select"),
      attr.attribute("data-test-id", "drawing-select"),
      event.on_change(fn(value) {
        case value {
          "" -> PromptNew
          name -> SelectDrawing(name)
        }
      }),
    ],
    list.append(options, [html.option([attr.value("")], "+ New drawing…")]),
  )
}

// The shape and speed sliders, overlaid at the top of the animation pane.
fn view_controls(model: Model) -> Element(Msg) {
  html.div([attr.class("controls")], [
    html.label([], [
      html.text("Shape " <> int.to_string(model.shape_slider)),
      html.input([
        attr.type_("range"),
        attr.attribute("data-test-id", "shape-slider"),
        attr.min("0"),
        attr.max("100"),
        attr.step("1"),
        attr.value(int.to_string(model.shape_slider)),
        event.on_input(fn(v) {
          SetShape(result.unwrap(int.parse(v), model.shape_slider))
        }),
      ]),
    ]),
    html.label([], [
      html.text("Speed " <> float.to_string(model.speed) <> "x"),
      html.input([
        attr.type_("range"),
        attr.attribute("data-test-id", "speed-slider"),
        attr.min("-3"),
        attr.max("3"),
        attr.step("0.1"),
        attr.value(float.to_string(model.speed)),
        event.on_input(fn(v) { SetSpeed(parse_speed(v, model.speed)) }),
      ]),
    ]),
  ])
}

// Slider values can be whole numbers like "-3", which float.parse rejects.
fn parse_speed(v: String, default: Float) -> Float {
  case float.parse(v) {
    Ok(f) -> f
    Error(_) ->
      case int.parse(v) {
        Ok(i) -> int.to_float(i)
        Error(_) -> default
      }
  }
}

// The latest error message, overlaid at the bottom of the animation pane.
fn view_error(model: Model) -> Element(Msg) {
  case model.error {
    "" -> element.none()
    msg -> html.pre([attr.class("error")], [html.text(msg)])
  }
}

// The button that brings the code column back, overlaid on the top-left of the
// right pane. Nothing is rendered while the column is already showing (its own
// header holds the button that hides it).
fn view_reveal_code(model: Model) -> Element(Msg) {
  case model.code_open {
    True -> element.none()
    False ->
      html.button(
        [
          attr.class("icon-btn reveal-code"),
          attr.attribute("title", "Show code"),
          event.on_click(ToggleCode),
        ],
        [html.text("⟩")],
      )
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────

pub fn main() -> Nil {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}
