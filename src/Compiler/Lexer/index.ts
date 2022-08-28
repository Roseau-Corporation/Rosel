import _Tokenizer from "tokenizr"

export const Tokenizer = new _Tokenizer()

export enum TokenType {
    Identifier = "Identifier",
    Number = "Number",
    String = "String",

    SingleLineComment = "SingleLineComment",
    MultiLineComment = "MultiLineComment",

    AdditionOperator = "AdditionOperator",
    SubtractionOperator = "SubtractionOperator",
    DivisionOperator = "DivisionOperator",
    MultiplicationOperator = "MultiplicationOperator",
    ExponentiationOperator = "ExponentiationOperator",
    ModulusOperator = "ModulusOperator",

    StandardAssignmentOperator = "StandardAssignmentOperator",
    AdditionAssignmentOperator = "AdditionAssignmentOperator",
    SubtractionAssignmentOperator = "SubtractionAssignmentOperator",
    DivisionAssignmentOperator = "DivisionAssignmentOperator",
    MultiplicationAssignmentOperator = "MultiplicationAssignmentOperator",
    ExponentiationAssignmentOperator = "ExponentiationAssignmentOperator",
    ModulusAssignmentOperator = "ModulusAssignmentOperator",
    LogicalNullishAssignmentOperator = "LogicalNullishAssignmentOperator",

    EqualityOperator = "EqualityOperator",
    InequalityOperator = "InequalityOperator",

    CommaOperator = "CommaOperator",

    IfKeyword = "IfKeyword",
    ThenKeyword = "ThenKeyword",
    ElseKeyword = "ElseKeyword",

    FunctionKeyword = "FunctionKeyword",
    VariableKeyword = "VariableKeyword",

    ReturnKeyword = "ReturnKeyword",
    BreakKeyword = "BreakKeyword",
    ContinueKeyword = "ContinueKeyword",

    DoKeyword = "DoKeyword",
    EndKeyword = "EndKeyword",

    WhileKeyword = "WhileKeyword",

    Unknown = "Unknown",
}

import("./Tokens")

export const Lex = (Input: string) => {
    Tokenizer.input(Input)

    return Tokenizer.tokens()
}