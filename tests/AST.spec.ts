import { expect } from "chai"
import { describe, it } from "mocha"
import { Comment, FunctionDeclaration, Identifier, NodeType, Number, ReturnStatement, String, VariableDeclaration } from "../src"

describe("AST Programmatical Building", () => {
    it("Function Declaration", () => {
        const FunctionAST = new FunctionDeclaration([ new Identifier("Param1"), new Identifier("Param2") ], [
            new VariableDeclaration(
                [ new Identifier("MyVariable1"), new Identifier("MyVariable2") ],
                [ new Identifier("Param1"), new String("Hello World!") ]),
            
            new ReturnStatement(
                [ new Identifier("MyVariable1"), new Identifier("MyVariable2") ])
        ], new Identifier("MyFunction"))

        expect(FunctionAST.Type).to.equal(NodeType.FunctionDeclaration)
        expect(FunctionAST.Name?.Type).to.equal(NodeType.Identifier)
        expect(FunctionAST.Name?.Name).to.equal("MyFunction")
        expect(FunctionAST.Local).to.equal(false)

        expect(FunctionAST.Parameters[0].Type).to.equal(NodeType.Identifier)
        expect(FunctionAST.Parameters[0].Name).to.equal("Param1")

        expect(FunctionAST.Parameters[1].Type).to.equal(NodeType.Identifier)
        expect(FunctionAST.Parameters[1].Name).to.equal("Param2")

        expect(FunctionAST.Body[0].Type).to.equal(NodeType.VariableDeclaration)
        expect(FunctionAST.Body[1].Type).to.equal(NodeType.ReturnStatement)
    })

    it("Variable Declaration", () => {
        const VariableAST = new VariableDeclaration(
            [ new Identifier("MyVariable1"), new Identifier("MyVariable2") ],
            [ new String("Hello World!"), new Number(256) ])

        expect(VariableAST.Type).to.equal(NodeType.VariableDeclaration)

        expect(VariableAST.Names[0].Type).to.equal(NodeType.Identifier)
        expect(VariableAST.Names[0].Name).to.equal("MyVariable1")

        expect(VariableAST.Names[1].Type).to.equal(NodeType.Identifier)
        expect(VariableAST.Names[1].Name).to.equal("MyVariable2")

        expect(VariableAST.Initializers[0].Type).to.equal(NodeType.String)
        expect(VariableAST.Initializers[0].Value).to.equal("Hello World!")

        expect(VariableAST.Initializers[1].Type).to.equal(NodeType.Number)
        expect(VariableAST.Initializers[1].Value).to.equal(256)
    })

    it("Return Statement", () => {
        const ReturnAST = new ReturnStatement([ new Number(256) ])

        expect(ReturnAST.Type).to.equal(NodeType.ReturnStatement)

        expect(ReturnAST.Values[0].Type).to.equal(NodeType.Number)
        expect(ReturnAST.Values[0].Value).to.equal(256)
    })

    it("Comment", () => {
        const CommentMessage = "\n    Hello World!\n"
        const CommentAST = new Comment(CommentMessage)

        expect(CommentAST.Type).to.equal(NodeType.Comment)
        expect(CommentAST.Value).to.equal(CommentMessage)
    })
})