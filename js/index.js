const options = {
  MIN_S: 0.2,
  MAX_S: 3,
  MIN_I: 0.5,
  MAX_I: 3,
  FPS: 4,
  COUNT: 10,
};

const INTERVAL = 1000 / options.FPS;
const COUNT = options.COUNT;
const BASE_PATH = ['./img/xmax', '.png'];
const IMAGES_COUNT = 8;

const viewport = document.createElement('viewport');
const xmaxs = new Array(COUNT);

const randomizeXmaxTarget = (xmax) => {
  const s = options.MIN_S + (options.MAX_S - options.MIN_S) * Math.random();
  xmax.style.transform = [
    'translate(',
      Math.random() * document.body.clientWidth, 'px,',
      Math.random() * document.body.clientHeight, 'px) ',
    'scale(', s, ')'
  ].join('');
  xmax.style.zIndex = s * 500 >> 0;
  xmax.b = (options.MIN_I + (options.MAX_I - options.MIN_I) * Math.random()) * options.FPS;
};

for (let i = 0; i < COUNT; i++) {
  const randomPath = BASE_PATH.join(i % IMAGES_COUNT);
  const xmax = document.createElement('xmax');
  xmax.style.backgroundImage = `url(${randomPath})`;
  xmax.a = 0;
  xmax.b = 0;
  viewport.append(xmax);

  xmaxs[i] = xmax;
}

document.body.appendChild(viewport);

setInterval(() => {
  for (let i = 0; i < COUNT; i++) {
    const xmax = xmaxs[i];
    xmax.a++;
    if (xmax.a >= xmax.b) {
      xmax.a = 0;
      randomizeXmaxTarget(xmax);
    }
  }
}, INTERVAL);
