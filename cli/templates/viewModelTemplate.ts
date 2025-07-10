import { writeFileSync } from 'fs';

export function ViewModelTemplate(name: string, fullPath: string) {
  const template = `
  export class ${name}ViewModel {
    static toHttp() {}
  }
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf-8',
  });
}
