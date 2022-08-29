import { Node, NodeType } from "../../Utils"

export class Literal extends Node {
    public Type: NodeType = NodeType.Unknown

    constructor() {
        super()
    }
}