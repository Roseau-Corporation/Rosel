import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/do/, (Context) => {
    Context.accept(TokenType.DoKeyword, undefined)
})