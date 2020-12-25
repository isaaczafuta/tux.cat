import { createCanvas, loadImage } from "canvas";
import { allTuxes, drawTux } from "../../utils";
import path from "path";
import getConfig from "next/config";

const imageSize = 600;

const serverPath = (publicFilePath: string) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    "public",
    publicFilePath
  );
};

export default function handler(req, res) {
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext("2d");

  const tuxParam = req.query.tux;
  const tux = allTuxes.includes(tuxParam) ? tuxParam : "tux-on-desk";

  loadImage(serverPath(`/tuxes/${tux}.png`)).then((image) => {
    drawTux(ctx, image, req.query.text || "", imageSize);
    const buffer = canvas.toBuffer("image/png", {
      compressionLevel: 6,
      filters: canvas.PNG_ALL_FILTERS,
      palette: undefined,
      backgroundIndex: 0,
      resolution: undefined,
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  });
}
