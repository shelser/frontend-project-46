import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

const fileParse = (filePath) => {
    const fullPath = resolve(cwd(), filePath)
    const data = readFileSync(fullPath);
    const result = JSON.parse(data);
    return result;
};

const compare = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const string = keys.map((key) => 
    (!_.has(data1, key)) ? `  + ${key}: ${data2[key]}` : 
    (!_.has(data2, key)) ? `  - ${key}: ${data1[key]}` : 
    (_.isEqual(data1[key], data2[key])) ? `    ${key}: ${data2[key]}` : 
    (!_.isEqual(data1[key], data2[key])) ? `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}` : ''
    ).join('\n');
    return `{\n${string}\n}`;
  }

export default (filePath1, filePath2) => {
  const data1 = fileParse(filePath1);
  const data2 = fileParse(filePath2);
  console.log(compare(data1, data2));
}