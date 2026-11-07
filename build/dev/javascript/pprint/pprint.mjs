//# sourceMappingURL=pprint.mjs.map
import * as $doc from "../glam/glam/doc.mjs";
import * as $bit_array from "../gleam_stdlib/gleam/bit_array.mjs";
import * as $bool from "../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $dynamic from "../gleam_stdlib/gleam/dynamic.mjs";
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $io from "../gleam_stdlib/gleam/io.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "./gleam.mjs";
import * as $decoder from "./pprint/decoder.mjs";
import { from } from "./pprint_ffi.mjs";

export { from };

export class Config extends $CustomType {
  constructor(style_mode, bit_array_mode, label_mode) {
    super();
    this.style_mode = style_mode;
    this.bit_array_mode = bit_array_mode;
    this.label_mode = label_mode;
  }
}
export const Config$Config = (style_mode, bit_array_mode, label_mode) =>
  new Config(style_mode, bit_array_mode, label_mode);
export const Config$isConfig = (value) => value instanceof Config;
export const Config$Config$style_mode = (value) => value.style_mode;
export const Config$Config$0 = (value) => value.style_mode;
export const Config$Config$bit_array_mode = (value) => value.bit_array_mode;
export const Config$Config$1 = (value) => value.bit_array_mode;
export const Config$Config$label_mode = (value) => value.label_mode;
export const Config$Config$2 = (value) => value.label_mode;

/**
 * Data structures are styled with ANSI style codes.
 *
 * > ⚠️ **WARNING:** Styling is subject to change *without* a major release!
 * This means that this option should only be used for debugging purposes and
 * *should not* be used in tests.
 */
export class Styled extends $CustomType {}
export const StyleMode$Styled$const = new Styled();
export const StyleMode$Styled = () => StyleMode$Styled$const;
export const StyleMode$isStyled = (value) => value instanceof Styled;

/**
 * Everything remains unstyled.
 */
export class Unstyled extends $CustomType {}
export const StyleMode$Unstyled$const = new Unstyled();
export const StyleMode$Unstyled = () => StyleMode$Unstyled$const;
export const StyleMode$isUnstyled = (value) => value instanceof Unstyled;

/**
 * Bit arrays will be converted to strings when pretty printed.
 */
export class BitArraysAsString extends $CustomType {}
export const BitArrayMode$BitArraysAsString$const = new BitArraysAsString();
export const BitArrayMode$BitArraysAsString = () =>
  BitArrayMode$BitArraysAsString$const;
export const BitArrayMode$isBitArraysAsString = (value) =>
  value instanceof BitArraysAsString;

/**
 * Bit arrays will be kept the same.
 */
export class KeepBitArrays extends $CustomType {}
export const BitArrayMode$KeepBitArrays$const = new KeepBitArrays();
export const BitArrayMode$KeepBitArrays = () =>
  BitArrayMode$KeepBitArrays$const;
export const BitArrayMode$isKeepBitArrays = (value) =>
  value instanceof KeepBitArrays;

/**
 * Show field labels in custom types.
 * ```
 * Foo(42, bar: "bar", baz: "baz")
 * ```
 */
export class Labels extends $CustomType {}
export const LabelMode$Labels$const = new Labels();
export const LabelMode$Labels = () => LabelMode$Labels$const;
export const LabelMode$isLabels = (value) => value instanceof Labels;

/**
 * Leave out field labels.
 * ```
 * Foo(42, "bar", "baz")
 * ```
 */
export class NoLabels extends $CustomType {}
export const LabelMode$NoLabels$const = new NoLabels();
export const LabelMode$NoLabels = () => LabelMode$NoLabels$const;
export const LabelMode$isNoLabels = (value) => value instanceof NoLabels;

const max_width = 40;

const dim = "\u{001b}[2m";

const reset = "\u{001b}[0m";

const bold = "\u{001b}[1m";

const blue = "\u{001b}[38;5;4m";

const magenta = "\u{001b}[38;5;5m";

const green = "\u{001b}[38;5;2m";

const yellow = "\u{001b}[38;5;3m";

function ansi(text, code, config) {
  let text_doc = $doc.from_string(text);
  let $ = config.style_mode;
  if ($ instanceof Styled) {
    return $doc.concat(
      listPrepend(
        $doc.zero_width_string(code),
        listPrepend(
          text_doc,
          listPrepend($doc.zero_width_string(reset), $List$Empty$const),
        ),
      ),
    );
  } else {
    return text_doc;
  }
}

