

function randomColor(): string {
  const types = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f".split(',');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const index = parseInt((Math.random() * types.length).toString(), 10);
    color += types[index];
  }
  return color;
}
const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const w = document.body.clientWidth
const h = document.body.clientHeight
canvas.width = w
canvas.height = h
const ctx = canvas.getContext('2d');

class Ball {
  x: number;
  y: number;
  r: number;
  color: string;
  dx: number;
  dy: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.color = randomColor();
    this.dx = parseInt(String(Math.random() * 10), 10) - 5;
    this.dy = parseInt(String(Math.random() * 10), 10) - 5;
  }
  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.dx
    this.y += this.dy
    this.r -= Number(Math.random().toFixed(2)) + 0.1;
    if (this.r > 0) {
      this.render();
    }
  }
}

let timer;
let ballArr: Ball[] = []
canvas.onclick = function (e: MouseEvent) {
  const num = parseInt(String(Math.random() * 50), 10) + 10;
  for (let i = 0; i < num; i++) {
    ballArr.push(new Ball(e.offsetX, e.offsetY))
  }
  timer = setInterval(() => {
    ballArr = ballArr.filter(item => item.r > 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballArr.forEach((b) => {
      b.update();
    })
    if (timer && ballArr.length === 0) {
      console.log('clearInterval');
      clearInterval(timer)
    }
  }, 30)
}
