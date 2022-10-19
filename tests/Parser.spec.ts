import { describe, it } from "mocha"
import { Lex, NodeType, Parse, ReturnStatement, Array as RoselArray, VariableDeclaration } from "../src"
import { readFileSync } from "fs"
import { resolve } from "path"
import { expect } from "chai"

describe("Parser", () => {
    it("Return Statement", async () => {
        const LexedTokens = Lex(readFileSync(resolve("./tests/resources/ReturnTest.rose"), { encoding: "utf8" }))
        const ParsedAST = await Parse(LexedTokens)

        expect(ParsedAST[0]?.Type).to.equal(NodeType.ReturnStatement)
        expect(ParsedAST[0]).to.instanceof(ReturnStatement)
        if(!(ParsedAST[0] instanceof ReturnStatement)) return
        expect(ParsedAST[0].Values[0]).to.not.exist
    })
    it("Variable Declaration", async () => {
        const LexedTokens = Lex(readFileSync(resolve("./tests/resources/VariableDeclaration.rose"), { encoding: "utf8" }))
        const ParsedAST = await Parse(LexedTokens)

        expect(ParsedAST[0]?.Type).to.equal(NodeType.VariableDeclaration)
        expect(ParsedAST[0]).to.instanceof(VariableDeclaration)
        if(!(ParsedAST[0] instanceof VariableDeclaration)) return
        expect(ParsedAST[0].Names[0].Value).to.equal("My")
        expect(ParsedAST[0].Names[1].Value).to.equal("Variable")
        expect(ParsedAST[0].Initializers[0].Value).to.equal("Hello")
        expect(ParsedAST[0].Initializers[1].Value).to.equal("World")

        expect(ParsedAST[1]?.Type).to.equal(NodeType.VariableDeclaration)
        expect(ParsedAST[1]).to.instanceof(VariableDeclaration)
        if(!(ParsedAST[1] instanceof VariableDeclaration)) return
        expect(ParsedAST[1].Names[0].Value).to.equal("Your")
        expect(ParsedAST[1].Names[1].Value).to.equal("Declaration")
        expect(ParsedAST[1].Initializers[0].Value).to.equal("Hey")
        expect(ParsedAST[1].Initializers[1].Value).to.equal("Programmer")
    })
    it("Array", async () => {
        const LexedTokens = Lex(readFileSync(resolve("./tests/resources/ArrayTest.rose"), { encoding: "utf8" }))
        const ParsedAST = await Parse(LexedTokens)

        expect(ParsedAST[0]?.Type).to.equal(NodeType.Array)
        if(!(ParsedAST[0] instanceof RoselArray)) return
        expect(typeof ParsedAST[0].Value[0].Value).to.equal("string")
        expect(ParsedAST[0].Value[0].Value).to.equal("Hello, World!")

        expect(typeof ParsedAST[0].Value[1].Value).to.equal("string")
        expect(ParsedAST[0].Value[1].Value).to.equal("Hello, Jeff!")

        expect(typeof ParsedAST[0].Value[2].Value).to.equal("string")
        expect(ParsedAST[0].Value[2].Value).to.equal("Hello, Bob!")

        expect(typeof ParsedAST[0].Value[3].Value).to.equal("number")
        expect(ParsedAST[0].Value[3].Value).to.equal(-21235)

        expect(typeof ParsedAST[0].Value[4].Value).to.equal("string")
        expect(ParsedAST[0].Value[4].Value).to.equal("Good bye!")
    })
})