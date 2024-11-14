export default {
  '*.{js,ts}': [
    'pnpm run lint:script',
    'git add',
    'pnpm test:unit related --bail 1 --run'
  ],
  '*.vue': [
    'pnpm run lint:script',
    'pnpm run lint:style',
    'git add',
    'pnpm test:unit related --bail 1 --run'
  ],
  '*.scss': [
    'pnpm run lint:style',
    'git add'
  ]
};
