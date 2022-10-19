import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/then/, (Context) => {
    Context.accept(TokenType.ThenKeyword, undefined)
})