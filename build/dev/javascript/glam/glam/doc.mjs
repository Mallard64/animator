//# sourceMappingURL=doc.mjs.map
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $order from "../../gleam_stdlib/gleam/order.mjs";
import { Eq, Gt, Lt } from "../../gleam_stdlib/gleam/order.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import {
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "../gleam.mjs";

const FILEPATH = "src/glam/doc.gleam";

class Line extends $CustomType {
  constructor(size) {
    super();
    this.size = size;
  }
}

class Concat extends $CustomType {
  constructor(docs) {
    super();
    this.docs = docs;
  }
}

class Text extends $CustomType {
  constructor(text, length) {
    super();
    this.text = text;
    this.length = length;
  }
}

class Nest extends $CustomType {
  constructor(doc, indentation) {
    super();
    this.doc = doc;
    this.indentation = indentation;
  }
}

class ForceBreak extends $CustomType {
  constructor(doc) {
    super();
    this.doc = doc;
  }
}

class Break extends $CustomType {
  constructor(unbroken, broken) {
    super();
    this.unbroken = unbroken;
    this.broken = broken;
  }
}

class FlexBreak extends $CustomType {
  constructor(unbroken, broken) {
    super();
    this.unbroken = unbroken;
    this.broken = broken;
  }
}

class Group extends $CustomType {
  constructor(doc) {
    super();
    this.doc = doc;
  }
}

class Broken extends $CustomType {}
const Mode$Broken$const = new Broken();

class ForceBroken extends $CustomType {}
const Mode$ForceBroken$const = new ForceBroken();

class Unbroken extends $CustomType {}
const Mode$Unbroken$const = new Unbroken();

/**
 * A document that is always printed as a single new line.
 *
 * ## Examples
 *
 * ```gleam
 * line |> to_string(80)
 * // -> "\n"
 * ```
 */
export const line = /* @__PURE__ */ new Line(1);

const debug_nesting = 2;

/**
 * An empty document that is printed as an empty string.
 *
 * ## Examples
 *
 * ```gleam
 * empty |> to_string(80)
 * // -> ""
 * ```
 */
export const empty = /* @__PURE__ */ new Concat($List$Empty$const);

/**
 * A document that is rendered as a single whitespace `" "` but can be broken
 * by the pretty printer into newlines instead.
 * Instead of splitting all spaces or no spaces (like it would do with
 * `space` inside a group), the pretty printer can decide on a space-by-space
 * basis.
 *
 * If a `flex_space` inside a group needs to be broken to fit it on multiple
 * lines, following `flex_spaces` may end up not being broken.
 *
 * This is a shorthand for `flex_break(" ", "")`.
 *
 * ## Examples
 *
 * ```gleam
 * let message =
 *   ["Gleam", "is", "fun!"]
 *   |> list.map(from_string)
 *   |> join(with: flex_space)
 *   |> group
 *
 * to_string(message, 80)
 * // -> "Gleam is fun!"
 *
 * to_string(message, 10)
 * // -> "Gleam is
 * fun!"
 * ```
 *
 * to_string(message, 4)
 * // -> "Gleam
 * // is
 * // fun!"
 */
export const flex_space = /* @__PURE__ */ new FlexBreak(" ", "");

/**
 * A document that is always rendered as an empty string but can act as a
 * breaking point for the pretty printer.
 *
 * This is a shorthand for `break("", "")`.
 *
 * ## Examples
 *
 * ```gleam
 * let doc = [from_string("soft"), soft_break, from_string("break")]
 *
 * doc |> to_string(80)
 * // -> "softbreak"
 *
 * doc |> to_string(5)
 * // -> "soft
 * // break"
 * ```
 */
export const soft_break = /* @__PURE__ */ new Break("", "");

/**
 * A document that is rendered as a single whitespace `" "` but can be broken
 * by the pretty printer into newlines instead.
 *
 * This is a shorthand for `break(" ", "")`.
 *
 * ## Examples
 *
 * ```gleam
 * let doc =
 *   ["pretty", "printed"]
 *   |> list.map(from_string)
 *   |> join(with: space)
 *
 * doc |> to_string(80)
 * // -> "pretty printed"
 *
 * doc |> to_string(10)
 * // -> "pretty
 * // printed"
 * ```
 */
