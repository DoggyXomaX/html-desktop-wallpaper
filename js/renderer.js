function onResize() {
  this.canvas.width = document.body.clientWidth;
  this.canvas.height = document.body.clientHeight;
  this.renderMethod();
};

class Renderer {
  canvas;

  context;

  props = {};

  renderMethod;

  timerEnabled;

  intervalTimer;

  constructor(method, parent, interval, initProps) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.setParent(parent);
    this.setMethod(method);
    this.setProps(initProps);
    this.addTimer(interval);
    this.addEventListeners();
  }

  addEventListeners() {
    onResize.bind(this)();
    document.body.onresize = onResize.bind(this);
  }

  addTimer(interval) {
    this.timerEnabled = true;
    this.interval = interval;
    this.updateFrame();
  }

  clearTimer() {
    this.timerEnabled = false;
  }

  setMethod(method) {
    this.renderMethod = method.bind(this);
  }

  setParent(parent) {
    parent.appendChild(this.canvas);
  }

  setProps(props) {
    this.props = props;
  }

  updateFrame() {
    this.renderMethod();
    setTimeout(() => this.updateFrame(), this.interval);
  }
}