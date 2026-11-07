//# sourceMappingURL=glexer.mjs.map
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { Some, Option$None$const } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $splitter from "../splitter/splitter.mjs";
import {
  Ok,
  Error,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "./gleam.mjs";
import { string_length as length, slice_bytes, drop_byte } from "./glexer.ffi.mjs";
import * as $token from "./glexer/token.mjs";

class Lexer extends $CustomType {
  constructor(original_source, source, byte_offset, preserve_whitespace, preserve_comments, mode, newlines) {
    super();
    this.original_source = original_source;
    this.source = source;
    this.byte_offset = byte_offset;
    this.preserve_whitespace = preserve_whitespace;
    this.preserve_comments = preserve_comments;
    this.mode = mode;
    this.newlines = newlines;
  }
}

class Normal extends $CustomType {}
const LexerMode$Normal$const = new Normal();

class CheckForMinus extends $CustomType {}
const LexerMode$CheckForMinus$const = new CheckForMinus();

class CheckForNestedDot extends $CustomType {}
const LexerMode$CheckForNestedDot$const = new CheckForNestedDot();

class CheckForNestedDotOrMinus extends $CustomType {}
const LexerMode$CheckForNestedDotOrMinus$const = new CheckForNestedDotOrMinus();

class HasNestedDot extends $CustomType {}
const LexerMode$HasNestedDot$const = new HasNestedDot();

export class Position extends $CustomType {
  constructor(byte_offset) {
    super();
    this.byte_offset = byte_offset;
  }
}
export const Position$Position = (byte_offset) => new Position(byte_offset);
export const Position$isPosition = (value) => value instanceof Position;
export const Position$Position$byte_offset = (value) => value.byte_offset;
export const Position$Position$0 = (value) => value.byte_offset;

class RegularComment extends $CustomType {}
const CommentKind$RegularComment$const = new RegularComment();

class DocComment extends $CustomType {}
const CommentKind$DocComment$const = new DocComment();

class ModuleComment extends $CustomType {}
const CommentKind$ModuleComment$const = new ModuleComment();

class LexInt extends $CustomType {}
const LexNumberMode$LexInt$const = new LexInt();

class LexFloat extends $CustomType {}
const LexNumberMode$LexFloat$const = new LexFloat();

class LexFloatExponent extends $CustomType {}
const LexNumberMode$LexFloatExponent$const = new LexFloatExponent();

export function new$(source) {
  return new Lexer(
    source,
    source,
    0,
    true,
    true,
    LexerMode$Normal$const,
    $splitter.new$(listPrepend("\r\n", listPrepend("\n", $List$Empty$const))),
  );
}

export function discard_whitespace(lexer) {
  return new Lexer(
    lexer.original_source,
    lexer.source,
    lexer.byte_offset,
    false,
    lexer.preserve_comments,
    lexer.mode,
    lexer.newlines,
  );
}

export function discard_comments(lexer) {
  return new Lexer(
    lexer.original_source,
    lexer.source,
    lexer.byte_offset,
    lexer.preserve_whitespace,
    false,
    lexer.mode,
    lexer.newlines,
  );
}

function some_token(result) {
  let lexer = result[0];
  let token$1 = result[1];
  return [lexer, new Some(token$1)];
}

function advance(lexer, source, offset) {
  return new Lexer(
    lexer.original_source,
    source,
    lexer.byte_offset + offset,
    lexer.preserve_whitespace,
    lexer.preserve_comments,
    lexer.mode,
    lexer.newlines,
  );
}

function advanced(token, lexer, source, offset) {
  return [advance(lexer, source, offset), token];
}

function token(lexer, token, source, offset) {
  let _pipe = [token, new Position(lexer.byte_offset)];
  let _pipe$1 = advanced(_pipe, lexer, source, offset);
  return some_token(_pipe$1);
}

function lex_uppercase_name(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 97) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 98) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 99) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 100) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 101) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 102) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 103) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 104) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 105) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 106) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 107) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 108) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 109) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 110) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 111) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 112) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 113) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 114) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 115) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 116) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 117) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 118) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 119) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 120) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 121) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 122) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 65) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 66) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 67) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 68) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 69) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 70) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 71) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 72) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 73) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 74) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 75) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 76) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 77) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 78) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 79) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 80) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 81) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 82) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 83) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 84) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 85) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 86) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 87) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 88) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 89) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 90) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 50) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 51) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 52) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 53) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 54) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 55) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 56) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 57) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let name = slice_bytes(lexer.original_source, start, slice_size);
      return [lexer, name];
    }
  }
}

