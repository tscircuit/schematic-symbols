import symbols from "../generated/symbols-index"
import { writeFileSync } from "node:fs"

const baseSymbolNames = new Set<string>()

for (const symbol of Object.keys(symbols)) {
  const baseSymbolName = symbol.replace(/_vert|_horz$/, "")
  baseSymbolNames.add(baseSymbolName)
}

const baseSymbolType = Array.from(baseSymbolNames)
  .map((name) => `"${name}"`)
  .join(" | ")

writeFileSync(
  "./generated/base-symbol-names.ts",
  `export type BaseSymbolName = ${baseSymbolType};\n`,
)
