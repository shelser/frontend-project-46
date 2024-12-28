import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';

export default (filePath) => {
  const fullPath = resolve(cwd(), filePath);
  const format = extname(filePath).slice(1);
  const data = readFileSync(fullPath);
  const parse = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };
  return parse[format](data);
};
