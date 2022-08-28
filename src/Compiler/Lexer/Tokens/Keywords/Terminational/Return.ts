import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/return/, (Context) => {
    Context.accept(TokenType.ReturnKeyword, undefined)
})