import { getSvg } from "../drawing/getSvg"
import symbols from "../generated/symbols-index"
import fs from "fs"
import path from "path"

async function generateSnapshots() {
  const symbolEntries = Object.entries(symbols).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )

  const snapshotDir = path.join(process.cwd(), "__snapshots__")
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true })
  }

  const snapshotPath = path.join(snapshotDir, "snapshot-svg.test.ts.snap")
  let snapshots = ""

  for (const [name, symbol] of symbolEntries) {
    let svg
    try {
      svg = getSvg(symbol, { width: 150, height: 150, debug: true })
    } catch (e) {
      svg = `<div>Error generating SVG for ${name}: ${e?.toString()}</div>`
    }
    
    snapshots += `exports[\`${name}\`] = \`${svg}\`;\n\n`
  }

  fs.writeFileSync(snapshotPath, snapshots)
  console.log(`Generated snapshots at ${snapshotPath}`)
}

generateSnapshots().catch(console.error) 