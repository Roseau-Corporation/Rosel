import { program as Program } from "commander"

export const CompileCommand = Program.command("compile <input> [output]")
    .description("Compiles a Rosel script to Luau.")
    .action(() => {
        console.log("Not implemented.")
    })