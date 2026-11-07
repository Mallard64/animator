//# sourceMappingURL=token.mjs.map
import { CustomType as $CustomType } from "../gleam.mjs";

export class Name extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$Name = ($0) => new Name($0);
export const Token$isName = (value) => value instanceof Name;
export const Token$Name$0 = (value) => value[0];

export class UpperName extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$UpperName = ($0) => new UpperName($0);
export const Token$isUpperName = (value) => value instanceof UpperName;
export const Token$UpperName$0 = (value) => value[0];

export class DiscardName extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$DiscardName = ($0) => new DiscardName($0);
export const Token$isDiscardName = (value) => value instanceof DiscardName;
export const Token$DiscardName$0 = (value) => value[0];

export class Int extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$Int = ($0) => new Int($0);
export const Token$isInt = (value) => value instanceof Int;
export const Token$Int$0 = (value) => value[0];

export class Float extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$Float = ($0) => new Float($0);
export const Token$isFloat = (value) => value instanceof Float;
export const Token$Float$0 = (value) => value[0];

export class String extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$String = ($0) => new String($0);
export const Token$isString = (value) => value instanceof String;
export const Token$String$0 = (value) => value[0];

export class CommentDoc extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$CommentDoc = ($0) => new CommentDoc($0);
export const Token$isCommentDoc = (value) => value instanceof CommentDoc;
export const Token$CommentDoc$0 = (value) => value[0];

export class CommentNormal extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$CommentNormal = ($0) => new CommentNormal($0);
export const Token$isCommentNormal = (value) => value instanceof CommentNormal;
export const Token$CommentNormal$0 = (value) => value[0];

export class CommentModule extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$CommentModule = ($0) => new CommentModule($0);
export const Token$isCommentModule = (value) => value instanceof CommentModule;
export const Token$CommentModule$0 = (value) => value[0];

export class As extends $CustomType {}
export const Token$As$const = new As();
export const Token$As = () => Token$As$const;
export const Token$isAs = (value) => value instanceof As;

export class Assert extends $CustomType {}
export const Token$Assert$const = new Assert();
export const Token$Assert = () => Token$Assert$const;
export const Token$isAssert = (value) => value instanceof Assert;

export class Auto extends $CustomType {}
export const Token$Auto$const = new Auto();
export const Token$Auto = () => Token$Auto$const;
export const Token$isAuto = (value) => value instanceof Auto;

export class Case extends $CustomType {}
export const Token$Case$const = new Case();
export const Token$Case = () => Token$Case$const;
export const Token$isCase = (value) => value instanceof Case;

export class Const extends $CustomType {}
export const Token$Const$const = new Const();
export const Token$Const = () => Token$Const$const;
export const Token$isConst = (value) => value instanceof Const;

export class Delegate extends $CustomType {}
export const Token$Delegate$const = new Delegate();
export const Token$Delegate = () => Token$Delegate$const;
export const Token$isDelegate = (value) => value instanceof Delegate;

export class Derive extends $CustomType {}
export const Token$Derive$const = new Derive();
export const Token$Derive = () => Token$Derive$const;
export const Token$isDerive = (value) => value instanceof Derive;

export class Echo extends $CustomType {}
export const Token$Echo$const = new Echo();
export const Token$Echo = () => Token$Echo$const;
export const Token$isEcho = (value) => value instanceof Echo;

export class Else extends $CustomType {}
export const Token$Else$const = new Else();
export const Token$Else = () => Token$Else$const;
export const Token$isElse = (value) => value instanceof Else;

export class Fn extends $CustomType {}
export const Token$Fn$const = new Fn();
export const Token$Fn = () => Token$Fn$const;
export const Token$isFn = (value) => value instanceof Fn;

export class If extends $CustomType {}
export const Token$If$const = new If();
export const Token$If = () => Token$If$const;
export const Token$isIf = (value) => value instanceof If;

export class Implement extends $CustomType {}
export const Token$Implement$const = new Implement();
export const Token$Implement = () => Token$Implement$const;
export const Token$isImplement = (value) => value instanceof Implement;

export class Import extends $CustomType {}
export const Token$Import$const = new Import();
export const Token$Import = () => Token$Import$const;
export const Token$isImport = (value) => value instanceof Import;

