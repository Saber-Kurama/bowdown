import {WebGLRenderer} from 'three' 

var renderer = new WebGLRenderer();
renderer.setClearColor("#e5e5e5");
renderer.setSize( window.innerWidth, window.innerHeight );

export  {renderer }