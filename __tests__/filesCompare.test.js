import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import compare from '../src/filesCompare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatsPlain = ['json', 'yml'];
const formatsNested = ['json', 'yaml'];
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

let expectedPlain;
let expectedNested;
const randomFormat = (arrFormats) => _.sample(arrFormats);

beforeAll(() => {
  expectedPlain = fs.readFileSync(getFixturePath('plainFileResult.txt'), 'utf-8');
  expectedNested = fs.readFileSync(getFixturePath('nestedFileResult.txt'), 'utf-8');
});

test('test1: getting a string from plain .json files', () => {
  const file1Path = getFixturePath('plainFile1.json');
  const file2Path = getFixturePath('plainFile2.json');
  expect(_.isString(compare(file1Path, file2Path))).toBeTruthy();
});

test('test2: getting a string from plain .yml files', () => {
  const file1Path = getFixturePath('plainFile1.yml');
  const file2Path = getFixturePath('plainFile2.yml');
  expect(_.isString(compare(file1Path, file2Path))).toBeTruthy();
});

test('test3: random formats from plain files', () => {
  const file1Path1 = getFixturePath(`plainFile1.${randomFormat(formatsPlain)}`);
  const file1Path2 = getFixturePath(`plainFile2.${randomFormat(formatsPlain)}`);
  const actual = compare(file1Path1, file1Path2);
  console.log(actual);
  expect(actual).toEqual(expectedPlain.trim());
});

test('test4: matching with the nested file result', () => {
  const file1Path1 = getFixturePath(`file1.${randomFormat(formatsNested)}`);
  const file1Path2 = getFixturePath(`file2.${randomFormat(formatsNested)}`);
  const actual = compare(file1Path1, file1Path2);
  console.log(actual);
  expect(actual).toEqual(expectedNested.trim());
});
