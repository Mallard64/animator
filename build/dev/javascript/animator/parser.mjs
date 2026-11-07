//# sourceMappingURL=parser.mjs.map
import * as $glance from "../glance/glance.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some, Option$None$const } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $errors from "./errors.mjs";
import * as $evaluator from "./evaluator.mjs";
import { Global, UserFn, VFunc } from "./evaluator.mjs";
import {
  Ok,
  Error,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
} from "./gleam.mjs";
import * as $mutable_dict from "./mutable_dict.mjs";

const left_value = "left#";

const capture_param = "capture#";

/**
 * A parse error for the source at span, e.g. `Syntax error on line 4`. Every
 * error the parser reports is made here, so each one says where it is.
 * 
 * @ignore
 */
function fail(message, span, at) {
  return new Error(message + $errors.on_line(at(span)));
}

/**
 * An error naming the first name that appears more than once in `names`,
 * after `message`, on the line of its second appearance. Each name comes
 * with the location of what binds it. A frame binds each name at most once,
 * so a function's parameters, the variables of one pattern, and the
 * top-level functions must each have distinct names (as Gleam requires).
 * Discarded names, which start with _, can repeat, since they can never be
 * referenced.
 * 
 * @ignore
 */
function unique(loop$names, loop$message, loop$at) {
  while (true) {
    let names = loop$names;
    let message = loop$message;
    let at = loop$at;
    let named = $list.filter(
      names,
      (name) => { return !$string.starts_with(name[0], "_"); },
    );
    if (named instanceof $Empty) {
      return new Ok(undefined);
    } else {
      let rest = named.tail;
      let first = named.head[0];
      let $ = $list.key_find(rest, first);
      if ($ instanceof Ok) {
        let location = $[0];
        return fail(message + first, location, at);
      } else {
        loop$names = rest;
        loop$message = message;
        loop$at = at;
      }
    }
  }
}

/**
 * Where a statement starts. Expression statements carry no location of
 * their own; the expression's location is where they start.
 * 
 * @ignore
 */
function statement_location(stmt) {
  if (stmt instanceof $glance.Use) {
    let location = stmt.location;
    return location;
  } else if (stmt instanceof $glance.Assignment) {
    let location = stmt.location;
    return location;
  } else if (stmt instanceof $glance.Assert) {
    let location = stmt.location;
    return location;
  } else {
    let expr = stmt[0];
    return expr.location;
  }
}

/**
 * Whether some record type has a field called label.
 * 
 * @ignore
 */
function is_record_field(label) {
  return $list.any(
    $evaluator.constructors,
    (entry) => { return $list.contains(entry[1], label); },
  );
}

/**
 * The names a pattern binds, in order.
 * 
 * @ignore
 */
function pattern_names(pattern) {
  if (pattern instanceof $evaluator.PVar) {
    let name = pattern[0];
    return listPrepend(name, $List$Empty$const);
  } else if (pattern instanceof $evaluator.PList) {
    let elems = pattern.elems;
    let rest = pattern.rest;
    return $list.append(
      $list.flat_map(elems, pattern_names),
      (() => {
        if (rest instanceof Some) {
          let name = rest[0];
          return listPrepend(name, $List$Empty$const);
        } else {
          return $List$Empty$const;
        }
      })(),
    );
  } else {
    return $List$Empty$const;
  }
}

/**
 * Names that are all bound at location, for unique.
 * 
 * @ignore
 */
function located(names, location) {
  return $list.map(names, (name) => { return [name, location]; });
}

/**
 * The name bound by a pattern that is only a name: a variable x or a
 * discarded _x, which (like a parameter) keeps its underscore. let, use,
 * and the ..rest of a list pattern only support these patterns.
 * 
 * @ignore
 */
function pattern_name(pattern, context, at) {
  if (pattern instanceof $glance.PatternDiscard) {
    let name = pattern.name;
    return new Ok("_" + name);
  } else if (pattern instanceof $glance.PatternVariable) {
    let name = pattern.name;
    return new Ok(name);
  } else {
    return fail("Unsupported pattern in " + context, pattern.location, at);
  }
}

