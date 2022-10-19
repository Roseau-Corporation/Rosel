import { Token } from "tokenizr"
import { Identifier } from "../../../AST"
import { TokenType } from "../../../Lexer"
import { InternalParserError } from "../../../ErrorManager/Errors"
import { ASTFactory, ParsedSyntaxNode } from "../../Factory"

export const IdentifierFactory = new ASTFactory(Identifier)
    .Add(TokenType.Identifier)
    .SetConstructor((ParsedNodes: ParsedSyntaxNode[], Length: number) => {
        const IdentifierToken = ParsedNodes[0].Nodes[0]

        if(!(IdentifierToken instanceof Token)) throw new InternalParserError("Bad generic node type for identifier.")
        if(IdentifierToken.type !== TokenType.Identifier) throw new InternalParserError("Bad token type for identifier.")

        return new Identifier(IdentifierToken.value, Length)
    })
