# [MDN Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

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
2. 第二步就是调用函数指定绘制路径。
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
arc(x, y, radius, startAngle, endAngle, anticlockwise)//画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
//从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
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
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)//绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，
//cp2x,cp2y为控制点二，x,y为结束点。
```

## 矩形

```js
rect(x,y,width,height) // 绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
```

* rect()方法，将一个矩形路径增加到当前路径上。
* 当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置回默认坐标。

## Path2D对象

```js
Path2D() //Path2D()会返回一个新初始化的Path2D对象
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象

Path2D.addPath(path [, transform])​ // 添加了一条路径到当前路径（可能添加了一个变换矩阵）。
```

## 色彩 Colors

```js
fillStyle = color //设置图形的填充颜色。
strokeStyle = color //设置图形轮廓的颜色。
// color 可以是 orange,#FFA500,rgb(255,165,0),rgba(255,165,0,1)
```

## 透明度 Transparency

```js
globalAlpha = transparencyValue //这个属性影响到 canvas 里所有图形的透明度，
//有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。
```

## 线型 Line styles

```js
lineWidth = value //设置线条宽度。
```

### lineCap(线段端点显示的样子)

```js
lineCap = type // 设置线条末端样式。
//type = ['butt','round','square'];默认是 butt
```

![lineCap](https://developer.mozilla.org/@api/deki/files/88/=Canvas_linecap.png "lineCap")

### lineJoin(图形中两线段连接处所显示的样子)

```js
lineJoin = type//设定线条与线条间接合处的样式。
//type = [round, bevel , miter];默认是 miter
// 当值是 miter 的时候，线段会在连接处外侧延伸直至交于一点，延伸效果miterLimit 属性的制约。
miterLimit = value//限制当两条线相交时交接处最大长度；
//所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
```

![lineJoin](https://developer.mozilla.org/@api/deki/files/89/=Canvas_linejoin.png "lineJoin")

### 使用虚线

```js
//用 setLineDash 方法和 lineDashOffset 属性来制定虚线样式.
//setLineDash 方法接受一个数组，来指定线段与间隙的交替；
//lineDashOffset 属性设置起始偏移量.
setLineDash(segments)//设置当前虚线样式。
lineDashOffset = value//设置虚线样式的起始偏移量。
```

## 渐变 Gradients

>strokeStyle 和 fillStyle 属性都可以接受 canvasGradient 对象

```js
createLinearGradient(x1, y1, x2, y2)
//createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
createRadialGradient(x1, y1, r1, x2, y2, r2)
//createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，
//半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
gradient.addColorStop(position, color)
//addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，
//表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。
//color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。
```

## 图案样式 Patterns

```js
createPattern(image, type)
//该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。
//Type [repeat，repeat-x，repeat-y , no-repeat。]
```

## 阴影 Shadows

```js
shadowOffsetX = float
//shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。
//负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

shadowOffsetY = float
//shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。
//负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
shadowBlur = float
//shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
shadowColor = color
//shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
```

## Canvas 填充规则

```js
//用到 fill（或者 clip和isPointinPath ）你可以选择一个填充规则，
//该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，
//这对于自己与自己路径相交或者路径被嵌套的时候是有用的
fill(rule)
// rule=['nonzero','evenodd'] 默认nonzero
```

## 绘制文本

```js
fillText(text, x, y [, maxWidth])
//在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
strokeText(text, x, y [, maxWidth])
//在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
```
