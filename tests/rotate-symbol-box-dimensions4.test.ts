import { test } from "bun:test"
import {
  expectBoxRotation,
  originCenteredBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("origin-centered box, down orientation", () => {
  expectBoxRotation({
    fixture: originCenteredBox,
    newOrientation: "down",
    expectedCenter: { x: 0, y: 0 },
    expectedSize: { width: 2, height: 4 },
  })
})
