import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

export const rootDir = path.resolve(configDir, "..", "..");
export const distDir = path.join(rootDir, "dist");
