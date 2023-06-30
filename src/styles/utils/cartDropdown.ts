import { styled } from "..";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const CartButton = styled('button', {

    display: 'flex',
    alignItems: 'center',
    padding: '12px',

    backgroundColor: '$gray800',
    border: ' 1px transparent',
    borderRadius: '8px',
 

    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '$green500',

    },

    'span': {
        display: 'flex',
        marginBottom: '35px',
        marginLeft: '25px',
        position: 'absolute',

        backgroundColor: 'red',
        padding: '3px 6px',
        borderRadius: '100%',
        border: '3px solid $gray900'


    }



})

export const ContentMenu = styled(DropdownMenu.Content, {

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    

    backgroundColor: '$gray800',
    minWidth: '220px',
    borderRadius: '6px',
    border: 'gray 1px solid',
    padding: '10px',
    animationDuration: '400ms',
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  
 



    'p': {
        textAlign: 'center',
    },
    'button': {
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$medium',


        '&:not(:disabled):hover': {
            backgroundColor: '$green300'
        },

        '&:disabled': {
            opacity: 0.6,
            cursor: 'wait'
        },


    },

    'span': {
        textAlign: 'center',
        color: '$gray300'
    }

})

export const ItemCartMenu = styled(DropdownMenu.Item, {
    display: 'flex',
    alignItems: 'center',
    cursor: ' pointer',
    gap: '10px',

    'div': {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    }

})

export const ImageContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%);',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    }

})

export const PriceContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    'p': {
        color: '$gray300'
    },

    'span': {
        color: '$green300',
        fontSize: 'medium',
        fontWeight: 'bold'

    }
})

