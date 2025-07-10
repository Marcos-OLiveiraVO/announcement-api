import { writeFileSync } from 'fs';

export function TestTemplate(name: string, fullPath: string) {
  const template = `
  describe('Create ${name} UseCase', () => {
    beforeEach(async () => {})

    it('should be able to create a ${name}', async () => {})
  })
  `;

  writeFileSync(fullPath, template, {
    encoding: 'utf-8',
  });
}
