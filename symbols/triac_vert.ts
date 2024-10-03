import { rotateSymbol } from "drawing/rotateSymbol";
import triac_horz from "./triac_horz";

const rotatedSymbol = rotateSymbol(triac_horz);

const texts = rotatedSymbol.primitives.filter((primitive) => primitive.type === "text");

const ref = texts.find((text) => text.text === "{REF}")!;

ref.y = 0;

export default rotatedSymbol;