function convert_pattern(pat, at) {
  if (pat instanceof $glance.PatternInt) {
    let location = pat.location;
    let s = pat.value;
    let $ = $int.parse(s);
    if ($ instanceof Ok) {
      let n = $[0];
      return new Ok(new $evaluator.PInt(n));
    } else {
      return fail("Invalid integer literal: " + s, location, at);
    }
  } else if (pat instanceof $glance.PatternDiscard) {
    return new Ok($evaluator.Pattern$PWildcard$const);
  } else if (pat instanceof $glance.PatternVariable) {
    let name = pat.name;
    return new Ok(new $evaluator.PVar(name));
  } else if (pat instanceof $glance.PatternList) {
    let elems = pat.elements;
    let rest = pat.tail;
    return $result.try$(
      $list.try_map(
        elems,
        (_capture) => { return convert_pattern(_capture, at); },
      ),
      (converted_elems) => {
        return $result.try$(
          (() => {
            if (rest instanceof Some) {
              let r = rest[0];
              return $result.map(
                pattern_name(r, "list pattern", at),
                (var0) => { return new Some(var0); },
              );
            } else {
              return new Ok(Option$None$const);
            }
          })(),
          (rest) => {
            return new Ok(new $evaluator.PList(converted_elems, rest));
          },
        );
      },
    );
  } else if (
    pat instanceof $glance.PatternVariant &&
    pat.module instanceof None &&
    pat.arguments instanceof $Empty &&
    !pat.with_spread
  ) {
    let $ = pat.constructor$;
    if ($ === "True") {
      return new Ok(new $evaluator.PBool(true));
    } else if ($ === "False") {
      return new Ok(new $evaluator.PBool(false));
    } else {
      return fail("Pattern type not supported", pat.location, at);
    }
  } else {
    return fail("Pattern type not supported", pat.location, at);
  }
}

function binop_name(op) {
  if (op instanceof $glance.Eq) {
    return new Some("==");
  } else if (op instanceof $glance.NotEq) {
    return new Some("!=");
  } else if (op instanceof $glance.LtInt) {
    return new Some("<");
  } else if (op instanceof $glance.LtEqInt) {
    return new Some("<=");
  } else if (op instanceof $glance.GtEqInt) {
    return new Some(">=");
  } else if (op instanceof $glance.GtInt) {
    return new Some(">");
  } else if (op instanceof $glance.AddInt) {
    return new Some("+");
  } else if (op instanceof $glance.SubInt) {
    return new Some("-");
  } else if (op instanceof $glance.MultInt) {
    return new Some("*");
  } else if (op instanceof $glance.DivInt) {
    return new Some("/");
  } else if (op instanceof $glance.RemainderInt) {
    return new Some("%");
  } else {
    return Option$None$const;
  }
}

/**
 * The name a function parameter binds. A discarded parameter (_foo) keeps
 * its underscore so it can never be referenced (matching Gleam).
 * 
 * @ignore
 */
function binding_name(name) {
  if (name instanceof $glance.Named) {
    let n = name[0];
    return n;
  } else {
    let n = name[0];
    return "_" + n;
  }
}

/**
 * The label, location, and value of an argument after the first labelled one.
 * 
 * @ignore
 */
function labelled_arg(field, at) {
  if (field instanceof $glance.LabelledField) {
    let label = field.label;
    let location = field.label_location;
    let item = field.item;
    return new Ok([label, location, item]);
  } else if (field instanceof $glance.ShorthandField) {
    let label = field.label;
    let location = field.location;
    return new Ok([label, location, new $glance.Variable(location, label)]);
  } else {
    let item = field.item;
    return fail(
      "An unlabelled argument cannot follow a labelled one",
      item.location,
      at,
    );
  }
}

/**
 * The arguments of a call with any labels removed, if the callee is a record
 * constructor: Point(y: 1, x: 0) becomes Point(0, 1), with the labelled arguments
 * in the order of the record's fields. This needs no change to the evaluator.
 * The arguments of any other call are returned as they are. The first
 * num_before fields are taken by the operands that a pipe adds.
 * 
 * @ignore
 */
