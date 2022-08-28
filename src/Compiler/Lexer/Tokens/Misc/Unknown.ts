import { Tokenizer, TokenType } from "../../.."

Tokenizer.rule(/./, (Context, Match) => {
    Context.accept(TokenType.Unknown, Match[0])
})