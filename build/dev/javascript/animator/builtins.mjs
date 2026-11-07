//# sourceMappingURL=builtins.mjs.map
import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $errors from "./errors.mjs";
import { TypeError } from "./errors.mjs";
import * as $evaluator from "./evaluator.mjs";
import { Builtin, VBool, VData, VFunc, VInt, VList, apply } from "./evaluator.mjs";
import {
  Ok,
  Error,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  remainderInt,
  divideInt,
} from "./gleam.mjs";
import * as $limits from "./limits.mjs";
import * as $mutable_dict from "./mutable_dict.mjs";

function expects(name, what) {
  return new Error(new TypeError((name + " expects ") + what));
}

function builtin(name, num_args, run) {
  return [name, new VFunc(new Builtin(name, num_args, run))];
}

function list_builtins() {
  return listPrepend(
    builtin(
      "list.map",
      2,
      (args) => {
        if (args instanceof $Empty) {
          return expects("list.map", "a list and a function");
        } else {
          let $ = args.tail;
          if ($ instanceof $Empty) {
            return expects("list.map", "a list and a function");
          } else if ($.tail instanceof $Empty) {
            let $1 = args.head;
            if ($1 instanceof VList) {
              let f = $.head;
              let xs = $1[0];
              return $result.map(
                $list.try_map(
                  xs,
                  (x) => { return apply(f, listPrepend(x, $List$Empty$const)); },
                ),
                (var0) => { return new VList(var0); },
              );
            } else {
              return expects("list.map", "a list and a function");
            }
          } else {
            return expects("list.map", "a list and a function");
          }
        }
      },
    ),
    listPrepend(
      builtin(
        "list.filter",
        2,
        (args) => {
          if (args instanceof $Empty) {
            return expects("list.filter", "a list and a function");
          } else {
            let $ = args.tail;
            if ($ instanceof $Empty) {
              return expects("list.filter", "a list and a function");
            } else if ($.tail instanceof $Empty) {
              let $1 = args.head;
              if ($1 instanceof VList) {
                let keep = $.head;
                let xs = $1[0];
                return $result.map(
                  $list.try_fold(
                    xs,
                    $List$Empty$const,
                    (acc, x) => {
                      let $2 = apply(keep, listPrepend(x, $List$Empty$const));
                      if ($2 instanceof Ok) {
                        let $3 = $2[0];
                        if ($3 instanceof VBool) {
                          if ($3[0]) {
                            return new Ok(listPrepend(x, acc));
                          } else {
                            return new Ok(acc);
                          }
                        } else {
                          return new Error(
                            new TypeError(
                              "list.filter's function must return True or False",
                            ),
                          );
                        }
                      } else {
                        return $2;
                      }
                    },
                  ),
                  (kept) => { return new VList($list.reverse(kept)); },
                );
              } else {
                return expects("list.filter", "a list and a function");
              }
            } else {
              return expects("list.filter", "a list and a function");
            }
          }
        },
      ),
      listPrepend(
        builtin(
          "list.append",
          2,
          (args) => {
            if (args instanceof $Empty) {
              return expects("list.append", "two lists");
            } else {
              let $ = args.tail;
              if ($ instanceof $Empty) {
                return expects("list.append", "two lists");
              } else if ($.tail instanceof $Empty) {
                let $1 = args.head;
                if ($1 instanceof VList) {
                  let $2 = $.head;
                  if ($2 instanceof VList) {
                    let xs = $1[0];
                    let ys = $2[0];
                    $limits.charge($list.length(xs));
                    return new Ok(new VList($list.append(xs, ys)));
                  } else {
                    return expects("list.append", "two lists");
                  }
                } else {
                  return expects("list.append", "two lists");
                }
              } else {
                return expects("list.append", "two lists");
              }
            }
          },
        ),
        listPrepend(
          builtin(
            "list.length",
            1,
            (args) => {
              if (args instanceof $Empty) {
                return expects("list.length", "a list");
              } else if (args.tail instanceof $Empty) {
                let $ = args.head;
                if ($ instanceof VList) {
                  let xs = $[0];
                  let length = $list.length(xs);
                  $limits.charge(length);
                  return new Ok(new VInt(length));
                } else {
                  return expects("list.length", "a list");
                }
              } else {
                return expects("list.length", "a list");
              }
            },
          ),
          listPrepend(
            builtin(
              "list.flatten",
              1,
              (args) => {
                if (args instanceof $Empty) {
                  return expects("list.flatten", "a list of lists");
                } else if (args.tail instanceof $Empty) {
                  let $ = args.head;
                  if ($ instanceof VList) {
                    let xss = $[0];
                    return $result.try$(
                      $list.try_map(
                        xss,
                        (xs) => {
                          if (xs instanceof VList) {
                            let elements = xs[0];
                            return new Ok(elements);
                          } else {
                            return expects("list.flatten", "a list");
                          }
                        },
                      ),
                      (lists) => {
                        let total = $list.fold(
                          lists,
                          0,
                          (n, l) => { return n + $list.length(l); },
                        );
                        $limits.charge($list.length(lists) + total);
                        return new Ok(new VList($list.flatten(lists)));
                      },
                    );
                  } else {
                    return expects("list.flatten", "a list of lists");
                  }
                } else {
                  return expects("list.flatten", "a list of lists");
                }
              },
            ),
            $List$Empty$const,
          ),
        ),
      ),
    ),
  );
}

