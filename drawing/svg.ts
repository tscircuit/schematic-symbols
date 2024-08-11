import type { INode } from "svgson"

export function getBoundsOfSvgJson(svgJson: INode): {
  minX: number
  maxX: number
  minY: number
  maxY: number
  width: number
  height: number
  centerX: number
  centerY: number
} {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  function processNode(node: INode) {
    if (node.name === "path" && node.attributes.d) {
      const commands = node.attributes.d.split(/(?=[MmLlHhVvCcSsQqTtAaZz])/)
      let currentX = 0
      let currentY = 0

      for (const command of commands) {
        const type = command[0]
        const args = command
          .slice(1)
          .trim()
          .split(/[,\s]+/)
          .map(Number)

        switch (type) {
          case "m":
            currentX += args[0]
            currentY += args[1]
            break
          case "l":
            currentX += args[0]
            currentY += args[1]
            break
          case "h":
            currentX += args[0]
            break
          case "H":
            currentX = args[0]
            break
          case "v":
            currentY += args[0]
            break
          case "V":
            currentY = args[0]
            break
          case "c":
            currentX += args[4]
            currentY += args[5]
            break
          case "s":
          case "q":
            currentX += args[2]
            currentY += args[3]
            break
          case "t":
            currentX += args[0]
            currentY += args[1]
            break
          case "a":
            currentX += args[5]
            currentY += args[6]
            break
          case "z":
            break
          default:
            if (type === type.toUpperCase()) {
              currentX = args[args.length - 2]
              currentY = args[args.length - 1]
            }
        }
        minX = Math.min(minX, currentX)
        maxX = Math.max(maxX, currentX)
        minY = Math.min(minY, currentY)
        maxY = Math.max(maxY, currentY)
      }
    }

    if (node.children) {
      node.children.forEach(processNode)
    }
  }

  processNode(svgJson)

  const width = maxX - minX
  const height = maxY - minY
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2

  return { minX, maxX, minY, maxY, width, height, centerX, centerY }
}

export function svgPathToPoints(d: string): Array<{ x: number; y: number }> {
  const commands = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d+(\.\d+)?/g) || []
  const points: Array<{ x: number; y: number }> = []
  let currentX = 0
  let currentY = 0

  function absolute(x: number, y: number): [number, number] {
    return [x, y]
  }

  function relative(x: number, y: number): [number, number] {
    return [currentX + x, currentY + y]
  }

  let index = 0
  while (index < commands.length) {
    const cmd = commands[index++]
    const isRelative = cmd === cmd.toLowerCase()
    const getCoords = isRelative ? relative : absolute

    switch (cmd.toLowerCase()) {
      case "m":
      case "l":
        {
          const [x, y] = getCoords(
            parseFloat(commands[index++]),
            parseFloat(commands[index++]),
          )
          points.push({ x, y })
          currentX = x
          currentY = y
        }
        break
      case "h":
        {
          const [x, y] = getCoords(parseFloat(commands[index++]), currentY)
          points.push({ x, y })
          currentX = x
        }
        break
      case "v":
        {
          const [x, y] = getCoords(currentX, parseFloat(commands[index++]))
          points.push({ x, y })
          currentY = y
        }
        break
      case "c":
        {
          for (let i = 0; i < 3; i++) {
            const [x, y] = getCoords(
              parseFloat(commands[index++]),
              parseFloat(commands[index++]),
            )
            points.push({ x, y })
            if (i === 2) {
              currentX = x
              currentY = y
            }
          }
        }
        break
      case "s":
      case "q":
        {
          for (let i = 0; i < 2; i++) {
            const [x, y] = getCoords(
              parseFloat(commands[index++]),
              parseFloat(commands[index++]),
            )
            points.push({ x, y })
            if (i === 1) {
              currentX = x
              currentY = y
            }
          }
        }
        break
      case "t":
      case "a":
        {
          const [x, y] = getCoords(
            parseFloat(commands[index + 5]),
            parseFloat(commands[index + 6]),
          )
          points.push({ x, y })
          currentX = x
          currentY = y
          index += 7
        }
        break
      case "z":
        // Close path - no action needed
        break
    }
  }

  return points
}
