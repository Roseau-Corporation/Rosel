import { Tokenizer, TokenType } from "../../../.."

Tokenizer.rule(/"((?:\\"|[^\r\n"])*)"/, (Context, Match) => {
    Context.accept(TokenType.String, Match[1].replace(/\\"/g, "\""))
})