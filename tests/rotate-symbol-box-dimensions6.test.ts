import { test } from "bun:test"
import {
  expectBoxRotation,
  offOriginBox,
} from "./fixtures/rotate-symbol-box-dimensions"

test("off-origin box and rotation center, right orientation", () => {
  expectBoxRotation({
    fixture: offOriginBox,
    newOrientation: "right",
    expectedCenter: { x: 6, y: -1 },
    expectedSize: { width: 4, height: 2 },
  })
})
