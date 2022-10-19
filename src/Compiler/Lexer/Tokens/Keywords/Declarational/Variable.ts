import { Tokenizer, TokenType } from "../../../../.."

Tokenizer.rule(/local/, (Context) => {
    Context.accept(TokenType.VariableKeyword, undefined)
})