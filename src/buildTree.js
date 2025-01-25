import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const tree = keys
    .map((key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, value: buildTree(data1[key], data2[key]), type: 'nested' };
      }
      if (!_.has(data1, key)) {
        return { key, value: data2[key], type: 'added' };
      }
      if (!_.has(data2, key)) {
        return { key, value: data1[key], type: 'removed' };
      }
      if (_.isEqual(data1[key], data2[key])) {
        return { key, value: data2[key], type: 'unchanged' };
      }
      return {
        key,
        oldValue: data1[key],
        newValue: data2[key],
        type: 'updated',
      };
    });
  return tree;
};

export default buildTree;
