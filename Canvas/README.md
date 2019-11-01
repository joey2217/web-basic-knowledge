# [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

## canvas 元素

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

## 渲染上下文（The rendering context）

```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

## 绘制矩形

* canvas 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的.

```js
fillRect(x, y, width, height) // 绘制一个填充的矩形
strokeRect(x, y, width, height) // 绘制一个矩形的边框
clearRect(x, y, width, height)  // 清除指定矩形区域，让清除部分完全透明。
```

## 绘制路径

* 图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。
2. 第二步就是调用函数指定绘制路径，本文稍后我们就能看到了。
3. 第三，就是闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

```js
beginPath() //新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
closePath() //闭合路径之后图形绘制命令又重新指向到上下文中。
stroke() //通过线条来绘制图形轮廓。
fill() //通过填充路径的内容区域生成实心的图形。
```

### 移动笔触

* 这个函数实际上并不能画出任何东西，也是上面所描述的路径列表的一部分，这个函数就是moveTo()。或者你可以想象一下在纸上作业，一支钢笔或者铅笔的笔尖从一个点到另一个点的移动过程。

```js
moveTo(x, y) //将笔触移动到指定的坐标x以及y上。
```

### 线

```js
lineTo(x, y) //绘制一条从当前位置到指定x以及y位置的直线。
```

### 圆弧

```js
arc(x, y, radius, startAngle, endAngle, anticlockwise)//画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
// x,y为绘制圆弧所在圆上的圆心坐标。
//radius为半径。
//startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。
//参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向。
arcTo(x1, y1, x2, y2, radius)//根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
```

## 二次贝塞尔曲线及三次贝塞尔曲线

![贝塞尔曲线](https://mdn.mozillademos.org/files/223/Canvas_curves.png "贝塞尔曲线")

>二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。参数x、y在这两个方法中都是结束点坐标。cp1x,cp1y为坐标中的第一个控制点，cp2x,cp2y为坐标中的第二个控制点。

```js
quadraticCurveTo(cp1x, cp1y, x, y) //绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)//绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
```
