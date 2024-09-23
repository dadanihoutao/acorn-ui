module.exports = {
  // 继承推荐规范配置
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order'
  ],
  // 指定不同文件对应的解析器
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.{css,scss}'],
      customSyntax: 'postcss-scss'
    }
  ],
  // 自定义规则
  rules: {
    // 允许 global 、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ],
    'no-empty-source': null,
    'selector-class-pattern': null,
    // 'selector-no-vendor-prefix': null,
    // 'value-no-vendor-prefix': null,
    // 'alpha-value-notation': null,
    'color-function-notation': null,
    // 'rule-empty-line-before': null,
    'no-descending-specificity': null,
    // 'number-leading-zero': null,
    // 'declaration-block-no-redundant-longhand-properties': null,
    'font-family-no-missing-generic-family-keyword': null
  }
}
