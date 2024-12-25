import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.[jt]s'],
    exclude: ['test/library/*.ts'],
    reporters: ['html'],
    outputFile: './tmp/test/index.html',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reportsDirectory: './tmp/coverage'
    },
  },
})