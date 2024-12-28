import { fileURLToPath } from 'url';
import path from 'path';
import _ from 'lodash';
import compare from '../src/filesCompare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

test('tes1', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(_.isString(compare(file1Path, file2Path))).toBeTruthy();
});
