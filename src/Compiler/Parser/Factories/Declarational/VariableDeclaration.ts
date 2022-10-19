import { Identifier, Literal, VariableDeclaration } from "../../../AST"
import { TokenType } from "../../../Lexer"
import { ASTFactory, ParsedSyntaxNode } from "../../Factory"


export const VariableDeclarationFactory = new ASTFactory(VariableDeclaration)
    .Add(TokenType.VariableKeyword)
    .Add(Identifier, undefined, true, TokenType.CommaOperator)
    .Add(TokenType.StandardAssignmentOperator)
    .Add(Literal, undefined, true, TokenType.CommaOperator)
    .SetConstructor((ParsedNodes: ParsedSyntaxNode[], Length: number) => {
        const Names = ParsedNodes[1].Nodes as Identifier[]
        const Initializers = ParsedNodes[3].Nodes as Literal[]

        return new VariableDeclaration(Names, Initializers, Length)
    })
