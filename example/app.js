var zoomScale = 1,
    startZoom = zoomScale;

// open a single window
var window = Ti.UI.createWindow({
    backgroundColor: 'black'
});

var rootView = Ti.UI.createView({
    backgroundColor: 'green'
});
window.add(rootView);

var multitouch = require('jp.co.so2.pinch');

var pinchView = multitouch.createPinchView({
    //top: 0,
    //left: 0,
    //width: Ti.Platform.displayCaps.platformWidth,
    //height: Ti.Platform.displayCaps.platformHeight,
    //backgroundColor: 'transparent',
    minZoomValue: 0.5,
    maxZoomValue: 1
});
rootView.add(pinchView);

var zoomView = Ti.UI.createImageView({
    image: "map.png",
    top: 0,
    left: 0,
    width: 733,
    height: 733,
    //backgroundColor: 'white',
    touchEnabled: false
});

zoomView.addEventListener('singletap', function(e) {
    alert(e.x + ' ||| ' + e.y);
});
rootView.add(zoomView);


pinchView.addEventListener('touchstart', function(e) {

    // Get scale init scale
    startZoom = zoomScale;
});

pinchView.addEventListener('colorChange', function(e) {
    //console.log(e.scale)
    for (var key in e) {
        console.log(key);
    }
});
pinchView.addEventListener('pinch1', function(e) {
    //console.log(e.scale)
    for (var key in e) {
        console.log(key);
    }
});
pinchView.addEventListener('pinch', function(e) {

    zoomScale = e.scale * startZoom;

    // Scale
    zoomView.applyProperties({
        scaleX: zoomScale,
        scaleY: zoomScale
    });
});

pinchView.addEventListener('multiStart', function(e) {
    //console.log(e);
});

pinchView.addEventListener('multiMove', function(e) {
    zoomView.applyProperties({
        left: zoomView.left + (e.x / 3),
        top: zoomView.top + (e.y / 3)
    });
});

//FIXME: app crash on doubletap
/*pinchView.addEventListener('doubletap', function(e) {
    //console.log(e);
});*/


// Add some child view
for (var i = 0; i <= 7; i++) {
    var btn = Ti.UI.createButton({
        top: 100 * i,
        left: 100 * i,
        backgroundColor: 'red',
        width: 40,
        height: 40,
        title: '!!'
    });
    btn.addEventListener('click', function(e) {
        alert(e);
    })
    zoomView.add(btn);
}

window.open();