import { test } from "bun:test"
import {
  expectBoxRotation,
  offOriginBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("off-origin box and rotation center, omitted orientation", () => {
  expectBoxRotation({
    fixture: offOriginBox,
    newOrientation: undefined,
    expectedCenter: { x: 3, y: -2 },
    expectedSize: { width: 2, height: 4 },
  })
})
