'use strict';

const image = new Image();
image.crossOrigin = "anonymous";

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

image.onload = function() {
  console.log('loaded');
  document.querySelector('.main')
    .appendChild(image);

  context.drawImage(image, 0, 0);

  const topBorder = context.getImageData(0, 0, image.width, 5);
  const leftBorder = context.getImageData(0, 0, 5, image.height);
  const bottomBorder = context.getImageData(0, image.height - 5, image.width, 5);
  const rightBorder = context.getImageData(image.width - 5, 0, 5, image.height);

  const borderArray = [topBorder, leftBorder, bottomBorder, rightBorder];

  const rgbArrays = borderArray
    .map(getRGBstrings);

  console.log(rgbArrays.length);

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
    .map(asd => {console.log(asd); return asd;})
    .reduce((acc, curr) => acc + curr, 0);

  const totalPixels = rgbArrays.reduce((acc, curr) => acc + curr.length, 0);

  const mainEle = document.createElement('p');

  document.querySelector('.main').appendChild(mainEle);

  console.log(numberOfWhites, ' > ', totalPixels);

  if (numberOfWhites > totalPixels * 0.7) {
    mainEle.innerText = 'This image has a white background';
  } else {
    mainEle.innerText = 'This image does not have a white background';
  }
};

const getRGBstrings = imageData => {
  const rgbArr = [];

  let i, rgbVal;
  for (i = 0; i < imageData.data.length; i += 3) {
    rgbVal = '' + imageData.data[i] + ',' + imageData.data[i + 1] + ',' + imageData.data[i + 2];
    rgbArr.push(rgbVal);
  }

  return rgbArr;
}

const isWhite = rgbString => {
  return rgbString.split(',').every(color => color === '255');
}

image.src = '/white.png';
