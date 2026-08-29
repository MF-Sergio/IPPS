import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export function loadEnvFile(rootDir: string, fileName: string): void {
  const envPath = path.join(rootDir, fileName);
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function loadEnvFiles(rootDir: string): void {
  loadEnvFile(rootDir, ".env");
  loadEnvFile(rootDir, ".env.local");
}
