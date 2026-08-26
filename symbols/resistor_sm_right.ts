import svgJson from "../assets/generated/resistor_sm.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "resistor",
  orientation: "right",
})
