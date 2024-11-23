import svgJson from "assets/generated/volt_meter.json"
import { modifySymbol } from "scripts/lib/modify-symbol/modify-symbol"

const { paths, texts, bounds, circles, refblocks } = svgJson
export default modifySymbol(svgJson)
  .changeTextAnchor("{VAL}", "middle_top")
  .labelPort("left1", ["1"])
  .labelPort("right1", ["2"])
  .changeTextAnchor("{REF}", "middle_bottom")
  .build()
