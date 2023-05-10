const COEF = 0.1;
const SWAP_FRAMES_COUNT = 80;

const lerp = (a, b, t) => a + (b - a) * t;

class App {
  renderer;

  init() {
    const baseParams = {
      x: 0,
      y: 0,
      r: 255,
      g: 0,
      b: 0,
      radius: 300,
    };

    const circle = { current: { ...baseParams }, target: { ...baseParams } };
    const circles = new Array(10);
    for (let i = 0; i < circles.length; i++)
      circles[i] = { ...circle };

    this.renderer = new Renderer(this.render, document.body, 1000 / 60, {
      circles,
      counter: SWAP_FRAMES_COUNT,
    });
  }

  render() {
    const { canvas, context } = this;
    const { circles } = this.props;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.lineWidth = 15;
    circles.forEach((_, i) => {
      const nextI = i + 1 === circles.length ? 0 : i + 1;
      const { x, y, r, g, b } = circles[i].current;
      const { x: tx, y: ty } = circles[nextI].current;
      context.beginPath();
      context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      context.moveTo(x, y);
      context.lineTo(tx, ty);
      context.stroke();
    });

    circles.forEach((circle) => {
      const { x, y, r, g, b, radius } = circle.current;
      context.beginPath();
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();

      circle.current = {
        x: lerp(x, circle.target.x, COEF),
        y: lerp(y, circle.target.y, COEF),
        r: lerp(r, circle.target.r, COEF),
        g: lerp(g, circle.target.g, COEF),
        b: lerp(b, circle.target.b, COEF),
        radius: lerp(radius, circle.target.radius, COEF),
      };
    });

    this.props.counter++;

    if (this.props.counter >= SWAP_FRAMES_COUNT) {
      this.props.counter = 0;
      
      circles.forEach((circle) => {
        circle.target = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 255,
          g: Math.random() * 255,
          b: Math.random() * 255,
          radius: 50 + Math.random() * 300,
        };
      });
    }
  }
}