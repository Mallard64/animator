//# sourceMappingURL=decoder.mjs.map
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $dynamic from "../../gleam_stdlib/gleam/dynamic.mjs";
import * as $decode from "../../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import {
  Ok,
  toList,
  List$Empty$const as $List$Empty$const,
  CustomType as $CustomType,
  makeError,
} from "../gleam.mjs";
import { decode_tuple, decode_custom_type, decode_nil } from "../pprint_ffi.mjs";

const FILEPATH = "src/pprint/decoder.gleam";

export class TString extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TString = ($0) => new TString($0);
export const Type$isTString = (value) => value instanceof TString;
export const Type$TString$0 = (value) => value[0];

export class TInt extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TInt = ($0) => new TInt($0);
export const Type$isTInt = (value) => value instanceof TInt;
export const Type$TInt$0 = (value) => value[0];

export class TFloat extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TFloat = ($0) => new TFloat($0);
export const Type$isTFloat = (value) => value instanceof TFloat;
export const Type$TFloat$0 = (value) => value[0];

export class TBool extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TBool = ($0) => new TBool($0);
export const Type$isTBool = (value) => value instanceof TBool;
export const Type$TBool$0 = (value) => value[0];

export class TNil extends $CustomType {}
export const Type$TNil$const = new TNil();
export const Type$TNil = () => Type$TNil$const;
export const Type$isTNil = (value) => value instanceof TNil;

export class TBitArray extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TBitArray = ($0) => new TBitArray($0);
export const Type$isTBitArray = (value) => value instanceof TBitArray;
export const Type$TBitArray$0 = (value) => value[0];

export class TList extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TList = ($0) => new TList($0);
export const Type$isTList = (value) => value instanceof TList;
export const Type$TList$0 = (value) => value[0];

export class TDict extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TDict = ($0) => new TDict($0);
export const Type$isTDict = (value) => value instanceof TDict;
export const Type$TDict$0 = (value) => value[0];

export class TTuple extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TTuple = ($0) => new TTuple($0);
export const Type$isTTuple = (value) => value instanceof TTuple;
export const Type$TTuple$0 = (value) => value[0];

export class TCustom extends $CustomType {
  constructor(name, fields) {
    super();
    this.name = name;
    this.fields = fields;
  }
}
export const Type$TCustom = (name, fields) => new TCustom(name, fields);
export const Type$isTCustom = (value) => value instanceof TCustom;
export const Type$TCustom$name = (value) => value.name;
export const Type$TCustom$0 = (value) => value.name;
export const Type$TCustom$fields = (value) => value.fields;
export const Type$TCustom$1 = (value) => value.fields;

export class TForeign extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Type$TForeign = ($0) => new TForeign($0);
export const Type$isTForeign = (value) => value instanceof TForeign;
export const Type$TForeign$0 = (value) => value[0];

export class Labelled extends $CustomType {
  constructor(label, value) {
    super();
    this.label = label;
    this.value = value;
  }
}
export const Field$Labelled = (label, value) => new Labelled(label, value);
export const Field$isLabelled = (value) => value instanceof Labelled;
export const Field$Labelled$label = (value) => value.label;
export const Field$Labelled$0 = (value) => value.label;
export const Field$Labelled$value = (value) => value.value;
export const Field$Labelled$1 = (value) => value.value;

export class Positional extends $CustomType {
  constructor(value) {
    super();
    this.value = value;
  }
}
export const Field$Positional = (value) => new Positional(value);
export const Field$isPositional = (value) => value instanceof Positional;
export const Field$Positional$value = (value) => value.value;
export const Field$Positional$0 = (value) => value.value;

function tuple() {
  return $decode.new_primitive_decoder(
    "Tuple",
    (dynamic) => {
      return $result.replace_error(decode_tuple(dynamic), $List$Empty$const);
    },
  );
}

function custom_type() {
  return $decode.new_primitive_decoder(
    "CustomType",
    (dynamic) => {
      return $result.replace_error(
        decode_custom_type(dynamic),
        new TCustom("", $List$Empty$const),
      );
    },
  );
}

function nil() {
  return $decode.new_primitive_decoder("Nil", decode_nil);
}

/**
 * This decoder will always return `Ok`, as it ends with a catch-all
 * pattern returning a `TForeign`.
 * 
 * @ignore
 */
function type_decoder() {
  return $decode.recursive(
    () => {
      return $decode.one_of(
        $decode.map($decode.int, (var0) => { return new TInt(var0); }),
        toList([
          $decode.map($decode.float, (var0) => { return new TFloat(var0); }),
          $decode.map($decode.float, (var0) => { return new TFloat(var0); }),
          $decode.map($decode.string, (var0) => { return new TString(var0); }),
          $decode.map($decode.bool, (var0) => { return new TBool(var0); }),
          $decode.map(nil(), (_) => { return Type$TNil$const; }),
          $decode.map(
            $decode.bit_array,
            (var0) => { return new TBitArray(var0); },
          ),
          custom_type(),
          $decode.map(tuple(), (var0) => { return new TTuple(var0); }),
          $decode.map(
            $decode.list($decode.dynamic),
            (var0) => { return new TList(var0); },
          ),
          $decode.map(
            $decode.dict(type_decoder(), type_decoder()),
            (var0) => { return new TDict(var0); },
          ),
          $decode.map(
            $decode.dynamic,
            (value) => { return new TForeign($string.inspect(value)); },
          ),
        ]),
      );
    },
  );
}

export function classify(value) {
  let $ = $decode.run(value, type_decoder());
  let t;
  if ($ instanceof Ok) {
    t = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "pprint/decoder",
      31,
      "classify",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 679, end: 731, pattern_start: 690, pattern_end: 695 }
    )
  }
  return t;
}
