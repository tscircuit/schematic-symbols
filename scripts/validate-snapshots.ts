import fs from "fs"
import path from "path"
import symbols from "../generated/symbols-index"
import { logger } from "../logger"

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
    logger.error("Snapshots missing", { symbols: missingSnapshots })
    process.exit(1)
  }

  logger.info("All symbol snapshots are present")
}

validateSnapshots()
