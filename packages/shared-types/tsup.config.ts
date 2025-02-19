// Import the defineConfig function from tsup package which is used to create the configuration object
import { defineConfig } from 'tsup';

export default defineConfig({
  // Specifies the entry point file(s) for the build
  entry: ['src/index.ts'],
  // Sets the output format to ECMAScript modules (ESM)
  format: ['esm', 'cjs'],
  // Generates TypeScript declaration files (.d.ts)
  dts: !process.env.WATCH,
  // Disable dts in watch mode
  watch: process.env.WATCH === 'true',
  clean: true,
  // Specifies the output directory for the build files
  outDir: 'dist',
  // Enables tree shaking to eliminate unused code
  treeshake: true,
  // Generates source maps for debugging
  sourcemap: true,
  // Disables code splitting into multiple chunks
  splitting: false,
  // Enables bundling of all dependencies into a single file
  bundle: true,
  // Disables minification of the output code
  minify: false,
  // Lists external dependencies that should not be bundled
  external: ['zod'],
});
