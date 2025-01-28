import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import buildTree from './buildTree.js';
import parsers from './parsers.js';
import formatters from './formatters/index.js';

const getData = (filePath) => {
  const fullPath = resolve(cwd(), filePath);
  const fileFormat = extname(filePath).slice(1);
  return parsers[fileFormat](readFileSync(fullPath));
};

export default (filePath1, filePath2, format = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const data = buildTree(data1, data2);
  return formatters[format](data);
};
