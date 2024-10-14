import { rotateSymbol } from "drawing/rotateSymbol"
import pnp_bipolar_transistor_horz from "./pnp_bipolar_transistor_horz"

const rotatedSymbol = rotateSymbol(pnp_bipolar_transistor_horz)

const texts = rotatedSymbol.primitives.filter((p) => p.type === "text")

const ref = texts.find((t) => t.text === "{REF}")!

ref.anchor = "middle_left"

export default rotatedSymbol
