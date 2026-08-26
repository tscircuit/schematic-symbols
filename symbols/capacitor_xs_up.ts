import svgJson from "../assets/generated/capacitor_xs.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "capacitor",
  orientation: "up",
  pin1Labels: ["1", "pos"],
  pin2Labels: ["2", "neg"],
})
