import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import compare from '../src/filesCompare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formats = ['json', 'yml'];
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

let expected;
const randomFormat = (arrFormats) => _.sample(arrFormats);

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
});

test('test1: getting a string from .json files', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(_.isString(compare(file1Path, file2Path))).toBeTruthy();
});

test('test2: getting a string from .yml files', () => {
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yml');
  expect(_.isString(compare(file1Path, file2Path))).toBeTruthy();
});

test('test3: random formats', () => {
  const file1Path1 = getFixturePath(`file1.${randomFormat(formats)}`);
  const file1Path2 = getFixturePath(`file2.${randomFormat(formats)}`);
  const actual = compare(file1Path1, file1Path2);
  console.log(actual);
  expect(actual).toEqual(expected.trim());
});
