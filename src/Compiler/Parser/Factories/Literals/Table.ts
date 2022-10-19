import { Literal, Table } from "../../../AST"
import { TokenType } from "../../../Lexer"
import { ASTFactory, ParsedSyntaxNode } from "../../Factory"

export const TableFactory = new ASTFactory(Table)
    .Add(TokenType.CurlyBracketOpen)
    .Add(Literal, undefined, true, TokenType.CommaOperator)
    .Add(TokenType.CurlyBracketClose)
    .SetConstructor((ParsedNodes: ParsedSyntaxNode[], Length: number) => {
        const Members = ParsedNodes[1].Nodes

        return new Table(Members as Literal[], Length)
    })
