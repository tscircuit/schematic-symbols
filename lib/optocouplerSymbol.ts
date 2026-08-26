/**
 * tscircuit/schematic-symbols - 4-pin Optocoupler Symbol
 */
export function generateOptocouplerSymbol() {
  return {
    symbolName: 'OPTOCOUPLER_4PIN',
    pins: [
      { id: 1, name: 'ANODE', side: 'left', x: -10, y: 5 },
      { id: 2, name: 'CATHODE', side: 'left', x: -10, y: -5 },
      { id: 3, name: 'EMITTER', side: 'right', x: 10, y: -5 },
      { id: 4, name: 'COLLECTOR', side: 'right', x: 10, y: 5 }
    ],
    isolationBarrier: { x: 0, top: 8, bottom: -8, style: 'dashed' }
  };
}