function lex_lowercase_name(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 97) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 98) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 99) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 100) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 101) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 102) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 103) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 104) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 105) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 106) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 107) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 108) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 109) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 110) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 111) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 112) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 113) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 114) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 115) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 116) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 117) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 118) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 119) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 120) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 121) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 122) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 50) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 51) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 52) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 53) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 54) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 55) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 56) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 57) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 95) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let name = slice_bytes(lexer.original_source, start, slice_size);
      return [lexer, name];
    }
  }
}

function lex_string(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 34) {
      let source = $.slice(1);
      let content = slice_bytes(lexer.original_source, start + 1, slice_size);
      let _pipe = [new $token.String(content), new Position(start)];
      let _pipe$1 = advanced(_pipe, lexer, source, 1);
      return some_token(_pipe$1);
    } else if ($1 === 92) {
      let source = $.slice(1);
      let $2 = $string.pop_grapheme(source);
      if ($2 instanceof Ok) {
        let grapheme = $2[0][0];
        let source$1 = $2[0][1];
        let offset = 1 + length(grapheme);
        let _pipe = advance(lexer, source$1, offset);
        loop$lexer = _pipe;
        loop$start = start;
        loop$slice_size = slice_size + offset;
      } else {
        let _pipe = advance(lexer, source, 1);
        loop$lexer = _pipe;
        loop$start = start;
        loop$slice_size = slice_size + 1;
      }
    } else if ($ === "") {
      let content = slice_bytes(lexer.original_source, start + 1, slice_size);
      return [
        lexer,
        new Some([new $token.UnterminatedString(content), new Position(start)]),
      ];
    } else {
      let _pipe = advance(lexer, drop_byte(lexer.source), 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    }
  }
}

