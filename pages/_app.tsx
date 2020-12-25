import React from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
import Head from "next/head";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    frostbite: PaletteColor;
    blueJeans: PaletteColor;
    scarlet: PaletteColor;
    majorelle: PaletteColor;
    amber: PaletteColor;
  }

  interface PaletteOptions {
    frostbite: PaletteColorOptions;
    blueJeans: PaletteColorOptions;
    scarlet: PaletteColorOptions;
    majorelle: PaletteColorOptions;
    amber: PaletteColorOptions;
  }
}

const FROSTBITE = "#ee4bb5";
const BLUE_JEANS = "#3cb5ff";
const SCARLET = "#fc2f00";
const MAJORELLE = "#574ae2";
const AMBER = "#ffbf00";

const theme = createMuiTheme({
  palette: {
    frostbite: { main: FROSTBITE },
    blueJeans: { main: BLUE_JEANS },
    scarlet: { main: SCARLET },
    majorelle: { main: MAJORELLE },
    amber: { main: AMBER },

    primary: { main: BLUE_JEANS },
    secondary: { main: FROSTBITE },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Tux</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