export class Let extends $CustomType {}
export const Token$Let$const = new Let();
export const Token$Let = () => Token$Let$const;
export const Token$isLet = (value) => value instanceof Let;

export class Macro extends $CustomType {}
export const Token$Macro$const = new Macro();
export const Token$Macro = () => Token$Macro$const;
export const Token$isMacro = (value) => value instanceof Macro;

export class Opaque extends $CustomType {}
export const Token$Opaque$const = new Opaque();
export const Token$Opaque = () => Token$Opaque$const;
export const Token$isOpaque = (value) => value instanceof Opaque;

export class Panic extends $CustomType {}
export const Token$Panic$const = new Panic();
export const Token$Panic = () => Token$Panic$const;
export const Token$isPanic = (value) => value instanceof Panic;

export class Pub extends $CustomType {}
export const Token$Pub$const = new Pub();
export const Token$Pub = () => Token$Pub$const;
export const Token$isPub = (value) => value instanceof Pub;

export class Test extends $CustomType {}
export const Token$Test$const = new Test();
export const Token$Test = () => Token$Test$const;
export const Token$isTest = (value) => value instanceof Test;

export class Todo extends $CustomType {}
export const Token$Todo$const = new Todo();
export const Token$Todo = () => Token$Todo$const;
export const Token$isTodo = (value) => value instanceof Todo;

export class Type extends $CustomType {}
export const Token$Type$const = new Type();
export const Token$Type = () => Token$Type$const;
export const Token$isType = (value) => value instanceof Type;

export class Use extends $CustomType {}
export const Token$Use$const = new Use();
export const Token$Use = () => Token$Use$const;
export const Token$isUse = (value) => value instanceof Use;

export class LeftParen extends $CustomType {}
export const Token$LeftParen$const = new LeftParen();
export const Token$LeftParen = () => Token$LeftParen$const;
export const Token$isLeftParen = (value) => value instanceof LeftParen;

export class RightParen extends $CustomType {}
export const Token$RightParen$const = new RightParen();
export const Token$RightParen = () => Token$RightParen$const;
export const Token$isRightParen = (value) => value instanceof RightParen;

export class LeftBrace extends $CustomType {}
export const Token$LeftBrace$const = new LeftBrace();
export const Token$LeftBrace = () => Token$LeftBrace$const;
export const Token$isLeftBrace = (value) => value instanceof LeftBrace;

export class RightBrace extends $CustomType {}
export const Token$RightBrace$const = new RightBrace();
export const Token$RightBrace = () => Token$RightBrace$const;
export const Token$isRightBrace = (value) => value instanceof RightBrace;

export class LeftSquare extends $CustomType {}
export const Token$LeftSquare$const = new LeftSquare();
export const Token$LeftSquare = () => Token$LeftSquare$const;
export const Token$isLeftSquare = (value) => value instanceof LeftSquare;

export class RightSquare extends $CustomType {}
export const Token$RightSquare$const = new RightSquare();
export const Token$RightSquare = () => Token$RightSquare$const;
export const Token$isRightSquare = (value) => value instanceof RightSquare;

export class Plus extends $CustomType {}
export const Token$Plus$const = new Plus();
export const Token$Plus = () => Token$Plus$const;
export const Token$isPlus = (value) => value instanceof Plus;

export class Minus extends $CustomType {}
export const Token$Minus$const = new Minus();
export const Token$Minus = () => Token$Minus$const;
export const Token$isMinus = (value) => value instanceof Minus;

export class Star extends $CustomType {}
export const Token$Star$const = new Star();
export const Token$Star = () => Token$Star$const;
export const Token$isStar = (value) => value instanceof Star;

export class Slash extends $CustomType {}
export const Token$Slash$const = new Slash();
export const Token$Slash = () => Token$Slash$const;
export const Token$isSlash = (value) => value instanceof Slash;

export class Less extends $CustomType {}
export const Token$Less$const = new Less();
export const Token$Less = () => Token$Less$const;
export const Token$isLess = (value) => value instanceof Less;

export class Greater extends $CustomType {}
export const Token$Greater$const = new Greater();
export const Token$Greater = () => Token$Greater$const;
export const Token$isGreater = (value) => value instanceof Greater;

