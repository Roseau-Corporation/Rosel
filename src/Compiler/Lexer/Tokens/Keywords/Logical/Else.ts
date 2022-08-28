import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/else/, (Context) => {
    Context.accept(TokenType.ElseKeyword, undefined)
})