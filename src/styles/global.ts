import { globalCss } from ".";

export const globalStyle = globalCss({
    '*':{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },
    body:{
        backgroundColor: '$gray900',
        
       '-webkit-box-smoothing': 'antialiased'

    },
    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
        color: '$white',
        

       

    },

    fontSize: {
        medium: '1.125rem',
        large: '1.25rem',
        xlarge: '1.5rem',
        xxlarge: '1.875rem',
    }

    
})