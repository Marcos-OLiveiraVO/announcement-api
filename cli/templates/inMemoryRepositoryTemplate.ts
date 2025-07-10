import { writeFileSync } from 'fs';

export function InMemoryRepositoryTemplate(name: string, fullPath: string) {
  const template = `export class ${name}InMemoryRepository {}`;

  writeFileSync(fullPath, template, {
    encoding: 'utf-8',
  });
}
