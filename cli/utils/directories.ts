import { ControllerTemplate } from '../templates/controllerTemplate';
import { DtoTemplate } from '../templates/dtoTemplate';
import { EntityTemplate } from '../templates/entityTemplate';
import { InMemoryRepositoryTemplate } from '../templates/inMemoryRepositoryTemplate';
import { InterfaceTemplate } from '../templates/interfaceTemplate';
import { MapperTemplate } from '../templates/mapperTemplate';
import { ModuleTemplate } from '../templates/moduleTemplate';
import { RepositoryTemplate } from '../templates/repositoryTemplate';
import { TestTemplate } from '../templates/testTemplate';
import { UseCaseTemplate } from '../templates/useCaseTemplate';
import { ViewModelTemplate } from '../templates/viewModelTemplate';
import { CapitalizeFirstLetter } from './capitalizeFirstLetter';

export interface FileDirectories {
  modulePath: string;
  template: (name: string, fullPath: string) => void;
  type: 'moduleName' | 'useCase';
}

export function GetDirectories(moduleName: string, useCaseFileName: string) {
  const capitalizedModuleName = CapitalizeFirstLetter(moduleName);
  const capitalizedUseCaseFileName = CapitalizeFirstLetter(useCaseFileName);

  const files = [
    {
      modulePath: `${moduleName}.module.ts`,
      template: ModuleTemplate,
      type: 'moduleName',
    },
    {
      modulePath: `application/entities/${moduleName}.ts`,
      template: EntityTemplate,
      type: 'moduleName',
    },
    {
      modulePath: `application/interfaces/I${capitalizedModuleName}Repository.ts`,
      template: InterfaceTemplate,
      type: 'moduleName',
    },
    {
      modulePath: `application/use-cases/create${capitalizedUseCaseFileName}UseCase.ts`,
      template: UseCaseTemplate,
      type: 'useCase',
    },
    {
      modulePath: `infra/adapters/mappers/${moduleName}Mapper.ts`,
      template: MapperTemplate,
      type: 'moduleName',
    },
    {
      modulePath: `infra/database/repositories/${moduleName}Repository.ts`,
      template: RepositoryTemplate,
      type: 'moduleName',
    },
    {
      modulePath: `infra/adapters/dtos/${useCaseFileName}DTO.ts`,
      template: DtoTemplate,
      type: 'useCase',
    },
    {
      modulePath: `infra/http/controllers/create${capitalizedUseCaseFileName}Controller.ts`,
      template: ControllerTemplate,
      type: 'useCase',
    },
    {
      modulePath: `infra/http/viewModels/${useCaseFileName}ViewModel.ts`,
      template: ViewModelTemplate,
      type: 'useCase',
    },
    {
      modulePath: `tests/unit/create${capitalizedUseCaseFileName}UseCase.spec.ts`,
      template: TestTemplate,
      type: 'useCase',
    },
    {
      modulePath: `tests/in-MemoryRepository/${useCaseFileName}InMemoryRepository.ts`,
      template: InMemoryRepositoryTemplate,
      type: 'useCase',
    },
  ] as FileDirectories[];

  return { files };
}
