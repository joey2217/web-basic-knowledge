# [three.js](https://threejs.org/)

## [创建一个场景](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

### 创建场景

>为了真正能够使用three.js显示任何内容，我们需要三件事：场景，相机和渲染器，以便我们可以使用相机渲染场景。

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
```

* three.js中有一些不同的相机。现在使用[PerspectiveCamera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)。

```js
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
// fov — Camera frustum vertical field of view.
// aspect — Camera frustum aspect ratio.
// near — Camera frustum near plane.
// far — Camera frustum far plane.
```

1. fov是视野。FOV是在任何给定时刻在显示屏上看到的场景范围。该值以度为单位。
2. aspect是长宽比。几乎总是想用元素的宽度除以高度，否则得到的效果与在宽屏电视上播放老电影时的效果相同-图像看起来很压缩。
3. 接下来的两个属性是近和远裁剪平面。这是什么意思，是对象从相机比的值越远远或近于附近将不会被渲染。您现在不必为此担心，但是您可能希望在应用程序中使用其他值以获得更好的性能。

* 渲染器 使用[WebGLRenderer](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer)

```js
WebGLRenderer.setSize ( width : Integer, height : Integer, updateStyle : Boolean ) : null
//将输出canvas的大小调整为(width, height)并考虑设备像素比，且将视口从(0, 0)开始调整到适合大小 将updateStyle设置为false以阻止对canvas的样式做任何改变。
WebGLRenderer.domElement : DOMElement
//一个canvas，渲染器在其上绘制输出。
//渲染器的构造函数会自动创建(如果没有传入canvas参数);你需要做的仅仅是像下面这样将它加页面里去:
document.body.appendChild( renderer.domElement );
```

* [BoxGeometry 立方几何体](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry)

```js
BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
//width — X轴上面的宽度，默认值为1。
//height — Y轴上面的高度，默认值为1。
//depth — Z轴上面的深度，默认值为1。
//widthSegments — （可选）宽度的分段数，默认值是1。
//heightSegments — （可选）宽度的分段数，默认值是1。
//depthSegments — （可选）宽度的分段数，默认值是1。
```

* [基础网格材质(MeshBasicMaterial)](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)

### 渲染场景

>“渲染循环”（render loop）或者“动画循环”（animate loop)

```js
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```

### 动画

```js
//animate()函数中renderer.render调用的上方
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
```