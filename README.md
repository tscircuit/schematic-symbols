# schematic-symbols

[View Online](https://symbols.tscircuit.com/) & [Contributor Getting Started Video](https://share.cleanshot.com/rNYMs0K9)

Schematic symbols for tscircuit

> [!TIP]
> Looking to contribute to this repo? Take a look at [How to Contribute to Schematic Symbols](https://blog.tscircuit.com/p/how-to-contribute-to-schematic-symbols)!

## Usage

```ts
import { getSvg, resize, symbols } from "@tscircuit/schematic-symbols"

console.log(symbols.resistor.primitives)
// [{ type: "path", d: "M0 0L1 0...", color: "primary" }, {type: "text", text: "{REF}", ... }]
console.log(symbols.resistor.size)
// { width: 1, height: 0.6 }

getSvg(resistor)
// <svg><path d="M0 0L1 0... ..."</svg>

// You can easily resize symbols
console.log(resize(symbols.resistor, { width: 100 }).size)
// { width: 100, height: 60 }
```

## Adding New Symbols

1. Add a new svg file to the `./assets/symbols` directory (copy volt_meter.svg to a new file named `<symbol_name>.svg`)
2. Run `bun run generate` to generate the new symbol
3. Run `bun run dev` to start the dev server and verify the new symbol
4. Run `bun run format` to format code before committing
5. Run `bun run test` to ensure symbol snapshots are present & validated
6. Run `bun run build` to build all the symbols into the `./generated` directory

Here's an example of a generated symbol file:

```ts
// boxresistor.ts
import { path, text, defineSymbol } from "drawing"

export const boxresistor = defineSymbol({
  primitives: [
    path({ points: [[0, 0] /* ... */, , [1, 0]], color: "primary" }),
    text("{REF}", { x: 0.5, y: 0.3, anchor: "middle_top" }),
  ],
  ports: [
    { x: 0, y: 0, labels: ["1", "-"] },
    { x: 1, y: 0, labels: ["2", "+"] },
  ],
  center: { x: 0.5, y: 0 },
  size: { width: 1, height: 0.6 },
})
```

> These files are used to generate an

### Primitives

Various primitive JSON elements are defined to represent components, each primitive has
a function you can use to quickly define it inside new symbol definitions.

| Primitive | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `path`    | A set of lines `{ points: Array<[number, number]>, color }` |
| `text`    | Text `{ text, x, y, anchor }`                               |
| `circle`  | Circle `{ x, y, radius }`                                   |
| `box`     | Box `{ x, y, width, height, anchor }`                       |

### Colors

You can use the following color aliases to color your symbol:

- `primary`
- `secondary`
- `background`

### Guidelines

The symbols should all look correct next to eachother, since they're all used together
in the same schematic.

- The width of most standard passives is `1`
- The height of most standard passives is `0.6`
- Number pins from **1** upward following the symbol's direction. For example,
  a symbol that points right has pin **1** on the left and pin **2** on the
  right.
- If a device is polarized, number the pins from **positive** to **negative** in
  that same direction.
- Increase the pin numbers for the symbol in counter clockwise direction.

### Development

Software needed to edit this project:

- VS Code
- Inkscape

## References

- [MIT Schematic Symbols](https://github.com/sjgallagher2/SchematicSymbolsSVG)
- [affinity-circuit-symbols-asset](https://github.com/keikawa/affinity-circuit-symbols-asset/tree/main)
- [Inkscape Symbols](https://github.com/upb-lea/Inkscape_electric_Symbols?tab=readme-ov-file)
