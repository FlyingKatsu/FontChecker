var CreateFontChecker = function(args, exports) {

  let WIDTH = args['width'] || 1024;
  let HEIGHT = args['height'] || 1024;
  let CONTAINER = args['container'] || document.getElementById('hiddencanvas');
  let TEXT = args['text'] || 'WwMm\nIiLl\nAaGg\nYyFf';
  let SIZE = args['fontsize'] || 32;
  let MITER = args['miter'] || 10;
  let POS = args['drawPos'] || { x: 0, y: 0 };

  /**
   * Create a Concrete viewport canvas for testing fonts
   */
  let fontviewport = new Concrete.Viewport({
    width: WIDTH,
    height: HEIGHT,
    container: CONTAINER
  });

  fontviewport.setSize(WIDTH, HEIGHT);

  let ctx = fontviewport.scene.context;

  /**
   * Draws text on the fontviewport canvas
   * @param {string} text the string to draw
   * @param {string} font the font in which to draw the text
   * @param {number} miter controls when angles should be cut-off
   * @param {number} size the font size
   * @param {number} x the top-left draw position (default is 0)
   * @param {number} y the top-left draw position (default is 0)
   */
  exports.drawText = function(font, text, miter, size, x, y) {
    text = text || TEXT;
    miter = miter || MITER;
    size = size || SIZE;
    x = x || POS.x;
    y = y || POS.y;
    //fontviewport.scene.clear();
    ctx.save();
    ctx.lineWidth = '2px';
    //ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.font = size + 'px ' + font;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'hanging';
    ctx.miterLimit = miter;
    ctx.fillText(text, x, y);
    //ctx.strokeText(text, x, y);
    ctx.restore();
    //viewport.render();
  };

  /**
   * Draws a square box on the fontviewport canvas
   * @param {string} color color of the box
   * @param {number} size size of the box
   * @param {number} x the top-left draw position (default is 0)
   * @param {number} y the top-left draw position (default is 0)
   */
  exports.drawBox = function(color, size, x, y) {
    size = size || SIZE;
    x = x || POS.x;
    y = y || POS.y;
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.restore();
  };

  /**
   * Draws several lines of text according to the given line breaks \n assuming no escaped backslashes
   * @param {string} text the text containing a line break, to be split
   * @param {string} font the font for the text
   * @param {number} miter controls cut-off for pointy angles
   * @param {number} size font size
   */
  exports.drawTextSplit = function(font, text, miter, size) {
    text = text || TEXT;
    miter = miter || MITER;
    size = size || SIZE;
    //fontviewport.scene.clear();
    //drawBox('#ff0000', size, 0, 0);
    text.split("\n").map(
      function(subtxt, i) {
        //console.log(subtxt);
        //console.log(i * size);
        exports.drawText(font, subtxt, miter, size, POS.x, POS.y + i * size);
      }
    );
  };

  /**
   * Returns the dataURL of the canvas after clearing the canvas and drawing the specified font text. Resizes the canvas, assuming 4 characters per line of font size and a draw pos of <0,0>
   * @param {string} text the text to draw
   * @param {string} font the font of the text
   * @param {number} miter controls cut-off for pointy angles (defaults to 10)
   * @param {number} size the font size (defaults to 32)
   */
  exports.getFontData = function(font, text, miter, size) {
    // defaults
    text = text || TEXT;
    miter = miter || MITER;
    size = size || SIZE;
    // clear scene and resize
    fontviewport.scene.clear();
    fontviewport.setSize(size * 4, size * 4);
    // draw test string
    exports.drawTextSplit(font, text, miter, size);
    // return dataURL
    let data = fontviewport.scene.canvas.toDataURL();
    return data;
  };

  let serif = exports.getFontData('serif');
  let sans = exports.getFontData('sans-serif');
  let mono = exports.getFontData('monospace');

  /**
   * Returns true if the specified font does not match the default serif, sans-serif, or monospace browser font.
   * @param {string} font the font to test for
   */
  exports.hasCustomFont = function(font) {
    let data = exports.getFontData(font);
    return data != serif && data != sans && data != mono;
  };

  /**
   * Returns whichever matches first: serif, sans-serif, or monospace; returns false if the font does not match any.
   * @param {string} font the font to test for
   */
  exports.isDefaultFont = function(font) {
    let data = exports.getFontData(font);
    switch (data) {
      case serif:
        return "serif";
      case sans:
        return "sans-serif";
      case mono:
        return "monospace";
      default:
        return false;
    }
  };


  return exports;
};