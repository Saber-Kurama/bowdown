import {Mesh, BoxGeometry, Euler, Vector3} from 'three'

import {loader} from './loader'
import scene from './scene/scene'
import {init} from './archer/archer'
import {sendMessage} from './websocket';
import {updateCrown} from './kingOfCrown'
import player1 from './player1/player1';

const benji = require.context("../models/benji");

var players = {};
var roster = {}
var playerHitBoxes = []
var playerAimAreas = [] //this will help the bow aim closer to the player when strafing

players.all = function() {
    return roster;
}

players.get = (uuid) => {
    return roster[uuid]
}

players.respawn = function(uuid, position, rotation, race, name) {
    if (roster[uuid]) {
        roster[uuid].hp = 100
        roster[uuid].gltf.scene.visible = true
        if (!rotation) {
            rotation = new Euler()
        }
        if (position) {
            players.move(uuid, {position: position, rotation: rotation})
        }
    } else {
        players.add(uuid, {
            position: position,
            rotation: rotation,
            race: race,
            name: name
        })
    }
    let player = players.get(uuid)
    if (player.removeArrows) {
        player.removeArrows()
    }
}

players.add = function(uuid, playerState) {
    // this is a hacky way to make sure the player model isn't loaded multiple times
    roster[uuid] = {hp: 100}
    let player = roster[uuid]
    player.setPosition = function (coords) { // this takes an {x, y, z} coord Object as it's input NOT a Vector3
        player.position = new Vector3(coords.x, coords.y, coords.z)
    }
    player.getPosition = function() {
        return player.position.clone()
    }
    if (playerState.race==null) {
        console.error("race is undefined")
        playerState.race = 'brown'
    }
    if (playerState.name == null) {
        console.error("name is undefined")
        playerState.name = 'undefined'
    }
    player.race = playerState.race
    player.name = playerState.name
    if (playerState.position) player.setPosition(playerState.position)
    loader.load(benji("./benji_" + playerState.race + ".gltf"), function(gltf) {
        player.gltf = gltf;
        init(player);
        if (!playerState.rotation) {
            playerState.rotation = new Euler()
        }
        if (playerState.position) {
            players.move(uuid, playerState)
        }
        scene.add( gltf.scene );

        addHitBox(uuid, gltf) // these hitBoxes suck and I'm sorry
    });
}

players.remove = function(uuid) {
    scene.remove(players.get(uuid).gltf.scene)
    delete roster[uuid]
}

players.update = function(playerState) {
    Object.keys(playerState).forEach(
        (playerUuid) => {
            if (playerUuid == player1.uuid) {
                return;
            }
            if (!players.get(playerUuid)) {
                players.add(playerUuid, playerState[playerUuid]);
            } else {
                players.move(playerUuid, playerState[playerUuid])
            }
        }
    )
}

players.move = function(playerUuid, playerState) {
    let player = roster[playerUuid]
    player.setPosition(playerState.position)
    if (player.gltf) {
        player.gltf.scene.position.copy(playerState.position)
        player.gltf.scene.rotation.copy(playerState.rotation)
        player.velocity = playerState.velocity
        if (playerState.hp != null) player.hp = playerState.hp
        if (!player.gltf.scene.visible && player.hp > 100) player.gltf.scene.visible = true
    } else {
        console.warn("players.move called on a player that hasn't been loaded yet")
    }
    if (playerState.kingOfCrown != null) { player.kingOfCrown = playerState.kingOfCrown }
    if (player.kingOfCrown) {
        updateCrown(player)
    }
}

players.playAction = function(playerUuid, action) {
    var player = roster[playerUuid]
    if (action.includes("run")) {
        player.running = true
    } else if (action.includes("idle")) {
        player.running = false
    }
    player.anim[action].reset().play()
}

players.stopAction = function(playerUuid, action) {
    var player = roster[playerUuid]
    player.anim[action].stop()
}

players.playSound = function(playerUuid, sound) {
    let player = roster[playerUuid]
    if (player.sounds) player.playSound(sound)
}

players.stopSound = function(playerUuid, sound) {
    let player = roster[playerUuid]
    if (player.sounds) player.stopSound(sound)
}

players.takeDamage = function(playerUuid, damage) {
    var player = roster[playerUuid]
    player.hp -= damage
}

players.count = function() {
    return Object.keys(roster).length
}

function animatePlayers(delta) {
    Object.keys(roster).forEach(
        (playerUuid) => {
            let player = roster[playerUuid]
            if (player.velocity) {
                let velocity = new Vector3(player.velocity.x, player.velocity.y, player.velocity.z)
                if (velocity.length() > 0) {
                    player.gltf.scene.position.add(velocity.multiplyScalar(delta))
                }   
            }
            if (player.mixer) {
                player.mixer.update(delta)
            }
        })
}

function broadcastDamage(playerUuid, damage) {
    sendMessage({
        player: player1.uuid,
        damage: damage,
        to: playerUuid
    })
}

function addHitBox(uuid, gltf) {
    let bodyHitBox = new Mesh(new BoxGeometry(0.5, 1.4, 0.5));
    bodyHitBox.position.y += 0.65
    bodyHitBox.material.visible = false
    gltf.scene.add(bodyHitBox)
    bodyHitBox.hitBoxFor = uuid
    bodyHitBox.hitBoxType = "body"
    playerHitBoxes.push(bodyHitBox)
    let headHitBox = new Mesh(new BoxGeometry(0.5, 0.4, 0.5));
    headHitBox.position.y += 1.55
    headHitBox.material.visible = false
    gltf.scene.add(headHitBox)
    headHitBox.hitBoxFor = uuid
    headHitBox.hitBoxType = "head"
    playerHitBoxes.push(headHitBox)
    
    let playerAimArea = new Mesh(new BoxGeometry(2, 2, 1));
    playerAimArea.position.y += 1;
    playerAimArea.material.visible = false
    playerAimArea.aimArea = true
    gltf.scene.add(playerAimArea)
    playerAimAreas.push(playerAimArea)
}

export { players, animatePlayers, playerHitBoxes, broadcastDamage, playerAimAreas }