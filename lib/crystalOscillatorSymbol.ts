/**
 * tscircuit/schematic-symbols - 4-pin Crystal Oscillator Symbol
 */
export function generateCrystalOscillatorSymbol() {
  return {
    name: 'CRYSTAL_OSCILLATOR_4PIN',
    pins: [
      { id: 1, name: 'EN', side: 'left', y: 5 },
      { id: 2, name: 'GND', side: 'bottom', y: -10 },
      { id: 3, name: 'OUT', side: 'right', y: 5 },
      { id: 4, name: 'VCC', side: 'top', y: 10 }
    ]
  };
}
