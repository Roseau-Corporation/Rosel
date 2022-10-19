import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/break/, (Context) => {
    Context.accept(TokenType.BreakKeyword, undefined)
})