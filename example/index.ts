import hasWhiteBackground from '../';

const image = new Image();
const fileReader = new FileReader()

document.querySelector('.test-button').addEventListener('click', (ev) => {
    const file = (<HTMLInputElement>document.querySelector('.url-input')).files[0];
    fileReader.readAsDataURL(file);
});

fileReader.onload = () => {
  console.log(fileReader);
  image.src = fileReader.result;
};

image.onload = function() {
  console.log('loaded');
  document.querySelector('.main')
    .appendChild(image);

  const isWhiteEle = document.querySelector('.is-white');

  console.time('done');
  if (hasWhiteBackground(5, 0.7, image)) {
    (<HTMLElement>isWhiteEle).innerText = 'This image has a white background';
  } else {
    (<HTMLElement>isWhiteEle).innerText = 'This image does not have a white background';
  }
  console.timeEnd('done');
};
