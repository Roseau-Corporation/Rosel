import { Literal } from "./Literal"

export class Number extends Literal {
    public Render() {
        return this.Value.toString()
    }

    public constructor(
        public Value: number
    ) {
        super()
    }
}