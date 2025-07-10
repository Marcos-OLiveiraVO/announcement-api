import { writeFileSync } from 'fs';

export function RepositoryTemplate(name: string, fullPath: string) {
  const template = `import { Injectable } from "@nestjs/common"

  @Injectable()
  export class ${name}Repository {}
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf8',
  });
}
