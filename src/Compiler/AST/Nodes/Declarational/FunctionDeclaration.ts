import { Node, NodeType } from "../../Utils"
import { Literal } from "../Literals"
import { Identifier } from "../Misc"

export class FunctionDeclaration<BodyType extends Node[]> extends Literal {
    public Type: NodeType = NodeType.FunctionDeclaration
    public Name?: Identifier
    public Parameters: Identifier[]
    public Body: BodyType
    public Local: boolean

    constructor(Parameters: Identifier[], Body: BodyType, Name?: Identifier, Local = false) {
        super()
        this.Name = Name
        this.Parameters = Parameters
        this.Body = Body
        this.Local = Local
    }
}