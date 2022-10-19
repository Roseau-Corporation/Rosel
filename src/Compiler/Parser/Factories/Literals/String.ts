import { Token } from "tokenizr"
import { String } from "../../../AST"
import { TokenType } from "../../../Lexer"
import { InternalParserError } from "../../../ErrorManager/Errors"
import { ASTFactory, ParsedSyntaxNode } from "../../Factory"

export const StringFactory = new ASTFactory(String)
    .Add(TokenType.String)
    .SetConstructor((ParsedNodes: ParsedSyntaxNode[], Length: number) => {
        const StringToken = ParsedNodes[0].Nodes[0]

        if(!(StringToken instanceof Token)) throw new InternalParserError("Bad generic node type for string.")
        if(StringToken.type !== TokenType.String) throw new InternalParserError("Bad token type for string.")

        return new String(StringToken.value, Length)
    })
