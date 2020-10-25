import * as path from 'path';

export interface ReplaceRule {
  before: string;
  after: string;
  separator?: string;
}

const namePlaceholder = '{{name}}';
const packagePlaceholder = '{{package}}';

const defaultReplaceRule: ReplaceRule = {
  before: `lib${path.sep}${namePlaceholder}\\.pm`,
  after: packagePlaceholder,
  separator: path.sep,
};

export const applyReplaceRule = (filePath: string, rule: ReplaceRule = defaultReplaceRule): string => {
  const separator = rule.separator === undefined ? path.sep : rule.separator;
  const separatorRegex = new RegExp(separator, 'g');

  const namePlaceholderRegex = new RegExp(namePlaceholder, 'g');
  const before = new RegExp(rule.before.replace(namePlaceholderRegex, '(.+)'));

  const packagePlaceholderRegex = new RegExp(packagePlaceholder, 'g');
  const after = rule.after.replace(packagePlaceholderRegex, '$1');

  return before.test(filePath) ? filePath.replace(before, after).replace(separatorRegex, '::') : filePath;
};

export const applyReplaceRules = (path: string, rules: ReplaceRule[]): string => {
  rules.forEach(rule => {
    path = applyReplaceRule(path, rule);
  });
  return path;
};
