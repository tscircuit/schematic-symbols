import svgJson from "../assets/generated/avalanche_diode_sm.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "diode",
  orientation: "up",
  pin1Labels: ["1", "pos", "anode"],
  pin2Labels: ["2", "neg", "cathode"],
})
