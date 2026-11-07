import { flipSymbolOverXAxis, rotateSymbol } from "drawing/rotateSymbol"
import opamp_with_power_inverting_top_right from "./opamp_with_power_inverting_top_right"

export default flipSymbolOverXAxis(
  rotateSymbol(opamp_with_power_inverting_top_right, "left"),
)
