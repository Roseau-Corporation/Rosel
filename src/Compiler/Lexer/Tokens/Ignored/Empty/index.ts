import { Tokenizer } from "../../.."

Tokenizer.rule(/[ \t\r\n]+/, (Context) => {
    Context.ignore()
})