import { Node } from "../../Node"

export abstract class Literal extends Node {
    public abstract Value: unknown
}