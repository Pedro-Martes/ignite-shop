import { createStitches } from "@stitches/react";

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme

} = createStitches({
    theme:{
        colors:{
            white: '#FFFF',
            gray900: '#121214',
            gray800: '#202024',
            gray300: '#e1e1e6',

            green500: '#00875f',
            green300: '#00b37e'
        }
    }
})

