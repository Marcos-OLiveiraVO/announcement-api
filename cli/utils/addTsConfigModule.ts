import fs from 'fs';

export function AddTsConfigModule(moduleName: string) {
  const tsConfigPath = 'tsconfig.json';
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, { encoding: 'utf-8' }));

  const newModuleName = `@${moduleName}/*`;
  const newModuleMapping = [`modules/${moduleName}/*`];

  if (!tsConfig.compilerOptions.paths) {
    tsConfig.compilerOptions.path = [];
  }

  tsConfig.compilerOptions.paths[newModuleName] = newModuleMapping;

  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
}