function order_record_args(callee, num_before, args, at) {
  let _block;
  if (callee instanceof $glance.Variable) {
    let name = callee.name;
    _block = $list.key_find($evaluator.constructors, name);
  } else {
    _block = new Error(undefined);
  }
  let fields = _block;
  if (fields instanceof Ok) {
    let fields$1 = fields[0];
    let $ = $list.split_while(
      args,
      (arg) => {
        if (arg instanceof $glance.UnlabelledField) {
          return true;
        } else {
          return false;
        }
      },
    );
    let positional = $[0];
    let rest = $[1];
    return $result.try$(
      $list.try_map(rest, (_capture) => { return labelled_arg(_capture, at); }),
      (labelled) => {
        return $result.try$(
          unique(
            $list.map(labelled, (arg) => { return [arg[0], arg[1]]; }),
            "Duplicate label: ",
            at,
          ),
          (_use0) => {
            
            let open_fields = $list.drop(
              fields$1,
              num_before + $list.length(positional),
            );
            return $result.try$(
              $list.try_each(
                labelled,
                (arg) => {
                  let $1 = $list.contains(open_fields, arg[0]);
                  if ($1) {
                    return new Ok(undefined);
                  } else {
                    return fail("Unexpected label: " + arg[0], arg[1], at);
                  }
                },
              ),
              (_use0) => {
                
                let ordered = $list.filter_map(
                  open_fields,
                  (field) => {
                    let _pipe = $list.find(
                      labelled,
                      (arg) => { return arg[0] === field; },
                    );
                    return $result.map(
                      _pipe,
                      (arg) => { return new $glance.UnlabelledField(arg[2]); },
                    );
                  },
                );
                return new Ok($list.append(positional, ordered));
              },
            );
          },
        );
      },
    );
  } else {
    return new Ok(args);
  }
}

/**
 * Convert a list literal [a, b, ..rest] into a LiteralList.
 * 
 * @ignore
 */
function convert_list(elems, rest, at) {
  return $result.try$(
    $list.try_map(elems, (_capture) => { return convert_expr(_capture, at); }),
    (converted) => {
      if (rest instanceof Some) {
        let r = rest[0];
        return $result.try$(
          convert_expr(r, at),
          (r) => {
            return new Ok(new $evaluator.LiteralList(converted, new Some(r)));
          },
        );
      } else {
        return new Ok(new $evaluator.LiteralList(converted, Option$None$const));
      }
    },
  );
}

/**
 * Convert case clauses into arms, each body wrapped in At with its line.
 * 
 * @ignore
 */
function convert_clauses(clauses, at) {
  return $list.try_map(
    clauses,
    (clause) => {
      let $ = clause.patterns;
      let $1 = clause.guard;
      if ($ instanceof $Empty) {
        return fail(
          "Multi-pattern clauses are not supported",
          clause.body.location,
          at,
        );
      } else if ($1 instanceof Some) {
        let $2 = $.head;
        if ($2 instanceof $Empty) {
          return fail(
            "Multi-pattern clauses are not supported",
            clause.body.location,
            at,
          );
        } else if ($.tail instanceof $Empty && $2.tail instanceof $Empty) {
          let guard = $1[0];
          return fail("Guards are not supported", guard.location, at);
        } else {
          return fail(
            "Multi-pattern clauses are not supported",
            clause.body.location,
            at,
          );
        }
      } else {
        let $2 = $.head;
        if ($2 instanceof $Empty) {
          return fail(
            "Multi-pattern clauses are not supported",
            clause.body.location,
            at,
          );
        } else if ($.tail instanceof $Empty && $2.tail instanceof $Empty) {
          let pat = $2.head;
          return $result.try$(
            convert_pattern(pat, at),
            (p) => {
              return $result.try$(
                unique(
                  located(pattern_names(p), pat.location),
                  "Duplicate variable name in pattern: ",
                  at,
                ),
                (_use0) => {
                  
                  return $result.try$(
                    convert_expr(clause.body, at),
                    (body) => {
                      return new Ok(
                        [p, new $evaluator.At(at(clause.body.location), body)],
                      );
                    },
                  );
                },
              );
            },
          );
        } else {
          return fail(
            "Multi-pattern clauses are not supported",
            clause.body.location,
            at,
          );
        }
      }
    },
  );
}

function convert_binop(op, left, right, location, at) {
  let $ = binop_name(op);
  if ($ instanceof Some) {
    let op_name = $[0];
    return $result.try$(
      convert_expr(left, at),
      (l) => {
        return $result.try$(
          convert_expr(right, at),
          (r) => {
            return new Ok(
              new $evaluator.Call(
                new $evaluator.Var(op_name),
                listPrepend(l, listPrepend(r, $List$Empty$const)),
              ),
            );
          },
        );
      },
    );
  } else {
    return fail("Unsupported operator", location, at);
  }
}

/**
 * Desugar a && b into case a { False -> False  left# -> left# && b }, and a || b
 * likewise with True, so that b is only evaluated if it's needed. The built-in
 * operator reports a value that isn't a Bool on either side.
 * 
 * @ignore
 */
