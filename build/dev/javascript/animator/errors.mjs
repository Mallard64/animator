//# sourceMappingURL=errors.mjs.map
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import { CustomType as $CustomType } from "./gleam.mjs";

export class UnboundVariable extends $CustomType {
  constructor(name) {
    super();
    this.name = name;
  }
}
export const EvalError$UnboundVariable = (name) => new UnboundVariable(name);
export const EvalError$isUnboundVariable = (value) =>
  value instanceof UnboundVariable;
export const EvalError$UnboundVariable$name = (value) => value.name;
export const EvalError$UnboundVariable$0 = (value) => value.name;

export class TypeError extends $CustomType {
  constructor(message) {
    super();
    this.message = message;
  }
}
export const EvalError$TypeError = (message) => new TypeError(message);
export const EvalError$isTypeError = (value) => value instanceof TypeError;
export const EvalError$TypeError$message = (value) => value.message;
export const EvalError$TypeError$0 = (value) => value.message;

export class NoMatchingCase extends $CustomType {}
export const EvalError$NoMatchingCase$const = new NoMatchingCase();
export const EvalError$NoMatchingCase = () => EvalError$NoMatchingCase$const;
export const EvalError$isNoMatchingCase = (value) =>
  value instanceof NoMatchingCase;

export class RecursionLimit extends $CustomType {}
export const EvalError$RecursionLimit$const = new RecursionLimit();
export const EvalError$RecursionLimit = () => EvalError$RecursionLimit$const;
export const EvalError$isRecursionLimit = (value) =>
  value instanceof RecursionLimit;

export class StepLimit extends $CustomType {}
export const EvalError$StepLimit$const = new StepLimit();
export const EvalError$StepLimit = () => EvalError$StepLimit$const;
export const EvalError$isStepLimit = (value) => value instanceof StepLimit;

export class PathLimit extends $CustomType {}
export const EvalError$PathLimit$const = new PathLimit();
export const EvalError$PathLimit = () => EvalError$PathLimit$const;
export const EvalError$isPathLimit = (value) => value instanceof PathLimit;

export class MissingFunction extends $CustomType {
  constructor(name, num_args) {
    super();
    this.name = name;
    this.num_args = num_args;
  }
}
export const EvalError$MissingFunction = (name, num_args) =>
  new MissingFunction(name, num_args);
export const EvalError$isMissingFunction = (value) =>
  value instanceof MissingFunction;
export const EvalError$MissingFunction$name = (value) => value.name;
export const EvalError$MissingFunction$0 = (value) => value.name;
export const EvalError$MissingFunction$num_args = (value) => value.num_args;
export const EvalError$MissingFunction$1 = (value) => value.num_args;

export class BadDrawing extends $CustomType {
  constructor(message) {
    super();
    this.message = message;
  }
}
export const EvalError$BadDrawing = (message) => new BadDrawing(message);
export const EvalError$isBadDrawing = (value) => value instanceof BadDrawing;
export const EvalError$BadDrawing$message = (value) => value.message;
export const EvalError$BadDrawing$0 = (value) => value.message;

export class NotImplemented extends $CustomType {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}
export const EvalError$NotImplemented = (expr) => new NotImplemented(expr);
export const EvalError$isNotImplemented = (value) =>
  value instanceof NotImplemented;
export const EvalError$NotImplemented$expr = (value) => value.expr;
export const EvalError$NotImplemented$0 = (value) => value.expr;

export class OnLine extends $CustomType {
  constructor(error, line) {
    super();
    this.error = error;
    this.line = line;
  }
}
export const EvalError$OnLine = (error, line) => new OnLine(error, line);
export const EvalError$isOnLine = (value) => value instanceof OnLine;
export const EvalError$OnLine$error = (value) => value.error;
export const EvalError$OnLine$0 = (value) => value.error;
export const EvalError$OnLine$line = (value) => value.line;
export const EvalError$OnLine$1 = (value) => value.line;

/**
 * The error located on line. An error passes through the line marker of each
 * expression it is inside, and the first is closest to the problem, so it is the
 * one that counts.
 */
export function at_line(error, line) {
  if (error instanceof OnLine) {
    return error;
  } else {
    return new OnLine(error, line);
  }
}

/**
 * " on line 4": where an error is, as every message that has a line ends. The
 * parser ends its own errors this way too.
 */
export function on_line(line) {
  return " on line " + $int.to_string(line);
}

/**
 * A human-readable description of an evaluation error, to show the user: what
 * went wrong and, if it's known, where, e.g. `unknown variable: pt on line 4`.
 */
export function error_message(error) {
  if (error instanceof UnboundVariable) {
    let name = error.name;
    return "unknown variable: " + name;
  } else if (error instanceof TypeError) {
    let message = error.message;
    return "type error: " + message;
  } else if (error instanceof NoMatchingCase) {
    return "no case pattern matched the value";
  } else if (error instanceof RecursionLimit) {
    return "recursion too deep (missing base case?)";
  } else if (error instanceof StepLimit) {
    return "too many steps (drawing too complex, or infinite loop?)";
  } else if (error instanceof PathLimit) {
    return "too many paths in the drawing";
  } else if (error instanceof MissingFunction) {
    let name = error.name;
    let num_args = error.num_args;
    return ((("no function " + name) + " that takes ") + $int.to_string(
      num_args,
    )) + " argument(s)";
  } else if (error instanceof BadDrawing) {
    let message = error.message;
    return "bad drawing: " + message;
  } else if (error instanceof NotImplemented) {
    let expr = error.expr;
    return "not yet implemented: " + expr;
  } else {
    let error$1 = error.error;
    let line = error.line;
    return error_message(error$1) + on_line(line);
  }
}
