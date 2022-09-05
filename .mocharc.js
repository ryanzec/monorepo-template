module.exports = {
  require: ['ts-node/register', 'tsconfig-paths/register'],
  spec: ['src/**/*.spec.ts', 'src/**/*.spec.tsx', 'packages/**/*.spec.ts', 'packages/**/*.spec.tsx'],
  file: ['./mocha-setup.ts'],
};