function convert_short_circuit(op_name, stops_at, left, right, at) {
  return $result.try$(
    convert_expr(left, at),
    (l) => {
      return $result.try$(
        convert_expr(right, at),
        (r) => {
          let call = new $evaluator.Call(
            new $evaluator.Var(op_name),
            listPrepend(
              new $evaluator.Var(left_value),
              listPrepend(r, $List$Empty$const),
            ),
          );
          return new Ok(
            new $evaluator.Case(
              l,
              listPrepend(
                [
                  new $evaluator.PBool(stops_at),
                  new $evaluator.LiteralBool(stops_at),
                ],
                listPrepend(
                  [new $evaluator.PVar(left_value), call],
                  $List$Empty$const,
                ),
              ),
            ),
          );
        },
      );
    },
  );
}

/**
 * Convert Glance call arguments (List(Field(Expression))) to List(Expr).
 * 
 * @ignore
 */
function convert_call_args(args, at) {
  return $list.try_map(
    args,
    (field) => {
      if (field instanceof $glance.LabelledField) {
        let location = field.label_location;
        return fail(
          "Labelled arguments are only supported in a call to a record constructor",
          location,
          at,
        );
      } else if (field instanceof $glance.ShorthandField) {
        let location = field.location;
        return fail(
          "Labelled arguments are only supported in a call to a record constructor",
          location,
          at,
        );
      } else {
        let item = field.item;
        return convert_expr(item, at);
      }
    },
  );
}

/**
 * Desugar a capture f(1, _) into fn(capture#) { f(1, capture#) }.
 * 
 * @ignore
 */
function convert_capture(func, before, after, at) {
  return $result.try$(
    convert_expr(func, at),
    (callee) => {
      return $result.try$(
        convert_call_args(before, at),
        (bs) => {
          return $result.try$(
            convert_call_args(after, at),
            (as_) => {
              let args = $list.flatten(
                listPrepend(
                  bs,
                  listPrepend(
                    listPrepend(
                      new $evaluator.Var(capture_param),
                      $List$Empty$const,
                    ),
                    listPrepend(as_, $List$Empty$const),
                  ),
                ),
              );
              return new Ok(
                new $evaluator.Lambda(
                  listPrepend(capture_param, $List$Empty$const),
                  new $evaluator.Call(callee, args),
                ),
              );
            },
          );
        },
      );
    },
  );
}

/**
 * The conversion of one expression: one case per supported glance form.
 * 
 * @ignore
 */
function convert_expr(expr, at) {
  if (expr instanceof $glance.Int) {
    let location = expr.location;
    let s = expr.value;
    let $ = $int.parse(s);
    if ($ instanceof Ok) {
      let n = $[0];
      return new Ok(new $evaluator.LiteralInt(n));
    } else {
      return fail("Invalid integer literal: " + s, location, at);
    }
  } else if (expr instanceof $glance.Float) {
    let location = expr.location;
    return fail(
      "Only whole numbers are allowed (this language has no decimals)",
      location,
      at,
    );
  } else if (expr instanceof $glance.Variable) {
    let $ = expr.name;
    if ($ === "True") {
      return new Ok(new $evaluator.LiteralBool(true));
    } else if ($ === "False") {
      return new Ok(new $evaluator.LiteralBool(false));
    } else {
      let name = $;
      return new Ok(new $evaluator.Var(name));
    }
  } else if (expr instanceof $glance.Block) {
    let location = expr.location;
    let stmts = expr.statements;
    return convert_statements(stmts, location, at);
  } else if (expr instanceof $glance.List) {
    let elems = expr.elements;
    let rest = expr.rest;
    return convert_list(elems, rest, at);
  } else if (expr instanceof $glance.Fn) {
    let location = expr.location;
    let params = expr.arguments;
    let body = expr.body;
    let names = $list.map(params, (p) => { return binding_name(p.name); });
    return $result.try$(
      unique(located(names, location), "Duplicate parameter name: ", at),
      (_use0) => {
        
        return $result.try$(
          convert_statements(body, location, at),
          (b) => { return new Ok(new $evaluator.Lambda(names, b)); },
        );
      },
    );
  } else if (expr instanceof $glance.FieldAccess) {
    let $ = expr.container;
    if ($ instanceof $glance.Variable && $.name === "list") {
      let label = expr.label;
      let $1 = is_record_field(label);
      if ($1) {
        return new Ok(
          new $evaluator.FieldAccess(new $evaluator.Var("list"), label),
        );
      } else {
        return new Ok(new $evaluator.Var("list." + label));
      }
    } else {
      let container = $;
      let label = expr.label;
      return $result.try$(
        convert_expr(container, at),
        (c) => { return new Ok(new $evaluator.FieldAccess(c, label)); },
      );
    }
  } else if (expr instanceof $glance.Call) {
    return convert_call(expr, $List$Empty$const, $List$Empty$const, at);
  } else if (expr instanceof $glance.FnCapture) {
    let func = expr.function;
    let before = expr.arguments_before;
    let after = expr.arguments_after;
    return convert_capture(func, before, after, at);
  } else if (expr instanceof $glance.Case) {
    let $ = expr.subjects;
    if ($ instanceof $Empty) {
      let location = expr.location;
      return fail("Multi-subject case is not supported", location, at);
    } else if ($.tail instanceof $Empty) {
      let clauses = expr.clauses;
      let subject = $.head;
      return $result.try$(
        convert_expr(subject, at),
        (s) => {
          return $result.try$(
            convert_clauses(clauses, at),
            (arms) => { return new Ok(new $evaluator.Case(s, arms)); },
          );
        },
      );
    } else {
      let location = expr.location;
      return fail("Multi-subject case is not supported", location, at);
    }
  } else if (expr instanceof $glance.BinaryOperator) {
    let $ = expr.name;
    if ($ instanceof $glance.And) {
      let left = expr.left;
      let right = expr.right;
      return convert_short_circuit("&&", false, left, right, at);
    } else if ($ instanceof $glance.Or) {
      let left = expr.left;
      let right = expr.right;
      return convert_short_circuit("||", true, left, right, at);
    } else if ($ instanceof $glance.Pipe) {
      let left = expr.left;
      let right = expr.right;
      return $result.try$(
        convert_expr(left, at),
        (l) => {
          return convert_call(
            right,
            listPrepend(l, $List$Empty$const),
            $List$Empty$const,
            at,
          );
        },
      );
    } else {
      let location = expr.location;
      let op = $;
      let left = expr.left;
      let right = expr.right;
      return convert_binop(op, left, right, location, at);
    }
  } else {
    return fail("Expression type not supported", expr.location, at);
  }
}

