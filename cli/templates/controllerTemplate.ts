import { writeFileSync } from 'fs';

export function ControllerTemplate(name: string, fullPath: string) {
  const template = `import { Controller, HttpCode, Post } from '@nestjs/common'
  
  @Controller()
  export class Create${name}Controller {
    constructor() {}

  @Post()
  @HttpCode(201)
  async handle() {}

  }
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf-8',
  });
}
