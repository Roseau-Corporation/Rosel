import { Literal } from "./Literal"

export class Array extends Literal {
    public Render() {
        return `{ ${this.Value.map((Member: Literal) => {
            return Member.Render()
        }).join(",")} }`
    }

    public constructor(
        public Value: Literal[] = [ ]
    ) {
        super()
    }
}