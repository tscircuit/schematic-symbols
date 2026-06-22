import { expect, test } from "bun:test"
import solderjumper2 from "../assets/generated/solderjumper2.json"
import solderjumper2Bridged12 from "../assets/generated/solderjumper2_bridged12.json"

const expectSymmetricSolderJumper = (symbol: typeof solderjumper2) => {
  expect(symbol.refblocks.left1).toEqual({ x: -0.45, y: -0.025 })
  expect(symbol.refblocks.right1).toEqual({ x: 0.45, y: -0.025 })
  expect(symbol.texts.top1.x).toBe(0)
}

test("solderjumper2 port refblocks are symmetric", () => {
  expectSymmetricSolderJumper(solderjumper2)
  expectSymmetricSolderJumper(solderjumper2Bridged12)
})
