const options = {
  XMAX_MIN_SCALE: 0.2,
  XMAX_MAX_SCALE: 3,
  XMAX_MIN_INTERVAL: 0.5,
  XMAX_MAX_INTERVAL: 3,
  FPS: 60,
  XMAX_COUNT: 25,
};

const FPS = options.FPS;
const XMAX_COUNT = options.XMAX_COUNT;
const XMAX_BASE_PATH = ['./img/xmax', '.png'];
const XMAX_IMAGES_COUNT = 8;
const SWITCH_INTERVAL = 2;
const LERP_COEF = 0.1;

const viewport = document.createElement('viewport');
document.body.appendChild(viewport);

const randomizeXmaxTarget = (xmax) => {
  xmax.props.target.x = Math.random() * document.body.clientWidth;
  xmax.props.target.y = Math.random() * document.body.clientHeight;
  xmax.props.target.s = options.XMAX_MIN_SCALE + Math.random() * (options.XMAX_MAX_SCALE - options.XMAX_MIN_SCALE);
  xmax.props.targetInterval = (options.XMAX_MIN_INTERVAL + Math.random() * (options.XMAX_MAX_INTERVAL - options.XMAX_MIN_INTERVAL)) * FPS;
};

const lerp = (a, b, t) => a + (b - a) * t;

const xmaxs = new Array(XMAX_COUNT);
for (let i = 0; i < XMAX_COUNT; i++) {
  const xmax = document.createElement('xmax');
  xmax.style.backgroundImage = `url(${XMAX_BASE_PATH.join(XMAX_IMAGES_COUNT * Math.random() >> 0)})`;
  viewport.append(xmax);

  const baseState = { x: 0, y: 0, s: 1 };

  xmax.props = {
    currentInterval: 0,
    targetInterval: 0,
    current: {},
    target: {},
  };

  randomizeXmaxTarget(xmax);
  xmax.props.current = { ...xmax.props.target };
  
  xmaxs[i] = xmax;
}

setInterval(() => {
  for (let i = 0; i < XMAX_COUNT; i++) {
    const xmax = xmaxs[i];
    const halfXmaxSize = 64;
    xmax.style.transform = `translate(${xmax.props.current.x - halfXmaxSize}px, ${xmax.props.current.y - halfXmaxSize}px) scale(${xmax.props.current.s})`;
    xmax.style.zIndex = xmax.props.current.s * 500 >> 0;

    xmax.props.current.x = lerp(xmax.props.current.x, xmax.props.target.x, LERP_COEF);
    xmax.props.current.y = lerp(xmax.props.current.y, xmax.props.target.y, LERP_COEF);
    xmax.props.current.s = lerp(xmax.props.current.s, xmax.props.target.s, LERP_COEF);

    xmax.props.currentInterval++;
    if (xmax.props.currentInterval >= xmax.props.targetInterval) {
      xmax.props.currentInterval = 0;
      randomizeXmaxTarget(xmax);
    }
  }
}, 1000 / FPS);