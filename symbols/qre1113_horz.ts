import { defineSymbol } from "drawing/defineSymbol"
import { Primitive } from "drawing/types"

export default defineSymbol({
  primitives: [
    // Package outline box (made smaller so pins extend outside)
    {
      type: "path",
      points: [
        { x: -0.7, y: -0.5 },
        { x: 0.7, y: -0.5 },
        { x: 0.7, y: 0.5 },
        { x: -0.7, y: 0.5 },
        { x: -0.7, y: -0.5 },
      ],
      color: "primary",
      fill: false,
      closed: false,
    } as Primitive,

    // P-Channel MOSFET primitives (left side, shifted left by -0.4)
    // Gate line
    {
      type: "path",
      points: [
        { x: -0.39274354450000026 - 0.4, y: -0.10329954999999957 },
        { x: 0.05111245549999932 - 0.4, y: -0.1059225499999994 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Gate vertical line
    {
      type: "path",
      points: [
        { x: 0.09373835550000087 - 0.4, y: 0.18559775000000034 },
        { x: 0.09280835550000122 - 0.4, y: -0.18255174999999935 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Drain connection
    {
      type: "path",
      points: [
        { x: 0.30382435550000064 - 0.4, y: 0.53233025 },
        { x: 0.3032243555000005 - 0.4, y: 0.10600584999999985 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Source connection
    {
      type: "path",
      points: [
        { x: 0.3108281555000003 - 0.4, y: -0.5323308500000001 },
        { x: 0.31142815550000025 - 0.4, y: -0.005876249999999805 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Upper channel connection
    {
      type: "path",
      points: [
        { x: 0.09383795549999951 - 0.4, y: 0.10788365000000044 },
        { x: 0.31104975549999936 - 0.4, y: 0.10659565000000004 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Lower channel connection
    {
      type: "path",
      points: [
        { x: 0.09383795549999951 - 0.4, y: -0.10232114999999986 },
        { x: 0.31104975549999936 - 0.4, y: -0.10360915000000026 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // P-channel arrow (filled triangle)
    {
      type: "path",
      points: [
        { x: 0.20244405549999955 - 0.4, y: 0.03061555000000049 },
        { x: 0.20244405549999955 - 0.4, y: -0.04077654999999947 },
        { x: 0.2741990554999998 - 0.4, y: -0.0054987499999992195 },
        { x: 0.20244405549999955 - 0.4, y: 0.03061555000000049 },
      ],
      color: "primary",
      fill: true,
      closed: true,
    } as Primitive,

    // Middle channel connection
    {
      type: "path",
      points: [
        { x: 0.09383795549999951 - 0.4, y: -0.004018049999999551 },
        { x: 0.31104975549999936 - 0.4, y: -0.005306049999999729 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Gate vertical extension
    {
      type: "path",
      points: [
        { x: 0.05171245550000081 - 0.4, y: 0.16715385000000005 },
        { x: 0.05111245550000065 - 0.4, y: -0.10592255000000006 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // MOSFET circle
    {
      type: "circle",
      x: 0.15821375550000005 - 0.4,
      y: 0.003454549999999612,
      radius: 0.28854213,
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode primitives (right side, shifted right by +0.4)
    // Diode triangle (upper part)
    {
      type: "path",
      points: [
        { x: -0.0003721000000016447 + 0.4, y: -0.1001805 },
        { x: -0.13266380000000133 + 0.4, y: 0.16440279999999952 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode triangle (lower part)
    {
      type: "path",
      points: [
        { x: 0.13191960000000158 + 0.4, y: 0.16440279999999952 },
        { x: -0.0003721000000016447 + 0.4, y: -0.1001805 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode cathode bar (top)
    {
      type: "path",
      points: [
        { x: -0.13266379999999778 + 0.4, y: 0.16440279999999952 },
        { x: 0.13191960000000158 + 0.4, y: 0.16440279999999952 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode anode bar (bottom)
    {
      type: "path",
      points: [
        { x: 0.13191960000000158 + 0.4, y: -0.1001805 },
        { x: -0.13266379999999778 + 0.4, y: -0.1001805 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode positive terminal connection
    {
      type: "path",
      points: [
        { x: -0.0003721000000016586 + 0.4, y: 0.16660749999999958 },
        { x: -0.00037210000000168636 + 0.4, y: 0.5612777999999996 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode negative terminal connection
    {
      type: "path",
      points: [
        { x: -0.00045729999999895993 + 0.4, y: -0.4789713 },
        { x: -0.0004572999999989877 + 0.4, y: -0.1052632 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // External connections from box to ports
    // MOSFET gate connection to left side of box
    {
      type: "path",
      points: [
        { x: -0.39274354450000026 - 0.4, y: -0.10329954999999957 },
        { x: -1.0, y: -0.10329954999999957 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // MOSFET drain connection to top of box
    {
      type: "path",
      points: [
        { x: 0.30382435550000064 - 0.4, y: 0.53233025 },
        { x: 0.30382435550000064 - 0.4, y: 0.8 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // MOSFET source connection to bottom of box
    {
      type: "path",
      points: [
        { x: 0.3108281555000003 - 0.4, y: -0.5323308500000001 },
        { x: 0.3108281555000003 - 0.4, y: -0.8 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode anode connection to top of box
    {
      type: "path",
      points: [
        { x: -0.0003721000000016586 + 0.4, y: 0.5612777999999996 },
        { x: -0.0003721000000016586 + 0.4, y: 0.8 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Diode cathode connection to bottom of box
    {
      type: "path",
      points: [
        { x: -0.00045729999999895993 + 0.4, y: -0.4789713 },
        { x: -0.00045729999999895993 + 0.4, y: -0.8 },
      ],
      color: "primary",
      fill: false,
    } as Primitive,

    // Text labels
    {
      type: "text",
      text: "{REF}",
      x: 0,
      y: -1.0,
      fontSize: 0.15,
      anchor: "middle_top",
    } as Primitive,

    {
      type: "text",
      text: "{VAL}",
      x: 0,
      y: 1.0,
      fontSize: 0.15,
      anchor: "middle_bottom",
    } as Primitive,
  ],
  ports: [
    // MOSFET ports (left side)
    { x: -1.0, y: -0.10329954999999957, labels: ["1", "gate"] }, // Gate (left side)
    { x: 0.30382435550000064 - 0.4, y: 0.8, labels: ["2", "drain"] }, // Drain (top)
    { x: 0.3108281555000003 - 0.4, y: -0.8, labels: ["3", "source"] }, // Source (bottom)

    // Diode ports (right side)
    { x: -0.0003721000000016586 + 0.4, y: 0.8, labels: ["4", "anode"] }, // Diode anode (top)
    { x: -0.00045729999999895993 + 0.4, y: -0.8, labels: ["5", "cathode"] }, // Diode cathode (bottom)
  ],
  size: { width: 2.0, height: 1.6 },
  center: { x: 0, y: 0 },
})
