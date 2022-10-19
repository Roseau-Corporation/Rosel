import { Node } from "../../Utils"

export class Program extends Node {
    constructor(
        public Body: Node[],
        Length = 0
    ) {
        super(Length)
    }
}