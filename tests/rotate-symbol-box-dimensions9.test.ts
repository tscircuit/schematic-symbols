import { test } from "bun:test"
import {
  expectBoxRotation,
  offOriginBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("off-origin box and rotation center, down orientation", () => {
  expectBoxRotation({
    fixture: offOriginBox,
    newOrientation: "down",
    expectedCenter: { x: 7, y: -4 },
    expectedSize: { width: 2, height: 4 },
  })
})
