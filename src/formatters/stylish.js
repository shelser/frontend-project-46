import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndentObject = (depth) => replacer.repeat(spacesCount * depth);
const getIndentPrimitive = (depth) => replacer.repeat(spacesCount * depth).slice(0, -2);
const getBracketIndent = (depth) => replacer.repeat(spacesCount * depth);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const keys = Object.keys(currentValue);
  const tree = keys.map((key) => `${getIndentObject(depth + 1)}${key}: ${stringify(currentValue[key], depth + 1)}`).join('\n');
  return `{\n${tree}\n${getBracketIndent(depth)}}`;
};

export default (data) => {
  const iter = (currentData, depth) => {
    const typeValue = {
      added: '+',
      removed: '-',
      unchanged: ' ',
    };
    const result = currentData.map((item) => {
      const {
        key, value, oldValue, newValue, type,
      } = item;
      switch (type) {
        case 'added':
          return `${getIndentPrimitive(depth)}${typeValue[type]} ${key}: ${stringify(value, depth)}`;
        case 'removed':
          return `${getIndentPrimitive(depth)}${typeValue[type]} ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getIndentPrimitive(depth)}${typeValue[type]} ${key}: ${stringify(value, depth)}`;
        case 'updated':
          return `${getIndentPrimitive(depth)}${typeValue.removed} ${key}: ${stringify(oldValue, depth)}\n${getIndentPrimitive(depth)}${typeValue.added} ${key}: ${stringify(newValue, depth)}`;
        case 'nested':
          return `${getIndentObject(depth)}${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error('Unknown data type');
      }
    }).join('\n');
    return `{\n${result}\n${getBracketIndent(depth - 1)}}`;
  };
  return iter(data, 1);
};
