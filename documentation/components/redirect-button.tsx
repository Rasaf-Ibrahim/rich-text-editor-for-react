/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'
import { css } from '@emotion/css'
import useDarkTheme from '../hooks/dark-theme-hook'




/*__________________________________________

 ✅ Functional component
____________________________________________*/
function REDIRECT_BUTTON({ button_name, href }) {

    // theme
    const { dark_theme } = useDarkTheme()

    return (

        <a href={href} target="_blank">

            <div
                className={css`
                    
                    --b: 3px;   /* border thickness */
                    --s: .45em; /* size of the corner */
                    --color: 	${dark_theme ? 'hsl(222, 11%, 85%)' : 'hsl(222, 11%, 24%)'};
                    
                    padding: calc(.5em + var(--s)) calc(.9em + var(--s));
                    --_p: var(--s);
                    background:
                        conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
                        var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
                    color: var(--color);
                    transition: .3s linear, color 0s, background-color 0s;
                    outline: var(--b) solid #0000;
                    outline-offset: .6em;
                    font-size: 18px;
                    text-align: center;

                    border: 0;

                    cursor: pointer;

                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: manipulation;


                    &:hover,
                    &:focus-visible{
                        --_p: 0px;
                        outline-color: var(--color);
                        outline-offset: .05em;
                    }

                    &:active {
                        background: var(--color);
                        color: ${dark_theme ? '#000' : '#fff'};
                    }
                    
                `}>


                {button_name}

            </div>

        </a>
    )
}



/*__________________________________________

 ✅ export
____________________________________________*/
export {
    REDIRECT_BUTTON
}
