import { NodeType } from "../../Utils"
import { Literal } from "./Literal"

export class Table extends Literal {
    public Type: NodeType = NodeType.Table

    public constructor(
        public Members: Literal[],
        Length = 0
    ) {
        super(Length)
    }
}