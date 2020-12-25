import { useEffect, useRef, useState } from "react";

import {
  TextField,
  IconButton,
  InputAdornment,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";

import FileCopyIcon from "@material-ui/icons/FileCopy";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { Navigation } from "../layout/Navigation";
import { allTuxes, drawTux, Tuxes } from "../utils";

const imageWidth = 600;

const useStyles = makeStyles((theme) => ({
  tuxPreviews: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    margin: theme.spacing(1),
  },
  tuxPreview: {
    objectFit: "contain",
    width: 75,
    height: 75,
    padding: theme.spacing(1),
  },
  tuxWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  tuxInput: {
    marginBottom: theme.spacing(2),
  },
  tux: {
    display: "none",
    width: imageWidth,
    height: imageWidth,
  },
  tuxUrl: {
    margin: theme.spacing(2, 0),
  },
}));

const getTuxParams = () => {
  if (!window) {
    return {
      initialTuxText: "lgtm",
      initialTux: allTuxes[0],
    };
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const initialTuxText = urlParams.get("text") || "lgtm";
    const initialTuxParam = urlParams.get("tux");
    const initialTux = allTuxes.includes(initialTuxParam as Tuxes)
      ? (initialTuxParam as Tuxes)
      : allTuxes[0];
    return {
      initialTuxText,
      initialTux,
    };
  }
};

const Home = () => {
  const classes = useStyles();

  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const url = useRef<HTMLInputElement>(null);

  const [tux, setTux] = useState<Tuxes | undefined>(undefined);
  const [tuxText, setTuxText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const { initialTuxText, initialTux } = getTuxParams();
    setTuxText(initialTuxText);
    setTux(initialTux);
  }, []);

  useEffect(() => {
    if (!imageLoaded) {
      return;
    }
    const ctx = canvas.current.getContext("2d");
    drawTux(ctx, image.current, tuxText, imageWidth);
  }, [tux, tuxText, imageLoaded]);

  const rawTuxUrl = (tux) => (tux ? `/tuxes/${tux}.png` : undefined);

  const onTuxSelected = (newTux) => {
    setImageLoaded(false);
    setTux(newTux);
  };

  const onImageLoaded = () => {
    setImageLoaded(true);
  };

  const tuxSrcUrl = (() => {
    if (tux && tuxText) {
      return `https://tux.cat/api/tux?tux=${tux}&text=${encodeURIComponent(
        tuxText
      ).replace(/%20/g, "+")}`;
    } else {
      return undefined;
    }
  })();

  return (
    <div className="container">
      <Navigation title="Tux.cat" />
      <main>
        <br />
        <Container maxWidth="md">
          <Paper>
            <div className={classes.tuxPreviews}>
              {allTuxes.map((tux) => (
                <img
                  onClick={() => onTuxSelected(tux)}
                  className={classes.tuxPreview}
                  src={rawTuxUrl(tux)}
                  key={tux}
                />
              ))}
            </div>
            <div className={classes.tuxWrapper}>
              <TextField
                autoFocus
                label="Text"
                className={classes.tuxInput}
                value={tuxText}
                onChange={(e) => setTuxText(e.target.value)}
                variant="outlined"
              />
              <img
                ref={image}
                className={classes.tux}
                src={rawTuxUrl(tux)}
                onLoad={onImageLoaded}
              />
              <canvas ref={canvas} width={imageWidth} height={imageWidth} />
              {tuxSrcUrl && (
                <TextField
                  className={classes.tuxUrl}
                  fullWidth
                  label="URL"
                  value={tuxSrcUrl}
                  variant="outlined"
                  inputRef={url}
                  InputProps={{
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Copy URL"
                            onClick={() => {
                              url.current.select();
                              document.execCommand("copy");
                            }}
                          >
                            <FileCopyIcon />
                          </IconButton>
                        </InputAdornment>
                        <InputAdornment position="end">
                          <IconButton
                            href={tuxSrcUrl}
                            target="_blank"
                            aria-label="Open"
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                />
              )}
            </div>
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default Home;
