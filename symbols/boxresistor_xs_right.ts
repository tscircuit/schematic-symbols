import svgJson from "../assets/generated/boxresistor_xs.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "boxresistor",
  orientation: "right",
})