export class LessEqual extends $CustomType {}
export const Token$LessEqual$const = new LessEqual();
export const Token$LessEqual = () => Token$LessEqual$const;
export const Token$isLessEqual = (value) => value instanceof LessEqual;

export class GreaterEqual extends $CustomType {}
export const Token$GreaterEqual$const = new GreaterEqual();
export const Token$GreaterEqual = () => Token$GreaterEqual$const;
export const Token$isGreaterEqual = (value) => value instanceof GreaterEqual;

export class Percent extends $CustomType {}
export const Token$Percent$const = new Percent();
export const Token$Percent = () => Token$Percent$const;
export const Token$isPercent = (value) => value instanceof Percent;

export class PlusDot extends $CustomType {}
export const Token$PlusDot$const = new PlusDot();
export const Token$PlusDot = () => Token$PlusDot$const;
export const Token$isPlusDot = (value) => value instanceof PlusDot;

export class MinusDot extends $CustomType {}
export const Token$MinusDot$const = new MinusDot();
export const Token$MinusDot = () => Token$MinusDot$const;
export const Token$isMinusDot = (value) => value instanceof MinusDot;

export class StarDot extends $CustomType {}
export const Token$StarDot$const = new StarDot();
export const Token$StarDot = () => Token$StarDot$const;
export const Token$isStarDot = (value) => value instanceof StarDot;

export class SlashDot extends $CustomType {}
export const Token$SlashDot$const = new SlashDot();
export const Token$SlashDot = () => Token$SlashDot$const;
export const Token$isSlashDot = (value) => value instanceof SlashDot;

export class LessDot extends $CustomType {}
export const Token$LessDot$const = new LessDot();
export const Token$LessDot = () => Token$LessDot$const;
export const Token$isLessDot = (value) => value instanceof LessDot;

export class GreaterDot extends $CustomType {}
export const Token$GreaterDot$const = new GreaterDot();
export const Token$GreaterDot = () => Token$GreaterDot$const;
export const Token$isGreaterDot = (value) => value instanceof GreaterDot;

export class LessEqualDot extends $CustomType {}
export const Token$LessEqualDot$const = new LessEqualDot();
export const Token$LessEqualDot = () => Token$LessEqualDot$const;
export const Token$isLessEqualDot = (value) => value instanceof LessEqualDot;

export class GreaterEqualDot extends $CustomType {}
export const Token$GreaterEqualDot$const = new GreaterEqualDot();
export const Token$GreaterEqualDot = () => Token$GreaterEqualDot$const;
export const Token$isGreaterEqualDot = (value) =>
  value instanceof GreaterEqualDot;

export class LessGreater extends $CustomType {}
export const Token$LessGreater$const = new LessGreater();
export const Token$LessGreater = () => Token$LessGreater$const;
export const Token$isLessGreater = (value) => value instanceof LessGreater;

export class At extends $CustomType {}
export const Token$At$const = new At();
export const Token$At = () => Token$At$const;
export const Token$isAt = (value) => value instanceof At;

export class Colon extends $CustomType {}
export const Token$Colon$const = new Colon();
export const Token$Colon = () => Token$Colon$const;
export const Token$isColon = (value) => value instanceof Colon;

export class Comma extends $CustomType {}
export const Token$Comma$const = new Comma();
export const Token$Comma = () => Token$Comma$const;
export const Token$isComma = (value) => value instanceof Comma;

export class Hash extends $CustomType {}
export const Token$Hash$const = new Hash();
export const Token$Hash = () => Token$Hash$const;
export const Token$isHash = (value) => value instanceof Hash;

export class Bang extends $CustomType {}
export const Token$Bang$const = new Bang();
export const Token$Bang = () => Token$Bang$const;
export const Token$isBang = (value) => value instanceof Bang;

export class Equal extends $CustomType {}
export const Token$Equal$const = new Equal();
export const Token$Equal = () => Token$Equal$const;
export const Token$isEqual = (value) => value instanceof Equal;

export class EqualEqual extends $CustomType {}
export const Token$EqualEqual$const = new EqualEqual();
export const Token$EqualEqual = () => Token$EqualEqual$const;
export const Token$isEqualEqual = (value) => value instanceof EqualEqual;

