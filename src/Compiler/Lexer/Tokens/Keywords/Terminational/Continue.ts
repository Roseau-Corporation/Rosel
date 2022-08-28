import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/continue/, (Context) => {
    Context.accept(TokenType.ContinueKeyword, undefined)
})