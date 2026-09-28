import { test } from "bun:test"
import {
  expectBoxRotation,
  originCenteredBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("origin-centered box, left orientation", () => {
  expectBoxRotation({
    fixture: originCenteredBox,
    newOrientation: "left",
    expectedCenter: { x: 0, y: 0 },
    expectedSize: { width: 4, height: 2 },
  })
})
