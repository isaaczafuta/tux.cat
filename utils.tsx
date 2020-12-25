const drawTux = (ctx, image, text, imageSize) => {
  ctx.drawImage(image, 0, 0, imageSize, imageSize);
  const x = imageSize / 2;
  const y = imageSize * 0.95;
  ctx.font = "35px Sans-serif";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.lineJoin = "miter"; //Experiment with "bevel" & "round" for the effect you want!
  ctx.miterLimit = 2;
  ctx.textAlign = "center";

  ctx.strokeText(text, x, y, imageSize);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y, imageSize);
};

enum Tuxes {
  bigEyeTux = "big-eye-tux",
  fluffTux = "fluff-tux",
  sailorTux = "sailor-tux",
  tuxOnDesk = "tux-on-desk",
  blanketTux = "blanket-tux",
  foodTux = "food-tux",
  tableTux = "table-tux",
  wideTux = "wide-tux",
  chairTux = "chair-tux",
  hangerTux = "hanger-tux",
  treeTux = "tree-tux",
}

const allTuxes = Object.values(Tuxes);

export { drawTux, Tuxes, allTuxes };
