import path from 'path';
import readLine from 'readline';
import fs from 'fs-extra';

import { Command } from 'commander';
import { CapitalizeFirstLetter } from './utils/capitalizeFirstLetter';
import { AddTsConfigModule } from './utils/addTsConfigModule';
import { CreateModuleStructure } from './utils/createModuleStructure';
import { ExecuteLintFix } from './utils/executeLintFix';

const program = new Command();

program
  .version('1.0.0')
  .description('Generate module structure')
  .action(() => {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Qual será o nome do módulo?: ', moduleName => {
      rl.question('Qual será o nome do caso de uso?: Aviso: o create e o UseCase ja vão ser o prefixo: ', useCaseFileName => {
        rl.close();

        if (!moduleName && !useCaseFileName) {
          throw new Error('Nome do modulo ou do caso de uso não foi informado !');
        }

        const moduleRootDir = path.join('src/modules', moduleName);
        console.log('gerando estrutura...');

        const capitalizedModuleName = CapitalizeFirstLetter(moduleName);
        const capitalizedUseCaseFileName = CapitalizeFirstLetter(useCaseFileName);

        const moduleStructure = CreateModuleStructure(moduleName, useCaseFileName);

        moduleStructure.files.forEach(file => {
          const USE_CASE_TYPE = 'useCase';

          const { modulePath, template, type } = file;

          const fullPath = path.join(moduleRootDir, modulePath);
          fs.ensureFileSync(fullPath);

          type == USE_CASE_TYPE ? template(capitalizedUseCaseFileName, fullPath) : template(capitalizedModuleName, fullPath);
        });

        console.log('Modulo foi criado com sucesso meu amigo !');

        AddTsConfigModule(moduleName);
        ExecuteLintFix();
      });
    });
  });

program.parse();