export class NotEqual extends $CustomType {}
export const Token$NotEqual$const = new NotEqual();
export const Token$NotEqual = () => Token$NotEqual$const;
export const Token$isNotEqual = (value) => value instanceof NotEqual;

export class VBar extends $CustomType {}
export const Token$VBar$const = new VBar();
export const Token$VBar = () => Token$VBar$const;
export const Token$isVBar = (value) => value instanceof VBar;

export class VBarVBar extends $CustomType {}
export const Token$VBarVBar$const = new VBarVBar();
export const Token$VBarVBar = () => Token$VBarVBar$const;
export const Token$isVBarVBar = (value) => value instanceof VBarVBar;

export class AmperAmper extends $CustomType {}
export const Token$AmperAmper$const = new AmperAmper();
export const Token$AmperAmper = () => Token$AmperAmper$const;
export const Token$isAmperAmper = (value) => value instanceof AmperAmper;

export class LessLess extends $CustomType {}
export const Token$LessLess$const = new LessLess();
export const Token$LessLess = () => Token$LessLess$const;
export const Token$isLessLess = (value) => value instanceof LessLess;

export class GreaterGreater extends $CustomType {}
export const Token$GreaterGreater$const = new GreaterGreater();
export const Token$GreaterGreater = () => Token$GreaterGreater$const;
export const Token$isGreaterGreater = (value) =>
  value instanceof GreaterGreater;

export class Pipe extends $CustomType {}
export const Token$Pipe$const = new Pipe();
export const Token$Pipe = () => Token$Pipe$const;
export const Token$isPipe = (value) => value instanceof Pipe;

export class Dot extends $CustomType {}
export const Token$Dot$const = new Dot();
export const Token$Dot = () => Token$Dot$const;
export const Token$isDot = (value) => value instanceof Dot;

export class DotDot extends $CustomType {}
export const Token$DotDot$const = new DotDot();
export const Token$DotDot = () => Token$DotDot$const;
export const Token$isDotDot = (value) => value instanceof DotDot;

export class LeftArrow extends $CustomType {}
export const Token$LeftArrow$const = new LeftArrow();
export const Token$LeftArrow = () => Token$LeftArrow$const;
export const Token$isLeftArrow = (value) => value instanceof LeftArrow;

export class RightArrow extends $CustomType {}
export const Token$RightArrow$const = new RightArrow();
export const Token$RightArrow = () => Token$RightArrow$const;
export const Token$isRightArrow = (value) => value instanceof RightArrow;

export class EndOfFile extends $CustomType {}
export const Token$EndOfFile$const = new EndOfFile();
export const Token$EndOfFile = () => Token$EndOfFile$const;
export const Token$isEndOfFile = (value) => value instanceof EndOfFile;

export class Space extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$Space = ($0) => new Space($0);
export const Token$isSpace = (value) => value instanceof Space;
export const Token$Space$0 = (value) => value[0];

export class UnterminatedString extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$UnterminatedString = ($0) => new UnterminatedString($0);
export const Token$isUnterminatedString = (value) =>
  value instanceof UnterminatedString;
export const Token$UnterminatedString$0 = (value) => value[0];

export class UnexpectedGrapheme extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Token$UnexpectedGrapheme = ($0) => new UnexpectedGrapheme($0);
export const Token$isUnexpectedGrapheme = (value) =>
  value instanceof UnexpectedGrapheme;
export const Token$UnexpectedGrapheme$0 = (value) => value[0];

/**
 * Turn a token back into its Gleam source representation.
 */