function lex_number(loop$lexer, loop$mode, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let mode = loop$mode;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 95) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 50) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 51) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 52) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 53) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 54) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 55) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 56) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 57) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$mode = mode;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 46) {
      if (mode instanceof LexInt) {
        let source = $.slice(1);
        let _pipe = advance(lexer, source, 1);
        loop$lexer = _pipe;
        loop$mode = LexNumberMode$LexFloat$const;
        loop$start = start;
        loop$slice_size = slice_size + 1;
      } else if (mode instanceof LexFloat) {
        let lexer$1 = new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$CheckForMinus$const,
          lexer.newlines,
        );
        let content = slice_bytes(lexer$1.original_source, start, slice_size);
        return [
          lexer$1,
          new Some([new $token.Float(content), new Position(start)]),
        ];
      } else {
        let lexer$1 = new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$CheckForMinus$const,
          lexer.newlines,
        );
        let content = slice_bytes(lexer$1.original_source, start, slice_size);
        return [
          lexer$1,
          new Some([new $token.Float(content), new Position(start)]),
        ];
      }
    } else if ($.startsWith("e-")) {
      if (mode instanceof LexInt) {
        let lexer$1 = new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$CheckForMinus$const,
          lexer.newlines,
        );
        let content = slice_bytes(lexer$1.original_source, start, slice_size);
        return [
          lexer$1,
          new Some([new $token.Int(content), new Position(start)]),
        ];
      } else if (mode instanceof LexFloat) {
        let source = $.slice(2);
        let _pipe = advance(lexer, source, 2);
        loop$lexer = _pipe;
        loop$mode = LexNumberMode$LexFloatExponent$const;
        loop$start = start;
        loop$slice_size = slice_size + 2;
      } else {
        let lexer$1 = new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$CheckForMinus$const,
          lexer.newlines,
        );
        let content = slice_bytes(lexer$1.original_source, start, slice_size);
        return [
          lexer$1,
          new Some([new $token.Float(content), new Position(start)]),
        ];
      }
    } else if ($1 === 101) {
      if (mode instanceof LexInt) {
        let lexer$1 = new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$CheckForMinus$const,
          lexer.newlines,
        );
        let content = slice_bytes(lexer$1.original_source, start, slice_size);
        return [
          lexer$1,
          new Some([new $token.Int(content), new Position(start)]),
        ];
      } else if (mode instanceof LexFloat) {
        let source = $.slice(1);
        let _pipe = advance(lexer, source, 1);
        loop$lexer = _pipe;
        loop$mode = LexNumberMode$LexFloatExponent$const;
        loop$start = start;
        loop$slice_size = slice_size + 1;
      } else {
        let lexer$1 = new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$CheckForMinus$const,
          lexer.newlines,
        );
        let content = slice_bytes(lexer$1.original_source, start, slice_size);
        return [
          lexer$1,
          new Some([new $token.Float(content), new Position(start)]),
        ];
      }
    } else if (mode instanceof LexInt) {
      let lexer$1 = new Lexer(
        lexer.original_source,
        lexer.source,
        lexer.byte_offset,
        lexer.preserve_whitespace,
        lexer.preserve_comments,
        LexerMode$CheckForMinus$const,
        lexer.newlines,
      );
      let content = slice_bytes(lexer$1.original_source, start, slice_size);
      return [lexer$1, new Some([new $token.Int(content), new Position(start)])];
    } else if (mode instanceof LexFloat) {
      let lexer$1 = new Lexer(
        lexer.original_source,
        lexer.source,
        lexer.byte_offset,
        lexer.preserve_whitespace,
        lexer.preserve_comments,
        LexerMode$CheckForMinus$const,
        lexer.newlines,
      );
      let content = slice_bytes(lexer$1.original_source, start, slice_size);
      return [
        lexer$1,
        new Some([new $token.Float(content), new Position(start)]),
      ];
    } else {
      let lexer$1 = new Lexer(
        lexer.original_source,
        lexer.source,
        lexer.byte_offset,
        lexer.preserve_whitespace,
        lexer.preserve_comments,
        LexerMode$CheckForMinus$const,
        lexer.newlines,
      );
      let content = slice_bytes(lexer$1.original_source, start, slice_size);
      return [
        lexer$1,
        new Some([new $token.Float(content), new Position(start)]),
      ];
    }
  }
}

function lex_hexadecimal(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 95) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 50) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 51) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 52) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 53) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 54) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 55) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 56) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 57) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 97) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 65) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 98) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 66) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 99) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 67) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 100) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 68) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 101) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 69) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 102) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 70) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let content = slice_bytes(lexer.original_source, start, slice_size);
      return [lexer, new Some([new $token.Int(content), new Position(start)])];
    }
  }
}

function lex_octal(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 95) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 50) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 51) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 52) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 53) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 54) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 55) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let content = slice_bytes(lexer.original_source, start, slice_size);
      return [lexer, new Some([new $token.Int(content), new Position(start)])];
    }
  }
}

function lex_binary(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 95) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let content = slice_bytes(lexer.original_source, start, slice_size);
      return [lexer, new Some([new $token.Int(content), new Position(start)])];
    }
  }
}

function comment(lexer, kind, start) {
  let $ = $splitter.split_before(lexer.newlines, lexer.source);
  let prefix = $[0];
  let suffix = $[1];
  let eaten = length(prefix);
  let lexer$1 = advance(lexer, suffix, eaten);
  let _block;
  if (kind instanceof RegularComment) {
    _block = new $token.CommentNormal(prefix);
  } else if (kind instanceof DocComment) {
    _block = new $token.CommentDoc(prefix);
  } else {
    _block = new $token.CommentModule(prefix);
  }
  let token$1 = _block;
  return [lexer$1, new Some([token$1, new Position(start)])];
}

