import { Literal, ReturnStatement } from "../../../AST"
import { TokenType } from "../../../Lexer"
import { ASTFactory, ParsedSyntaxNode } from "../../Factory"

export const ReturnStatementFactory = new ASTFactory(ReturnStatement)
    .Add(TokenType.ReturnKeyword)
    .Add(Literal, undefined, true, TokenType.CommaOperator)
    .SetConstructor((ParsedNodes: ParsedSyntaxNode[], Length: number) => {
        const Values = ParsedNodes[1].Nodes

        return new ReturnStatement(Values as Literal[], Length)
    })
