import { test, expect } from "bun:test"
import symbols from "../generated/symbols-index"

test("Check if capacitor_polarized_left has pos and neg port labels", () => {
  const capacitorPolarizedRight = symbols.capacitor_polarized_right

  expect(capacitorPolarizedRight.ports[0].labels).toContain("neg")
  expect(capacitorPolarizedRight.ports[0].labels).toContain("2")

  expect(capacitorPolarizedRight.ports[1].labels).toContain("pos")
  expect(capacitorPolarizedRight.ports[1].labels).toContain("1")

  const capacitorPolarizedLeft = symbols.capacitor_polarized_left

  expect(capacitorPolarizedLeft.ports[0].labels).toContain("neg")
  expect(capacitorPolarizedLeft.ports[0].labels).toContain("2")

  expect(capacitorPolarizedLeft.ports[1].labels).toContain("pos")
  expect(capacitorPolarizedLeft.ports[1].labels).toContain("1")

  const capacitorPolarizedUp = symbols.capacitor_polarized_up

  expect(capacitorPolarizedUp.ports[0].labels).toContain("neg")
  expect(capacitorPolarizedUp.ports[0].labels).toContain("2")

  expect(capacitorPolarizedUp.ports[1].labels).toContain("pos")
  expect(capacitorPolarizedUp.ports[1].labels).toContain("1")

  const capacitorPolarizedDown = symbols.capacitor_polarized_down

  expect(capacitorPolarizedDown.ports[0].labels).toContain("neg")
  expect(capacitorPolarizedDown.ports[0].labels).toContain("2")

  expect(capacitorPolarizedDown.ports[1].labels).toContain("pos")
  expect(capacitorPolarizedDown.ports[1].labels).toContain("1")
})