export function to_source(tok) {
  if (tok instanceof Name) {
    let str = tok[0];
    return str;
  } else if (tok instanceof UpperName) {
    let str = tok[0];
    return str;
  } else if (tok instanceof DiscardName) {
    let str = tok[0];
    return "_" + str;
  } else if (tok instanceof Int) {
    let str = tok[0];
    return str;
  } else if (tok instanceof Float) {
    let str = tok[0];
    return str;
  } else if (tok instanceof String) {
    let str = tok[0];
    return ("\"" + str) + "\"";
  } else if (tok instanceof CommentDoc) {
    let str = tok[0];
    return "///" + str;
  } else if (tok instanceof CommentNormal) {
    let str = tok[0];
    return "//" + str;
  } else if (tok instanceof CommentModule) {
    let str = tok[0];
    return "////" + str;
  } else if (tok instanceof As) {
    return "as";
  } else if (tok instanceof Assert) {
    return "assert";
  } else if (tok instanceof Auto) {
    return "auto";
  } else if (tok instanceof Case) {
    return "case";
  } else if (tok instanceof Const) {
    return "const";
  } else if (tok instanceof Delegate) {
    return "delegate";
  } else if (tok instanceof Derive) {
    return "derive";
  } else if (tok instanceof Echo) {
    return "echo";
  } else if (tok instanceof Else) {
    return "else";
  } else if (tok instanceof Fn) {
    return "fn";
  } else if (tok instanceof If) {
    return "if";
  } else if (tok instanceof Implement) {
    return "implement";
  } else if (tok instanceof Import) {
    return "import";
  } else if (tok instanceof Let) {
    return "let";
  } else if (tok instanceof Macro) {
    return "macro";
  } else if (tok instanceof Opaque) {
    return "opaque";
  } else if (tok instanceof Panic) {
    return "panic";
  } else if (tok instanceof Pub) {
    return "pub";
  } else if (tok instanceof Test) {
    return "test";
  } else if (tok instanceof Todo) {
    return "todo";
  } else if (tok instanceof Type) {
    return "type";
  } else if (tok instanceof Use) {
    return "use";
  } else if (tok instanceof LeftParen) {
    return "(";
  } else if (tok instanceof RightParen) {
    return ")";
  } else if (tok instanceof LeftBrace) {
    return "{";
  } else if (tok instanceof RightBrace) {
    return "}";
  } else if (tok instanceof LeftSquare) {
    return "[";
  } else if (tok instanceof RightSquare) {
    return "]";
  } else if (tok instanceof Plus) {
    return "+";
  } else if (tok instanceof Minus) {
    return "-";
  } else if (tok instanceof Star) {
    return "*";
  } else if (tok instanceof Slash) {
    return "/";
  } else if (tok instanceof Less) {
    return "<";
  } else if (tok instanceof Greater) {
    return ">";
  } else if (tok instanceof LessEqual) {
    return "<=";
  } else if (tok instanceof GreaterEqual) {
    return ">=";
  } else if (tok instanceof Percent) {
    return "%";
  } else if (tok instanceof PlusDot) {
    return "+.";
  } else if (tok instanceof MinusDot) {
    return "-.";
  } else if (tok instanceof StarDot) {
    return "*.";
  } else if (tok instanceof SlashDot) {
    return "/.";
  } else if (tok instanceof LessDot) {
    return "<.";
  } else if (tok instanceof GreaterDot) {
    return ">.";
  } else if (tok instanceof LessEqualDot) {
    return "<=.";
  } else if (tok instanceof GreaterEqualDot) {
    return ">=.";
  } else if (tok instanceof LessGreater) {
    return "<>";
  } else if (tok instanceof At) {
    return "@";
  } else if (tok instanceof Colon) {
    return ":";
  } else if (tok instanceof Comma) {
    return ",";
  } else if (tok instanceof Hash) {
    return "#";
  } else if (tok instanceof Bang) {
    return "!";
  } else if (tok instanceof Equal) {
    return "=";
  } else if (tok instanceof EqualEqual) {
    return "==";
  } else if (tok instanceof NotEqual) {
    return "!=";
  } else if (tok instanceof VBar) {
    return "|";
  } else if (tok instanceof VBarVBar) {
    return "||";
  } else if (tok instanceof AmperAmper) {
    return "&&";
  } else if (tok instanceof LessLess) {
    return "<<";
  } else if (tok instanceof GreaterGreater) {
    return ">>";
  } else if (tok instanceof Pipe) {
    return "|>";
  } else if (tok instanceof Dot) {
    return ".";
  } else if (tok instanceof DotDot) {
    return "..";
  } else if (tok instanceof LeftArrow) {
    return "<-";
  } else if (tok instanceof RightArrow) {
    return "->";
  } else if (tok instanceof EndOfFile) {
    return "";
  } else if (tok instanceof Space) {
    let str = tok[0];
    return str;
  } else if (tok instanceof UnterminatedString) {
    let str = tok[0];
    return "\"" + str;
  } else {
    let str = tok[0];
    return str;
  }
}
