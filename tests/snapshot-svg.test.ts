import { test, expect } from "bun:test"
import { getSvg } from "../drawing/getSvg"
import symbols from "../generated/symbols-index"
import "bun-match-svg"
import fs from "node:fs"
import path from "node:path"

test("Snapshot test for all SVG symbols", () => {
  const symbolEntries = Object.entries(symbols).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )

  // Get list of existing snapshots
  const snapshotDir = path.join(
    import.meta.dir,
    "__snapshots__",
  )
  
  // Create snapshots directory if it doesn't exist
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true })
  }

  const existingSnapshots = new Set(
    fs.existsSync(snapshotDir) 
      ? fs.readdirSync(snapshotDir)
          .filter(file => file.endsWith(".snap"))
          .map(file => file.replace(".test.ts.snap", ""))
      : []
  )

  for (const [name, symbol] of symbolEntries) {
    let svg
    try {
      svg = getSvg(symbol, { width: 150, height: 150, debug: true })
    } catch (e) {
      svg = `<div>Error generating SVG for ${name}: ${e?.toString()}</div>`
    }

    // Check if snapshot exists before running the test
    const snapshotExists = existingSnapshots.has(name)
    if (!snapshotExists) {
      throw new Error(
        `Missing snapshot for symbol "${name}". Please run "bun run test" to generate snapshots.`,
      )
    }

    expect(svg).toMatchSvgSnapshot(import.meta.path, name)
  }
})
