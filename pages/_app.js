import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSRESET";
import ColorModeProvider, { ColorModeContext } from "../src/components/menu/componentes/ColorMode.js";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

// _app.js -> Definições globais do NextJS
// ThemeProvider
// ThemeProvider -> Prove o tema para o app todo
// ColorModeProvider -> Prove o state de light ou dark para todo mundo 

function ProviderWrapper(props) {
    return(
        <ColorModeProvider initialMode={"dark"}>
            {props.children}
        </ColorModeProvider>
    )
}

function MyApp({ Component, pageProps }) {
    const contexto = React.useContext(ColorModeContext);
    console.log(contexto.mode);

    return  (
        <ThemeProvider theme={theme[contexto.mode]}>
            <CSSReset />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
export default function _app(props) {
    return(
        <ProviderWrapper>
            <MyApp {...props}/>
        </ProviderWrapper>
    )
};