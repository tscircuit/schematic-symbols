import fs from "fs"
import path from "path"
import symbols from "../generated/symbols-index"

function validateSnapshots() {
  const missingSnapshots: string[] = []

  for (const symbolName in symbols) {
    const snapshotPath = path.join(
      "tests",
      "__snapshots__",
      `${symbolName}.snap.svg`,
    )
    if (!fs.existsSync(snapshotPath)) {
      missingSnapshots.push(symbolName)
    }
  }

  if (missingSnapshots.length > 0) {
    console.error("Error: Snapshots missing for the following symbols:")
    missingSnapshots.forEach((symbol) => console.error(`- ${symbol}`))
    process.exit(1)
  }

  console.log("All symbol snapshots are present.")
}

validateSnapshots()
