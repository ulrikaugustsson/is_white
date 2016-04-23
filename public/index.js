'use strict';

const image = new Image();
image.crossOrigin = "anonymous";

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

document.querySelector('.test-button').addEventListener('click', (ev) => {
    image.src = document.querySelector('.url-input').value;
});

image.onload = function() {
  console.log('loaded');
  document.querySelector('.main')
    .appendChild(image);

  console.time('done');

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);

  // context.getImageData(xStart, yStart, rectWidth, rectHeight);
  const topBorder = context.getImageData(0, 0, image.width, 5);
  const bottomBorder = context.getImageData(0, image.height - 5, image.width, 5);
  const leftBorder = context.getImageData(0, 0, 5, image.height);
  const rightBorder = context.getImageData(image.width - 5, 0, 5, image.height);

  const borderArray = [topBorder, leftBorder, bottomBorder, rightBorder];

  context.putImageData(topBorder, 0, 0);
  context.putImageData(bottomBorder, 0, image.height - 5);
  context.putImageData(leftBorder, 0, 0);
  context.putImageData(rightBorder, image.width - 5, 0);

  const rgbArrays = borderArray
    .map(getRGBstrings);

  const numberOfWhites = rgbArrays
    .map(rgbArray => {
      return rgbArray
        .reduce((acc, rgbString) => {
          let newVal = acc;

          if(isWhite(rgbString)) {
            newVal++;
          };

          return newVal;
        }, 0);
    })
    .reduce((acc, curr) => acc + curr, 0);

  const totalPixels = rgbArrays.reduce((acc, curr) => acc + curr.length, 0);

  const mainEle = document.createElement('p');

  document.querySelector('.main').appendChild(mainEle);

  console.log(numberOfWhites, ' > ', totalPixels);
  console.timeEnd('done');

  if (numberOfWhites > totalPixels * 0.7) {
    mainEle.innerText = 'This image has a white background';
  } else {
    mainEle.innerText = 'This image does not have a white background';
  }
};

const getRGBstrings = imageData => {
  const rgbArr = [];

  let i, rgbVal;
  for (i = 0; i < imageData.data.length; i += 4) {
    rgbVal = '' + imageData.data[i] + ',' + imageData.data[i + 1] + ',' + imageData.data[i + 2];
    rgbArr.push(rgbVal);
  }

  return rgbArr;
}

const isWhite = rgbString => {
  return rgbString.split(',').every(color => color === '255');
}

image.src = '/white.png';
