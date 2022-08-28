import { NodeType } from "../../Utils"
import { Literal } from "./Literal"

export class String extends Literal {
    public Type: NodeType = NodeType.String
    public Value: string

    constructor(Value: string) {
        super()
        this.Value = Value
    }
}