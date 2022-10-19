export enum NodeType {
    VariableDeclaration = "VariableDeclaration",
    FunctionDeclaration = "FunctionDeclaration",

    ReturnStatement = "ReturnStatement",

    String = "String",
    Number = "Number",
    Table = "Table",

    Identifier = "Identifier",
    Comment = "Comment",

    Unknown = "Unknown"
}

export class Node {
    public Type!: NodeType

    public constructor(
        public Length = 0
    ) { }
}