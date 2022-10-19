import { Token } from "tokenizr"
import { GenericNode } from "."
import { ParseOnce } from ".."
import { Node } from "../../AST"
import { TokenType } from "../../Lexer"
import { ExternalParserError, InternalParserError } from "../../ErrorManager/Errors"
import { ErrorManager } from "../../ErrorManager"

export type TokenSyntaxNode = SyntaxNode&{
    Node: TokenType
}
export type ASTSyntaxNode = SyntaxNode&{
    Node: typeof Node
}

export class ParsedSyntaxNode {
    public Length = 0
    public Nodes: (Node | Token)[] = [ ]
    public Valid = false
}

export class SyntaxNode<T extends GenericNode = GenericNode> {
    public constructor(
        public Node: T,
        public Optional = false,
        public Repeatable = false,
        public RepeatsWith?: TokenType
    ) { }

    private RepresentsToken(): this is TokenSyntaxNode {
        return typeof this.Node == "string"
    }
    private RepresentsAST(): this is ASTSyntaxNode {
        return typeof this.Node !== "string"
    }

    protected TestAST(Tokens: Token[]): Node | undefined {
        if(!this.RepresentsAST()) throw new InternalParserError("Attempt to test as AST when this syntax node does not represent AST.")

        const ASTFactory = ParseOnce(Tokens, this.Node)

        return ASTFactory
    }

    protected TestToken(Tokens: Token[]): Token | undefined {
        if(!(Tokens[0]?.type == this.Node)) return undefined

        return Tokens[0]
    }

    public Test(Tokens: Token[]): ParsedSyntaxNode {
        const ParsedNode = new ParsedSyntaxNode()
        ParsedNode.Valid = this.Optional

        if(!this.Repeatable) {
            if(this.RepresentsAST()) {
                const ASTNode = this.TestAST(Tokens)

                if(!ASTNode) {
                    ErrorManager.Errors.push(new ExternalParserError(`Expected ${this.Node.prototype.Type}, got ${Tokens[0]?.type}.`))
                    return ParsedNode
                }
                ParsedNode.Nodes.push(ASTNode)
                ParsedNode.Length += ASTNode.Length
            }
            if(this.RepresentsToken()) {
                const Token = this.TestToken(Tokens)

                if(!Token) {
                    ErrorManager.Errors.push(new ExternalParserError(`Expected ${this.Node}, got ${Tokens[0]?.type}.`))
                    return ParsedNode
                }
                ParsedNode.Nodes.push(Token)
                ParsedNode.Length += 1
            }
        } else {
            let Valid = true

            for (let CurrentToken=0; Valid;) {
                const Token = Tokens[CurrentToken]
                const RemainingTokens = Tokens.slice(CurrentToken)

                if(!Token || Token.type == TokenType.EndOfFile) break
                if(Token.type == this.RepeatsWith) {
                    ParsedNode.Length++
                    CurrentToken++
                    continue
                }

                if(this.RepresentsAST()) {
                    const ASTNode = this.TestAST(RemainingTokens)

                    // Breaks due to invalid node in repeating syntax node
                    if(!ASTNode && Tokens[CurrentToken+1]?.type == this.RepeatsWith) {
                        ErrorManager.Errors.push(new ExternalParserError(`Expected ${this.Node.prototype.Type}, got ${Tokens[0]?.type}.`))
                        Valid = false
                        break
                    }
                    if(!ASTNode) break // Breaks due to end of repeating syntax node.
                    ParsedNode.Nodes.push(ASTNode)
                    ParsedNode.Length += ASTNode.Length
                    CurrentToken += ASTNode.Length
                }
                if(this.RepresentsToken()) {
                    const Token = this.TestToken(RemainingTokens)

                    // Breaks due to invalid token in repeating syntax node
                    if(!Token && Tokens[CurrentToken+1]?.type == this.RepeatsWith) {
                        ErrorManager.Errors.push(new ExternalParserError(`Expected ${this.Node}, got ${Tokens[0]?.type}.`))
                        Valid = false
                        break
                    }
                    if(!Token) break // Breaks due to end of repeating syntax node.
                    ParsedNode.Nodes.push(Token)
                    ParsedNode.Length++
                    CurrentToken++
                }
            }

            if(!Valid) return ParsedNode
        }

        ParsedNode.Valid = true
        
        return ParsedNode
    }
}