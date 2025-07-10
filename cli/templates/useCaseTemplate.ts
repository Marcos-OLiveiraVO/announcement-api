import { writeFileSync } from 'fs';

export function UseCaseTemplate(name: string, fullPath: string) {
  const template = `
  import { Injectable } from "@nestjs/common"
 
  @Injectable()
  export class Create${name}UseCase {}
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf8',
  });
}
