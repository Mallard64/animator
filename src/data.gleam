//// The library of saved drawings. A drawing is a name and the source of its draw
//// function.

import examples
import gleam/dynamic/decode
import gleam/json

// ── localStorage (data_ffi.mjs) ───────────────────────────────────────────────

/// The string stored in localStorage under key, or an Error if there isn't one.
@external(javascript, "./data_ffi.mjs", "storageGet")
pub fn storage_get(key: String) -> Result(String, Nil)

/// Store value in localStorage under key, replacing anything already there. If that
/// isn't possible, this logs the reason to the browser console.
@external(javascript, "./data_ffi.mjs", "storageSet")
pub fn storage_set(key: String, value: String) -> Nil

// ── The new-drawing prompt (data_ffi.mjs) ─────────────────────────────────────

/// Prompt the user to name a new drawing; "" (empty string) means they
/// cancelled or left it blank.
@external(javascript, "./data_ffi.mjs", "promptDrawingName")
pub fn prompt_drawing_name() -> String

// ── The saved library (localStorage) ──────────────────────────────────────────

const drawings_key = "animator-drawings"

const current_key = "animator-current"

/// Make the drawing dropdown show name, e.g. after a cancelled prompt left it
/// on the "new drawing" option that the app's state never changed for.
@external(javascript, "./data_ffi.mjs", "syncSelect")
pub fn sync_select(name: String) -> Nil

/// The saved drawings as #(name, source) pairs, or the examples if the browser
/// has none saved (or what it has can't be read).
pub fn load_drawings() -> List(#(String, String)) {
  let entry = {
    use name <- decode.field("name", decode.string)
    use source <- decode.field("source", decode.string)
    decode.success(#(name, source))
  }
  case storage_get(drawings_key) {
    Ok(text) ->
      case json.parse(text, decode.list(entry)) {
        Ok([_, ..] as drawings) -> drawings
        _ -> examples.all
      }
    Error(_) -> examples.all
  }
}

/// Save every drawing, with its source exactly as typed.
pub fn save_drawings(drawings: List(#(String, String))) -> Nil {
  drawings
  |> json.array(fn(d) {
    json.object([#("name", json.string(d.0)), #("source", json.string(d.1))])
  })
  |> json.to_string
  |> storage_set(drawings_key, _)
}

/// The name of the drawing that was open when the app was last used.
pub fn load_current() -> Result(String, Nil) {
  storage_get(current_key)
}

pub fn save_current(name: String) -> Nil {
  storage_set(current_key, name)
}
