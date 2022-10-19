import { Node, NodeType } from "../../Utils"

export class Literal extends Node {
    public Type: NodeType = NodeType.Unknown
    public Value: unknown

    public constructor(Length = 0) {
        super(Length)
    }
}