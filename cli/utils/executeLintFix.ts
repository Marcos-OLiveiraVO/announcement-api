import { exec } from 'child_process';

export function ExecuteLintFix() {
  exec('yarn lint:fix', () => {
    console.log(`O lint foi executado com sucesso o modulo esta seguindo o padrão do projeto!`);
  });
}
