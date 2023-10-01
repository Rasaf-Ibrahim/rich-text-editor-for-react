/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_obj_with_any_values } from '../../../../types/commonly-used-types'

// styled components
import { styled } from '../../../../dependencies/mui/utils'

// icons
import { ErrorOutlineIcon } from '../../../../dependencies/mui/icons'

// components
import { Box, Typography } from '../../../../dependencies/mui/components'



/*__________________________________________

 ✅ types
____________________________________________*/

type types_of_error_message_props = {
    has_a_required_field_error?: boolean,
    has_a_validation_error?: boolean,
    validation_error_message?: string
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function ERROR_MESSAGE___REUSABLE(props: types_of_error_message_props) {


    // props
    const {
        has_a_required_field_error,
        has_a_validation_error,
        validation_error_message
    } = props


    // If the error message is longer than one sentence, with the following function, we will format the error message to make it look better 
    const formatErrorMessage = (message: string) => {
        const sentences = message.split('.');
        if (sentences.length > 1) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {sentences.map((sentence, index) =>
                        sentence.trim() !== '' &&
                        <div key={index}>{sentence}.</div>
                    )}
                </div>
            )
        } else {
            return message;
        }
    }


    // JSX
    return (
        <>
            {has_a_required_field_error &&
                <ERROR_MESSAGE___STYLED>

                    You must not skip this field.

                    <ERROR_ICON___STYLED>
                        <ErrorOutlineIcon sx={{ fontSize: '1rem' }} />
                        Error
                    </ERROR_ICON___STYLED>

                </ERROR_MESSAGE___STYLED>
            }

            {/* We will not show the input validation error when there is already required field error. */}
            {!has_a_required_field_error && has_a_validation_error &&
                <ERROR_MESSAGE___STYLED>

                    {formatErrorMessage(validation_error_message)}

                    <ERROR_ICON___STYLED>
                        <ErrorOutlineIcon sx={{ fontSize: '1rem' }} />
                        Error
                    </ERROR_ICON___STYLED>

                </ERROR_MESSAGE___STYLED>
            }
        </>
    )
}





/*__________________________________________

 ✅ Styled Components of
  <ERROR_MESSAGE___REUSABLE/>
____________________________________________*/

const fadeIn = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const ERROR_MESSAGE___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Typography {...props} variant='body2' />

)(({ theme }) => `
    position: relative;

    text-align: center;

    padding: 1rem;
    padding-top:1.2rem;
    margin-top: 1.2rem;
    
    

    border: 1px solid ${theme.palette.divider};
    border-radius:0.3rem;
    color: ${theme.palette.error.main};

    animation: 1s ${fadeIn} ease-out;
`)


const ERROR_ICON___STYLED = styled(Box)(({ theme }) => ({

    position: 'absolute',
    top: '-14px',
    left: '-14px',

    padding: '0.3rem',
    borderRadius: '0.2rem',
    border: `1px solid ${theme.palette.divider}`,

    ...theme.typography.caption,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.error.main,

    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
}))

