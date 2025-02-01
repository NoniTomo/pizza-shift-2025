import antfu from '@antfu/eslint-config'
import airbnbConfig from 'eslint-config-airbnb'
import importRules from 'eslint-plugin-import-x'

export default antfu([
  {
    name: 'globals',
    rules: {
      ...airbnbConfig.rules,
      ...importRules.configs.recommended.rules,
    },
    ignores: ['dist', 'lib', '.eslintrc.js'],
  },
  {
    react: true,
    typescript: true,
    stylistic: true,
  },
])
