// Sticker assets downloaded from Vecteezy:
// https://www.vecteezy.com/vector-art/1240459-assorted-cute-stickers-cards-or-patches

const STICKERS = [
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/cactus.svg',
      alt: 'potted cactus sticker',
      width: 295 / 2,
      height: 452 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/bang.svg',
      alt: ' exclamation mark sticker',
      width: 170 / 2,
      height: 326 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/star.svg',
      alt: 'star sticker',
      width: 206 / 2,
      height: 197 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/heart.svg',
      alt: 'heart sticker',
      width: 215 / 2,
      height: 200 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/donut.svg',
      alt: 'frosted donut sticker',
      width: 378 / 2,
      height: 362 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/bunny.svg',
      alt: 'bunny sticker with the text "Always happy"',
      width: 465 / 2,
      height: 647 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/cat.svg',
      alt: 'cat sticker with the text "Miss u"',
      width: 508 / 2,
      height: 597 / 2,
    },
    {
      src: 'https://sandpack-bundler.vercel.app/img/stickers/snap.svg',
      alt: 'snapping fingers with heart sticker',
      width: 349 / 2,
      height: 500 / 2,
    },
  ]
  
  export function getSticker() {
    // Select a sticker randomly from the array.
    return sample(STICKERS);
  }
  
  function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
