#!/usr/bin/env bun
import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100
}

function roundNumbersInObject(obj: any): any {
  if (typeof obj === 'number') {
    return roundToTwoDecimals(obj)
  }
  if (Array.isArray(obj)) {
    return obj.map(roundNumbersInObject)
  }
  if (obj && typeof obj === 'object') {
    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = roundNumbersInObject(value)
    }
    return result
  }
  return obj
}

async function processJsonFiles(dir: string) {
  const files = await readdir(dir)
  let processedCount = 0
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = join(dir, file)
      try {
        const content = await readFile(filePath, 'utf-8')
        const data = JSON.parse(content)
        const roundedData = roundNumbersInObject(data)
        await writeFile(filePath, JSON.stringify(roundedData, null, 2))
        processedCount++
      } catch (error) {
        console.error(`Error processing ${file}:`, error)
      }
    }
  }
  
  console.log(`Processed ${processedCount} JSON files in ${dir}`)
}

// Process assets/generated directory
await processJsonFiles('assets/generated')