/**
 * Ignores the rest of the line until it finds a newline, and signals the
 * caller to continue lexing.
 * 
 * @ignore
 */
function skip_comment(lexer) {
  let $ = $splitter.split_before(lexer.newlines, lexer.source);
  let prefix = $[0];
  let suffix = $[1];
  let eaten = length(prefix);
  let lexer$1 = advance(lexer, suffix, eaten);
  return [lexer$1, Option$None$const];
}

function whitespace(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 32) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 9) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 10) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 13) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let $2 = lexer.preserve_whitespace;
      if ($2) {
        let content = slice_bytes(lexer.original_source, start, slice_size);
        return [
          lexer,
          new Some([new $token.Space(content), new Position(start)]),
        ];
      } else {
        return [lexer, Option$None$const];
      }
    }
  }
}

function lex_digits(loop$lexer, loop$start, loop$slice_size) {
  while (true) {
    let lexer = loop$lexer;
    let start = loop$start;
    let slice_size = loop$slice_size;
    let $ = lexer.source;
    let $1 = $.charCodeAt(0);
    if ($1 === 48) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 49) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 50) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 51) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 52) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 53) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 54) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 55) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 56) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else if ($1 === 57) {
      let source = $.slice(1);
      let _pipe = advance(lexer, source, 1);
      loop$lexer = _pipe;
      loop$start = start;
      loop$slice_size = slice_size + 1;
    } else {
      let digits = slice_bytes(lexer.original_source, start, slice_size);
      return [lexer, digits];
    }
  }
}

function check_for_minus(lexer) {
  let $ = lexer.source;
  if ($.charCodeAt(0) === 45) {
    let source = $.slice(1);
    let $1 = token(lexer, $token.Token$Minus$const, source, 1);
    let lexer$1 = $1[0];
    let token$1 = $1[1];
    return new Ok(
      [
        new Lexer(
          lexer$1.original_source,
          lexer$1.source,
          lexer$1.byte_offset,
          lexer$1.preserve_whitespace,
          lexer$1.preserve_comments,
          LexerMode$Normal$const,
          lexer$1.newlines,
        ),
        token$1,
      ],
    );
  } else {
    return new Error(undefined);
  }
}

function check_for_nested_dot(lexer) {
  let $ = lexer.source;
  if ($.startsWith("..")) {
    let source = $.slice(2);
    return new Ok(token(lexer, $token.Token$DotDot$const, source, 2));
  } else if ($.charCodeAt(0) === 46) {
    let source = $.slice(1);
    let $1 = source.charCodeAt(0);
    if ($1 === 48) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 49) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 50) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 51) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 52) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 53) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 54) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 55) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 56) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else if ($1 === 57) {
      let $2 = token(lexer, $token.Token$Dot$const, source, 1);
      let lexer$1 = $2[0];
      let token$1 = $2[1];
      return new Ok(
        [
          new Lexer(
            lexer$1.original_source,
            lexer$1.source,
            lexer$1.byte_offset,
            lexer$1.preserve_whitespace,
            lexer$1.preserve_comments,
            LexerMode$HasNestedDot$const,
            lexer$1.newlines,
          ),
          token$1,
        ],
      );
    } else {
      return new Ok(token(lexer, $token.Token$Dot$const, source, 1));
    }
  } else {
    return new Error(undefined);
  }
}

