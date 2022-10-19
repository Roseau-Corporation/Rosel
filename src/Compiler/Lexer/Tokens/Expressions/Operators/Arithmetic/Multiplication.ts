import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/\*/, (Context) => {
    Context.accept(TokenType.MultiplicationOperator, undefined)
})