//# sourceMappingURL=limits.mjs.map
import * as $errors from "./errors.mjs";
import { EvalError$RecursionLimit$const, EvalError$StepLimit$const } from "./errors.mjs";
import { Error } from "./gleam.mjs";
import { charge, guarded as do_guarded } from "./limits_ffi.mjs";

export { charge };

/**
 * The most paths a finished drawing may contain.
 */
export const path_limit = 100_000;

/**
 * Run a whole evaluation with a fresh step count and return its result, or an error
 * if it did too much work (StepLimit) or overflowed the stack (RecursionLimit).
 */
export function guarded(evaluate) {
  return do_guarded(
    evaluate,
    new Error(EvalError$StepLimit$const),
    new Error(EvalError$RecursionLimit$const),
  );
}
