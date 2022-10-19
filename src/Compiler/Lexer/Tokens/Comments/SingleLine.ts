import { Tokenizer, TokenType } from "../.."

Tokenizer.rule(/--[^\r\n]*/, (Context, Match) => {
    Context.accept(TokenType.SingleLineComment, Match[0].substring(2,Match[0].length))
})