import { Node, NodeType } from "../../Utils"
import { Literal } from "../Literals"

export class ReturnStatement<ValuesType extends Literal[]> extends Node {
    public Type: NodeType = NodeType.ReturnStatement
    public Values: ValuesType

    constructor(Values: ValuesType) {
        super()
        this.Values = Values
    }
}