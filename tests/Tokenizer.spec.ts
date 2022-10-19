import { expect } from "chai"
import { describe, it } from "mocha"
import { TokenType, Lex } from "../src"

describe("Tokenizer", () => {
    it("Number", () => {
        const StandardTestString = "256"
        const Tokens = Lex(StandardTestString)
        expect(Tokens[0].type).to.equal(TokenType.Number)
        expect(Tokens[0].value).to.equal(256)

        const AttributeTestString = "-256"
        const AttributeTokens = Lex(AttributeTestString)
        expect(AttributeTokens[0].type).to.equal(TokenType.Number)
        expect(AttributeTokens[0].value).to.equal(-256)

        const AttributeAndDecimalTestString = "+256.5"
        const AttributeAndDecimalTokens = Lex(AttributeAndDecimalTestString)
        expect(AttributeAndDecimalTokens[0].type).to.equal(TokenType.Number)
        expect(AttributeAndDecimalTokens[0].value).to.equal(256.5)

        const DecimalTestString = "256.5"
        const DecimalTokens = Lex(DecimalTestString)
        expect(DecimalTokens[0].type).to.equal(TokenType.Number)
        expect(DecimalTokens[0].value).to.equal(256.5)
    })
    it("String", () => {
        const StandardTestString = "\"Hello World!\""
        const Tokens = Lex(StandardTestString)

        expect(Tokens[0].type).to.equal(TokenType.String)
        expect(Tokens[0].value).to.equal("Hello World!")

        const EscapedString = "\"Hello \\\"Beautiful\\\" World!\""
        const EscapedTokens = Lex(EscapedString)

        expect(EscapedTokens[0].type).to.equal(TokenType.String)
        expect(EscapedTokens[0].value).to.equal("Hello \"Beautiful\" World!")
    })
    it("Single-line Comment", () => {
        const StandardTestString = "-- Hello World!"
        const Tokens = Lex(StandardTestString)

        expect(Tokens[0].type).to.equal(TokenType.SingleLineComment)
        expect(Tokens[0].value).to.equal(" Hello World!")
    })
    it("Multi-line Comment", () => {
        const StandardTestString = "--[[\n    Hello World!\n]]"
        const Tokens = Lex(StandardTestString)

        expect(Tokens[0].type).to.equal(TokenType.MultiLineComment)
        expect(Lex(StandardTestString)[0].value).to.equal("\n    Hello World!\n")
    })
    it("Identifier", () => {
        const StandardTestString = "Foo"
        const Tokens = Lex(StandardTestString)

        expect(Tokens[0].type).to.equal(TokenType.Identifier)
        expect(Tokens[0].value).to.equal("Foo")
    })
    it("Equality/Inequality Operators", () => {
        expect(Lex("==")[0].type).to.equal(TokenType.EqualityOperator)
        expect(Lex("~=")[0].type).to.equal(TokenType.InequalityOperator)
    })
    it("Assignment Operators", () => {
        expect(Lex("=")[0].type).to.equal(TokenType.StandardAssignmentOperator)
        expect(Lex("+=")[0].type).to.equal(TokenType.AdditionAssignmentOperator)
        expect(Lex("-=")[0].type).to.equal(TokenType.SubtractionAssignmentOperator)
        expect(Lex("/=")[0].type).to.equal(TokenType.DivisionAssignmentOperator)
        expect(Lex("*=")[0].type).to.equal(TokenType.MultiplicationAssignmentOperator)
        expect(Lex("^=")[0].type).to.equal(TokenType.ExponentiationAssignmentOperator)
        expect(Lex("%=")[0].type).to.equal(TokenType.ModulusAssignmentOperator)
        expect(Lex("??=")[0].type).to.equal(TokenType.LogicalNullishAssignmentOperator)
    })
    it("Arithmetic Operators", () => {
        expect(Lex("+")[0].type).to.equal(TokenType.AdditionOperator)
        expect(Lex("-")[0].type).to.equal(TokenType.SubtractionOperator)
        expect(Lex("*")[0].type).to.equal(TokenType.MultiplicationOperator)
        expect(Lex("/")[0].type).to.equal(TokenType.DivisionOperator)
        expect(Lex("^")[0].type).to.equal(TokenType.ExponentiationOperator)
        expect(Lex("%")[0].type).to.equal(TokenType.ModulusOperator)
    })
    it("Miscellaneous Operators", () => {
        const Tokens = Lex(",")

        expect(Tokens[0].type).to.equal(TokenType.CommaOperator)
    })
    it("Logical Keywords", () => {
        const Tokens = Lex("if then else")

        expect(Tokens[0].type).to.equal(TokenType.IfKeyword)
        expect(Tokens[1].type).to.equal(TokenType.ThenKeyword)
        expect(Tokens[2].type).to.equal(TokenType.ElseKeyword)
    })
    it("Declarational Keywords", () => {
        const Tokens = Lex("local function")

        expect(Tokens[0].type).to.equal(TokenType.VariableKeyword)
        expect(Tokens[1].type).to.equal(TokenType.FunctionKeyword)
    })
    it("Structural Keywords", () => {
        const Tokens = Lex("do end")

        expect(Tokens[0].type).to.equal(TokenType.DoKeyword)
        expect(Tokens[1].type).to.equal(TokenType.EndKeyword)
    })
    it("Terminational Keywords", () => {
        const Tokens = Lex("continue break return")

        expect(Tokens[0].type).to.equal(TokenType.ContinueKeyword)
        expect(Tokens[1].type).to.equal(TokenType.BreakKeyword)
        expect(Tokens[2].type).to.equal(TokenType.ReturnKeyword)
    })
    it("Miscellaneous Keywords", () => {
        const Tokens = Lex("while")

        expect(Tokens[0].type).to.equal(TokenType.WhileKeyword)
    })
    it("Complex Inputs", () => {
        const TestString1 =
`
StringTest = "Hello World!"
NumberTest ^= -4.152
`
        const Tokens = Lex(TestString1)

        // Line 1
        expect(Tokens[0].type).to.equal(TokenType.Identifier)
        expect(Tokens[0].value).to.equal("StringTest")

        expect(Tokens[1].type).to.equal(TokenType.StandardAssignmentOperator)
        expect(Tokens[1].value).to.equal(undefined)

        expect(Tokens[2].type).to.equal(TokenType.String)
        expect(Tokens[2].value).to.equal("Hello World!")

        // Line 2
        expect(Tokens[3].type).to.equal(TokenType.Identifier)
        expect(Tokens[3].value).to.equal("NumberTest")

        expect(Tokens[4].type).to.equal(TokenType.ExponentiationAssignmentOperator)
        expect(Tokens[4].value).to.equal(undefined)

        expect(Tokens[5].type).to.equal(TokenType.Number)
        expect(Tokens[5].value).to.equal(-4.152)
    })
})