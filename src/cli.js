import { program } from 'commander';

export default () => {
    program
      .name('gendiff')
      .version('0.0.1')
      .description('Compares two configuration files and shows a difference.')
      .helpOption('-h, --help', 'output usage information')
      .arguments('<filepath1> <filepath2>')
      .option('-f, --format [type]', 'output format');
    program.parse();
};