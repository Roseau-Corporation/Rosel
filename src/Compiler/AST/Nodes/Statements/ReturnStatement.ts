import { Node, NodeType } from "../../Utils"
import { Literal } from "../Literals"

export class ReturnStatement<ValuesType extends Literal[] = Literal[]> extends Node {
    public Type: NodeType = NodeType.ReturnStatement
    public Values: ValuesType

    constructor(Values: ValuesType, Length = 0) {
        super(Length)
        this.Values = Values
    }
}