import svgJson from "../assets/generated/boxresistor_sm.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "boxresistor",
  orientation: "up",
})
