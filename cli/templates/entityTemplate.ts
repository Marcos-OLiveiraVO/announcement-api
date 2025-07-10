import { writeFileSync } from 'fs';

export function EntityTemplate(name: string, fullPath: string) {
  const template = `export class ${name} {}`;

  writeFileSync(fullPath, template, {
    encoding: 'utf-8',
  });
}
