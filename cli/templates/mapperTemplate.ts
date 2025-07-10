import { writeFileSync } from 'fs';

export function MapperTemplate(name: string, fullPath: string) {
  const template = `
  export class ${name}Mapper {
    static toDomain() {}
    static toDatabase() {}
  }
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf8',
  });
}