/**
 * Convert a call, with extra operands added before and after the call's own:
 * a pipe x |> f(a) adds x first, and a use adds its callback last. Any func
 * that is not a call — a bare name like x |> helper, a capture like
 * x |> f(a, _), or any expression that evaluates to a function — is called
 * with only the extra operands.
 * 
 * @ignore
 */
function convert_call(func, before, after, at) {
  if (func instanceof $glance.Call) {
    let callee = func.function;
    let args = func.arguments;
    return $result.try$(
      convert_expr(callee, at),
      (c) => {
        return $result.try$(
          order_record_args(callee, $list.length(before), args, at),
          (ordered) => {
            return $result.try$(
              convert_call_args(ordered, at),
              (converted_args) => {
                return new Ok(
                  new $evaluator.Call(
                    c,
                    $list.flatten(
                      listPrepend(
                        before,
                        listPrepend(
                          converted_args,
                          listPrepend(after, $List$Empty$const),
                        ),
                      ),
                    ),
                  ),
                );
              },
            );
          },
        );
      },
    );
  } else {
    return $result.try$(
      convert_expr(func, at),
      (c) => {
        return new Ok(new $evaluator.Call(c, $list.append(before, after)));
      },
    );
  }
}

/**
 * Convert the statements of a block (or a function body) into one Expr, each
 * statement wrapped in At with the line it starts on. Each let binds over
 * the rest of the block, and the last statement is the block's value. A use
 * statement wraps the rest of the block too: use x <- f(a) is sugar for
 * f(a, fn(x) { rest }), so it is desugared here and the interpreter never has
 * to know about it. The block (or function) is at location, which is where
 * an empty one is reported.
 * 
 * @ignore
 */
