import svgJson from "../assets/generated/bidirectional_tvs_diode.json"
import { createPassiveSizeVariant } from "../drawing/createPassiveSizeVariant"

export default createPassiveSizeVariant(svgJson, {
  kind: "diode",
  orientation: "right",
})