function next(lexer) {
  let $ = lexer.mode;
  if ($ instanceof Normal) {
    let $1 = lexer.source;
    let $2 = $1.charCodeAt(0);
    if ($2 === 32) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return whitespace(_pipe, lexer.byte_offset, 1);
    } else if ($2 === 10) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return whitespace(_pipe, lexer.byte_offset, 1);
    } else if ($2 === 13) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return whitespace(_pipe, lexer.byte_offset, 1);
    } else if ($2 === 9) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return whitespace(_pipe, lexer.byte_offset, 1);
    } else if ($1.startsWith("////")) {
      let source = $1.slice(4);
      let $3 = lexer.preserve_comments;
      if ($3) {
        let _pipe = advance(lexer, source, 4);
        return comment(
          _pipe,
          CommentKind$ModuleComment$const,
          lexer.byte_offset,
        );
      } else {
        return skip_comment(lexer);
      }
    } else if ($1.startsWith("///")) {
      let source = $1.slice(3);
      let $3 = lexer.preserve_comments;
      if ($3) {
        let _pipe = advance(lexer, source, 3);
        return comment(_pipe, CommentKind$DocComment$const, lexer.byte_offset);
      } else {
        return skip_comment(lexer);
      }
    } else if ($1.startsWith("//")) {
      let source = $1.slice(2);
      let $3 = lexer.preserve_comments;
      if ($3) {
        let _pipe = advance(lexer, source, 2);
        return comment(
          _pipe,
          CommentKind$RegularComment$const,
          lexer.byte_offset,
        );
      } else {
        return skip_comment(lexer);
      }
    } else if ($2 === 40) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$LeftParen$const, source, 1);
    } else if ($2 === 41) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$RightParen$const, source, 1);
    } else if ($2 === 123) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$LeftBrace$const, source, 1);
    } else if ($2 === 125) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$RightBrace$const, source, 1);
    } else if ($2 === 91) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$LeftSquare$const, source, 1);
    } else if ($2 === 93) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$RightSquare$const, source, 1);
    } else if ($2 === 64) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$At$const, source, 1);
    } else if ($2 === 58) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Colon$const, source, 1);
    } else if ($2 === 44) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Comma$const, source, 1);
    } else if ($1.startsWith("..")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$DotDot$const, source, 2);
    } else if ($2 === 46) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Dot$const, source, 1);
    } else if ($2 === 35) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Hash$const, source, 1);
    } else if ($1.startsWith("!=")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$NotEqual$const, source, 2);
    } else if ($2 === 33) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Bang$const, source, 1);
    } else if ($1.startsWith("==")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$EqualEqual$const, source, 2);
    } else if ($2 === 61) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Equal$const, source, 1);
    } else if ($1.startsWith("|>")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$Pipe$const, source, 2);
    } else if ($1.startsWith("||")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$VBarVBar$const, source, 2);
    } else if ($2 === 124) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$VBar$const, source, 1);
    } else if ($1.startsWith("&&")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$AmperAmper$const, source, 2);
    } else if ($1.startsWith("<<")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$LessLess$const, source, 2);
    } else if ($1.startsWith(">>")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$GreaterGreater$const, source, 2);
    } else if ($1.startsWith("<-")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$LeftArrow$const, source, 2);
    } else if ($1.startsWith("->")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$RightArrow$const, source, 2);
    } else if ($1.startsWith("<>")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$LessGreater$const, source, 2);
    } else if ($1.startsWith("+.")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$PlusDot$const, source, 2);
    } else if ($1.startsWith("-.")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$MinusDot$const, source, 2);
    } else if ($1.startsWith("*.")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$StarDot$const, source, 2);
    } else if ($1.startsWith("/.")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$SlashDot$const, source, 2);
    } else if ($1.startsWith("<=.")) {
      let source = $1.slice(3);
      return token(lexer, $token.Token$LessEqualDot$const, source, 3);
    } else if ($1.startsWith("<.")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$LessDot$const, source, 2);
    } else if ($1.startsWith(">=.")) {
      let source = $1.slice(3);
      return token(lexer, $token.Token$GreaterEqualDot$const, source, 3);
    } else if ($1.startsWith(">.")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$GreaterDot$const, source, 2);
    } else if ($1.startsWith("0b")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_binary(_pipe, lexer.byte_offset, 2);
    } else if ($1.startsWith("0o")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_octal(_pipe, lexer.byte_offset, 2);
    } else if ($1.startsWith("0x")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_hexadecimal(_pipe, lexer.byte_offset, 2);
    } else if ($2 === 48) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 49) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 50) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 51) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 52) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 53) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 54) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 55) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 56) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($2 === 57) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 1);
    } else if ($1.startsWith("-0")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-1")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-2")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-3")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-4")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-5")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-6")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-7")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-8")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($1.startsWith("-9")) {
      let source = $1.slice(2);
      let _pipe = advance(lexer, source, 2);
      return lex_number(_pipe, LexNumberMode$LexInt$const, lexer.byte_offset, 2);
    } else if ($2 === 43) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Plus$const, source, 1);
    } else if ($2 === 45) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Minus$const, source, 1);
    } else if ($2 === 42) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Star$const, source, 1);
    } else if ($2 === 47) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Slash$const, source, 1);
    } else if ($1.startsWith("<=")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$LessEqual$const, source, 2);
    } else if ($2 === 60) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Less$const, source, 1);
    } else if ($1.startsWith(">=")) {
      let source = $1.slice(2);
      return token(lexer, $token.Token$GreaterEqual$const, source, 2);
    } else if ($2 === 62) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Greater$const, source, 1);
    } else if ($2 === 37) {
      let source = $1.slice(1);
      return token(lexer, $token.Token$Percent$const, source, 1);
    } else if ($2 === 34) {
      let source = $1.slice(1);
      let _pipe = advance(lexer, source, 1);
      return lex_string(_pipe, lexer.byte_offset, 0);
    } else if ($2 === 95) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset + 1, 0);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.DiscardName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 97) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 98) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 99) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 100) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 101) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 102) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 103) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 104) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 105) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 106) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 107) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 108) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 109) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 110) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 111) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 112) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 113) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 114) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 115) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 116) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 117) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 118) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 119) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 120) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 121) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 122) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_lowercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      let _block$1;
      if (name === "as") {
        _block$1 = $token.Token$As$const;
      } else if (name === "assert") {
        _block$1 = $token.Token$Assert$const;
      } else if (name === "auto") {
        _block$1 = $token.Token$Auto$const;
      } else if (name === "case") {
        _block$1 = $token.Token$Case$const;
      } else if (name === "const") {
        _block$1 = $token.Token$Const$const;
      } else if (name === "delegate") {
        _block$1 = $token.Token$Delegate$const;
      } else if (name === "derive") {
        _block$1 = $token.Token$Derive$const;
      } else if (name === "echo") {
        _block$1 = $token.Token$Echo$const;
      } else if (name === "else") {
        _block$1 = $token.Token$Else$const;
      } else if (name === "fn") {
        _block$1 = $token.Token$Fn$const;
      } else if (name === "if") {
        _block$1 = $token.Token$If$const;
      } else if (name === "implement") {
        _block$1 = $token.Token$Implement$const;
      } else if (name === "import") {
        _block$1 = $token.Token$Import$const;
      } else if (name === "let") {
        _block$1 = $token.Token$Let$const;
      } else if (name === "macro") {
        _block$1 = $token.Token$Macro$const;
      } else if (name === "opaque") {
        _block$1 = $token.Token$Opaque$const;
      } else if (name === "panic") {
        _block$1 = $token.Token$Panic$const;
      } else if (name === "pub") {
        _block$1 = $token.Token$Pub$const;
      } else if (name === "test") {
        _block$1 = $token.Token$Test$const;
      } else if (name === "todo") {
        _block$1 = $token.Token$Todo$const;
      } else if (name === "type") {
        _block$1 = $token.Token$Type$const;
      } else if (name === "use") {
        _block$1 = $token.Token$Use$const;
      } else {
        _block$1 = new $token.Name(name);
      }
      let token$1 = _block$1;
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDotOrMinus$const,
        lexer$1.newlines,
      );
      return [lexer$2, new Some([token$1, new Position(byte_offset)])];
    } else if ($2 === 65) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 66) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 67) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 68) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 69) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 70) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 71) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 72) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 73) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 74) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 75) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 76) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 77) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 78) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 79) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 80) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 81) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 82) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 83) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 84) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 85) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 86) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 87) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 88) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 89) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else if ($2 === 90) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_uppercase_name(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let name = $3[1];
      return [
        lexer$1,
        new Some([new $token.UpperName(name), new Position(byte_offset)]),
      ];
    } else {
      let $3 = $string.pop_grapheme(lexer.source);
      if ($3 instanceof Ok) {
        let grapheme = $3[0][0];
        let source = $3[0][1];
        return token(
          lexer,
          new $token.UnexpectedGrapheme(grapheme),
          source,
          length(grapheme),
        );
      } else {
        return [
          lexer,
          new Some(
            [$token.Token$EndOfFile$const, new Position(lexer.byte_offset)],
          ),
        ];
      }
    }
  } else if ($ instanceof CheckForMinus) {
    let $1 = check_for_minus(lexer);
    if ($1 instanceof Ok) {
      let result = $1[0];
      return result;
    } else {
      return [
        new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$Normal$const,
          lexer.newlines,
        ),
        Option$None$const,
      ];
    }
  } else if ($ instanceof CheckForNestedDot) {
    let $1 = check_for_nested_dot(lexer);
    if ($1 instanceof Ok) {
      let result = $1[0];
      return result;
    } else {
      return [
        new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$Normal$const,
          lexer.newlines,
        ),
        Option$None$const,
      ];
    }
  } else if ($ instanceof CheckForNestedDotOrMinus) {
    let $1 = check_for_nested_dot(lexer);
    if ($1 instanceof Ok) {
      let result = $1[0];
      return result;
    } else {
      let $2 = check_for_minus(lexer);
      if ($2 instanceof Ok) {
        let result = $2[0];
        return result;
      } else {
        return [
          new Lexer(
            lexer.original_source,
            lexer.source,
            lexer.byte_offset,
            lexer.preserve_whitespace,
            lexer.preserve_comments,
            LexerMode$Normal$const,
            lexer.newlines,
          ),
          Option$None$const,
        ];
      }
    }
  } else {
    let $1 = lexer.source;
    let $2 = $1.charCodeAt(0);
    if ($2 === 48) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 49) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 50) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 51) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 52) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 53) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 54) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 55) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 56) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else if ($2 === 57) {
      let source = $1.slice(1);
      let byte_offset = lexer.byte_offset;
      let _block;
      let _pipe = advance(lexer, source, 1);
      _block = lex_digits(_pipe, byte_offset, 1);
      let $3 = _block;
      let lexer$1 = $3[0];
      let int = $3[1];
      let lexer$2 = new Lexer(
        lexer$1.original_source,
        lexer$1.source,
        lexer$1.byte_offset,
        lexer$1.preserve_whitespace,
        lexer$1.preserve_comments,
        LexerMode$CheckForNestedDot$const,
        lexer$1.newlines,
      );
      return [
        lexer$2,
        new Some([new $token.Int(int), new Position(byte_offset)]),
      ];
    } else {
      return [
        new Lexer(
          lexer.original_source,
          lexer.source,
          lexer.byte_offset,
          lexer.preserve_whitespace,
          lexer.preserve_comments,
          LexerMode$Normal$const,
          lexer.newlines,
        ),
        Option$None$const,
      ];
    }
  }
}

