# FontChecker

A small project that compares a given font to the default `serif`, `sans-serif`, and `monospace` browser fonts by drawing them to canvas and comparing their image dataURL. Uses [Concrete.js](http://www.concretejs.com/)


## Instructions

1. Go to the [sample page](https://flyingkatsu.github.io/FontChecker/)
2. Open the browser console and type `FontChecker.isDefaultFont('font')` or `FontChecker.hasCustomFont('font')`
3. In the style inspector, toggle `#canvaswrapper { display: none; }` to see the font on the canvas
4. In the browser console, type `document.getElementById('font-preview').src = FontChecker.getFontData('font')` to change the image preview using the getFontData function

## Project Usage

```js
let FontChecker; // Let the module be accessible by console

// Set up our FontChecker module thing
document.addEventListener('DOMContentLoaded', function() {
  FontChecker = CreateFontChecker({
    width: 1024,
    height: 1024,
    container: document.getElementById('hiddencanvas'),
    text: 'Test\nText', // for best results, use 4 chars per line
    fontsize: 32,
    miter: 10,
    drawPos: { // for best results, use <0,0>
      x: 0,
      y: 0
    }
  }, {});

  // Sample Usage
  console.log(FontChecker.isDefaultFont('Times New Roman'));
  console.log(FontChecker.hasCustomFont('Impact'));
  document.getElementById('font-preview').src = FontChecker.getFontData('Impact');

});
```