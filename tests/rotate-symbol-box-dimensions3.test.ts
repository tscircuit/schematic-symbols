import { test } from "bun:test"
import {
  expectBoxRotation,
  originCenteredBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("origin-centered box, up orientation", () => {
  expectBoxRotation({
    fixture: originCenteredBox,
    newOrientation: "up",
    expectedCenter: { x: 0, y: 0 },
    expectedSize: { width: 2, height: 4 },
  })
})