export const space = /* @__PURE__ */ new Break(" ", "");

/**
 * Joins a document into the end of another.
 *
 * ## Examples
 *
 * ```gleam
 * from_string("pretty")
 * |> append(from_string(" printer"))
 * |> to_string(80)
 * // -> "pretty printer"
 * ```
 */
export function append(first, second) {
  if (first instanceof Concat) {
    let docs = first.docs;
    return new Concat(
      $list.append(docs, listPrepend(second, $List$Empty$const)),
    );
  } else {
    return new Concat(
      listPrepend(first, listPrepend(second, $List$Empty$const)),
    );
  }
}

/**
 * Joins a list of documents into a single document.
 *
 * The resulting pretty printed document would be the same as pretty printing
 * each document separately and concatenating it together with `<>`:
 *
 * ```gleam
 * docs |> concat |> to_string(n) ==
 * docs |> list.map(to_string(n)) |> string.concat
 * ```
 *
 * ## Examples
 *
 * ```gleam
 * ["pretty", " ", "printed"]
 * |> list.map(from_string)
 * |> concat
 * |> to_string(80)
 * // -> "pretty printed"
 * ```
 */
export function concat(docs) {
  return new Concat(docs);
}

/**
 * Joins multiple documents into the end of another.
 *
 * This is a shorthand for `append(to: first, doc: concat(docs))`.
 *
 * ## Examples
 *
 * ```gleam
 * from_string("pretty")
 * |> append_docs([
 *   from_string("printing"),
 *   space,
 *   from_string("rocks!"),
 * ])
 * |> to_string(80)
 * // -> "pretty printing rocks!"
 * ```
 */
export function append_docs(first, docs) {
  return append(first, concat(docs));
}

/**
 * A document after which the pretty printer can insert a new line.
 * A newline is added after a `break` document if the `group` it's part of
 * could not be rendered on a single line.
 *
 * If the pretty printer decides to add a newline after `break` it will be
 * rendered as its second argument, otherwise as its first argument.
 *
 * ## Examples
 *
 * ```gleam
 * let message =
 *   [from_string("pretty"), break("•", "↩"), from_string("printed")]
 *   |> concat
 *   |> group
 *
 * message |> to_string(20)
 * // -> "pretty•printed"
 *
 * message |> to_string(10)
 * // -> "pretty↩
 * // printed"
 * ```
 */
export function break$(unbroken, broken) {
  return new Break(unbroken, broken);
}

/**
 * Joins a list of documents inserting the given separator between
 * each existing document.
 *
 * ## Examples
 *
 * ```gleam
 * let message =
 *   ["Gleam", "is", "fun!"]
 *   |> list.map(from_string)
 *   |> join(with: space)
 *
 * message |> to_string(80)
 * // -> "Gleam is fun!"
 * ```
 */
export function join(docs, separator) {
  return concat($list.intersperse(docs, separator));
}

/**
 * Joins a list of documents into a single one by inserting the given
 * separators between each existing document.
 *
 * This is a shorthand for `join(docs, concat(separators))`.
 *
 * ## Examples
 *
 * ```gleam
 * ["wow", "so", "many", "commas"]
 * |> list.map(from_string)
 * |> concat_join([from_string(","), space])
 * |> to_string(80)
 * // -> "wow, so, many, commas"
 * ```
 */
export function concat_join(docs, separators) {
  return join(docs, concat(separators));
}

/**
 * A document after which the pretty printer can insert a new line.
 * The difference with a simple `break` is that, the pretty printer will decide
 * wether to add a new line or not on a space-by-space basis.
 *
 * While all the `break` inside a group are broken or not, some `flex_breaks`
 * may be broken and some not, depending wether the document can fit on a
 * single line or not. Hence the name _flex_.
 *
 * If the pretty printer decides to add a newline after `flex_break` it will be
 * rendered as its first argument, otherwise as its first argument.
 *
 * ## Examples
 *
 * ```gleam
 * let message =
 *   [from_string("pretty"), from_string("printed"), from_string("string")]
 *   |> join(with: flex_break("•", "↩"))
 *   |> group
 *
 * message |> to_string(80)
 * // -> "pretty•printed•string"
 *
 * message |> to_string(20)
 * // -> "pretty•printed↩
 * // string"
 * ```
 */