function comma_list_space(docs, open, close, space) {
  let _block;
  if (docs instanceof $Empty) {
    _block = $doc.empty;
  } else {
    _block = $doc.break$("", ",");
  }
  let trailing = _block;
  let _pipe = listPrepend(
    open,
    listPrepend(
      (() => {
        let _pipe = listPrepend(
          $doc.soft_break,
          listPrepend(
            $doc.concat_join(
              docs,
              listPrepend(
                $doc.from_string(","),
                listPrepend(space, $List$Empty$const),
              ),
            ),
            $List$Empty$const,
          ),
        );
        let _pipe$1 = $doc.concat(_pipe);
        return $doc.nest(_pipe$1, 2);
      })(),
      listPrepend(trailing, listPrepend(close, $List$Empty$const)),
    ),
  );
  let _pipe$1 = $doc.concat(_pipe);
  return $doc.group(_pipe$1);
}

function comma_list(docs, open, close) {
  return comma_list_space(docs, open, close, $doc.space);
}

function pretty_bit_array(bits, config) {
  let _pipe = $string.inspect(bits);
  return ansi(_pipe, magenta, config);
}

function pretty_string(string, config) {
  let _pipe = (("\"" + string) + "\"");
  return ansi(_pipe, green, config);
}

function pretty_custom_type(name, fields, config) {
  let _block;
  if (name === "Ok") {
    _block = bold;
  } else if (name === "Error") {
    _block = bold;
  } else if (name === "Some") {
    _block = bold;
  } else if (name === "None") {
    _block = bold;
  } else {
    _block = "";
  }
  let style = _block;
  let fields$1 = $list.map(
    fields,
    (field) => {
      let $ = config.label_mode;
      if (field instanceof $decoder.Labelled) {
        if ($ instanceof Labels) {
          let label = field.label;
          let value = field.value;
          return $doc.concat(
            listPrepend(
              ansi(label + ": ", dim, config),
              listPrepend(pretty_dynamic(value, config), $List$Empty$const),
            ),
          );
        } else {
          let value = field.value;
          return pretty_dynamic(value, config);
        }
      } else if ($ instanceof Labels) {
        let value = field.value;
        return pretty_dynamic(value, config);
      } else {
        let value = field.value;
        return pretty_dynamic(value, config);
      }
    },
  );
  let name$1 = ansi(name, style, config);
  let open = $doc.concat(
    listPrepend(name$1, listPrepend($doc.from_string("("), $List$Empty$const)),
  );
  let close = $doc.from_string(")");
  if (fields$1 instanceof $Empty) {
    return name$1;
  } else if (fields$1.tail instanceof $Empty) {
    let single = fields$1.head;
    return $doc.concat(
      listPrepend(
        open,
        listPrepend(single, listPrepend(close, $List$Empty$const)),
      ),
    );
  } else {
    let _pipe = fields$1;
    return comma_list(_pipe, open, close);
  }
}

function pretty_tuple(items, config) {
  let _pipe = $list.map(
    items,
    (_capture) => { return pretty_dynamic(_capture, config); },
  );
  return comma_list(_pipe, $doc.from_string("#("), $doc.from_string(")"));
}

function pretty_dict(d, config) {
  let _pipe = $dict.to_list(d);
  let _pipe$1 = $list.sort(
    _pipe,
    (one_field, other_field) => {
      let one_key = one_field[0];
      let other_key = other_field[0];
      return $string.compare(
        $string.inspect(one_key),
        $string.inspect(other_key),
      );
    },
  );
  let _pipe$2 = $list.map(
    _pipe$1,
    (field) => {
      let _pipe$2 = listPrepend(
        pretty_type(field[0], config),
        listPrepend(pretty_type(field[1], config), $List$Empty$const),
      );
      return comma_list(_pipe$2, $doc.from_string("#("), $doc.from_string(")"));
    },
  );
  return comma_list(
    _pipe$2,
    $doc.from_string("dict.from_list(["),
    $doc.from_string("])"),
  );
}

function pretty_list(items, config) {
  let items$1 = $list.map(items, $decoder.classify);
  let _block;
  if (items$1 instanceof $Empty) {
    _block = $doc.space;
  } else {
    let $ = items$1.head;
    if ($ instanceof $decoder.TInt) {
      _block = $doc.flex_space;
    } else if ($ instanceof $decoder.TFloat) {
      _block = $doc.flex_space;
    } else {
      _block = $doc.space;
    }
  }
  let space = _block;
  let _pipe = $list.map(
    items$1,
    (_capture) => { return pretty_type(_capture, config); },
  );
  return comma_list_space(
    _pipe,
    $doc.from_string("["),
    $doc.from_string("]"),
    space,
  );
}

