import { test } from "bun:test"
import {
  expectBoxRotation,
  originCenteredBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("origin-centered box, omitted orientation", () => {
  expectBoxRotation({
    fixture: originCenteredBox,
    newOrientation: undefined,
    expectedCenter: { x: 0, y: 0 },
    expectedSize: { width: 2, height: 4 },
  })
})
