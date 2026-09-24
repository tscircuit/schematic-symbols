import { flipSymbolOverXAxis, rotateSymbol } from "drawing/rotateSymbol"
import opamp_no_power_inverting_top_right from "./opamp_no_power_inverting_top_right"

export default flipSymbolOverXAxis(
  rotateSymbol(opamp_no_power_inverting_top_right, "left"),
)
