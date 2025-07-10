import { writeFileSync } from 'fs';

export function InterfaceTemplate(name: string, fullPath: string) {
  const template = `export abstract class I${name}Repository {}`;

  writeFileSync(fullPath, template, {
    encoding: 'utf8',
  });
}
