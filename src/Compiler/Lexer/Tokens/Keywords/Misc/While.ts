import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/while/, (Context) => {
    Context.accept(TokenType.WhileKeyword, undefined)
})