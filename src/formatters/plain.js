import _ from 'lodash';

const typeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (data) => {
  const iter = (currentData, ancestry) => {
    const result = currentData.flatMap((item) => {
      const {
        key, value, oldValue, newValue, type,
      } = item;
      const newAncestry = `${ancestry}.${key}`;
      switch (type) {
        case 'added':
          return `Property '${newAncestry.slice(1)}' was ${type} with value: ${typeValue(value)}`;
        case 'removed':
          return `Property '${newAncestry.slice(1)}' was ${type}`;
        case 'updated':
          return `Property '${newAncestry.slice(1)}' was updated. From ${typeValue(oldValue)} to ${typeValue(newValue)}`;
        case 'nested':
          return iter(value, newAncestry);
        case 'unchanged':
          return [];
        default:
          throw new Error('Unknown data type');
      }
    }).join('\n');
    return result;
  };
  return iter(data, '');
};
