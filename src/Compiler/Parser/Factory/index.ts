import { Token } from "tokenizr"
import { FactoryManager } from ".."
import { TokenType } from "../../Lexer"
import { ParsedSyntaxNode, SyntaxNode } from "./SyntaxNode"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericNode = (new (...args: any[]) => any) | TokenType
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FactoryConstructor<T extends new (...args: any[]) => any> = (ParsedNodes: ParsedSyntaxNode[], Length: number) => InstanceType<T>

export * from "./SyntaxNode"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ASTFactory<T extends new (...args: any[]) => any> {
    private _Syntax: SyntaxNode[] = []
    get Syntax() {
        return this._Syntax
    }

    public Constructor?: FactoryConstructor<T>

    public constructor(
        public Node: T
    ) {
        FactoryManager.Factories.set(this.Node, this)
    }

    public Add(Node: GenericNode, Optional = false, Repeatable = false, RepeatsWith?: TokenType): this {
        this._Syntax.push(new SyntaxNode(Node, Optional, Repeatable, RepeatsWith))
        return this
    }

    public SetConstructor(Constructor: FactoryConstructor<T>): this {
        this.Constructor = Constructor
        return this
    }

    public Test(Tokens: Token[]): InstanceType<T> | undefined {
        let TokenNumber = 0
        let Length = 0
        let Valid = true
        const ParsedNodes = this.Syntax.map((SyntaxNode: SyntaxNode) => {
            if(!Valid) return
            const ParsedNode = SyntaxNode.Test(Tokens.slice(TokenNumber))

            Length += ParsedNode?.Length ?? 1
            TokenNumber += ParsedNode?.Length ?? 1

            if(!ParsedNode.Valid) Valid = false

            return ParsedNode
        }).filter(Element => Element !== undefined) as ParsedSyntaxNode[]

        if(!Valid) return undefined

        return this.Constructor ? this.Constructor(ParsedNodes, Length) : undefined
    }
}