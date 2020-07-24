import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import packageJson from "./package.json"

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: true,
    },
  ],
  external: ['react'],
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
   
  
  ],
}