export function flex_break(unbroken, broken) {
  return new FlexBreak(unbroken, broken);
}

/**
 * Forces the pretty printer to break all the `break`s of the outermost
 * document. This still _has no effect on `group`s_ as the pretty printer will
 * always try to put them on a single line before splitting them.
 *
 * ## Examples
 *
 * ```gleam
 * [from_string("pretty"), break("•", "↩"), from_string("printed")]
 * |> concat
 * |> force_break
 * |> group
 * |> to_string(100)
 * // -> "pretty↩
 * // printed"
 * ```
 */
export function force_break(doc) {
  return new ForceBreak(doc);
}

/**
 * Turns a string into a document.
 *
 * ## Examples
 *
 * ```gleam
 * "doc" |> from_string |> to_string(80)
 * // -> "doc"
 * ```
 */
export function from_string(string) {
  return new Text(string, $string.length(string));
}

/**
 * Turns a string into a document whose length is not taken into account when
 * formatting it.
 *
 * This kind of string can be used to render non-visible characters like ansi
 * color codes.
 *
 * ## Examples
 *
 * ```gleam
 * // Should break in two lines, but doesn't because of the zero_width_string
 * // does not contribute to the total line length.
 * [
 *   zero_width_string("\u{001b}[1;31m"),
 *   from_string("I'm a red"),
 *   break(", ", ","),
 *   from_string("bold text"),
 * ]
 * |> concat
 * |> group
 * |> to_string(20)
 * // -> "\u{001b}[1;31mI'm a red, bold text"
 * ```
 */
export function zero_width_string(string) {
  return new Text(string, 0);
}

/**
 * Allows the pretty printer to break the `break` documents inside the given
 * group.
 *
 * When the pretty printer runs into a group it first tries to render it on a
 * single line, displaying all the breaks as their first argument.
 * If the group fits this is the final pretty printed result.
 *
 * However, if the group does not fit on a single line _all_ the `break`s
 * inside that group are rendered as their second argument and immediately
 * followed by a newline.
 *
 * Any nested group is considered on its own and may or may not be split,
 * depending if it fits on a single line or not. So, even if the outermost
 * group is broken, its nested groups may still end up on a single line.
 *
 * ## Examples
 *
 * ```gleam
 * let food =
 *   ["lasagna", "ravioli", "pizza"]
 *   |> list.map(from_string) |> join(with: space) |> group
 * let message =
 *   [from_string("Food I love:"), space, food] |> concat |> group
 *
 * message |> to_string(80)
 * // -> "Food I love: lasagna ravioli pizza"
 *
 * message |> to_string(30)
 * // -> "Food I love:
 * // lasagna ravioli pizza"
 * // ^-- After splitting the outer group, the inner one can fit
 * //     on a single line so the pretty printer does not split it
 *
 * message |> to_string(20)
 * // "Food I love:
 * // lasagna
 * // ravioli
 * // pizza"
 * // ^-- Even after splitting the outer group, the inner one wouldn't
 * //     fit on a single line, so the pretty printer splits that as well
 * ```
 */
export function group(doc) {
  return new Group(doc);
}

/**
 * A document that is always printed as a series of consecutive newlines.
 *
 * ## Examples
 *
 * ```gleam
 * lines(3) |> to_string(80)
 * // -> "\n\n\n"
 * ```
 */
export function lines(size) {
  return new Line(size);
}

/**
 * Increases the nesting level of a document by the given amount.
 *
 * When the pretty printer breaks a group by inserting a newline, it also adds
 * a whitespace padding equal to its nesting level.
 *
 * ## Examples
 *
 * ```gleam
 * let one = [space, from_string("one")] |> concat |> nest(by: 1)
 * let two = [space, from_string("two")] |> concat |> nest(by: 2)
 * let three = [space, from_string("three")] |> concat |> nest(by: 3)
 * let list = [from_string("list:"), one, two, three] |> concat |> group
 *
 * list |> to_string(10)
 * // -> "list:
 * //  one
 * //   two
 * //    three"
 * ```
 */
export function nest(doc, indentation) {
  return new Nest(doc, indentation);
}

