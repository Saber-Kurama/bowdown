import {AnimationMixer, Mesh, BoxGeometry, Euler, Geometry, LineBasicMaterial, Line, Vector3} from 'three'

import {loader} from './loader'
import scene from './scene'
import {init} from './archer'
import {sendMessage} from './websocket';
import {updateCrown} from './kingOfCrown'
import player1 from './player1';

var players = {};
var roster = {}
var playerHitBoxes = []

players.all = function() {
    return roster;
}

players.get = (uuid) => {
    return roster[uuid]
}

players.respawn = function(uuid, position, rotation, race) {
    if (roster[uuid]) {
        roster[uuid].gltf.scene.visible = true
        roster[uuid].hp = 100
        if (!rotation) {
            rotation = new Euler()
        }
        if (position) {
            players.move(uuid, position, rotation)
        }
    } else {
        players.add(uuid, position, rotation, race)
    }
}

players.add = function(uuid, position, rotation, race) {
    // this is a hacky way to make sure the player model isn't loaded multiple times
    roster[uuid] = {hp: 100}
    if (race==null) {
        console.error("race is undefined")
        race = 'brown'
    }
    loader.load('./models/benji_'+race+'.gltf', function(gltf) {
        roster[uuid].gltf = gltf;
        init(new AnimationMixer(gltf.scene), roster[uuid]);
        if (!rotation) {
            rotation = new Euler()
        }
        if (position) {
            players.move(uuid, position, rotation)
        }
        scene.add( gltf.scene );

        var hitBox = new Mesh(new BoxGeometry(0.5, 2, 0.5));
        hitBox.position.y += 1
        hitBox.material.visible = false
        gltf.scene.add(hitBox)
        hitBox.playerUuid = uuid
        playerHitBoxes.push(hitBox)
    });
}

players.remove = function(uuid) {
    scene.remove(players.get(uuid).gltf.scene)
    delete roster[uuid]
}

players.init = function(newPlayers) {
    Object.keys(newPlayers).forEach(
        (playerUuid) => {
            players.add(playerUuid,
                newPlayers[playerUuid].position,
                newPlayers[playerUuid].rotation,
                newPlayers[playerUuid].race);
        })
}

players.move = function(playerUuid, pos, rotation, kingOfCrown) {
    var player = roster[playerUuid]
    player.gltf.scene.position.copy(pos)
    player.gltf.scene.rotation.copy(rotation)
    player.kingOfCrown = kingOfCrown
    if (player.kingOfCrown) {
        updateCrown(player)
    }
}

players.playAction = function(playerUuid, action) {
    var player = roster[playerUuid]
    player.anim[action].reset().play()
}

players.stopAction = function(playerUuid, action) {
    var player = roster[playerUuid]
    player.anim[action].stop()
}

players.takeDamage = function(playerUuid, damage) {
    var player = roster[playerUuid]
    player.hp -= damage
}

function animatePlayers(delta) {
    Object.keys(roster).forEach(
        (playerUuid) => {
            if (roster[playerUuid].mixer) {
                roster[playerUuid].mixer.update(delta)
            }
        })
}

function killPlayer(playerUuid) {
    var damage = 100
    players.takeDamage(playerUuid, damage)
    sendMessage({
        player: player1.uuid,
        damage: damage,
        to: playerUuid
    })
}

export { players, animatePlayers, playerHitBoxes, killPlayer }