function do_lex(loop$lexer, loop$tokens) {
  while (true) {
    let lexer = loop$lexer;
    let tokens = loop$tokens;
    let $ = next(lexer);
    let $1 = $[1];
    if ($1 instanceof Some) {
      if ($1[0][0] instanceof $token.EndOfFile) {
        return tokens;
      } else {
        let lexer$1 = $[0];
        let token$1 = $1[0];
        loop$lexer = lexer$1;
        loop$tokens = listPrepend(token$1, tokens);
      }
    } else {
      let lexer$1 = $[0];
      loop$lexer = lexer$1;
      loop$tokens = tokens;
    }
  }
}

export function lex(lexer) {
  let _pipe = do_lex(lexer, $List$Empty$const);
  return $list.reverse(_pipe);
}

function unescape_codepoint(loop$escaped, loop$unescaped, loop$codepoint) {
  while (true) {
    let escaped = loop$escaped;
    let unescaped = loop$unescaped;
    let codepoint = loop$codepoint;
    let $ = $string.pop_grapheme(escaped);
    if ($ instanceof Ok) {
      let $1 = $[0][0];
      if ($1 === "}") {
        let escaped$1 = $[0][1];
        return $result.try$(
          $int.base_parse(codepoint, 16),
          (codepoint) => {
            return $result.try$(
              $string.utf_codepoint(codepoint),
              (codepoint) => {
                let codepoint$1 = $string.from_utf_codepoints(
                  listPrepend(codepoint, $List$Empty$const),
                );
                return unescape_loop(escaped$1, unescaped + codepoint$1);
              },
            );
          },
        );
      } else {
        let c = $1;
        let escaped$1 = $[0][1];
        loop$escaped = escaped$1;
        loop$unescaped = unescaped;
        loop$codepoint = codepoint + c;
      }
    } else {
      return $;
    }
  }
}