/**
 * Joins together a list of documents and increases their nesting level.
 *
 * This is a shorthand for `nest(concat(docs), by: indentation)`.
 *
 * ## Examples
 *
 * ```gleam
 * [from_string("one"), space, from_string("two")]
 * |> nest_docs(by: 2)
 * |> append(space)
 * |> append(from_string("three"))
 * |> group
 * |> to_string(5)
 * // ->
 * // one
 * //   two
 * // three
 * ```
 */
export function nest_docs(docs, indentation) {
  return new Nest(concat(docs), indentation);
}

/**
 * Prefixes a document to another one.
 *
 * ## Examples
 *
 * ```gleam
 * from_string("printed!")
 * |> prepend(from_string("pretty "))
 * |> to_string(80)
 * // -> "pretty printed!"
 * ```
 */
export function prepend(first, second) {
  if (first instanceof Concat) {
    let docs = first.docs;
    return new Concat(listPrepend(second, docs));
  } else {
    return new Concat(
      listPrepend(second, listPrepend(first, $List$Empty$const)),
    );
  }
}

/**
 * Prefixes multiple documents to another one.
 *
 * This is a shorthand for `prepend(to: first, doc: concat(docs))`.
 *
 * ## Examples
 *
 * ```gleam
 * from_string("fun!")
 * |> prepend_docs([from_string("Gleam "), from_string("is ")])
 * |> to_string(80)
 * // -> "Gleam is fun!"
 * ```
 */
export function prepend_docs(first, docs) {
  return prepend(first, concat(docs));
}

function fits(loop$docs, loop$max_width, loop$current_width) {
  while (true) {
    let docs = loop$docs;
    let max_width = loop$max_width;
    let current_width = loop$current_width;
    if (current_width > max_width) {
      return false;
    } else if (docs instanceof $Empty) {
      return true;
    } else {
      let rest = docs.tail;
      let indent = docs.head[0];
      let mode = docs.head[1];
      let doc = docs.head[2];
      if (doc instanceof Line) {
        return true;
      } else if (doc instanceof Concat) {
        let docs$1 = doc.docs;
        let _pipe = $list.map(docs$1, (doc) => { return [indent, mode, doc]; });
        let _pipe$1 = $list.append(_pipe, rest);
        loop$docs = _pipe$1;
        loop$max_width = max_width;
        loop$current_width = current_width;
      } else if (doc instanceof Text) {
        let length = doc.length;
        loop$docs = rest;
        loop$max_width = max_width;
        loop$current_width = current_width + length;
      } else if (doc instanceof Nest) {
        let doc$1 = doc.doc;
        let i = doc.indentation;
        let _pipe = listPrepend([indent + i, mode, doc$1], rest);
        loop$docs = _pipe;
        loop$max_width = max_width;
        loop$current_width = current_width;
      } else if (doc instanceof ForceBreak) {
        return false;
      } else if (doc instanceof Break) {
        let unbroken = doc.unbroken;
        if (mode instanceof Broken) {
          return true;
        } else if (mode instanceof ForceBroken) {
          return true;
        } else {
          loop$docs = rest;
          loop$max_width = max_width;
          loop$current_width = current_width + $string.length(unbroken);
        }
      } else if (doc instanceof FlexBreak) {
        let unbroken = doc.unbroken;
        if (mode instanceof Broken) {
          return true;
        } else if (mode instanceof ForceBroken) {
          return true;
        } else {
          loop$docs = rest;
          loop$max_width = max_width;
          loop$current_width = current_width + $string.length(unbroken);
        }
      } else {
        let doc$1 = doc.doc;
        loop$docs = listPrepend([indent, mode, doc$1], rest);
        loop$max_width = max_width;
        loop$current_width = current_width;
      }
    }
  }
}

function indentation(size) {
  return $string.repeat(" ", size);
}

