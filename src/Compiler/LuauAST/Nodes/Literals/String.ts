import { Literal } from "./Literal"

export class String extends Literal {
    public Render() {
        return `"${this.Value.replace("\"","\\\"")}"`
    }

    public constructor(
        public Value: string
    ) {
        super()
    }
}