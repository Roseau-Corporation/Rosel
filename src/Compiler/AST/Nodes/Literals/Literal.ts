import { Node, NodeType } from "../../Utils"

export abstract class Literal extends Node {
    public Type: NodeType = NodeType.Unknown

    constructor() {
        super()
    }
}