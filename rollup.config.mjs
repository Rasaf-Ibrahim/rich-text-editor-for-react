import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

import postcss from "rollup-plugin-postcss";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [

    //  🥪 bundling 
    {
      input: ["src/index.ts", "src/hook.ts"],
      output: [

        {
          
          // dir option is mandatory as we have multiple file as input
          dir: "dist",
          format: "esm"
        }

        /* 🔖 Nowadays, literally no one uses cjs in react! 
         
              To make the bundle size half, removing the cjs. 

              So, also removing the following option from packageJson:

              "main": "dist/cjs/index.js",
        */
        // {
        //   file: packageJson.main,
        //   format: "cjs"
        // },

      ],


      plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",

            "include": [
                    "src/**/*.ts",
                    "src/**/*.tsx", 
                    "global.d.ts"
             ],

            // excluding the documentation folder
            exclude: ["documentation/**"]
        }),
        postcss({
          plugins: []
        }),
        terser(),
      ],
    },


 
    // 🥪 after bundling, we are generating type declaration files
    {
        input: ["dist/index.d.ts", "dist/hook.d.ts"],
        output: { dir: "dist/types", format: "esm" },
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },
];








/* 🔖 As we have multiple output files and multiple type declaration files, the module field and types field in the package.json are insufficient.

To address this problem, we have implemented the suggestions outlined in the article (https://dev.to/binjospookie/exports-in-package-json-1fl2) by utilizing the "exports" field and the "typesVersions" field.

While the main purpose of the "typesVersions" field differs from our specific use case, it adequately resolves our issue, so we are content with it.
*/