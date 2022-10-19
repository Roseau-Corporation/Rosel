import { Luau, Node } from "../.."

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any> = new (...args: any[]) => T

export class Mutator<C, T extends Constructor<C>> {
    static Mutators: Map<string, Mutator<unknown, Constructor>> = new Map()

    public constructor(
        public Input: T,
        public MutatorFunction: (Node: InstanceType<T>) => Luau.Node
    ) {
        Mutator.Mutators.set(Input.prototype.constructor.name, this)
    }

    static async Mutate(Node: Node): Promise<Luau.Node | undefined> {
        await import("../Mutators")

        return Mutator.Mutators.get((Node as unknown as { constructor: { name: string }}).constructor.name)?.MutatorFunction(Node)
    }
}

import "../Mutators"