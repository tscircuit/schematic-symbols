import type { PathPrimitive } from "../drawing/types"

/**
 * Returns the decorative paths for an AC voltmeter indicator
 * (chevron + sine wave) translated to the given circle center.
 */
export function getACVoltmeterIndicatorPaths(
  cx: number,
  cy: number,
): PathPrimitive[] {
  return [
    {
      type: "path",
      points: [
        { x: cx + 0.1, y: cy + 0.09 },
        { x: cx, y: cy - 0.1 },
        { x: cx - 0.11, y: cy + 0.09 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx, y: cy - 0.17 },
        { x: cx + 0.07, y: cy - 0.15 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx + 0.07, y: cy - 0.15 },
        { x: cx + 0.14, y: cy - 0.17 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx - 0.15, y: cy - 0.17 },
        { x: cx - 0.07, y: cy - 0.15 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx - 0.07, y: cy - 0.15 },
        { x: cx, y: cy - 0.17 },
      ],
      color: "primary",
      fill: false,
    },
  ]
}

/**
 * Returns the decorative paths for a DC voltmeter indicator
 * (chevron + minus line) translated to the given circle center.
 */
export function getDCVoltmeterIndicatorPaths(
  cx: number,
  cy: number,
): PathPrimitive[] {
  return [
    {
      type: "path",
      points: [
        { x: cx + 0.1, y: cy + 0.09 },
        { x: cx, y: cy - 0.1 },
        { x: cx - 0.11, y: cy + 0.09 },
      ],
      color: "primary",
      fill: false,
    },
    {
      type: "path",
      points: [
        { x: cx - 0.12, y: cy - 0.18 },
        { x: cx + 0.12, y: cy - 0.18 },
      ],
      color: "primary",
      fill: false,
    },
  ]
}