function constructors() {
  return $list.map(
    $evaluator.constructors,
    (entry) => {
      let tag = entry[0];
      let fields = entry[1];
      return builtin(
        tag,
        $list.length(fields),
        (args) => { return new Ok(new VData(tag, args)); },
      );
    },
  );
}

function int_cmp(name, op) {
  return builtin(
    name,
    2,
    (args) => {
      if (args instanceof $Empty) {
        return expects(name, "two ints");
      } else {
        let $ = args.tail;
        if ($ instanceof $Empty) {
          return expects(name, "two ints");
        } else if ($.tail instanceof $Empty) {
          let $1 = args.head;
          if ($1 instanceof VInt) {
            let $2 = $.head;
            if ($2 instanceof VInt) {
              let x = $1[0];
              let y = $2[0];
              return new Ok(new VBool(op(x, y)));
            } else {
              return expects(name, "two ints");
            }
          } else {
            return expects(name, "two ints");
          }
        } else {
          return expects(name, "two ints");
        }
      }
    },
  );
}

function int_op(name, op) {
  return builtin(
    name,
    2,
    (args) => {
      if (args instanceof $Empty) {
        return expects(name, "two ints");
      } else {
        let $ = args.tail;
        if ($ instanceof $Empty) {
          return expects(name, "two ints");
        } else if ($.tail instanceof $Empty) {
          let $1 = args.head;
          if ($1 instanceof VInt) {
            let $2 = $.head;
            if ($2 instanceof VInt) {
              let x = $1[0];
              let y = $2[0];
              return new Ok(new VInt(op(x, y)));
            } else {
              return expects(name, "two ints");
            }
          } else {
            return expects(name, "two ints");
          }
        } else {
          return expects(name, "two ints");
        }
      }
    },
  );
}

function bool_op(name, op) {
  return builtin(
    name,
    2,
    (args) => {
      if (args instanceof $Empty) {
        return expects(name, "two Bools");
      } else {
        let $ = args.tail;
        if ($ instanceof $Empty) {
          return expects(name, "two Bools");
        } else if ($.tail instanceof $Empty) {
          let $1 = args.head;
          if ($1 instanceof VBool) {
            let $2 = $.head;
            if ($2 instanceof VBool) {
              let x = $1[0];
              let y = $2[0];
              return new Ok(new VBool(op(x, y)));
            } else {
              return expects(name, "two Bools");
            }
          } else {
            return expects(name, "two Bools");
          }
        } else {
          return expects(name, "two Bools");
        }
      }
    },
  );
}

function value_equal_lists(loop$xs, loop$ys) {
  while (true) {
    let xs = loop$xs;
    let ys = loop$ys;
    if (xs instanceof $Empty) {
      if (ys instanceof $Empty) {
        return new Ok(true);
      } else {
        return new Ok(false);
      }
    } else if (ys instanceof $Empty) {
      return new Ok(false);
    } else {
      let x = xs.head;
      let rx = xs.tail;
      let y = ys.head;
      let ry = ys.tail;
      let $ = value_equal(x, y);
      if ($ instanceof Ok && $[0]) {
        loop$xs = rx;
        loop$ys = ry;
      } else {
        return $;
      }
    }
  }
}

