import type { Point } from "drawing/types"

export function getSizeForCenteredTerminalBox(
  center: Point,
  terminals: Point[],
) {
  return {
    width:
      Math.max(
        ...terminals.map((terminal) => Math.abs(terminal.x - center.x)),
      ) * 2,
    height:
      Math.max(
        ...terminals.map((terminal) => Math.abs(terminal.y - center.y)),
      ) * 2,
  }
}