function convert_statements(statements, location, at) {
  let $ = $list.reverse(statements);
  if ($ instanceof $Empty) {
    return fail("Empty block", location, at);
  } else {
    let last = $.head;
    let rest_rev = $.tail;
    return $result.try$(
      (() => {
        if (last instanceof $glance.Use) {
          let location$1 = last.location;
          return fail(
            "A use binding must be followed by more of the block",
            location$1,
            at,
          );
        } else if (last instanceof $glance.Expression) {
          let expr = last[0];
          return $result.map(
            convert_expr(expr, at),
            (e) => { return new $evaluator.At(at(expr.location), e); },
          );
        } else {
          return fail(
            "A block must end with an expression",
            statement_location(last),
            at,
          );
        }
      })(),
      (final_expr) => {
        return $list.try_fold(
          rest_rev,
          final_expr,
          (body, stmt) => {
            if (stmt instanceof $glance.Use) {
              let location$1 = stmt.location;
              let patterns = stmt.patterns;
              let func = stmt.function;
              return $result.try$(
                $list.try_map(
                  patterns,
                  (p) => { return pattern_name(p.pattern, "use binding", at); },
                ),
                (params) => {
                  return $result.try$(
                    unique(
                      located(params, location$1),
                      "Duplicate parameter name: ",
                      at,
                    ),
                    (_use0) => {
                      
                      let callback = new $evaluator.Lambda(params, body);
                      return $result.try$(
                        convert_call(
                          func,
                          $List$Empty$const,
                          listPrepend(callback, $List$Empty$const),
                          at,
                        ),
                        (call) => {
                          return new Ok(new $evaluator.At(at(location$1), call));
                        },
                      );
                    },
                  );
                },
              );
            } else if (
              stmt instanceof $glance.Assignment &&
              stmt.kind instanceof $glance.Let
            ) {
              let location$1 = stmt.location;
              let pattern = stmt.pattern;
              let value = stmt.value;
              return $result.try$(
                pattern_name(pattern, "let binding", at),
                (name) => {
                  return $result.try$(
                    convert_expr(value, at),
                    (v) => {
                      return new Ok(
                        new $evaluator.Let(
                          name,
                          new $evaluator.At(at(location$1), v),
                          body,
                        ),
                      );
                    },
                  );
                },
              );
            } else {
              return fail(
                "Only let, use, and expressions are allowed in a block",
                statement_location(stmt),
                at,
              );
            }
          },
        );
      },
    );
  }
}

/**
 * Convert a top-level function into a named UserFn in the global frame.
 * 
 * @ignore
 */
function convert_function(def, global, at) {
  let func = def.definition;
  let params = $list.map(
    func.parameters,
    (p) => { return binding_name(p.name); },
  );
  return $result.try$(
    unique(located(params, func.location), "Duplicate parameter name: ", at),
    (_use0) => {
      
      return $result.try$(
        convert_statements(func.body, func.location, at),
        (body) => {
          return new Ok(
            [
              func.name,
              new VFunc(new UserFn(func.name, params, body, new Global(global))),
            ],
          );
        },
      );
    },
  );
}

function line_finder(source) {
  let $ = $list.fold(
    $string.split(source, "\n"),
    [$List$Empty$const, 0],
    (acc, line) => {
      let starts = acc[0];
      let offset = acc[1];
      return [
        listPrepend(offset, starts),
        (offset + $string.byte_size(line)) + 1,
      ];
    },
  );
  let starts = $[0];
  return (span) => {
    return $list.count(starts, (start) => { return start <= span.start; });
  };
}

/**
 * Parse a source string by adding its top-level functions to global, a
 * global frame that binds the built-ins (see builtins.global_frame).
 * A function replaces any built-in of the same name, and its env is the
 * global frame itself, which is what lets functions call themselves and each
 * other. A parse error is a message that ends with the line it is on.
 */
export function parse_program(source, global) {
  let at = line_finder(source);
  let $ = $glance.module(source);
  if ($ instanceof Ok) {
    let module = $[0];
    let defs = $list.sort(
      module.functions,
      (a, b) => {
        return $int.compare(
          a.definition.location.start,
          b.definition.location.start,
        );
      },
    );
    return $result.try$(
      $list.try_map(
        defs,
        (_capture) => { return convert_function(_capture, global, at); },
      ),
      (fns) => {
        return $result.try$(
          unique(
            $list.map(
              defs,
              (def) => { return [def.definition.name, def.definition.location]; },
            ),
            "Duplicate function name: ",
            at,
          ),
          (_use0) => {
            
            $list.each(
              fns,
              (f) => { return $mutable_dict.insert(global, f[0], f[1]); },
            );
            return new Ok(global);
          },
        );
      },
    );
  } else {
    let $1 = $[0];
    if ($1 instanceof $glance.UnexpectedEndOfInput) {
      let end = $string.byte_size($string.trim_end(source));
      return fail("Unexpected end of input", new $glance.Span(end, end), at);
    } else {
      let position = $1.position;
      return fail(
        "Syntax error",
        new $glance.Span(position.byte_offset, position.byte_offset),
        at,
      );
    }
  }
}
