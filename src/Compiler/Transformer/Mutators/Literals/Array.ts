import { Luau, NodeType } from "../../.."
import * as Rosel from "../../../AST"
import { Mutator } from "../../Mutator"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any> = new (...args: any[]) => T

export const ArrayMutator = new Mutator(Rosel.Array, (Node) => {
    // TODO: Fix array mutator not mutating past array depth 1.
    return new Luau.Array(Node.Value.map((RoselLiteral) => {
        const Mappings: Partial<Record<NodeType, Constructor>> = {
            [NodeType.Array]: Luau.Array,
            [NodeType.String]: Luau.String,
            [NodeType.Number]: Luau.Number
        }
        const TargetLiteral = Mappings[RoselLiteral.Type]

        return TargetLiteral ? new TargetLiteral(RoselLiteral.Value as never) : new Luau.String("This literal is not supported yet.")
    }))
})