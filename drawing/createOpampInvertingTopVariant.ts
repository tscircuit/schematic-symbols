import type { PathPrimitive, Port, SchSymbol } from "./types"

const getPort = (symbol: SchSymbol, label: "inp1" | "inp2"): Port => {
  const port = symbol.ports.find(({ labels }) => labels.includes(label))
  if (!port) throw new Error(`Op-amp symbol is missing its ${label} port`)
  return port
}

const getVerticalLength = (primitive: PathPrimitive): number | undefined => {
  if (primitive.points.length !== 2) return undefined
  const [start, end] = primitive.points
  if (!start || !end || start.x !== end.x) return undefined
  return Math.abs(end.y - start.y)
}

/**
 * Converts the canonical right-facing op-amp from + above - to - above +.
 *
 * `inp1` is the non-inverting input and `inp2` is the inverting input. Their
 * complete port records keep their electrical aliases while their positions
 * are exchanged. The vertical stroke that makes the non-inverting sign a plus
 * is moved with `inp1`; the two horizontal sign strokes are already identical.
 */
export const createOpampInvertingTopVariant = (
  symbol: SchSymbol,
): SchSymbol => {
  const nonInvertingInput = getPort(symbol, "inp1")
  const invertingInput = getPort(symbol, "inp2")
  const inputSpacing = Math.abs(nonInvertingInput.y - invertingInput.y)

  const plusStroke = symbol.primitives
    .filter(
      (primitive): primitive is PathPrimitive => primitive.type === "path",
    )
    .map((primitive) => ({
      primitive,
      length: getVerticalLength(primitive),
    }))
    .filter(
      (candidate): candidate is { primitive: PathPrimitive; length: number } =>
        candidate.length !== undefined && candidate.length < inputSpacing / 2,
    )
    .sort((a, b) => {
      const aMidpoint =
        (a.primitive.points[0]!.y + a.primitive.points[1]!.y) / 2
      const bMidpoint =
        (b.primitive.points[0]!.y + b.primitive.points[1]!.y) / 2
      return (
        Math.abs(aMidpoint - nonInvertingInput.y) -
        Math.abs(bMidpoint - nonInvertingInput.y)
      )
    })[0]?.primitive

  if (!plusStroke) {
    throw new Error("Op-amp symbol is missing its non-inverting plus stroke")
  }

  const plusStrokeOffset = invertingInput.y - nonInvertingInput.y

  return {
    ...symbol,
    primitives: symbol.primitives.map((primitive) =>
      primitive === plusStroke
        ? {
            ...primitive,
            points: primitive.points.map((point) => ({
              ...point,
              y: point.y + plusStrokeOffset,
            })),
          }
        : { ...primitive },
    ),
    ports: symbol.ports.map((port) => {
      if (port === nonInvertingInput) {
        return { ...port, x: invertingInput.x, y: invertingInput.y }
      }
      if (port === invertingInput) {
        return { ...port, x: nonInvertingInput.x, y: nonInvertingInput.y }
      }
      return { ...port }
    }),
  }
}
