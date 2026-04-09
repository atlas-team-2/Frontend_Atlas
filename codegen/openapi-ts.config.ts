import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi_atlas.yaml',
  output: {
    path: '../src/client/api/gen',
  },
  plugins: ['@hey-api/client-fetch'],
});
