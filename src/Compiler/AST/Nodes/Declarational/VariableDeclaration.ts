import { Node, NodeType } from "../../Utils"
import { Literal } from "../Literals"
import { Identifier } from "../Misc"

export class VariableDeclaration<InitializersType extends Literal[]> extends Node {
    public Type: NodeType = NodeType.VariableDeclaration
    public Names: Identifier[]
    public Initializers: InitializersType

    constructor(Names: Identifier[], Initializers: InitializersType) {
        super()
        this.Names = Names
        this.Initializers = Initializers
    }
}