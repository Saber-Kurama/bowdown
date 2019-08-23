import { Clock } from 'three'

import { scene } from './scene'
import { renderer } from './renderer'
import { camera } from './camera'
import { player1, mixer } from './player1'
import { animateArrows } from './arrow'
import { players, animatePlayers } from './players';

var clock = new Clock()
document.body.appendChild( renderer.domElement )
var input = {
    keyboard: {
        forward: false,
        backward: false,
        left: false,
        right: false,
        space: false
    },
    touch: {
        x: 0,
        y: 0
    }
}

var state = "ready"

// mouse/keyboard events
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('click', onClick);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('pointerlockchange', onPointerLockChange)

// touch events
document.addEventListener('touchmove', onTouchMove);
document.addEventListener('touchend', onTouchEnd);

window.addEventListener('resize', resize);

animate();

function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    animateArrows(delta);
    if (player1 && mixer) {
        player1.animate(delta, input);
        mixer.update( delta );
    }
    if (Object.keys(players.all()).length) {
        animatePlayers(delta)
    }
    renderer.render( scene, camera );
}

function toggleKey(event, toggle) {
    switch(event.key) {
        case 'w':
            input.keyboard.forward = toggle;
            break;
        case 'a':
            input.keyboard.left = toggle;
            break;
        case 's':
            input.keyboard.backward = toggle;
            break;
        case 'd':
            input.keyboard.right = toggle;
            break;
        case ' ':
            input.keyboard.space = toggle;
            break;
    }
}
function onKeyDown(event) {
    toggleKey(event, true);
}
function onKeyUp(event) {
    toggleKey(event, false);
}

function onMouseDown() {
    if (state === "playing") {
        player1.onMouseDown()
    }
}
function onMouseUp() {
    if (state === "playing") {
        player1.onMouseUp()
    }
}


function onClick() {
    if (state !== "playing") {
        document.body.requestPointerLock();
        state = "playing"
    }
}

function onPointerLockChange() {
    if (!document.pointerLockElement) {
        state = "ready"
    }
}

var cameraTouch = {id: null, x: null, y: null}
var movementTouch = {id: null, x: null, y: null}
function onTouchMove(event) {
    var x = event.targetTouches[0].pageX
    var y = event.targetTouches[0].pageY
    if (event.targetTouches[0].pageX > window.innerWidth/2) { // movement on right side of the screen is for camera
        if (cameraTouch.id!=null) {
            camera.moveCamera(4*(x-cameraTouch.x), 4*(y-cameraTouch.y))
        }
        cameraTouch.id = event.targetTouches[0].identifier
        cameraTouch.x = x
        cameraTouch.y = y
    } else {
        if (movementTouch.id!=null) {
            input.touch.x = x-movementTouch.x
            input.touch.y = -1*(y-movementTouch.y) // this needs to be negative for some reason
        } else {
            movementTouch.id = event.targetTouches[0].identifier
            movementTouch.x = x
            movementTouch.y = y
        }
    }
}

function onTouchEnd(event) {
    if (cameraTouch.id == event.changedTouches[0].identifier) {
        cameraTouch.id = null
    } else if (movementTouch.id == event.changedTouches[0].identifier) {
        movementTouch.id = null
        input.touch = {x:0, y:0}
    }
}

function onMouseMove(event) {
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    camera.moveCamera(movementX, movementY);
}

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function isMobile() {
    try {
        if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        };
        return false;
    } catch(e){ console.log("Error in isMobile"); return false; }
}

// create crosshair
var crosshairHtmlElement = document.createElement("div")
crosshairHtmlElement.setAttribute("style", "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; background-image: url(crosshair.svg);")
document.getElementsByTagName("BODY")[0].appendChild(crosshairHtmlElement)