//# sourceMappingURL=evaluator.mjs.map
import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $errors from "./errors.mjs";
import { MissingFunction, TypeError } from "./errors.mjs";
import {
  Ok,
  Error,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "./gleam.mjs";
import * as $limits from "./limits.mjs";
import * as $mutable_dict from "./mutable_dict.mjs";

export class VBool extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Value$VBool = ($0) => new VBool($0);
export const Value$isVBool = (value) => value instanceof VBool;
export const Value$VBool$0 = (value) => value[0];

export class VInt extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Value$VInt = ($0) => new VInt($0);
export const Value$isVInt = (value) => value instanceof VInt;
export const Value$VInt$0 = (value) => value[0];

export class VList extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Value$VList = ($0) => new VList($0);
export const Value$isVList = (value) => value instanceof VList;
export const Value$VList$0 = (value) => value[0];

export class VData extends $CustomType {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
}
export const Value$VData = (tag, fields) => new VData(tag, fields);
export const Value$isVData = (value) => value instanceof VData;
export const Value$VData$tag = (value) => value.tag;
export const Value$VData$0 = (value) => value.tag;
export const Value$VData$fields = (value) => value.fields;
export const Value$VData$1 = (value) => value.fields;

export class VFunc extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Value$VFunc = ($0) => new VFunc($0);
export const Value$isVFunc = (value) => value instanceof VFunc;
export const Value$VFunc$0 = (value) => value[0];

export class Local extends $CustomType {
  constructor(bindings, parent) {
    super();
    this.bindings = bindings;
    this.parent = parent;
  }
}
export const Env$Local = (bindings, parent) => new Local(bindings, parent);
export const Env$isLocal = (value) => value instanceof Local;
export const Env$Local$bindings = (value) => value.bindings;
export const Env$Local$0 = (value) => value.bindings;
export const Env$Local$parent = (value) => value.parent;
export const Env$Local$1 = (value) => value.parent;

export class Global extends $CustomType {
  constructor(bindings) {
    super();
    this.bindings = bindings;
  }
}
export const Env$Global = (bindings) => new Global(bindings);
export const Env$isGlobal = (value) => value instanceof Global;
export const Env$Global$bindings = (value) => value.bindings;
export const Env$Global$0 = (value) => value.bindings;

export class Builtin extends $CustomType {
  constructor(name, num_args, run) {
    super();
    this.name = name;
    this.num_args = num_args;
    this.run = run;
  }
}
export const Callable$Builtin = (name, num_args, run) =>
  new Builtin(name, num_args, run);
export const Callable$isBuiltin = (value) => value instanceof Builtin;
export const Callable$Builtin$name = (value) => value.name;
export const Callable$Builtin$0 = (value) => value.name;
export const Callable$Builtin$num_args = (value) => value.num_args;
export const Callable$Builtin$1 = (value) => value.num_args;
export const Callable$Builtin$run = (value) => value.run;
export const Callable$Builtin$2 = (value) => value.run;

export class UserFn extends $CustomType {
  constructor(name, params, body, env) {
    super();
    this.name = name;
    this.params = params;
    this.body = body;
    this.env = env;
  }
}
export const Callable$UserFn = (name, params, body, env) =>
  new UserFn(name, params, body, env);
export const Callable$isUserFn = (value) => value instanceof UserFn;
export const Callable$UserFn$name = (value) => value.name;
export const Callable$UserFn$0 = (value) => value.name;
export const Callable$UserFn$params = (value) => value.params;
export const Callable$UserFn$1 = (value) => value.params;
export const Callable$UserFn$body = (value) => value.body;
export const Callable$UserFn$2 = (value) => value.body;
export const Callable$UserFn$env = (value) => value.env;
export const Callable$UserFn$3 = (value) => value.env;

export const Callable$name = (value) => value.name;

export class Var extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Expr$Var = ($0) => new Var($0);
export const Expr$isVar = (value) => value instanceof Var;
export const Expr$Var$0 = (value) => value[0];

export class LiteralBool extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Expr$LiteralBool = ($0) => new LiteralBool($0);
export const Expr$isLiteralBool = (value) => value instanceof LiteralBool;
export const Expr$LiteralBool$0 = (value) => value[0];

export class LiteralInt extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Expr$LiteralInt = ($0) => new LiteralInt($0);
export const Expr$isLiteralInt = (value) => value instanceof LiteralInt;
export const Expr$LiteralInt$0 = (value) => value[0];

export class LiteralList extends $CustomType {
  constructor(elems, rest) {
    super();
    this.elems = elems;
    this.rest = rest;
  }
}
export const Expr$LiteralList = (elems, rest) => new LiteralList(elems, rest);
export const Expr$isLiteralList = (value) => value instanceof LiteralList;
export const Expr$LiteralList$elems = (value) => value.elems;
export const Expr$LiteralList$0 = (value) => value.elems;
export const Expr$LiteralList$rest = (value) => value.rest;
export const Expr$LiteralList$1 = (value) => value.rest;

export class Call extends $CustomType {
  constructor(fn_expr, operands) {
    super();
    this.fn_expr = fn_expr;
    this.operands = operands;
  }
}
export const Expr$Call = (fn_expr, operands) => new Call(fn_expr, operands);
export const Expr$isCall = (value) => value instanceof Call;
export const Expr$Call$fn_expr = (value) => value.fn_expr;
export const Expr$Call$0 = (value) => value.fn_expr;
export const Expr$Call$operands = (value) => value.operands;
export const Expr$Call$1 = (value) => value.operands;

export class Lambda extends $CustomType {
  constructor(params, body) {
    super();
    this.params = params;
    this.body = body;
  }
}
export const Expr$Lambda = (params, body) => new Lambda(params, body);
export const Expr$isLambda = (value) => value instanceof Lambda;
export const Expr$Lambda$params = (value) => value.params;
export const Expr$Lambda$0 = (value) => value.params;
export const Expr$Lambda$body = (value) => value.body;
export const Expr$Lambda$1 = (value) => value.body;

export class Case extends $CustomType {
  constructor(subject, arms) {
    super();
    this.subject = subject;
    this.arms = arms;
  }
}
export const Expr$Case = (subject, arms) => new Case(subject, arms);
export const Expr$isCase = (value) => value instanceof Case;
export const Expr$Case$subject = (value) => value.subject;
export const Expr$Case$0 = (value) => value.subject;
export const Expr$Case$arms = (value) => value.arms;
export const Expr$Case$1 = (value) => value.arms;

export class Let extends $CustomType {
  constructor(name, value, body) {
    super();
    this.name = name;
    this.value = value;
    this.body = body;
  }
}
export const Expr$Let = (name, value, body) => new Let(name, value, body);
export const Expr$isLet = (value) => value instanceof Let;
export const Expr$Let$name = (value) => value.name;
export const Expr$Let$0 = (value) => value.name;
export const Expr$Let$value = (value) => value.value;
export const Expr$Let$1 = (value) => value.value;
export const Expr$Let$body = (value) => value.body;
export const Expr$Let$2 = (value) => value.body;

export class FieldAccess extends $CustomType {
  constructor(record, field) {
    super();
    this.record = record;
    this.field = field;
  }
}
export const Expr$FieldAccess = (record, field) =>
  new FieldAccess(record, field);
export const Expr$isFieldAccess = (value) => value instanceof FieldAccess;
export const Expr$FieldAccess$record = (value) => value.record;
export const Expr$FieldAccess$0 = (value) => value.record;
export const Expr$FieldAccess$field = (value) => value.field;
export const Expr$FieldAccess$1 = (value) => value.field;

export class At extends $CustomType {
  constructor(line, expr) {
    super();
    this.line = line;
    this.expr = expr;
  }
}
export const Expr$At = (line, expr) => new At(line, expr);
export const Expr$isAt = (value) => value instanceof At;
export const Expr$At$line = (value) => value.line;
export const Expr$At$0 = (value) => value.line;
export const Expr$At$expr = (value) => value.expr;
export const Expr$At$1 = (value) => value.expr;

export class PBool extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Pattern$PBool = ($0) => new PBool($0);
export const Pattern$isPBool = (value) => value instanceof PBool;
export const Pattern$PBool$0 = (value) => value[0];

export class PInt extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Pattern$PInt = ($0) => new PInt($0);
export const Pattern$isPInt = (value) => value instanceof PInt;
export const Pattern$PInt$0 = (value) => value[0];

export class PWildcard extends $CustomType {}
export const Pattern$PWildcard$const = new PWildcard();
export const Pattern$PWildcard = () => Pattern$PWildcard$const;
export const Pattern$isPWildcard = (value) => value instanceof PWildcard;

export class PVar extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Pattern$PVar = ($0) => new PVar($0);
export const Pattern$isPVar = (value) => value instanceof PVar;
export const Pattern$PVar$0 = (value) => value[0];

export class PList extends $CustomType {
  constructor(elems, rest) {
    super();
    this.elems = elems;
    this.rest = rest;
  }
}
export const Pattern$PList = (elems, rest) => new PList(elems, rest);
export const Pattern$isPList = (value) => value instanceof PList;
export const Pattern$PList$elems = (value) => value.elems;
export const Pattern$PList$0 = (value) => value.elems;
export const Pattern$PList$rest = (value) => value.rest;
export const Pattern$PList$1 = (value) => value.rest;

/**
 * Rather than supporting new types, this interpreter uses a fixed set.
 */
export const constructors = /* @__PURE__ */ listPrepend(
  [
    "Point",
    /* @__PURE__ */ listPrepend("x", listPrepend("y", $List$Empty$const)),
  ],
  listPrepend(
    [
      "Line",
      /* @__PURE__ */ listPrepend(
        "start",
        listPrepend("end", $List$Empty$const),
      ),
    ],
    listPrepend(
      [
        "Path",
        /* @__PURE__ */ listPrepend(
          "shape",
          listPrepend(
            "start",
            listPrepend("end", listPrepend("thickness", $List$Empty$const)),
          ),
        ),
      ],
      $List$Empty$const,
    ),
  ),
);

/**
 * A short description for error messages that omits list or record contents.
 * 
 * @ignore
 */
function describe(v) {
  if (v instanceof VList) {
    return "a list";
  } else if (v instanceof VData) {
    let tag = v.tag;
    return ("a " + tag) + " record";
  } else if (v instanceof VFunc) {
    let f = v[0];
    return "the function " + f.name;
  } else {
    return $string.inspect(v);
  }
}

/**
 * The value of a record's field, found by its position in constructors.
 * 
 * @ignore
 */
function get_field(v, field) {
  if (v instanceof VData) {
    let tag = v.tag;
    let values = v.fields;
    let names = $result.unwrap(
      $list.key_find(constructors, tag),
      $List$Empty$const,
    );
    let $ = $list.key_find($list.zip(names, values), field);
    if ($ instanceof Ok) {
      return $;
    } else {
      return new Error(new TypeError((("a " + tag) + " has no .") + field));
    }
  } else {
    return new Error(
      new TypeError((("." + field) + " expects a record, got ") + describe(v)),
    );
  }
}

/**
 * The environment with the `new` bindings added to the current frame, each
 * replacing any earlier binding of the same name in that frame. A let and a
 * case arm bind this way.
 */
export function extend(env, new$) {
  if (env instanceof Local) {
    let existing = env.bindings;
    let parent = env.parent;
    return new Local($dict.merge(existing, $dict.from_list(new$)), parent);
  } else {
    return env;
  }
}

/**
 * The names that the list pattern [elems, ..rest] binds if it matches the values
 * vs, or Error(Nil) if it doesn't.
 * 
 * @ignore
 */
function match_list(elems, rest, vs) {
  if (elems instanceof $Empty) {
    if (rest instanceof Some) {
      let x = rest[0];
      return new Ok(listPrepend([x, new VList(vs)], $List$Empty$const));
    } else if (vs instanceof $Empty) {
      return new Ok($List$Empty$const);
    } else {
      return new Error(undefined);
    }
  } else if (vs instanceof $Empty) {
    return new Error(undefined);
  } else {
    let first = elems.head;
    let remaining = elems.tail;
    let v = vs.head;
    let remaining_vs = vs.tail;
    let $ = match_pattern(first, v);
    if ($ instanceof Ok) {
      let bindings = $[0];
      let $1 = match_list(remaining, rest, remaining_vs);
      if ($1 instanceof Ok) {
        let more_bindings = $1[0];
        return new Ok($list.append(bindings, more_bindings));
      } else {
        return $1;
      }
    } else {
      return $;
    }
  }
}

/**
 * The names that pattern binds if it matches value, or Error(Nil) if it doesn't.
 * 
 * @ignore
 */
function match_pattern(pattern, value) {
  if (pattern instanceof PBool) {
    if (value instanceof VBool) {
      let b1 = pattern[0];
      let b2 = value[0];
      if (b1 === b2) {
        return new Ok($List$Empty$const);
      } else {
        return new Error(undefined);
      }
    } else {
      return new Error(undefined);
    }
  } else if (pattern instanceof PInt) {
    if (value instanceof VInt) {
      let n1 = pattern[0];
      let n2 = value[0];
      if (n1 === n2) {
        return new Ok($List$Empty$const);
      } else {
        return new Error(undefined);
      }
    } else {
      return new Error(undefined);
    }
  } else if (pattern instanceof PWildcard) {
    return new Ok($List$Empty$const);
  } else if (pattern instanceof PVar) {
    let value$1 = value;
    let name = pattern[0];
    return new Ok(listPrepend([name, value$1], $List$Empty$const));
  } else if (value instanceof VList) {
    let elems = pattern.elems;
    let rest = pattern.rest;
    let vs = value[0];
    return match_list(elems, rest, vs);
  } else {
    return new Error(undefined);
  }
}

/**
 * The bindings and body of the first arm whose pattern matches value, or
 * Error(Nil) if no pattern matches.
 */
export function find_arm(loop$value, loop$arms) {
  while (true) {
    let value = loop$value;
    let arms = loop$arms;
    if (arms instanceof $Empty) {
      return new Error(undefined);
    } else {
      let rest = arms.tail;
      let pattern = arms.head[0];
      let body = arms.head[1];
      let $ = match_pattern(pattern, value);
      if ($ instanceof Ok) {
        let bindings = $[0];
        return new Ok([bindings, body]);
      } else {
        loop$value = value;
        loop$arms = rest;
      }
    }
  }
}

/**
 * Construct a TypeError when a function is called on the wrong # of arguments.
 * 
 * @ignore
 */
function wrong_num_args(function_name, wanted, got) {
  return new TypeError(
    (((function_name + " takes ") + $int.to_string(wanted)) + " argument(s) but was given ") + $int.to_string(
      got,
    ),
  );
}

/**
 * How many arguments a function takes.
 * 
 * @ignore
 */
function num_params(callable) {
  if (callable instanceof Builtin) {
    let num_args = callable.num_args;
    return num_args;
  } else {
    let params = callable.params;
    return $list.length(params);
  }
}

/**
 * The value bound to name in env. A name is looked up exactly as in an
 * environment diagram: check the current frame's bindings, then its
 * parent's, and so on out to the Global frame. A name that no frame binds
 * is an errors.UnboundVariable(name) error.
 */
export function lookup(loop$env, loop$name) {
  while (true) {
    let env = loop$env;
    let name = loop$name;
    if (env instanceof Local) {
      let bindings = env.bindings;
      let parent = env.parent;
      let $ = $dict.get(bindings, name);
      if ($ instanceof Ok) {
        return $;
      } else {
        loop$env = parent;
        loop$name = name;
      }
    } else {
      let bindings = env.bindings;
      let $ = $mutable_dict.get(bindings, name);
      if ($ instanceof Ok) {
        return $;
      } else {
        return new Error(new $errors.UnboundVariable(name));
      }
    }
  }
}

/**
 * Apply a function value to already-evaluated arguments. Every application costs
 * one step, even of a built-in.
 */
export function apply(f, args) {
  $limits.charge(1);
  if (f instanceof VFunc) {
    let callable = f[0];
    let wanted = num_params(callable);
    let $ = $list.length(args) === wanted;
    if ($) {
      if (callable instanceof Builtin) {
        let name = callable.name;
        let num_args = callable.num_args;
        let run$1 = callable.run;
        return run$1(args);
      } else {
        let params = callable.params;
        let body = callable.body;
        let parent = callable.env;
        return eval$(
          body,
          new Local($dict.from_list($list.zip(params, args)), parent),
        );
      }
    } else {
      return new Error(
        wrong_num_args(callable.name, wanted, $list.length(args)),
      );
    }
  } else {
    return new Error(new TypeError("calling a value that is not a function"));
  }
}

/**
 * Evaluate a list literal [a, b, ..rest].
 * 
 * @ignore
 */
function eval_list(elems, rest, env) {
  let $ = $list.try_map(elems, (e) => { return eval$(e, env); });
  if ($ instanceof Ok) {
    if (rest instanceof Some) {
      let head = $[0];
      let r = rest[0];
      let $1 = eval$(r, env);
      if ($1 instanceof Ok) {
        let $2 = $1[0];
        if ($2 instanceof VList) {
          let tail = $2[0];
          return new Ok(new VList($list.append(head, tail)));
        } else {
          let other = $2;
          return new Error(
            new TypeError("`..` expects a list, got " + describe(other)),
          );
        }
      } else {
        return $1;
      }
    } else {
      let head = $[0];
      return new Ok(new VList(head));
    }
  } else {
    return $;
  }
}

/**
 * Evaluate an expression in an environment.
 * 
 * @ignore
 */
function eval$(loop$expr, loop$env) {
  while (true) {
    let expr = loop$expr;
    let env = loop$env;
    $limits.charge(1);
    if (expr instanceof Var) {
      let name = expr[0];
      return lookup(env, name);
    } else if (expr instanceof LiteralBool) {
      let b = expr[0];
      return new Ok(new VBool(b));
    } else if (expr instanceof LiteralInt) {
      let n = expr[0];
      return new Ok(new VInt(n));
    } else if (expr instanceof LiteralList) {
      let elems = expr.elems;
      let rest = expr.rest;
      return eval_list(elems, rest, env);
    } else if (expr instanceof Call) {
      let fn_expr = expr.fn_expr;
      let operands = expr.operands;
      let $ = eval$(fn_expr, env);
      if ($ instanceof Ok) {
        let fn_value = $[0];
        let $1 = $list.try_map(
          operands,
          (operand) => { return eval$(operand, env); },
        );
        if ($1 instanceof Ok) {
          let args = $1[0];
          return apply(fn_value, args);
        } else {
          return $1;
        }
      } else {
        return $;
      }
    } else if (expr instanceof Lambda) {
      let params = expr.params;
      let body = expr.body;
      return new Ok(new VFunc(new UserFn("lambda", params, body, env)));
    } else if (expr instanceof Case) {
      let subject = expr.subject;
      let arms = expr.arms;
      let $ = eval$(subject, env);
      if ($ instanceof Ok) {
        let value = $[0];
        let $1 = find_arm(value, arms);
        if ($1 instanceof Ok) {
          let bindings = $1[0][0];
          let body = $1[0][1];
          loop$expr = body;
          loop$env = extend(env, bindings);
        } else {
          return new Error($errors.EvalError$NoMatchingCase$const);
        }
      } else {
        return $;
      }
    } else if (expr instanceof Let) {
      let name = expr.name;
      let v = expr.value;
      let body = expr.body;
      let $ = eval$(v, env);
      if ($ instanceof Ok) {
        let value = $[0];
        let new_env = $dict.from_list(
          listPrepend([name, value], $List$Empty$const),
        );
        let n = new Local(new_env, env);
        loop$expr = body;
        loop$env = n;
      } else {
        return $;
      }
    } else if (expr instanceof FieldAccess) {
      let record = expr.record;
      let field = expr.field;
      let $ = eval$(record, env);
      if ($ instanceof Ok) {
        let v = $[0];
        return get_field(v, field);
      } else {
        return $;
      }
    } else {
      let line = expr.line;
      let expr$1 = expr.expr;
      return $result.map_error(
        eval$(expr$1, env),
        (_capture) => { return $errors.at_line(_capture, line); },
      );
    }
  }
}

/**
 * Call the function named function in the global frame on args.
 */
export function run(function$, args, global) {
  return $limits.guarded(
    () => {
      let $ = $mutable_dict.get(global, function$);
      if ($ instanceof Ok) {
        let $1 = $[0];
        if ($1 instanceof VFunc) {
          let $2 = $1[0];
          if ($2 instanceof UserFn) {
            let params = $2.params;
            let body = $2.body;
            let env = $2.env;
            let $3 = $list.length(params) === $list.length(args);
            if ($3) {
              return eval$(
                body,
                new Local($dict.from_list($list.zip(params, args)), env),
              );
            } else {
              return new Error(
                new MissingFunction(function$, $list.length(args)),
              );
            }
          } else {
            return new Error(new MissingFunction(function$, $list.length(args)));
          }
        } else {
          return new Error(new MissingFunction(function$, $list.length(args)));
        }
      } else {
        return new Error(new MissingFunction(function$, $list.length(args)));
      }
    },
  );
}
