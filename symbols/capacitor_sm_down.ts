import svgJson from "../assets/generated/capacitor_sm.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "capacitor",
  orientation: "down",
  pin1Labels: ["1", "pos"],
  pin2Labels: ["2", "neg"],
})
