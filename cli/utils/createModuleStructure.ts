import { GetDirectories } from './directories';

export function CreateModuleStructure(moduleName: string, useCaseFileName: string) {
  const directories = GetDirectories(moduleName, useCaseFileName);
  return directories;
}
