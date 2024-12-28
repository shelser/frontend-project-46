import buildTree from './buildTree.js';
import fileParse from './fileParse.js';

export default (filePath1, filePath2) => {
  const data1 = fileParse(filePath1);
  const data2 = fileParse(filePath2);
  return buildTree(data1, data2);
};
