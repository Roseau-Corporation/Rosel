import { NodeType } from "../../Utils"
import { Literal } from "./Literal"

export class Number extends Literal {
    public Type: NodeType = NodeType.Number
    public Value: number

    constructor(Value: number) {
        super()
        this.Value = Value
    }
}