function unescape_loop(loop$escaped, loop$unescaped) {
  while (true) {
    let escaped = loop$escaped;
    let unescaped = loop$unescaped;
    if (escaped.startsWith("\\\"")) {
      let escaped$1 = escaped.slice(2);
      loop$escaped = escaped$1;
      loop$unescaped = unescaped + "\"";
    } else if (escaped.startsWith("\\\\")) {
      let escaped$1 = escaped.slice(2);
      loop$escaped = escaped$1;
      loop$unescaped = unescaped + "\\";
    } else if (escaped.startsWith("\\f")) {
      let escaped$1 = escaped.slice(2);
      loop$escaped = escaped$1;
      loop$unescaped = unescaped + "\f";
    } else if (escaped.startsWith("\\n")) {
      let escaped$1 = escaped.slice(2);
      loop$escaped = escaped$1;
      loop$unescaped = unescaped + "\n";
    } else if (escaped.startsWith("\\r")) {
      let escaped$1 = escaped.slice(2);
      loop$escaped = escaped$1;
      loop$unescaped = unescaped + "\r";
    } else if (escaped.startsWith("\\t")) {
      let escaped$1 = escaped.slice(2);
      loop$escaped = escaped$1;
      loop$unescaped = unescaped + "\t";
    } else if (escaped.startsWith("\\u{")) {
      let escaped$1 = escaped.slice(3);
      return unescape_codepoint(escaped$1, unescaped, "");
    } else if (escaped.charCodeAt(0) === 92) {
      return new Error(undefined);
    } else {
      let $ = $string.pop_grapheme(escaped);
      if ($ instanceof Ok) {
        let grapheme = $[0][0];
        let escaped$1 = $[0][1];
        loop$escaped = escaped$1;
        loop$unescaped = unescaped + grapheme;
      } else {
        return new Ok(unescaped);
      }
    }
  }
}

/**
 * Convert the value of a string token to the string it represents.
 *
 * This function can fail if the original string contains invalid escape sequences.
 *
 * ```gleam
 * unescape_string("\\\"X\\\" marks the spot")
 * // --> Ok("\"X\" marks the spot")
 *
 * unescape_string("\\u{1F600}")
 * // --> Ok("😀")
 *
 * unescape_string("\\x")
 * // --> Error(Nil)
 * ```
 */
export function unescape_string(string) {
  return unescape_loop(string, "");
}

/**
 * Turn a sequence of tokens back to their Gleam source code representation.
 */
export function to_source(tokens) {
  return $list.fold(
    tokens,
    "",
    (source, _use1) => {
      let tok = _use1[0];
      return source + $token.to_source(tok);
    },
  );
}
