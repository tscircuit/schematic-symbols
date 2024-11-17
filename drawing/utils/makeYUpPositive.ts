import { NinePointAnchor } from "drawing/types"

/**
 * In Inkscape and Websites, Y-up is NEGATIVE- meaning e.g. y=10 is BELOW y=0.
 *
 * Our symbols are defined with Y-up POSITIVE, meaning e.g. y=10 is ABOVE y=0.
 *
 * This function helps flip y positions so that you can convert from schematic
 * symbol coordinates to SVG coordinates.
 */
export const makeYUpPositive = (y: number, yUpPositive: boolean = true) => {
  return yUpPositive ? -y : y
}

/**
 * This function gives an intermediate anchor flip that can be used to determine
 * how anchors should be interpreted when flipping in the Y-axis.
 *
 * It converts top_left -> bottom_left etc.
 *
 * y=1            top_left  -------
 * y=0               |             |
 * y=-1               -------------
 *
 * Y-up Negative
 *
 * y=-1               -------------
 * y=0               |             |
 * y=1              bottom_left  --
 */
export const flipAnchorOverYAxis = (anchor: NinePointAnchor) => {
  if (anchor === "top_left") return "bottom_left"
  if (anchor === "top_right") return "bottom_right"
  if (anchor === "bottom_left") return "top_left"
  if (anchor === "bottom_right") return "top_right"
  if (anchor === "middle_top") return "middle_bottom"
  if (anchor === "middle_bottom") return "middle_top"
  return anchor
}

export const makeAnchorYUpPositive = (
  anchor: NinePointAnchor,
  yUpPositive: boolean = true,
) => {
  return yUpPositive ? flipAnchorOverYAxis(anchor) : anchor
}
