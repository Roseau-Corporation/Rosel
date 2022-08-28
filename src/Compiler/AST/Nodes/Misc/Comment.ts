import { Node, NodeType } from "../../Utils"

export class Comment extends Node {
    public Type: NodeType = NodeType.Comment
    public Value: string

    constructor(Value: string) {
        super()
        this.Value = Value
    }
}