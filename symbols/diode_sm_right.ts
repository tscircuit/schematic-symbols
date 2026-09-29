import svgJson from "../assets/generated/diode_sm.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "diode",
  orientation: "right",
  pin1Labels: ["1", "pos", "anode"],
  pin2Labels: ["2", "neg", "cathode"],
})
