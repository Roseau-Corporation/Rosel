import { Token } from "tokenizr"
import { Number } from "../../../AST"
import { TokenType } from "../../../Lexer"
import { InternalParserError } from "../../../ErrorManager/Errors"
import { ASTFactory, ParsedSyntaxNode } from "../../Factory"

export const NumberFactory = new ASTFactory(Number)
    .Add(TokenType.Number)
    .SetConstructor((ParsedNodes: ParsedSyntaxNode[], Length: number) => {
        const NumberToken = ParsedNodes[0].Nodes[0]

        if(!(NumberToken instanceof Token)) throw new InternalParserError("Bad generic node type for number.")
        if(NumberToken.type !== TokenType.Number) throw new InternalParserError("Bad token type for number.")

        return new Number(NumberToken.value, Length)
    })
