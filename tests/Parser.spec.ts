import { expect } from "chai"
import { describe, it } from "mocha"
import { Token } from "tokenizr"
import { NodeType, Number, Parse, TokenType } from "../src"

describe("Parser", () => {
    it("Number", async () => {
        const ParsedAST = await Parse([
            new Token(TokenType.Number, 56, "+56"),
            new Token(TokenType.Number, 42, "42"),
            new Token(TokenType.EndOfFile, null, "")
        ])

        expect(ParsedAST[0]).to.exist
        if(!ParsedAST[0]) return
        expect(ParsedAST[0].Type).to.equal(NodeType.Number)
        expect(ParsedAST[0]).to.instanceOf(Number)

        if(!(ParsedAST[0] instanceof Number)) return
        expect(ParsedAST[0].Value).to.equal(56)

        expect(ParsedAST[1]).to.exist
        if(!ParsedAST[1]) return
        expect(ParsedAST[1].Type).to.equal(NodeType.Number)
        expect(ParsedAST[1]).to.instanceOf(Number)

        if(!(ParsedAST[1] instanceof Number)) return
        expect(ParsedAST[1].Value).to.equal(42)
    })
})