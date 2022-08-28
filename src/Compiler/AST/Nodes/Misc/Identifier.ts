import { NodeType } from "../../Utils"
import { Literal } from "../Literals"

export class Identifier extends Literal {
    public Type: NodeType = NodeType.Identifier
    public Name: string

    constructor(Name: string) {
        super()
        this.Name = Name
    }
}