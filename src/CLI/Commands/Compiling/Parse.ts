import { program as Program } from "commander"
import FileSystem from "fs/promises"
import Path from "path"
import { Lex, Parse } from "../../../Compiler"

export const ParseCommand = Program.command("parse <input> [output]")
    .description("Parses a Rosel script and outputs the AST.")
    .action(async (Input: string, Output?: string) => {
        const FileData = await FileSystem.readFile(Path.resolve(Input), { encoding: "utf8" })
        const AST = await Parse(Lex(FileData))

        if(Output) {
            await FileSystem.writeFile(Path.resolve(Output), JSON.stringify(AST, undefined, 4), { encoding: "utf8" })
            console.log(`Written to ${Output}`)
        } else {
            console.log(AST)
        }
    })