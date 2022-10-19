import { Node, NodeType } from "../../Utils"

export class Comment extends Node {
    public Type: NodeType = NodeType.Comment
    public Value: string

    constructor(Value: string, Length = 0) {
        super(Length)
        this.Value = Value
    }
}