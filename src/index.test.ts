import { applyReplaceRule, applyReplaceRules, namePlaceholder, packagePlaceholder } from ".";

describe('applyReplaceRule', () => {
  it('replace file path to Perl package name with default rule when no rule is given', () => {
    expect(applyReplaceRule('lib/Hoge/Fuga/Piyo.pm')).toBe('Hoge::Fuga::Piyo');
  });

  it('replace with custom rule', () => {
    const rule = {
      before: `t/${namePlaceholder}.t`,
      after: `t::${packagePlaceholder}`,
      separator: '-',
    };
    expect(applyReplaceRule('t/Foo-Bar-Baz.t', rule)).toBe('t::Foo::Bar::Baz');
  });
});

describe('applyReplaceRules', () => {
  it('no-op with empty array', () => {
    expect(applyReplaceRules('lib/Hoge.pm', [])).toBe('lib/Hoge.pm');
  });

  it('replace with multiple rules', () => {
    const rules = [
      {
        before: `lib/${namePlaceholder}.pm`,
        after: packagePlaceholder,
      },
      {
        before: `t/${namePlaceholder}.t`,
        after: `t::${packagePlaceholder}`,
        separator: '-',
      },
    ];
    expect(applyReplaceRules('lib/Foo/Bar/Baz.pm', rules)).toBe('Foo::Bar::Baz');
  });
});
