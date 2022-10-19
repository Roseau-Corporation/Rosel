export class InternalParserError extends Error {
    public message: string

    public constructor(
        public Message: string
    ) {
        super(Message)

        this.message = `Parser Error: ${this.Message}\n      - This is very likely not an error with your code, but an error with the Rosel parser.`

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InternalParserError.prototype)
    }
}