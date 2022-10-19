import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/end/, (Context) => {
    Context.accept(TokenType.EndKeyword, undefined)
})