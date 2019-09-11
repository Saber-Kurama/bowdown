import {LoopOnce} from 'three'

function getAnimation(archer, name){
    var result;
    archer.gltf.animations.forEach((animation) => {
        if (animation.name===name) {
            result = animation
            return
        }
    })
    if (result == null) {
        console.error("animation: "+name+" cannot be found!")
    }
    return result
}

function init(mixer, archer) {
    archer.mixer = mixer
    archer.anim = {
        idle: mixer.clipAction(getAnimation(archer, "Idle")),
        running: mixer.clipAction(getAnimation(archer, "Running best")),
        runWithBow: mixer.clipAction(getAnimation(archer, "Running with bow best")),
        runWithLegsOnly: mixer.clipAction(getAnimation(archer, "Running legs only")),
        jumping: mixer.clipAction(getAnimation(archer, "Jumping2")).setLoop(LoopOnce),
        equipBow: mixer.clipAction(getAnimation(archer, "Equip Bow")).setLoop(LoopOnce),
        drawBow: mixer.clipAction(getAnimation(archer, "Draw bow")).setLoop(LoopOnce),
        fireBow: mixer.clipAction(getAnimation(archer, "Fire bow")).setLoop(LoopOnce)
    }
    archer.anim.drawBow.clampWhenFinished = true

    // BOW STATES:
    // unequipped
    // equipped
    // drawing
    // drawn
    // BOW ACTIONS   |  BOW STATE TRANSITION        |  ANIMATIONS
    //  equip        |   unequipped -> equipped     |   equipBow
    //  draw         |   equipped -> drawing        |   drawBow
    //  completeDraw |   drawing -> drawn           |   _default
    //  cancelDraw   |   drawing/drawn -> equipped  |   _default
    //  fire         |   drawn -> equipped          |   fireBow


    archer.toggleBow = function(bool) { // bool == true means equipBow (bow in hand)
        // this is a hack because I'm too lazy to figure out how to animate this in blender
        archer.gltf.scene.children[0].children[1].visible = !bool
        archer.gltf.scene.children[0].children[2].visible = bool
    }

    archer.activeActions = []
    archer.playAction = function(action) {
        if (archer.anim[action]) {
            archer.anim[action].reset().play()
            if (!this.activeActions.includes(action)) {
                this.activeActions.push(action)   
            }
        }
    }

    archer.stopAction = function(action) {
        if (this.activeActions.includes(action)) {
            this.activeActions = this.activeActions.filter(e => e != action)
            archer.anim[action].stop()
        } else {
            console.error("tried to stop action: " + action + ", but action was never started")
        }
    }

    archer.bowAction = function(bowAction) {
        if (archer.anim && archer.anim[bowAction]){
            if (archer.activeBowAction != bowAction) {
                if (archer.activeBowAction) {
                    this.stopAction(archer.activeBowAction)
                    archer.activeBowAction = null
                }
                if (archer.activeMovement && archer.activeMovement != "runWithLegsOnly") {
                    this.stopAction(archer.activeMovement)
                }
                if (bowAction) {
                    this.playAction(bowAction)
                }
                archer.activeBowAction = bowAction
                
            }
        } else {
            console.error("action: " + bowAction + " does not exist!");
        }
    }

    archer.movementAction = function(action="idle") {
        if (archer.anim && archer.anim[action]) {
            if (archer.activeMovement) {
                if (archer.activeMovement != action) {
                    this.stopAction(archer.activeMovement)
                } else  {
                    return
                }
            }
            this.playAction(action)
            archer.activeMovement = action
        } else {
            console.error("action: " + action + " does not exist!");
        }
    }

    archer.isRunning = function() {
        if (archer.activeMovement) {
            return archer.activeMovement.toLowerCase().includes("run")
        }
        return false
    }

    archer.isFiring = function() {
        return (archer.bowState && (archer.bowState == "drawn" || archer.bowState == "drawing" || archer.bowState == "firing"))
    }

    archer.getPosition = function() {
        if (archer.gltf) {
            return archer.gltf.scene.position   
        }
        console.error("archer.gltf has not been defined yet")
    }

    archer.getRotation = function() {
        if (archer.gltf) {
            return archer.gltf.scene.rotation
        }
        console.error("archer.gltf has not been defined yet")
    }
}

export {init}