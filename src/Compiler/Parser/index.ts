import { Token } from "tokenizr"
import { Node } from "../AST"
import { ASTFactory } from "./Factory"
import { ErrorManager } from "../ErrorManager"
import { TokenType } from "../Lexer"

export class FactoryManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static Factories: Map<new(...args: any[]) => any, ASTFactory<any>> = new Map()
}

import "./Factories"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ParseOnce = (Tokens: Token[], MustInstanceOf?: new(...args: any[]) => any) => {
    let Node: Node | undefined
    let Suspended = false

    FactoryManager.Factories.forEach((Factory) => {
        if(Suspended) return
        if(MustInstanceOf) {
            if(!((new Factory.Node()) instanceof MustInstanceOf)) return
        }

        const ASTNode = Factory.Test(Tokens)

        if(ASTNode) Suspended = true
        Node = ASTNode
    })

    return Node
}

export const Parse = async (Tokens: Token[]): Promise<(Node | undefined)[]> => {
    const Nodes: (Node | undefined)[] = []

    await import("./Factories")

    let CurrentToken = 0
    while(CurrentToken < Tokens.length) {
        const Token = Tokens[CurrentToken]
        if(Token.type == TokenType.EndOfFile) {
            CurrentToken++
            continue
        }

        const Node = ParseOnce(Tokens.slice(CurrentToken))
        
        if(!Node) {
            throw ErrorManager.Errors[ErrorManager.Errors.length-1]
        }

        CurrentToken += Node.Length
        Nodes.push(Node)
    }

    return Nodes
}