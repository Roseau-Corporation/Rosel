import { NodeType } from "../../Utils"
import { Literal } from "../Literals"

export class Identifier extends Literal {
    public Type: NodeType = NodeType.Identifier
    public Value: string

    constructor(Name: string, Length = 0) {
        super(Length)
        this.Value = Name
    }
}