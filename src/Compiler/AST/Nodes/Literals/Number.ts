import { NodeType } from "../../Utils"
import { Literal } from "./Literal"

export class Number extends Literal {
    public Type: NodeType = NodeType.Number

    public constructor(
        public Value: number,
        Length = 0
    ) {
        super(Length)
    }
}