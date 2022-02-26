/* eslint no-bitwise: off */
export function darker (color, percent = 10) {
  const rgb = parseInt ((color[0] === '#') ? color.slice (1) : color, 16);
  const adjustment = (percent > 0) ? Math.floor (255 / percent) : 0;
  let red = (rgb >> 16) - adjustment;
  let green = ((rgb & 0x00FF00) >> 8) - adjustment;
  let blue = (rgb & 0x0000FF) - adjustment;
  red = (red < 0) ? 0 : red;
  green = (green < 0) ? 0 : green;
  blue = (blue < 0) ? 0 : blue;
  red = ((red < 16) ? '0' : '') + red.toString (16);
  green = ((green < 16) ? '0' : '') + green.toString (16);
  blue = ((blue < 16) ? '0' : '') + blue.toString (16);
  return `#${red}${green}${blue}`;
}
