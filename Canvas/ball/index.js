function randomColor() {
    var types = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f".split(',');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        var index = parseInt((Math.random() * types.length).toString(), 10);
        color += types[index];
    }
    return color;
}
var canvas = document.querySelector('#canvas');
var w = document.body.clientWidth;
var h = document.body.clientHeight;
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext('2d');
var Ball = /** @class */ (function () {
    function Ball(x, y) {
        this.x = x;
        this.y = y;
        this.r = 20;
        this.color = randomColor();
        this.dx = parseInt(String(Math.random() * 10), 10) - 5;
        this.dy = parseInt(String(Math.random() * 10), 10) - 5;
    }
    Ball.prototype.render = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    Ball.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.r -= Number(Math.random().toFixed(2)) + 0.1;
        if (this.r > 0) {
            this.render();
        }
    };
    return Ball;
}());
var timer;
var ballArr = [];
canvas.onclick = function (e) {
    if (timer) {
        console.log(timer);
        console.log('clearInterval prev');
        clearInterval(timer);
    }
    var num = parseInt(String(Math.random() * 50), 10) + 50;
    for (var i = 0; i < num; i++) {
        ballArr.push(new Ball(e.offsetX, e.offsetY));
    }
    timer = setInterval(function () {
        console.log(timer);
        ballArr = ballArr.filter(function (item) { return item.r > 0; });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ballArr.forEach(function (b) {
            b.update();
        });
        if (ballArr.length === 0) {
            console.log(timer);
            console.log('clearInterval');
            clearInterval(timer);
        }
    }, 16);
};
