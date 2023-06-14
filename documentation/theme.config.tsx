import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {




    // theme color
    primaryHue: 40,

    //  SEO
    useNextSeoProps() {
        return {
            titleTemplate: '%s – wysiwyg-react'
        }
    },


    // logo
    logo:  <span className='logo_text'>wysiwyg-react</span>,


    // repo base link
    project: {
      link: 'https://github.com/Rasaf-Ibrahim/wysiwyg-react',
    },
  
    // base path of the documentation site
    docsRepositoryBase: 'https://github.com/Rasaf-Ibrahim/wysiwyg-react/blob/main/documentation',
  


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
            <p style={{fontSize:'14px'}}>
                © {new Date().getFullYear()} wysiwyg-react
            </p>
        )
    },



  
}

export default config
