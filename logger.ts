export type LogLevel = "info" | "warn" | "error"

interface LogMeta {
  [key: string]: unknown
}

function log(level: LogLevel, message: string, meta: LogMeta = {}): void {
  const entry = { level, message, time: new Date().toISOString(), ...meta }
  const line = JSON.stringify(entry)
  if (level === "error") {
    console.error(line)
  } else if (level === "warn") {
    console.warn(line)
  } else {
    console.log(line)
  }
}

export const logger = {
  info: (message: string, meta?: LogMeta) => log("info", message, meta),
  warn: (message: string, meta?: LogMeta) => log("warn", message, meta),
  error: (message: string, meta?: LogMeta) => log("error", message, meta),
}
