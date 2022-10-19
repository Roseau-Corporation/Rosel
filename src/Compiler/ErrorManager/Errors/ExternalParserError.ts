export class ExternalParserError extends Error {
    public message: string

    public constructor(
        public Message: string
    ) {
        super(Message)

        this.message = `Parser Error: ${this.Message}\n      - This is likely an error with your code, not an error with the Rosel parser.`

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ExternalParserError.prototype)
    }
}