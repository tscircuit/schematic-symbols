import svgJson from "../assets/generated/resistor_xs.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "resistor",
  orientation: "down",
})
