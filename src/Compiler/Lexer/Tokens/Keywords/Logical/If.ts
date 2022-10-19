import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/if/, (Context) => {
    Context.accept(TokenType.IfKeyword, undefined)
})