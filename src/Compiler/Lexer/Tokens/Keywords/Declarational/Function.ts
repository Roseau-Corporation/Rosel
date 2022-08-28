import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/function/, (Context) => {
    Context.accept(TokenType.FunctionKeyword, undefined)
})