(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,t,n){"use strict";n.r(t);var o=n(2),i=n(5),a=n.n(i),r=new(n(6).a),c=n(3),s=n.n(c),d=n(7),l=n.n(d),u=n(8),p=n.n(u),m=n(9),w=n.n(m),g=n(10),h=n.n(g),y=n(11),b=n.n(y),f=n(12),v=n.n(f),x=new o.eb,k=[];r.load(s.a,function(e){var t=e.scene;t.position.y-=10,x.add(t),k.push(t)});let L=[];L.push(new o.L({map:(new o.kb).load(l.a)})),L.push(new o.L({map:(new o.kb).load(p.a)})),L.push(new o.L({map:(new o.kb).load(w.a)})),L.push(new o.L({map:(new o.kb).load(h.a)})),L.push(new o.L({map:(new o.kb).load(b.a)})),L.push(new o.L({map:(new o.kb).load(v.a)}));for(let e=0;e<6;e++)L[e].side=o.c;let S=new o.e(1e3,1e3,1e3),M=new o.K(S,L);var z;x.add(M),x.add(((z=new o.r(16777215,10209703)).color.setHSL(.6,1,.8),z.groundColor.setHSL(.095,1,.75),z.position.set(0,50,0),z.visible=!0,z)),x.add(function(){var e=new o.l;e.color.setHSL(.1,1,.95),e.position.set(-1,1.75,1),e.position.multiplyScalar(30),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048;return e.shadow.camera.left=-50,e.shadow.camera.right=50,e.shadow.camera.top=50,e.shadow.camera.bottom=-50,e.shadow.camera.far=3500,e.shadow.bias=-1e-4,e.visible=!0,e}());var B=new o.sb({antialias:!0,alpha:!0});B.setClearColor("#e5e5e5"),screen.width<screen.height?B.setSize(window.innerHeight,window.innerWidth,!1):B.setSize(window.innerWidth,window.innerHeight,!1),B.setPixelRatio(window.devicePixelRatio),B.gammaOutput=!0,B.gammaFactor=2.2;const A=!1;function j(e,t){if(A){var n=new o.p;n.vertices.push(t,new o.pb);var i=new o.y({color:16711680}),a=new o.x(n,i);a.name="collision line",e.gltf.scene.add(a)}}function E(e,t){var n;return e.gltf.animations.forEach(e=>{e.name!==t||(n=e)}),null==n&&console.error("animation: "+t+" cannot be found!"),n}function O(e,t){t.mixer=e,t.anim={idle:e.clipAction(E(t,"Idle")),running:e.clipAction(E(t,"Running best")),runWithBow:e.clipAction(E(t,"Running with bow best")),runWithLegsOnly:e.clipAction(E(t,"Running legs only")),jumping:e.clipAction(E(t,"Jumping")).setLoop(o.G),equipBow:e.clipAction(E(t,"Equip Bow")).setLoop(o.G),drawBow:e.clipAction(E(t,"Draw bow")).setLoop(o.G),fireBow:e.clipAction(E(t,"Fire bow")).setLoop(o.G)},t.anim.drawBow.clampWhenFinished=!0,t.toggleBow=function(e){t.gltf.scene.children[0].children[1].visible=!e,t.gltf.scene.children[0].children[2].visible=e},t.bowAction=function(e){t.anim&&t.anim[e]?t.activeBowAction!=e&&(t.activeBowAction&&t.anim[t.activeBowAction].stop(),t.activeMovement&&"runWithLegsOnly"!=t.activeMovement&&t.anim[t.activeMovement].stop(),e&&t.anim[e].reset().play(),t.activeBowAction=e):console.error("action: "+e+" does not exist!")},t.movementAction=function(e="idle"){if(t.anim&&t.anim[e]){if(t.activeMovement){if(t.activeMovement==e)return;t.anim[t.activeMovement].stop()}t.anim[e].reset().play(),t.activeMovement=e}else console.error("action: "+e+" does not exist!")},t.isRunning=function(){return!!t.activeMovement&&t.activeMovement.toLowerCase().includes("run")},t.isFiring=function(){return t.bowState&&("drawn"==t.bowState||"drawing"==t.bowState||"firing"==t.bowState)},t.getPosition=function(){if(t.gltf)return t.gltf.scene.position;console.error("archer.gltf has not been defined yet")},t.getRotation=function(){if(t.gltf)return t.gltf.scene.rotation;console.error("archer.gltf has not been defined yet")}}const P=new WebSocket("ws://ec2-18-191-136-250.us-east-2.compute.amazonaws.com:18181");function F(e){P.readyState&&P.send(JSON.stringify(e))}P.onmessage=function(e){var t,n;if((e=JSON.parse(e.data)).players&&C.init(e.players),e.player){var i=e.player;i==G?e.damage&&J.takeDamage(e.damage):e.chatMessage?function(e){var t=document.createTextNode(e),n=document.createElement("p").appendChild(t);document.getElementById("chat").appendChild(n)}(e.chatMessage):"disconnected"===e.status?(x.remove(C.get(i).scene),C.get(i)):C.get(i)?C.get(i).gltf&&e.position&&null!=e.rotation&&C.move(i,e.position,e.rotation,e.movementAction,e.bowAction):C.add(i,e.position,e.race)}else e.arrow&&(t=e.arrow,(n=I(t.origin,t.rotation)).velocity=new o.pb(t.velocity.x,t.velocity.y,t.velocity.z),R.push(n),Y(n,(Date.now()-t.timeOfShoot)/1e3))};n(4);var C={},W={},q=[];C.all=function(){return W},C.get=e=>W[e],C.add=function(e,t,n){W[e]={},null==n&&(console.error("race is undefined"),n="brown"),r.load("./models/benji_"+n+".gltf",function(n){W[e].gltf=n,O(new o.b(n.scene),W[e]),t&&C.move(e,t,0),x.add(n.scene);var i=new o.K(new o.e(.5,2,.5));i.position.y+=1,i.material.visible=!1,n.scene.add(i),i.playerUuid=e,q.push(i)})},C.init=function(e){Object.keys(e).forEach(t=>{C.add(t,new o.pb(e[t].x,e[t].y,e[t].z),e[t].race)})},C.move=function(e,t,n,o,i){var a=W[e];a.gltf.scene.position.copy(t),a.gltf.scene.rotation.y=n,o&&a.movementAction(o),i&&a.bowAction(i)};var _=[],R=[],D=.06,H=.75;function I(e,t){var n=new o.e(D,D,H),i=new o.L({color:65280}),a=new o.K(n,i);return a.origin=e,a.position.copy(e),a.rotation.copy(t),x.add(a),a}function Y(e,t){e.velocity.y-=9*t,e.position.add(e.velocity.clone().multiplyScalar(t))}function X(e){_.forEach(t=>{if(!t.stopped){!function(e){(e.position.x>500||e.position.x<-500||e.position.y>500||e.position.y<-500||e.position.z>500||e.position.z<-500)&&(e.stopped=!0)}(t),Y(t,e);var n=new o.pb(0,0,1);n.applyEuler(t.rotation).normalize();var i=t.position.clone().sub(t.origin).length()/2,a=new o.cb(t.position,n,0,i),r=a.intersectObjects(q);if(r.length>0){var c=r.pop();t.position.copy(c.point),t.stopped=!0,function(e){F({player:e,damage:100})}(c.object.playerUuid)}(r=a.intersectObjects(k,!0)).length>0&&(t.position.copy(r.pop().point),t.stopped=!0)}}),R.forEach(t=>{Y(t,e)})}const T=n(4);var U,G="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}),J={};J.race=["black","brown","white"][Math.floor(3*Math.random())],r.load(T("./benji_"+J.race+".gltf"),e=>{J.gltf=e,J.velocity=new o.pb,J.bowState="unequipped",x.add(e.scene),O(U=new o.b(e.scene),J),U.addEventListener("finished",e=>{"Draw bow"==e.action.getClip().name?J.bowState="drawn":("Fire bow"==e.action.getClip().name&&(J.bowState="equipped"),J.idle())}),F({player:G,position:J.getPosition(),race:J.race}),J.falling=function(e){if(e){var t=J.getPosition().clone().add(J.velocity.clone().multiplyScalar(e));t.y-=.1;var n=new o.pb(0,1,0),i=new o.cb(t,n,0,.2+Math.abs(J.velocity.y*e)).intersectObjects(k,!0);return!(i.length>0)||(J.getPosition().copy(i[i.length-1].point),!1)}},J.collisionDetected=function(e){var t;t=J,A&&t.gltf.scene.children.forEach(e=>{"collision line"===e.name&&t.gltf.scene.remove(e)});for(var n=-1;n<=1;n++)for(var i=-1;i<=1;i++){n*=.5,i*=.5;var a=new o.pb(n,1,i);a=a.clone().normalize();var r=new o.cb(new o.pb(e.x,e.y,e.z),a,0,a.length());if(j(J,a),r.intersectObjects(k,!0).length>0)return a}return!1},J.playBowAction=function(e){J.isRunning()&&"runWithLegsOnly"!=J.activeMovement?J.movementAction("runWithLegsOnly"):J.activeMovement&&(J.anim[J.activeMovement].stop(),J.activeMovement=null),J.bowAction(e),J.broadcast()},J.onMouseDown=function(){"unequipped"==J.bowState?J.equipBow():(J.playBowAction("drawBow"),J.bowState="drawing",Q.zoomIn())},J.onMouseUp=function(){"drawn"==J.bowState?(J.playBowAction("fireBow"),J.anim.drawBow.stop(),function(){var e=J.getPosition().clone().add(new o.pb(0,1.5,0)),t=I(e,Q.rotation),n=new o.cb;n.setFromCamera({x:0,y:0},Q);var i,a=n.intersectObjects(k.concat(q),!0);a.length>0?i=a[0].point.sub(e):(i=new o.pb,Q.getWorldDirection(i)),t.velocity=i.normalize().multiplyScalar(60),_.push(t),F({arrow:{origin:t.position,rotation:t.rotation,velocity:t.velocity,timeOfShoot:Date.now()}})}(),J.bowState="firing",Q.zoomOut()):"drawing"===J.bowState&&(J.anim.drawBow.stop(),J.anim[J.activeBowAction].stop(),J.activeBowAction=null,J.bowState="equipped",J.idle(),Q.zoomOut())},J.broadcast=async function(){F({player:G,position:J.getPosition(),rotation:J.getRotation().y,movementAction:J.activeMovement,bowAction:J.activeBowAction,bowState:J.bowState})},J.runOrSprint=function(e){return e.keyboard.shift?(this.isRunning()&&(this.anim[this.activeMovement].timeScale=1.5),12):(this.anim[this.activeMovement]&&(this.anim[this.activeMovement].timeScale=1),8)},J.animate=function(e,t){var n,i=J.falling(e);if(!i){var a=function(e,t){var n=new o.pb;Q.getWorldDirection(n),(n=new o.ob(n.x,n.z)).normalize().multiplyScalar(t*J.runOrSprint(e));var i=0,a=0;if(0!=e.touch.x&&0!=e.touch.y){var r=new o.ob(e.touch.x,e.touch.y);r.length()>100?e.keyboard.shift=!0:e.keyboard.shift=!1,r.normalize(),i=r.x,a=r.y}return e.keyboard.forward&&(i+=0,a+=1),e.keyboard.backward&&(i+=0,a+=-1),e.keyboard.left&&(i+=-1,a+=0),e.keyboard.right&&(i+=1,a+=0),n.rotateAround(new o.ob,Math.atan2(i,a))}(t,e),r=Math.atan2(a.x,a.y);if(t.keyboard.space?(J.velocity.y=5,J.movementAction("jumping")):J.velocity.set(0,0,0),0!=t.touch.x&&0!=t.touch.y||t.keyboard.forward||t.keyboard.backward||t.keyboard.left||t.keyboard.right)if(t.keyboard.space)J.velocity.x=a.x/e,J.velocity.z=a.y/e;else{(n=J.getPosition().clone()).z+=a.y,n.x+=a.x;var c=new o.pb(n.x,n.y+1,n.z),s=new o.cb(c,new o.pb(0,-1,0),0,1).intersectObjects(k,!0);s.length>0&&(n.y=s[0].point.y+.01),J.isRunning()||("equipped"==J.bowState?J.movementAction("runWithBow"):J.isFiring()?J.movementAction("runWithLegsOnly"):J.movementAction("running"))}else if(J.isRunning()&&(J.isFiring()?J.anim[J.activeMovement].stop():J.idle()),J.isFiring()){a=new o.pb;Q.getWorldDirection(a),r=Math.atan2(a.x,a.z),J.getRotation().y=r,Q.updateCamera(),J.broadcast()}}if(i||n||J.velocity.x||J.velocity.y||J.velocity.z){n||(n=J.getPosition().clone()),n.add(J.velocity.clone().multiplyScalar(e));var d=J.collisionDetected(n);if(d)i?(J.velocity.copy(d.clone().negate().normalize().multiplyScalar(10)),n.add(J.velocity.clone().multiplyScalar(e)),J.getPosition().copy(n)):J.velocity.set(0,0,0);else{if(i&&(J.velocity.y-=10*e),J.getPosition().copy(n),J.isFiring()){a=new o.pb;Q.getWorldDirection(a),r=Math.atan2(a.x,a.z)}else null==r&&(r=J.getRotation().y);J.getRotation().y=r,Q.updateCamera()}J.broadcast()}},J.idle=function(){J.movementAction("idle"),J.broadcast()},J.equipBow=function(){J.bowState="equipped",J.playBowAction("equipBow"),J.toggleBow(!0)},J.unequipBow=function(){J.toggleBow(!1),J.bowState="unequipped"},J.takeDamage=function(){fe(),J.getPosition().y-=20},J.respawn=function(){J.getPosition().copy(new o.pb)},J.sendChat=function(e){F({player:G,chatMessage:e})},J.equipBow(),J.idle()});var N,K;window.innerWidth<window.innerHeight?(N=window.innerHeight,K=window.innerWidth):(N=window.innerWidth,K=window.innerHeight);var Q=new o.U(75,N/K,.1,3e3);Q.zoomState="out";const V=Q.getFocalLength(),Z=Q.getFocalLength()+16;Q.position.z=5;var $=new o.pb(0,1.5,0),ee=0,te=0;Q.nextPosition=function(e){if(null!=J){var t=new o.pb;return t.x=$.x+e*Math.sin(ee*Math.PI/360)*Math.cos(te*Math.PI/360),t.y=$.y+e*Math.sin(te*Math.PI/360),t.z=$.z+e*Math.cos(ee*Math.PI/360)*Math.cos(te*Math.PI/360),t}},Q.zoomIn=function(){Q.zoomState="zooming in"},Q.zoomOut=function(){Q.zoomState="zooming out"},Q.animate=function(e){if("zooming in"==Q.zoomState)Q.getFocalLength()<Z&&((t=Q.getFocalLength()+60*e)<Z?Q.setFocalLength(t):(Q.setFocalLength(Z),Q.zoomState="in"));else if("zooming out"==Q.zoomState){var t;if(Q.getFocalLength()>V)(t=Q.getFocalLength()-60*e)>V?Q.setFocalLength(t):(Q.setFocalLength(V),Q.zoomState="out")}},Q.setPosition=function(e){Q.position.copy(e)},Q.updateCamera=function(){if(null!=J){var e=J.getPosition().clone().sub(Q.position.clone()),t=new o.pb(-e.z,0,e.x).normalize();$.copy(J.getPosition().clone().add(t)).setY(J.getPosition().y+1.5);var n=Q.nextPosition(3.5),i=new o.cb($,n.clone().sub($).normalize(),0,3.5).intersectObjects(k,!0);i.length>0&&(n=i[0].point.clone().sub(n.clone().sub(i[0].point).normalize().multiplyScalar(.1))),Q.setPosition(n)}Q.lookAt($),Q.updateMatrix()},Q.moveCamera=function(e,t){ee-=.2*e;var n=te+.2*t;135>=n&&n>=-80&&(te=n),Q.updateCamera()},n.d(t,"start",function(){return ze}),n.d(t,"gameOver",function(){return fe});var ne=new o.i;window.addEventListener("resize",function(){var e,t;e=window.innerWidth,t=window.innerHeight,ue&&window.innerWidth>window.innerHeight?(ue=!1,document.body.classList.remove("rotated")):ue?(e=window.innerHeight,t=window.innerWidth):window.innerWidth<window.innerHeight&&(Me(),e=window.innerHeight,t=window.innerWidth);B.setSize(e,t,!1),Q.aspect=e/t,Q.updateProjectionMatrix()});var oe={keyboard:{forward:!1,backward:!1,left:!1,right:!1,space:!1},touch:{x:0,y:0}},ie="playing",ae=!1,re={id:null,x:null,y:null,shoot:!1},ce={id:null,x:null,y:null},se={id:null};const de=4,le=[document.getElementById("shoot-button"),document.getElementById("jump-button")];var ue;function pe(){requestAnimationFrame(pe);var e=ne.getDelta();X(e),J&&U&&(J.animate(e,oe),U.update(e)),Object.keys(C.all()).length&&function(e){Object.keys(W).forEach(t=>{W[t].mixer&&W[t].mixer.update(e)})}(e),Q.animate(e),B.render(x,Q)}function me(e,t){if("string"==typeof e.key)switch(e.key.toLowerCase()){case"w":oe.keyboard.forward=t;break;case"a":oe.keyboard.left=t;break;case"s":oe.keyboard.backward=t;break;case"d":oe.keyboard.right=t;break;case" ":oe.keyboard.space=t;break;case"shift":oe.keyboard.shift=t}}function we(e){13===e.keyCode&&document.getElementById("chat").classList.contains("chatting")&&J.sendChat(document.getElementById("chat-text-box").value),me(e,!0)}function ge(e){me(e,!1)}function he(){"chat"==event.target.id?event.target.classList.add("chatting"):2!=event.button&&("paused"==ie?(document.body.requestPointerLock&&document.body.requestPointerLock(),be()):"playing"==ie&&J.onMouseDown())}function ye(){"playing"===ie&&J.onMouseUp()}function be(){document.body.classList.remove("ready"),document.body.classList.add("playing"),ie="playing"}function fe(){ie="gameOver",document.body.classList.remove("playing"),document.getElementById("title").innerHTML="Game over",document.body.classList.remove("playing"),document.body.classList.add("gameOver")}function ve(){ie=document.pointerLockElement?"playing":"paused"}function xe(e){e!=ae&&(e?le.forEach(e=>e.setAttribute("style","display: block;")):le.forEach(e=>e.setAttribute("style","display: none;")),ae=e)}function ke(e){var t,n,o;e.preventDefault(),xe(!0);for(var i=0;i<e.targetTouches.length;i++)e.targetTouches.item(i).identifier==re.id?t=e.targetTouches.item(i):e.targetTouches.item(i).identifier==ce.id?n=e.targetTouches.item(i):null==o&&(o=e.targetTouches.item(i));t?(ue?Q.moveCamera(de*(t.pageY-re.y),-1*de*(t.pageX-re.x)):Q.moveCamera(de*(t.pageX-re.x),de*(t.pageY-re.y)),re.x=t.pageX,re.y=t.pageY):o&&("shoot-button"===o.target.id&&(J.onMouseDown(),re.shoot=!0),"jump-button"===o.target.id&&(oe.keyboard.space=!0,se.id=o.identifier),(ue&&o.pageY>window.innerHeight/2||!ue&&o.pageX>window.innerWidth/2)&&(re.id=o.identifier,re.x=o.pageX,re.y=o.pageY)),n?ue?(oe.touch.y=n.pageX-ce.x,oe.touch.x=n.pageY-ce.y):(oe.touch.x=n.pageX-ce.x,oe.touch.y=-1*(n.pageY-ce.y)):o&&(ue&&o.pageY<window.innerHeight/2||!ue&&o.pageX<window.innerWidth/2)&&(ce.id=o.identifier,ce.x=o.pageX,ce.y=o.pageY)}function Le(e){re.id==e.changedTouches[0].identifier?(re.id==se.id&&(oe.keyboard.space=!1),re.shoot&&J.onMouseUp(),re.id=null,re.shoot=!1):ce.id==e.changedTouches[0].identifier&&(ce.id=null,oe.touch={x:0,y:0})}function Se(e){"shoot-button"!=e.target.id&&xe(!1);var t=e.movementX||e.mozMovementX||e.webkitMovementX||0,n=e.movementY||e.mozMovementY||e.webkitMovementY||0;Q.moveCamera(t,n)}function Me(){document.body.classList.add("rotated"),ue=!0}function ze(){document.addEventListener("mousemove",Se),document.addEventListener("keydown",we),document.addEventListener("keyup",ge),document.addEventListener("mousedown",he),document.addEventListener("mouseup",ye),document.addEventListener("pointerlockchange",ve),document.addEventListener("touchstart",ke),document.addEventListener("touchmove",ke),document.addEventListener("touchend",Le),document.body.appendChild(B.domElement),le.concat(B.domElement).forEach(e=>new a.a.Manager(e,{recognizers:[[a.a.Pinch,{enable:!0}]]})),window.innerWidth<window.innerHeight&&document.body.requestPointerLock&&document.body.requestPointerLock()&&screen.orientation.type&&screen.orientation.type.includes("portrait")&&(document.body.requestFullscreen?document.body.requestFullscreen():document.body.mozRequestFullScreen?document.body.mozRequestFullScreen():document.body.webkitRequestFullscreen?document.body.webkitRequestFullscreen():document.body.msRequestFullscreen&&document.body.msRequestFullscreen(),Me()),pe(),be()}document.getElementById("respawn").onclick=function(){J.respawn(),be()}},,function(e,t,n){e.exports=n.p+"models/env.glb"},function(e,t,n){var o={"./Characters_Black.png":13,"./Characters_Brown.png":14,"./Characters_White.png":15,"./benji.bin":16,"./benji.gltf":17,"./benji_black.gltf":18,"./benji_brown.gltf":19,"./benji_white.gltf":20,"./env.glb":3};function i(e){var t=a(e);return n(t)}function a(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}i.keys=function(){return Object.keys(o)},i.resolve=a,e.exports=i,i.id=4},,,function(e,t,n){e.exports=n.p+"skybox/heather_ft.jpg"},function(e,t,n){e.exports=n.p+"skybox/heather_bk.jpg"},function(e,t,n){e.exports=n.p+"skybox/heather_up.jpg"},function(e,t,n){e.exports=n.p+"skybox/heather_dn.jpg"},function(e,t,n){e.exports=n.p+"skybox/heather_rt.jpg"},function(e,t,n){e.exports=n.p+"skybox/heather_lf.jpg"},function(e,t,n){e.exports=n.p+"models/Characters_Black.png"},function(e,t,n){e.exports=n.p+"models/Characters_Brown.png"},function(e,t,n){e.exports=n.p+"models/Characters_White.png"},function(e,t,n){e.exports=n.p+"models/benji.bin"},function(e,t,n){e.exports=n.p+"models/benji.gltf"},function(e,t,n){e.exports=n.p+"models/benji_black.gltf"},function(e,t,n){e.exports=n.p+"models/benji_brown.gltf"},function(e,t,n){e.exports=n.p+"models/benji_white.gltf"}]]);