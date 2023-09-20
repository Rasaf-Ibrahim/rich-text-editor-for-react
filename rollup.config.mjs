import resolve from "@rollup/plugin-node-resolve";
import json from '@rollup/plugin-json';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript'
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";




const plugins_for_bundling = [

    peerDepsExternal(),
    resolve({
        // browser specific code (it will ignore something like fs)
        browser: true,
    }),
    json(),
    commonjs(),
    typescript({

        tsconfig: './tsconfig.json',

        compilerOptions: {
            outDir: "dist",  
            declaration: true,
            emitDeclarationOnly: true,
        }, 
    
        include: [
                "src/**/*.ts",
                "src/**/*.tsx", 
                "global.d.ts"
        ],

        exclude: ["documentation/**"]
    }),

    postcss({
      plugins: []
    }),

    terser()
]


const do_not_bundle_these_dependencies = ['quill', 'react-color', 'highlight.js']



export default [


    //  🥪 bundling - src/index.ts
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'esm'
        },
        plugins: plugins_for_bundling,

        external: [...do_not_bundle_these_dependencies]
    },


    //  🥪 bundling - src/hook.ts
    {
        input: 'src/hook.ts',
        output: {
            file: 'dist/hook.js',
            format: 'esm',
        },
        plugins: plugins_for_bundling,

        external: [...do_not_bundle_these_dependencies]
    },


    //  🥪 bundling - src/display-output.ts
    {
        input: 'src/display-output.ts',
        output: {
            file: 'dist/display-output.js',
            format: 'esm',
        },
        plugins: plugins_for_bundling,

        external: [...do_not_bundle_these_dependencies]
    },

    
    //🥪 after bundling, we are generating type declaration files
    {
        input: 'dist/hook.d.ts',
        output: { file: "dist/types/hook.d.ts", format: "esm" },
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },
  
 
    // 🥪 after bundling, we are generating type declaration files
    {
        input: 'dist/index.d.ts',
        output: { file: "dist/types/index.d.ts", format: "esm" },
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },


    // 🥪 after bundling, we are generating type declaration files
    {
        input: 'dist/display-output.d.ts',
        output: { file: "dist/types/display-output.d.ts", format: "esm" },
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },
]







/* 🔖 
    
     If we bundle in cjs along with esm, then the bundle size will get double. 

     And nowadays literally no one uses cjs in react
     
     So, we will not use cjs

*/



/* 🔖 As we have multiple output files and multiple type declaration files, the module field and types field in the package.json are insufficient.

To address this problem, we have implemented the suggestions outlined in the article (https://dev.to/binjospookie/exports-in-package-json-1fl2) by utilizing the "exports" field and the "typesVersions" field.

While the main purpose of the "typesVersions" field differs from our specific use case, it adequately resolves our issue, so we are content with it.
*/