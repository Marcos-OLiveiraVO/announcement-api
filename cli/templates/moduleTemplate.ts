import { writeFileSync } from 'fs';

export function ModuleTemplate(name: string, fullPath: string) {
  const template = `import { Module } from '@nestjs/common';

  @Module({
    imports: [],
    providers: [],
    controllers: [],
  })
  export class ${name}Module {}
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf8',
  });
}
