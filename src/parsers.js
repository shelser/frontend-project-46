import yaml from 'js-yaml';

export default {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};
