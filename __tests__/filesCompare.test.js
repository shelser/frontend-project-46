import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatsPlain = ['json', 'yml'];
const formatsNested = ['json', 'yaml'];
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

let expectedPlain;
let expectedStylishFormat;
let expectedPlainFormat;
let expectedJsonFormat;
const randomFormat = (arrFormats) => _.sample(arrFormats);

beforeAll(() => {
  expectedPlain = fs.readFileSync(getFixturePath('plainFileResult.txt'), 'utf-8');
  expectedStylishFormat = fs.readFileSync(getFixturePath('stylishFormatResult.txt'), 'utf-8');
  expectedPlainFormat = fs.readFileSync(getFixturePath('plainFormatResult.txt'), 'utf-8');
  expectedJsonFormat = fs.readFileSync(getFixturePath('jsonFormatResult.txt'), 'utf-8');
});

test('test1: getting a string from plain .json files', () => {
  const file1Path = getFixturePath('plainFile1.json');
  const file2Path = getFixturePath('plainFile2.json');
  expect(_.isString(genDiff(file1Path, file2Path))).toBeTruthy();
});

test('test2: getting a string from plain .yml files', () => {
  const file1Path = getFixturePath('plainFile1.yml');
  const file2Path = getFixturePath('plainFile2.yml');
  expect(_.isString(genDiff(file1Path, file2Path))).toBeTruthy();
});

test('test3: random formats from plain files', () => {
  const file1Path1 = getFixturePath(`plainFile1.${randomFormat(formatsPlain)}`);
  const file1Path2 = getFixturePath(`plainFile2.${randomFormat(formatsPlain)}`);
  const actual = genDiff(file1Path1, file1Path2);
  console.log(actual);
  expect(actual).toEqual(expectedPlain.trim());
});

test('test4: matching with the stylish format result', () => {
  const file1Path1 = getFixturePath(`file1.${randomFormat(formatsNested)}`);
  const file1Path2 = getFixturePath(`file2.${randomFormat(formatsNested)}`);
  const actual = genDiff(file1Path1, file1Path2);
  console.log(actual);
  expect(actual).toEqual(expectedStylishFormat.trim());
});

test('test5: matching with the plain format result', () => {
  const file1Path1 = getFixturePath(`file1.${randomFormat(formatsNested)}`);
  const file1Path2 = getFixturePath(`file2.${randomFormat(formatsNested)}`);
  const actual = genDiff(file1Path1, file1Path2, 'plain');
  console.log(actual);
  expect(actual).toEqual(expectedPlainFormat.trim());
});

test('test6: matching with the json format result', () => {
  const file1Path1 = getFixturePath(`file1.${randomFormat(formatsNested)}`);
  const file1Path2 = getFixturePath(`file2.${randomFormat(formatsNested)}`);
  const actual = genDiff(file1Path1, file1Path2, 'json');
  console.log(actual);
  expect(actual).toEqual(expectedJsonFormat.trim());
});
