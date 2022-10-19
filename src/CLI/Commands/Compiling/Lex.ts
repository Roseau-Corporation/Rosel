import { program as Program } from "commander"
import FileSystem from "fs/promises"
import Path from "path"
import { Lex } from "../../../Compiler"

export const LexCommand = Program.command("lex <input> [output]")
    .description("Lexes a Rosel script and outputs the tokens.")
    .action(async (Input: string, Output?: string) => {
        const FileData = await FileSystem.readFile(Path.resolve(Input), { encoding: "utf8" })
        const Tokens = Lex(FileData)

        if(Output) {
            await FileSystem.writeFile(Path.resolve(Output), JSON.stringify(Tokens, undefined, 4), { encoding: "utf8" })
            console.log(`Written to ${Output}`)
        } else {
            console.log(Tokens)
        }
    })