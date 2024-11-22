import { test, expect } from "bun:test"
import { getSvg } from "../drawing/getSvg"
import symbols from "../generated/symbols-index"
import "bun-match-svg"

test("Snapshot test for all SVG symbols", async () => {
  const symbolEntries = Object.entries(symbols).sort((a, b) =>
    a[0].localeCompare(b[0]),
  )

  // Get list of existing snapshots
  const snapshotPath =
    import.meta.dir.split("/").slice(0, -1).join("/") +
    "/__snapshots__/snapshot-svg.test.ts.snap"

  let existingSnapshots = new Set<string>()
  try {
    const snapshotContent = await Bun.file(snapshotPath).text()
    const snapshotMatches = snapshotContent.matchAll(/exports\[`(.*?)`\]/g)
    existingSnapshots = new Set(Array.from(snapshotMatches, (m) => m[1]))
  } catch (e) {
    // Handle case where snapshot file doesn't exist yet
    console.warn(
      "No existing snapshot file found - will generate new snapshots",
    )
  }

  for (const [name, symbol] of symbolEntries) {
    let svg
    try {
      svg = getSvg(symbol, { width: 150, height: 150, debug: true })
    } catch (e) {
      svg = `<div>Error generating SVG for ${name}: ${e?.toString()}</div>`
    }

    // Instead of throwing error, generate new snapshot if missing
    const snapshotExists = existingSnapshots.has(name)
    if (!snapshotExists) {
      console.log(`Generating new snapshot for symbol "${name}"`)
    }

    expect(svg).toMatchSvgSnapshot(import.meta.path, name)
  }
})