function do_to_string(loop$acc, loop$max_width, loop$current_width, loop$docs) {
  while (true) {
    let acc = loop$acc;
    let max_width = loop$max_width;
    let current_width = loop$current_width;
    let docs = loop$docs;
    if (docs instanceof $Empty) {
      return acc;
    } else {
      let rest = docs.tail;
      let indent = docs.head[0];
      let mode = docs.head[1];
      let doc = docs.head[2];
      if (doc instanceof Line) {
        let size = doc.size;
        let _pipe = ((acc + $string.repeat("\n", size)) + indentation(indent));
        loop$acc = _pipe;
        loop$max_width = max_width;
        loop$current_width = indent;
        loop$docs = rest;
      } else if (doc instanceof Concat) {
        let docs$1 = doc.docs;
        let _block;
        let _pipe = $list.map(docs$1, (doc) => { return [indent, mode, doc]; });
        _block = $list.append(_pipe, rest);
        let docs$2 = _block;
        loop$acc = acc;
        loop$max_width = max_width;
        loop$current_width = current_width;
        loop$docs = docs$2;
      } else if (doc instanceof Text) {
        let text = doc.text;
        let length = doc.length;
        loop$acc = acc + text;
        loop$max_width = max_width;
        loop$current_width = current_width + length;
        loop$docs = rest;
      } else if (doc instanceof Nest) {
        let doc$1 = doc.doc;
        let i = doc.indentation;
        let docs$1 = listPrepend([indent + i, mode, doc$1], rest);
        loop$acc = acc;
        loop$max_width = max_width;
        loop$current_width = current_width;
        loop$docs = docs$1;
      } else if (doc instanceof ForceBreak) {
        let doc$1 = doc.doc;
        let docs$1 = listPrepend([indent, Mode$ForceBroken$const, doc$1], rest);
        loop$acc = acc;
        loop$max_width = max_width;
        loop$current_width = current_width;
        loop$docs = docs$1;
      } else if (doc instanceof Break) {
        let unbroken = doc.unbroken;
        let broken = doc.broken;
        if (mode instanceof Broken) {
          let _pipe = (((acc + broken) + "\n") + indentation(indent));
          loop$acc = _pipe;
          loop$max_width = max_width;
          loop$current_width = indent;
          loop$docs = rest;
        } else if (mode instanceof ForceBroken) {
          let _pipe = (((acc + broken) + "\n") + indentation(indent));
          loop$acc = _pipe;
          loop$max_width = max_width;
          loop$current_width = indent;
          loop$docs = rest;
        } else {
          let new_width = current_width + $string.length(unbroken);
          loop$acc = acc + unbroken;
          loop$max_width = max_width;
          loop$current_width = new_width;
          loop$docs = rest;
        }
      } else if (doc instanceof FlexBreak) {
        let unbroken = doc.unbroken;
        let broken = doc.broken;
        let new_unbroken_width = current_width + $string.length(unbroken);
        let $ = fits(rest, max_width, new_unbroken_width);
        if ($) {
          let _pipe = (acc + unbroken);
          loop$acc = _pipe;
          loop$max_width = max_width;
          loop$current_width = new_unbroken_width;
          loop$docs = rest;
        } else {
          let _pipe = (((acc + broken) + "\n") + indentation(indent));
          loop$acc = _pipe;
          loop$max_width = max_width;
          loop$current_width = indent;
          loop$docs = rest;
        }
      } else {
        let doc$1 = doc.doc;
        let fits$1 = fits(
          listPrepend([indent, Mode$Unbroken$const, doc$1], $List$Empty$const),
          max_width,
          current_width,
        );
        let _block;
        if (fits$1) {
          _block = Mode$Unbroken$const;
        } else {
          _block = Mode$Broken$const;
        }
        let new_mode = _block;
        let docs$1 = listPrepend([indent, new_mode, doc$1], rest);
        loop$acc = acc;
        loop$max_width = max_width;
        loop$current_width = current_width;
        loop$docs = docs$1;
      }
    }
  }
}

/**
 * Turns a document into a pretty printed string, trying to fit it into lines
 * of maximum size specified by `limit`.
 *
 * The pretty printed process can be thought of as follows:
 * - the pretty printer first tries to print every group on a single line
 * - all the `break` documents are rendered as their first argument
 * - if the string fits on the specified width this is the result
 * - if the string does not fit on a single line the outermost group is split:
 *   - all of its `break` documents are rendered as their second argument
 *   - a newline is inserted after every `break`
 *   - a padding of the given nesting level is added after every inserted
 *     newline
 *   - all inner groups are then considered on their own: the splitting of the
 *     outermost group does not imply that the inner groups will be split as
 *     well
 *
 * ## Examples
 *
 * For some examples of how pretty printing works for each kind of document you
 * can have a look at the package documentation.
 * There's also a
 * [step-by-step tutorial](https://hexdocs.pm/glam/01_gleam_lists.html)
 * that will guide you through the implementation of a simple pretty printer,
 * covering most of the Glam API.
 */
