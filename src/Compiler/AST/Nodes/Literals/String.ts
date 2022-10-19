import { NodeType } from "../../Utils"
import { Literal } from "./Literal"

export class String extends Literal {
    public Type: NodeType = NodeType.String

    public constructor(
        public Value: string,
        Length = 0
    ) {
        super(Length)
    }
}