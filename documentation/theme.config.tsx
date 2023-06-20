import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {


    // theme
    nextThemes: {
        defaultTheme: 'dark',
    },


    // theme color
    primaryHue: 40,

    //  SEO
    useNextSeoProps() {
        return {
            titleTemplate: '%s – rich-text-editor-for-react'
        }
    },

    // banner
    banner: {
        dismissible: false,
        key: 'under_construction', // for localStorage
        text: (
          <p className='body2'>
            🚧 This site is under construction.
          </p>
        )
    },  

    
    // logo
    logo: <span className='logo_text'>rich-text-editor-for-react</span>,


    // repo base link
    project: {
        link: 'https://github.com/Rasaf-Ibrahim/rich-text-editor-for-react',
    },

    // base path of the documentation site
    docsRepositoryBase: 'https://github.com/Rasaf-Ibrahim/rich-text-editor-for-react/blob/main/documentation',



    //sidebar
    toc: {
        title: <span className='body2'>On This Page</span>,
    },

    editLink: {
        text: 'Edit this page on GitHub →'
    },
    feedback: {
        content: 'Question? Give us feedback →',
        labels: 'feedback'
    },


    // footer
    footer: {
        text: (
            <p style={{ fontSize: '14px' }}>
                © {new Date().getFullYear()} rich-text-editor-for-react
            </p>
        )
    },




}

export default config
