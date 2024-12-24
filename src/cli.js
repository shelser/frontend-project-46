import { program } from 'commander';
import diff from './fileParse.js';

export default () => {
  program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      diff(filepath1, filepath2);
    });
  program.parse(process.argv);
};
