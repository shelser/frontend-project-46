import _ from 'lodash';

export default (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const tree = keys
    .map((key) => {
      if (!_.has(data1, key)) {
        return { key, value: data2[key], type: 'added' };
      }
      if (!_.has(data2, key)) {
        return { key, value: data1[key], type: 'deleted' };
      }
      if (_.isEqual(data1[key], data2[key])) {
        return { key, value: data2[key], type: 'unchanged' };
      }
      if (!_.isEqual(data1[key], data2[key])) {
        return {
          key,
          value1: data1[key],
          value2: data2[key],
          type: 'changed',
        };
      }
      return {};
    })
    .map((item) => {
      const {
        key, value, value1, value2, type,
      } = item;
      switch (type) {
        case 'added':
          return `  + ${key}: ${value}`;
        case 'deleted':
          return `  - ${key}: ${value}`;
        case 'unchanged':
          return `    ${key}: ${value}`;
        case 'changed':
          return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
        default:
          return '';
      }
    }).join('\n');
  return `{\n${tree}\n}`;
};