function value_equal(a, b) {
  $limits.charge(1);
  if (a instanceof VBool && b instanceof VBool) {
    let x = a[0];
    let y = b[0];
    return new Ok(x === y);
  } else if (a instanceof VInt && b instanceof VInt) {
    let x = a[0];
    let y = b[0];
    return new Ok(x === y);
  } else if (a instanceof VList && b instanceof VList) {
    let xs = a[0];
    let ys = b[0];
    return value_equal_lists(xs, ys);
  } else if (a instanceof VData && b instanceof VData) {
    let t1 = a.tag;
    let xs = a.fields;
    let t2 = b.tag;
    let ys = b.fields;
    let $ = t1 === t2;
    if ($) {
      return value_equal_lists(xs, ys);
    } else {
      return new Ok(false);
    }
  } else {
    return new Ok(false);
  }
}

function builtin_not_eq(args) {
  if (args instanceof $Empty) {
    return expects("!=", "two values");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("!=", "two values");
    } else if ($.tail instanceof $Empty) {
      let a = args.head;
      let b = $.head;
      return $result.map(
        value_equal(a, b),
        (equal) => { return new VBool(!equal); },
      );
    } else {
      return expects("!=", "two values");
    }
  }
}

function builtin_eq(args) {
  if (args instanceof $Empty) {
    return expects("==", "two values");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("==", "two values");
    } else if ($.tail instanceof $Empty) {
      let a = args.head;
      let b = $.head;
      return $result.map(
        value_equal(a, b),
        (var0) => { return new VBool(var0); },
      );
    } else {
      return expects("==", "two values");
    }
  }
}

function builtin_abs(args) {
  if (args instanceof $Empty) {
    return expects("abs", "one int");
  } else if (args.tail instanceof $Empty) {
    let $ = args.head;
    if ($ instanceof VInt) {
      let n = $[0];
      return new Ok(new VInt($int.absolute_value(n)));
    } else {
      return expects("abs", "one int");
    }
  } else {
    return expects("abs", "one int");
  }
}

function builtin_random(args) {
  if (args instanceof $Empty) {
    return expects("random", "two ints");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("random", "two ints");
    } else if ($.tail instanceof $Empty) {
      let $1 = args.head;
      if ($1 instanceof VInt) {
        let $2 = $.head;
        if ($2 instanceof VInt) {
          let min = $1[0];
          let max = $2[0];
          let $3 = max <= min;
          if ($3) {
            return new Ok(new VInt(min));
          } else {
            return new Ok(
              new VInt(
                min + $float.truncate(
                  $float.random() * $int.to_float(max - min),
                ),
              ),
            );
          }
        } else {
          return expects("random", "two ints");
        }
      } else {
        return expects("random", "two ints");
      }
    } else {
      return expects("random", "two ints");
    }
  }
}

function builtins() {
  return $dict.from_list(
    listPrepend(
      builtin("random", 2, builtin_random),
      listPrepend(
        builtin("abs", 1, builtin_abs),
        listPrepend(
          builtin("==", 2, builtin_eq),
          listPrepend(
            builtin("!=", 2, builtin_not_eq),
            listPrepend(
              bool_op("&&", (x, y) => { return x && y; }),
              listPrepend(
                bool_op("||", (x, y) => { return x || y; }),
                listPrepend(
                  int_op("+", (x, y) => { return x + y; }),
                  listPrepend(
                    int_op("-", (x, y) => { return x - y; }),
                    listPrepend(
                      int_op("*", (x, y) => { return x * y; }),
                      listPrepend(
                        int_op("/", (x, y) => { return divideInt(x, y); }),
                        listPrepend(
                          int_op("%", (x, y) => { return remainderInt(x, y); }),
                          listPrepend(
                            int_cmp("<", (x, y) => { return x < y; }),
                            listPrepend(
                              int_cmp(">", (x, y) => { return x > y; }),
                              listPrepend(
                                int_cmp("<=", (x, y) => { return x <= y; }),
                                listPrepend(
                                  int_cmp(">=", (x, y) => { return x >= y; }),
                                  $list.append(constructors(), list_builtins()),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

/**
 * A new global frame that binds the built-ins, ready for
 * parser.parse_program to add a program's functions.
 */
export function global_frame() {
  let frame = $mutable_dict.new$();
  let bind = (name, value) => {
    return $mutable_dict.insert(frame, name, value);
  };
  $dict.each(builtins(), bind);
  return frame;
}
