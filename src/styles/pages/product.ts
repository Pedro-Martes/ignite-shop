import { styled } from "..";

export const ProductContainer = styled('main', {
display: "grid",
gridTemplateColumns: '1fr 1fr',
alignItems:'stretch',
gap:'4rem',

maxWidth: 1180,
margin: '0 auto',





})

export const ImageContainer = styled('div',{

    width: '100%',
    maxWidth: 576,
    height: 565,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%);',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img:{
            objectFit: 'cover',
    }
    
})


export const ProductDetails = styled('div',{

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  
    

    h1: {
        fontSize: '$',
        color: '$gray300',

    },
    span:{
        marginTop: '1rem',
        display: 'block',
        fontSize: 'xx-large',
        color: '$green300',
        fontStyle: 'bold',

    },

    p:{
        marginTop: '2.5rem',
        fontSize: '$medium',
        lineHeight: 1.6,
        color: "$gray500",
    },

    button:{
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$medium',


        '&:not(:disabled):hover':{
            backgroundColor: '$green300'
        },

        '&:disabled':{
            opacity: 0.6,
            cursor: 'wait'
        }
    }

    
})

export const ButtonsContainer = styled('div',{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
})