function pretty_type(value, config) {
  if (value instanceof $decoder.TString) {
    let s = value[0];
    return pretty_string(s, config);
  } else if (value instanceof $decoder.TInt) {
    let i = value[0];
    let _pipe = $int.to_string(i);
    return ansi(_pipe, yellow, config);
  } else if (value instanceof $decoder.TFloat) {
    let f = value[0];
    let _pipe = $float.to_string(f);
    return ansi(_pipe, yellow, config);
  } else if (value instanceof $decoder.TBool) {
    let b = value[0];
    let _pipe = $bool.to_string(b);
    return ansi(_pipe, blue, config);
  } else if (value instanceof $decoder.TNil) {
    return ansi("Nil", blue, config);
  } else if (value instanceof $decoder.TBitArray) {
    let b = value[0];
    let $ = config.bit_array_mode;
    if ($ instanceof BitArraysAsString) {
      let $1 = $bit_array.to_string(b);
      if ($1 instanceof Ok) {
        let s = $1[0];
        return pretty_string(s, config);
      } else {
        return pretty_bit_array(b, config);
      }
    } else {
      return pretty_bit_array(b, config);
    }
  } else if (value instanceof $decoder.TList) {
    let items = value[0];
    return pretty_list(items, config);
  } else if (value instanceof $decoder.TDict) {
    let d = value[0];
    return pretty_dict(d, config);
  } else if (value instanceof $decoder.TTuple) {
    let items = value[0];
    return pretty_tuple(items, config);
  } else if (value instanceof $decoder.TCustom) {
    let name = value.name;
    let fields = value.fields;
    return pretty_custom_type(name, fields, config);
  } else {
    let f = value[0];
    return ansi(f, dim, config);
  }
}

function pretty_dynamic(value, config) {
  let _pipe = value;
  let _pipe$1 = $decoder.classify(_pipe);
  return pretty_type(_pipe$1, config);
}

/**
 * Pretty print a value as a string with a custom config.
 *
 * # Examples
 *
 * ```
 * [1, 2, 3, 4]
 * |> pprint.with_config(Config(Styled, KeepBitArrays, Labels))
 * ```
 */
export function with_config(value, config) {
  let _pipe = value;
  let _pipe$1 = from(_pipe);
  let _pipe$2 = pretty_dynamic(_pipe$1, config);
  return $doc.to_string(_pipe$2, max_width);
}

/**
 * Pretty print a value with the config below to stderr for debugging purposes.
 * The value is returned back from the function so it can be used in pipelines.
 *
 * ```
 * Config(Styled, KeepBitArrays, Labels)
 * ```
 *
 * # Examples
 *
 * ```
 * pprint.debug([1, 2, 3])
 * |> list.each(pprint.debug)
 *
 * // Prints:
 * // [1, 2, 3]
 * // 1
 * // 2
 * // 3
 * ```
 */
export function debug(value) {
  let _pipe = value;
  let _pipe$1 = with_config(
    _pipe,
    new Config(
      StyleMode$Styled$const,
      BitArrayMode$KeepBitArrays$const,
      LabelMode$Labels$const,
    ),
  );
  $io.println_error(_pipe$1);
  return value;
}

/**
 * Pretty print a value as a string with the following config:
 * ```
 * Config(Unstyled, BitArraysAsString, NoLabels)
 * ```
 * This function behaves identically on both targets so it can be relied upon
 * for snapshot testing.
 */
export function format(value) {
  return with_config(
    value,
    new Config(
      StyleMode$Unstyled$const,
      BitArrayMode$BitArraysAsString$const,
      LabelMode$NoLabels$const,
    ),
  );
}

/**
 * Pretty print a value as a string with the following config:
 * ```
 * Config(Styled, BitArraysAsString, NoLabels)
 * ```
 * This function behaves identically on both targets.
 *
 * > ⚠️ **WARNING:** Styling is subject to change *without* a major release!
 * This means that this function should only be used for debugging purposes and
 * *should not* be used in tests.
 */
export function styled(value) {
  return with_config(
    value,
    new Config(
      StyleMode$Styled$const,
      BitArrayMode$BitArraysAsString$const,
      LabelMode$NoLabels$const,
    ),
  );
}
