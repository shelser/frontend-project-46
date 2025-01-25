import buildTree from './buildTree.js';
import parsers from './parsers.js';
import styleNested from '../formatters/stylish.js';

export default (filePath1, filePath2, format = 'stylish') => {
  const formatters = {
    stylish: styleNested,
  };
  const data1 = parsers(filePath1);
  const data2 = parsers(filePath2);
  const data = buildTree(data1, data2);
  return formatters[format](data);
};
