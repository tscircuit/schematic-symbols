import { test } from "bun:test"
import {
  expectBoxRotation,
  offOriginBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("off-origin box and rotation center, left orientation", () => {
  expectBoxRotation({
    fixture: offOriginBox,
    newOrientation: "left",
    expectedCenter: { x: 4, y: -5 },
    expectedSize: { width: 4, height: 2 },
  })
})
