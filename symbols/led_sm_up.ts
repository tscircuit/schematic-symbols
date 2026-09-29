import svgJson from "../assets/generated/led_sm.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "led",
  orientation: "up",
  pin1Labels: ["1", "pos", "anode"],
  pin2Labels: ["2", "neg", "cathode"],
})
