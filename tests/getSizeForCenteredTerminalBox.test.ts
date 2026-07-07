import { expect, test } from "bun:test"
import { getSizeForCenteredTerminalBox } from "drawing/getSizeForCenteredTerminalBox"

test("gets a terminal-aligned size from centered terminal positions", () => {
  const center = { x: 0, y: 0 }
  const drainTerminal = { x: 0.3, y: 0.55 }
  const sourceTerminal = { x: 0.31, y: -0.55 }
  const gateTerminal = { x: -0.42, y: -0.1 }

  expect(
    getSizeForCenteredTerminalBox(center, [
      drainTerminal,
      sourceTerminal,
      gateTerminal,
    ]),
  ).toEqual({
    width: Math.abs(gateTerminal.x - center.x) * 2,
    height: Math.abs(drainTerminal.y - center.y) * 2,
  })
})
