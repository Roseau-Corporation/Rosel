import { Tokenizer, TokenType } from "../../../.."

Tokenizer.rule(/[+-]?\d*\.?\d+/, (Context, Match) => {
    Context.accept(TokenType.Number, parseFloat(Match[0]))
})