export function to_string(doc, limit) {
  return do_to_string(
    "",
    limit,
    0,
    listPrepend([0, Mode$Unbroken$const, doc], $List$Empty$const),
  );
}

function do_flatten(loop$docs, loop$acc) {
  while (true) {
    let docs = loop$docs;
    let acc = loop$acc;
    if (docs instanceof $Empty) {
      return $list.reverse(acc);
    } else {
      let $ = docs.tail;
      if ($ instanceof $Empty) {
        let one = docs.head;
        return $list.reverse(listPrepend(one, acc));
      } else {
        let $1 = docs.head;
        if ($1 instanceof Concat) {
          let $2 = $.head;
          if ($2 instanceof Concat) {
            let rest = $.tail;
            let one = $1.docs;
            let two = $2.docs;
            loop$docs = listPrepend(new Concat($list.append(one, two)), rest);
            loop$acc = acc;
          } else {
            let one = $1;
            let two = $2;
            let rest = $.tail;
            loop$docs = listPrepend(two, rest);
            loop$acc = listPrepend(one, acc);
          }
        } else if ($1 instanceof Text) {
          let $2 = $.head;
          if ($2 instanceof Text) {
            let rest = $.tail;
            let one = $1.text;
            let len_one = $1.length;
            let two = $2.text;
            let len_two = $2.length;
            loop$docs = listPrepend(
              new Text(one + two, len_one + len_two),
              rest,
            );
            loop$acc = acc;
          } else {
            let one = $1;
            let two = $2;
            let rest = $.tail;
            loop$docs = listPrepend(two, rest);
            loop$acc = listPrepend(one, acc);
          }
        } else {
          let one = $1;
          let two = $.head;
          let rest = $.tail;
          loop$docs = listPrepend(two, rest);
          loop$acc = listPrepend(one, acc);
        }
      }
    }
  }
}

function flatten(docs) {
  return do_flatten(docs, $List$Empty$const);
}

function do_split_groups(loop$docs, loop$current_group, loop$acc) {
  while (true) {
    let docs = loop$docs;
    let current_group = loop$current_group;
    let acc = loop$acc;
    if (docs instanceof $Empty) {
      if (current_group instanceof $Empty) {
        return $list.reverse(acc);
      } else {
        return $list.reverse(listPrepend($list.reverse(current_group), acc));
      }
    } else {
      let $ = docs.head;
      if ($ instanceof Group) {
        let doc = $;
        let rest = docs.tail;
        if (current_group instanceof $Empty) {
          loop$docs = rest;
          loop$current_group = $List$Empty$const;
          loop$acc = listPrepend(listPrepend(doc, $List$Empty$const), acc);
        } else {
          loop$docs = rest;
          loop$current_group = $List$Empty$const;
          loop$acc = listPrepend(
            listPrepend(doc, $List$Empty$const),
            listPrepend($list.reverse(current_group), acc),
          );
        }
      } else {
        let doc = $;
        let rest = docs.tail;
        loop$docs = rest;
        loop$current_group = listPrepend(doc, current_group);
        loop$acc = acc;
      }
    }
  }
}

function split_groups(docs) {
  return do_split_groups(docs, $List$Empty$const, $List$Empty$const);
}

function digits_loop(loop$number, loop$digits) {
  while (true) {
    let number = loop$number;
    let digits = loop$digits;
    let $ = number < 10;
    if ($) {
      return listPrepend(number, digits);
    } else {
      loop$number = globalThis.Math.trunc(number / 10);
      loop$digits = listPrepend(number % 10, digits);
    }
  }
}

function digits(number) {
  return digits_loop($int.absolute_value(number), $List$Empty$const);
}

function superscript_number(number) {
  let digits$1 = digits(number);
  return $list.fold(
    digits$1,
    "",
    (acc, digit) => {
      let _block;
      if (digit === 0) {
        _block = "⁰";
      } else if (digit === 1) {
        _block = "¹";
      } else if (digit === 2) {
        _block = "²";
      } else if (digit === 3) {
        _block = "³";
      } else if (digit === 4) {
        _block = "⁴";
      } else if (digit === 5) {
        _block = "⁵";
      } else if (digit === 6) {
        _block = "⁶";
      } else if (digit === 7) {
        _block = "⁷";
      } else if (digit === 8) {
        _block = "⁸";
      } else if (digit === 9) {
        _block = "⁹";
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "glam/doc",
          765,
          "superscript_number",
          "not a digit",
          {}
        )
      }
      let digit$1 = _block;
      return acc + digit$1;
    },
  );
}

