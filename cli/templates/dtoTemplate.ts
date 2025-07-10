import { writeFileSync } from 'fs';

export function DtoTemplate(name: string, fullPath: string) {
  const template = `export class ${name}DTO {}`;

  writeFileSync(fullPath, template, {
    encoding: 'utf8',
  });
}
