import type { Command } from "svg-path-parser"

export function serializeSvgPathCommands(pathData: Command[]): string {
  return pathData
    .map((command: Command) => {
      let result = command.code

      switch (command.code) {
        case "M":
        case "m":
        case "L":
        case "l":
        case "T":
        case "t":
          result += `${command.x},${command.y}`
          break
        case "H":
        case "h":
          result += command.x
          break
        case "V":
        case "v":
          result += command.y
          break
        case "C":
        case "c":
          result += `${command.x1},${command.y1} ${command.x2},${command.y2} ${command.x},${command.y}`
          break
        case "S":
        case "s":
        case "Q":
        case "q":
          // @ts-ignore
          result += `${command.x1},${command.y1} ${command.x},${command.y}`
          break
        case "A":
        case "a":
          result += `${command.rx},${command.ry} ${command.xAxisRotation} ${command.largeArc ? "1" : "0"},${command.sweep ? "1" : "0"} ${command.x},${command.y}`
          break
        case "Z":
        case "z":
          break
      }

      return result
    })
    .join(" ")
}
