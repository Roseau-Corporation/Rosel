import { Tokenizer, TokenType } from "../.."

Tokenizer.rule(/--\[\[(.|\n)*?\]\]/, (Context, Match) => {
    Context.accept(TokenType.MultiLineComment, Match[0].substring(4, Match[0].length-2))
})