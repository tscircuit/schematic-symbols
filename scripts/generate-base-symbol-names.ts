import symbols from "../generated/symbols-index"
import { writeFileSync } from "node:fs"

const baseSymbolNames = new Set<string>()

for (const symbol of Object.keys(symbols)) {
  const baseSymbolName = symbol.replace(/_vert|_horz$/, "")
  baseSymbolNames.add(baseSymbolName)
}

// Write to symbols/base-symbol-names.ts
writeFileSync(
  "./generated/base-symbol-names.ts",
  `export type BaseSymbolName = ${JSON.stringify(
    Array.from(baseSymbolNames).join(" | "),
  )}`,
)
