import { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const config: CodegenConfig = {
  schema: ['src/**/*.graphql', './users/**/*.graphql'],
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-resolvers'],
    },
  },
};

export default config;
