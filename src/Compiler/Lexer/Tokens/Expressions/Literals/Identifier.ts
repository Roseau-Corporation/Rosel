import { Tokenizer, TokenType } from "../../../.."

Tokenizer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (Context) => {
    Context.accept(TokenType.Identifier)
})