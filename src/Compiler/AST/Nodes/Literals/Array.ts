import { NodeType } from "../../Utils"
import { Literal } from "./Literal"

export class Array extends Literal {
    public Type: NodeType = NodeType.Array

    public constructor(
        public Value: Literal[],
        Length = 0
    ) {
        super(Length)
    }
}