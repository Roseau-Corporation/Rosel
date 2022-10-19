import { Literal } from "./Literal"

export class Array extends Literal {
    public Render() {
        // not rendering past depth 1 for nested arrays
        // why??
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