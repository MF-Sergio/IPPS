import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "src");

const forbidden: Record<string, string[]> = {
  domain: ["application", "infrastructure", "router", "composition"],
  application: ["infrastructure", "router", "composition"],
  infrastructure: ["application", "router", "composition"],
  router: ["infrastructure", "composition"],
};

async function listTsFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listTsFiles(full);
      return entry.name.endsWith(".ts") ? [full] : [];
    }),
  );
  return files.flat();
}

function importedPaths(source: string): string[] {
  // Sem isencao para `import type`: em runtime tipo realmente some, mas em
  // arquitetura um `import type` ainda expressa uma dependencia de design que
  // a regra de camada existe para proibir (foi assim que o ciclo
  // router/ <-> composition/ ficou invisivel por uma onda inteira).
  return [...source.matchAll(/from\s+["']([^"']+)["']/g)].map(
    (match) => match[1] ?? "",
  );
}

for (const [layer, banned] of Object.entries(forbidden)) {
  test(`camada ${layer} nao importa de ${banned.join(", ")}`, async () => {
    const layerDir = path.join(srcDir, layer);
    const files = await listTsFiles(layerDir);

    assert.ok(files.length > 0, `camada ${layer} nao tem arquivos .ts`);

    for (const file of files) {
      const source = await readFile(file, "utf8");
      for (const specifier of importedPaths(source)) {
        const resolved = specifier.startsWith(".")
          ? path.relative(srcDir, path.resolve(path.dirname(file), specifier))
          : specifier;

        for (const bannedLayer of banned) {
          assert.ok(
            !resolved.split(path.sep).includes(bannedLayer),
            `${path.relative(srcDir, file)} importa de ${bannedLayer}: ${specifier}`,
          );
        }
      }
    }
  });
}