function parenthesise(document, open, close) {
  let _pipe = listPrepend(
    from_string(open),
    listPrepend(
      nest(line, debug_nesting),
      listPrepend(
        nest(document, debug_nesting),
        listPrepend(line, listPrepend(from_string(close), $List$Empty$const)),
      ),
    ),
  );
  let _pipe$1 = concat(_pipe);
  return group(_pipe$1);
}

/**
 * Returns a debug version of the given document that can be pretty printed
 * to see the structure of a document.
 *
 * This can help you see how your data structures get turned into documents
 * and check if the document is what you'd expect.
 *
 * - `group`s are surrounded by square brackets.
 * - `nest`s are surrounded by angle brackets and have a smal superscript
 *   with the nesting.
 * - `concat`enated documents are separated by dots.
 * - `break`s are rendered surrounded by curly brackets and show both the
 *   broken and unbroken versions.
 * - `line`s are rendered as the string `lf` followed by a superscript
 *   number of lines.
 */
export function debug(document) {
  if (document instanceof Line) {
    let size = document.size;
    let $ = $int.compare(size, 1);
    if ($ instanceof Lt) {
      return from_string("lf");
    } else if ($ instanceof Eq) {
      return from_string("lf");
    } else {
      return from_string("lf" + superscript_number(size));
    }
  } else if (document instanceof Concat) {
    let docs = document.docs;
    let _pipe = split_groups(flatten(docs));
    let _pipe$1 = $list.map(
      _pipe,
      (docs) => {
        if (docs instanceof $Empty) {
          throw makeError(
            "panic",
            FILEPATH,
            "glam/doc",
            686,
            "debug",
            "empty",
            {}
          )
        } else {
          undefined;
        }
        let _pipe$1 = $list.map(docs, debug);
        let _pipe$2 = join(_pipe$1, flex_break(" . ", " ."));
        return group(_pipe$2);
      },
    );
    return join(
      _pipe$1,
      concat(
        listPrepend(
          flex_break(" . ", " ."),
          listPrepend(line, $List$Empty$const),
        ),
      ),
    );
  } else if (document instanceof Text) {
    let text = document.text;
    let escaped = $string.replace(text, "\"", "\\\"");
    return from_string(("\"" + escaped) + "\"");
  } else if (document instanceof Nest) {
    let doc = document.doc;
    let indentation$1 = document.indentation;
    let _pipe = parenthesise(
      debug(doc),
      superscript_number(indentation$1) + "⟨",
      "⟩",
    );
    return force_break(_pipe);
  } else if (document instanceof ForceBreak) {
    let doc = document.doc;
    return parenthesise(debug(doc), "force(", ")");
  } else if (document instanceof Break) {
    let $ = document.unbroken;
    if ($ === " ") {
      let $1 = document.broken;
      if ($1 === "") {
        return from_string("space");
      } else {
        let unbroken = $;
        let broken = $1;
        return from_string(((("{ \"" + unbroken) + "\", \"") + broken) + "\" }");
      }
    } else {
      let unbroken = $;
      let broken = document.broken;
      return from_string(((("{ \"" + unbroken) + "\", \"") + broken) + "\" }");
    }
  } else if (document instanceof FlexBreak) {
    let $ = document.unbroken;
    if ($ === " ") {
      let $1 = document.broken;
      if ($1 === "") {
        return from_string("flex_space");
      } else {
        let unbroken = $;
        let broken = $1;
        return from_string(
          ((("flex{ \"" + unbroken) + "\", \"") + broken) + "\" }",
        );
      }
    } else {
      let unbroken = $;
      let broken = document.broken;
      return from_string(
        ((("flex{ \"" + unbroken) + "\", \"") + broken) + "\" }",
      );
    }
  } else {
    let doc = document.doc;
    let _pipe = parenthesise(debug(doc), "[", "]");
    return force_break(_pipe);
  }
}
