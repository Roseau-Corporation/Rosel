import { describe, it } from "mocha"
import { Lex, Parse, Mutator } from "../src"
import { readFileSync } from "fs"
import { resolve } from "path"
import { expect } from "chai"

describe("Transformer", () => {
    it("Array", async () => {
        const LexedTokens = Lex(readFileSync(resolve("./tests/resources/ArrayTest.rose"), { encoding: "utf8" }))
        const ParsedAST = await Parse(LexedTokens)

        console.log((ParsedAST[0] as any).Value[5])
        expect(ParsedAST[0]).to.exist
        if(!ParsedAST[0]) return
        const TransformedAST = await Mutator.Mutate(ParsedAST[0])
        console.log((TransformedAST as any).Value[5])
    })
})