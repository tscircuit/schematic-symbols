# schematic-symbols

> [!WARNING]
> This is a work-in-progress that contains all the schematic symbols for tscircuit.

Schematic symbols for tscircuit


## Usage


```ts
import { getSvg, resize, symbols } from "@tscircuit/schematic-symbols"

console.log(symbols.resistor.primitives)
// [{ type: "path", d: "M0 0L1 0...", color: "primary" }, {type: "text", text: "{REF}", ... }]
console.log(symbols.resistor.size)
// { width: 1, height: 0.6 }

getSvg(resistor)
// <svg><path d="M0 0L1 0... ...</svg>

// You can easily resize symbols
console.log(resize(symbols.resistor, { width: 100 }).size)
// { width: 100, height: 60 }
```



## Adding New Symbols

Go into the `./symbols` directory to add new shapes. After adding a shape file, it will
automatically appear in the dev environment (`npm run dev`). Here's an example of a shape
file:

```ts
// boxresistor.ts
import { path, text, defineSymbol } from "drawing"

export const boxresistor = defineSymbol({
  primitives: [
    path({ points: [[0,0], /* ... */, [1, 0]], color: "primary" }),
    text("{REF}", {x: 0.5, y: 0.3, anchor: "middle_top"})
  ],
  center: { x: 0.5, y: 0 },
  size: { width: 1, height: 0.6 }
})
```


### Primitives

Various primitive JSON elements are defined to represent components, each primitive has
a function you can use to quickly define it inside new symbol definitions.

| Primitive | Description |
| --------- | ----------- |
| `path`    | A set of lines `{ points: Array<[number, number]>, color }` |
| `text`    | Text `{ text, x, y, anchor }` |
| `circle`  | Circle `{ x, y, radius }` |
| `box`     | Box `{ x, y, width, height, anchor }` |


### Colors

You can use the following color aliases to color your symbol:

- `primary`
- `secondary`
- `background`
