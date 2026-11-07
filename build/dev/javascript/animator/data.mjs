//# sourceMappingURL=data.mjs.map
import * as $json from "../gleam_json/gleam/json.mjs";
import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import {
  storageGet as storage_get,
  storageSet as storage_set,
  promptDrawingName as prompt_drawing_name,
  syncSelect as sync_select,
} from "./data_ffi.mjs";
import * as $examples from "./examples.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
} from "./gleam.mjs";

export { prompt_drawing_name, storage_get, storage_set, sync_select };

const drawings_key = "animator-drawings";

const current_key = "animator-current";

/**
 * The saved drawings as #(name, source) pairs, or the examples if the browser
 * has none saved (or what it has can't be read).
 */
export function load_drawings() {
  let entry = $decode.field(
    "name",
    $decode.string,
    (name) => {
      return $decode.field(
        "source",
        $decode.string,
        (source) => { return $decode.success([name, source]); },
      );
    },
  );
  let $ = storage_get(drawings_key);
  if ($ instanceof Ok) {
    let text = $[0];
    let $1 = $json.parse(text, $decode.list(entry));
    if ($1 instanceof Ok) {
      let $2 = $1[0];
      if ($2 instanceof $Empty) {
        return $examples.all;
      } else {
        let drawings = $2;
        return drawings;
      }
    } else {
      return $examples.all;
    }
  } else {
    return $examples.all;
  }
}

/**
 * Save every drawing, with its source exactly as typed.
 */
export function save_drawings(drawings) {
  let _pipe = drawings;
  let _pipe$1 = $json.array(
    _pipe,
    (d) => {
      return $json.object(
        listPrepend(
          ["name", $json.string(d[0])],
          listPrepend(["source", $json.string(d[1])], $List$Empty$const),
        ),
      );
    },
  );
  let _pipe$2 = $json.to_string(_pipe$1);
  return ((_capture) => { return storage_set(drawings_key, _capture); })(
    _pipe$2,
  );
}

/**
 * The name of the drawing that was open when the app was last used.
 */
export function load_current() {
  return storage_get(current_key);
}

export function save_current(name) {
  return storage_set(current_key, name);
}
