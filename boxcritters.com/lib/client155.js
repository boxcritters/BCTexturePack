function World(t) {
    GameObject.call(this),
    this.player,
    this.room,
    this.data = {
        settings: {},
        critters: [],
        symbols: {},
        effects: {},
        items: {}
    },
    this.settings = {
        view: "wide"
    },
    this.stage = new StageContainer(t),
    socket && socket.on("connect", this.handleSocket)
}
function GameObject() {
    this._events = {}
}
function World(t) {
    GameObject.call(this),
    this.player,
    this.room,
    this.data = {
        settings: {},
        critters: [],
        symbols: {},
        effects: {},
        items: {}
    },
    this.settings = {
        view: "wide"
    },
    this.stage = new StageContainer(t),
    socket && socket.on("connect", this.handleSocket)
}
function calculateDistance(t, e, i, o) {
    var s = i - t
      , a = o - e;
    return Math.sqrt(s * s + a * a)
}
function calculateAngle(t, e, i, o) {
    var s = i - t
      , a = e - o
      , r = Math.atan2(s, a)
      , n = Math.floor(180 * r / Math.PI);
    return n < 0 ? n + 360 : n
}
function findDirection(t) {
    var e = Math.floor((t + 22.5) / 45);
    return 7 < e ? 0 : e
}
function handleDepthSort(t) {
    t.target.children.sort(function(t, e) {
        return t.y - e.y
    })
}
function findObjectInArray(t, e, i) {
    for (var o = i.length, s = 0; s < o; s++)
        if (i[s][t] == e)
            return i[s]
}
function removeObjectInArray(t, e, i) {
    for (var o = i.length, s = 0; s < o; s++)
        if (i[s][t] == e) {
            var a = i[s];
            return i.splice(s, 1),
            a
        }
}
function Crumb(t) {
    this.playerId = t.i,
    this.nickname = t.n,
    this.critterId = t.c,
    this.gear = t.g,
    this.rotation = t.r,
    this.speed = t.s,
    this.x = t.x,
    this.y = t.y,
    this.z = t.z
}
function Map(t) {
    this.tileSize = t.tileSize || 40,
    this.tileMap = t.tileMap,
    this.triggers = t.triggers || []
}
function Player(t) {
    GameObject.call(this),
    this.playerId = t.playerId,
    this.nickname = t.nickname,
    this.critterId = t.critterId,
    this.inventory = t.inventory,
    this.friends = t.friends,
    this.gear = t.gear || {},
    this.status,
    this.level,
    this.weapon,
    this.def = 10,
    this.str = 10,
    this.armour,
    this.isDead,
    this.gems = t.gems || 0,
    this.coins = t.coins || 0,
    this.coinsInBank,
    this.xp,
    this.hp = 100,
    this.mp,
    this.gems;
    var e = this;
    localStorage.setItem("playerId", e.playerId),
    setInterval(function() {
        e.getPlayerId() != e.playerId && socket && socket.disconnect()
    }, 1e4)
}
function Room(t) {
    this.roomId = t.roomId,
    this.name = t.name,
    this.players = {},
    t.triggers && (t.map.triggers = t.triggers),
    this.layers = t.layers || [[]],
    this.map = new Map(t.map);
    for (var e = t.players.length, i = 0; i < e; i++)
        this.addPlayer(t.players[i])
}
function AssetContainer(t) {
    createjs.Container.call(this),
    (this.data = t).sprite && (this.name = t.sprite),
    t.name && (this.name = t.name),
    this.x = t.x || 0,
    this.y = t.y || 0,
    this.edit = artwork.edit.clone(),
    this.edit.visible = !1,
    this.hitArea = this.edit,
    this.regX = t.regX || 0,
    this.regY = t.regY || 0
}
function BalloonContainer(t) {
    createjs.Container.call(this),
    this.x = t.x,
    this.y = t.y
}
function createBalloon(t, e) {
    var i = e + 20
      , o = t + 20
      , s = new createjs.Shape;
    return s.graphics.setStrokeStyle(1).beginStroke("#888888").beginFill("#FFFFFF"),
    s.graphics.moveTo(5, 0).arcTo(o, 0, o, 5, 5).arcTo(o, i, o - 5, i, 5).lineTo(80, i).lineTo(70, i + 10).lineTo(70, i).arcTo(0, i, 0, i - 5, 5).arcTo(0, 0, 5, 0, 5),
    s.x = 0 - o / 2,
    s.y = -10,
    s
}
function BeepContainer(t, e) {
    createjs.Container.call(this),
    this.width = t,
    this.height = e
}
function BeepItem(t) {
    this.mc = new createjs.Container;
    var e = new createjs.Graphics;
    e.beginFill("black"),
    e.drawRect(0, 100, 850, 200);
    var i = new createjs.Shape(e);
    this.mc.addChild(i);
    var o = new createjs.Bitmap("/media/icons/" + t.itemId + ".png");
    o.regX = 80,
    o.regY = 80,
    o.x = 425,
    o.y = 120,
    this.mc.addChild(o),
    t.name && (t.title = t.name);
    var s = new createjs.Text(t.title,"40px Luckiest Guy","#ffffff");
    if (s.textAlign = "center",
    s.lineHeight = 40,
    s.lineWidth = 400,
    s.x = 425,
    s.y = 210,
    this.mc.addChild(s),
    t.text) {
        var a = new createjs.Text(t.text,"16px Arial","#AAAAAA");
        a.textAlign = "center",
        a.lineWidth = 300,
        a.x = 425,
        a.y = 250,
        this.mc.addChild(a)
    }
}
function CritterContainer(t) {
    createjs.MovieClip.call(this);
    var e = world.getCritterData(t);
    this.state = "stand",
    this.isMoving = !1,
    this.isForward = !0,
    this.hasTail = !1,
    this.hasEars = !1,
    this.direction = 4,
    this.framerate = 30,
    this.loop = -1,
    this.regX = 68,
    this.regY = 140;
    var i = new createjs.SpriteSheet(e);
    this.bodyContainer = new createjs.Container,
    this.feetContainer = new createjs.Container,
    this.baseContainer = new createjs.Container,
    this.addChild(this.baseContainer, this.feetContainer, this.bodyContainer),
    this.skin = new createjs.Container,
    this.ears = new createjs.Container,
    this.face = new createjs.Container,
    this.feet = new createjs.Container,
    this.tail = new createjs.Container,
    this.skin.sprite = new createjs.Sprite(i,"body4"),
    this.skin.addChild(this.skin.sprite),
    this.face.sprite = new createjs.Sprite(i,"face4"),
    this.face.addChild(this.face.sprite),
    this.feet.sprite = new createjs.Sprite(i,"feet"),
    this.feetContainer.addChild(this.feet.sprite),
    e.animations.ears4 && (this.ears.sprite = new createjs.Sprite(i,"ears4"),
    this.ears.addChild(this.ears.sprite),
    this.hasEars = !0),
    e.animations.tail4 && (this.tail.sprite = new createjs.Sprite(i,"tail4"),
    this.tail.addChild(this.tail.sprite),
    this.hasTail = !0),
    this.slots = {
        eyes: new SlotContainer,
        ears: new SlotContainer,
        head: new SlotContainer,
        hand: new SlotContainer,
        cape: new SlotContainer,
        neck: new SlotContainer,
        belt: new SlotContainer,
        mask: new SlotContainer,
        body: new SlotContainer,
        pack: new SlotContainer,
        ride: new SlotContainer
    },
    this.backs = {
        eyes: new SlotContainer("back"),
        ears: new SlotContainer("back"),
        head: new SlotContainer("back"),
        cape: new SlotContainer("back"),
        neck: new SlotContainer("back"),
        belt: new SlotContainer("back"),
        body: new SlotContainer("back"),
        pack: new SlotContainer("back"),
        hand: new SlotContainer("back"),
        ride: new SlotContainer("back")
    },
    this.forward = [this.backs.ride, this.tail, this.backs.hand, this.backs.cape, this.backs.pack, this.backs.neck, this.backs.belt, this.backs.eyes, this.backs.ears, this.backs.head, this.backs.body, this.skin, this.ears, this.face, this.slots.mask, this.slots.body, this.slots.head, this.slots.ears, this.slots.eyes, this.slots.pack, this.slots.neck, this.slots.belt, this.slots.cape, this.slots.hand, this.slots.ride],
    this.backward = [this.backs.ride, this.backs.hand, this.backs.cape, this.backs.pack, this.backs.neck, this.backs.belt, this.backs.ears, this.backs.eyes, this.backs.head, this.backs.body, this.skin, this.ears, this.face, this.slots.eyes, this.slots.mask, this.slots.body, this.slots.head, this.slots.ears, this.slots.pack, this.slots.belt, this.slots.neck, this.slots.hand, this.slots.cape, this.tail, this.slots.ride];
    for (var o = 0; o < this.forward.length; o++)
        this.bodyContainer.addChild(this.forward[o]);
    e.animations.shadow && (this.baseContainer.sprite = new createjs.Sprite(i,"shadow"),
    this.baseContainer.addChild(this.baseContainer.sprite)),
    this.timeline.addTween(createjs.Tween.get(this.bodyContainer).wait(1).to({
        y: 4
    }).wait(1).to({
        y: -12
    }).wait(1).to({
        y: -16
    }).wait(1).to({
        y: -8
    }).wait(1)),
    this.timeline.addTween(createjs.Tween.get(this.feetContainer).wait(2).to({
        y: -8
    }).wait(1).to({
        y: -16
    }).wait(1).to({
        y: -6
    }).wait(1)),
    this.timeline.addTween(createjs.Tween.get(this.baseContainer)),
    this.updateDirection(),
    this.stop()
}
function LayerContainer(t, e, i) {
    if (createjs.Container.call(this),
    this.layerId = t,
    this.room = e,
    i)
        for (var o = i.length, s = 0; s < o; s++) {
            var a = i[s];
            a.group ? this.addGroup(a, this) : this.addSprite(a, this)
        }
    this.addEventListener("tick", handleDepthSort)
}
function MapContainer(t) {
    createjs.Container.call(this),
    this.data = t,
    this.activeTile = 0,
    this.tiles = [],
    this.fills = ["rgba(0, 0, 0, 0.02)", "green", "yellow", "red", "blue", "orange", "navy", "pink", "red", "blue"]
}
function MascotContainer(t) {
    createjs.MovieClip.call(this);
    var e = world.getCritterData(t);
    this.state = "wait",
    this.isMoving = !1,
    this.scaleX = 1,
    this.scaleY = 1,
    this.framerate = 30,
    this.loop = -1,
    this.currentDirection = 4,
    this.directionFrames = [0, 1, 3, 3, 4, 5, 5, 7];
    var i = new createjs.SpriteSheet(e);
    this.sprite = new createjs.Sprite(i),
    this.addChild(this.sprite),
    this.updateDirection(),
    this.stop()
}
function MenuContainer(t) {
    createjs.Container.call(this);
    var e = this
      , i = new boot.Icon("box");
    i.setTransform(760, 420, .5, .5),
    i.click(function() {
        var t = new Inventory(world.player);
        e.addChild(t)
    }),
    this.addChild(i);
    var o = new CoinsWidget;
    o.setTransform(10, 10, .3, .3),
    o.on("click", function() {}),
    this.addChild(o)
}
function MonsterContainer(t) {
    createjs.MovieClip.call(this),
    this.scaleX = 1,
    this.scaleY = 1,
    this.framerate = 30,
    this.loop = -1,
    this.currentDirection = 4;
    var e = new createjs.SpriteSheet(world.critters[t.critterId]);
    this.sprite = new createjs.Sprite(e,"wait4"),
    this.addChild(this.sprite),
    this.on("click", function() {
        socket.emit("attack", t.playerId)
    }),
    this.stop()
}
function NicknameContainer(t) {
    createjs.Container.call(this);
    var e = new createjs.Text(t.n,"12px Arial","#000000");
    e.textAlign = "center",
    e.lineWidth = 100,
    e.y = 15,
    this.addChild(e),
    this.x = t.x,
    this.y = t.y
}
function PlayerContainer(t, e) {
    createjs.Container.call(this),
    this.isLocal = e || !1,
    this.playerId = t.i,
    this.critterId = t.c,
    this.isMoving = !1,
    this.nickname,
    this.balloon,
    this.animation = "none",
    this.speed = 5,
    this.extra = t.e || {},
    this.x = t.x,
    this.y = t.y,
    this.z = t.z || 0,
    this.r = t.r || 180,
    this.currentTile,
    this.direction = findDirection(this.r),
    this.targetX = t.x,
    this.targetY = t.y,
    "mascot" == world.getCritterData(this.critterId).type ? this.critter = new MascotContainer(this.critterId) : this.critter = new CritterContainer(this.critterId),
    this.extra.scale ? (this.critter.scaleX = this.extra.scale / 2,
    this.critter.scaleY = this.extra.scale / 2) : (this.critter.scaleX = .5,
    this.critter.scaleY = .5),
    t.g && this.updateGear(t.g),
    this.addChild(this.critter),
    this.updateDirection(this.direction),
    this.updateState("wait")
}
World.prototype = Object.create(GameObject.prototype),
World.prototype.updateData = function(t, e) {
    this.data[t] && (this.data[t] = e),
    "items" == t && (this.itemSS = new createjs.SpriteSheet(this.data.items))
}
,
World.prototype.getData = function(t) {
    return this.data[t]
}
,
World.prototype.getItemData = function(t) {
    return this.data.items.items[t]
}
,
World.prototype.getCritterData = function(t) {
    return findObjectInArray("critterId", t, this.data.critters)
}
,
World.prototype.updatePlayer = function(t) {
    this.player = new Player(t)
}
,
World.prototype.getPlayer = function() {
    return this.player
}
,
World.prototype.handleSocket = function() {
    var e = world.stage;
    socket.on("disconnect", function() {}),
    socket.on("login", function(t) {
        world.handleLogin(t)
    }),
    socket.on("joinRoom", function(t) {
        world.handleJoinRoom(t)
    }),
    socket.on("beep", function(t) {
        e.beep && e.beep.show(t)
    }),
    socket.on("updatePlayer", function(t) {
        world.player.updateData(t)
    }),
    socket.on("A", function(t) {
        e.room && e.room.addPlayer(t)
    }),
    socket.on("R", function(t) {
        e.room && e.room.removePlayer(t)
    }),
    socket.on("G", function(t) {
        e.room && e.room.updatePlayer(t)
    }),
    socket.on("X", function(t) {
        e.room && e.room.movePlayer(t)
    }),
    socket.on("E", function(t) {
        e.room && e.room.addEffect(t)
    }),
    socket.on("M", function(t) {
        world.emit("M", t),
        e.room && e.room.addMessage(t)
    })
}
,
World.prototype.handleLogin = function(t) {
    t.player ? this.updatePlayer(t.player) : this.updatePlayer(t),
    world.data.settings.lobby && world.joinRoom(world.data.settings.lobby)
}
,
World.prototype.handleJoinRoom = function(t) {
    this.room = new Room(t),
    this.stage.addRoom(t),
    this.stage.addMenu(),
    this.stage.addBeep()
}
,
World.prototype.login = function(t) {
    socket.open(),
    socket.emit("login", {
        ticket: t
    })
}
,
World.prototype.logout = function() {
    sessionStorage.clear(),
    socket.disconnect()
}
,
World.prototype.joinRoom = function(t) {
    socket.emit("joinRoom", {
        roomId: t
    })
}
,
World.prototype.sendMessage = function(t) {
    if ("/" === (t = t.trim()).substr(0, 1))
        this.sendCode(t);
    else {
        var e = {
            i: this.player.playerId,
            n: this.player.nickname,
            m: t
        };
        this.emit("M", e),
        this.stage.room.addMessage(e),
        socket.emit("sendMessage", {
            message: t
        })
    }
}
,
World.prototype.sendCode = function(t) {
    var e = t.split(" ")
      , i = e.shift().substr(1).toLowerCase();
    switch (i) {
    case "nicknames":
        this.stage.room.toggleNicknames();
        break;
    case "balloons":
        this.stage.room.toggleBalloons();
        break;
    case "join":
        var o = e[0];
        o && this.joinRoom(o.toLowerCase());
        break;
    case "darkmode":
        toggleDarkmode && toggleDarkmode();
    default:
        socket.emit("code", {
            code: i,
            options: e
        })
    }
}
,
World.prototype.sendMove = function(t, e) {
    socket && socket.emit("click", {
        x: t,
        y: e
    }),
    this.player && this.stage.room && this.stage.room.movePlayer({
        i: this.player.playerId,
        x: t,
        y: e
    })
}
,
World.prototype.sendTrigger = function() {
    socket && socket.emit("trigger")
}
,
GameObject.prototype.on = function(t, e) {
    "object" != typeof this._events[t] && (this._events[t] = []),
    this._events[t].push(e)
}
,
GameObject.prototype.emit = function(t) {
    var e, i, o, s = [].slice.call(arguments, 1);
    if ("object" == typeof this._events[t])
        for (o = (i = this._events[t].slice()).length,
        e = 0; e < o; e++)
            i[e].apply(this, s)
}
,
World.prototype = Object.create(GameObject.prototype),
World.prototype.updateData = function(t, e) {
    this.data[t] && (this.data[t] = e),
    "items" == t && (this.itemSS = new createjs.SpriteSheet(this.data.items))
}
,
World.prototype.getData = function(t) {
    return this.data[t]
}
,
World.prototype.getItemData = function(t) {
    return this.data.items.items[t]
}
,
World.prototype.getCritterData = function(t) {
    return findObjectInArray("critterId", t, this.data.critters)
}
,
World.prototype.updatePlayer = function(t) {
    this.player = new Player(t)
}
,
World.prototype.getPlayer = function() {
    return this.player
}
,
World.prototype.handleSocket = function() {
    var e = world.stage;
    socket.on("disconnect", function() {}),
    socket.on("login", function(t) {
        world.handleLogin(t)
    }),
    socket.on("joinRoom", function(t) {
        world.handleJoinRoom(t)
    }),
    socket.on("beep", function(t) {
        e.beep && e.beep.show(t)
    }),
    socket.on("updatePlayer", function(t) {
        world.player.updateData(t)
    }),
    socket.on("A", function(t) {
        e.room && e.room.addPlayer(t)
    }),
    socket.on("R", function(t) {
        e.room && e.room.removePlayer(t)
    }),
    socket.on("G", function(t) {
        e.room && e.room.updatePlayer(t)
    }),
    socket.on("X", function(t) {
        e.room && e.room.movePlayer(t)
    }),
    socket.on("E", function(t) {
        e.room && e.room.addEffect(t)
    }),
    socket.on("M", function(t) {
        world.emit("M", t),
        e.room && e.room.addMessage(t)
    })
}
,
World.prototype.handleLogin = function(t) {
    t.player ? this.updatePlayer(t.player) : this.updatePlayer(t),
    world.data.settings.lobby && world.joinRoom(world.data.settings.lobby)
}
,
World.prototype.handleJoinRoom = function(t) {
    this.room = new Room(t),
    this.stage.addRoom(t),
    this.stage.addMenu(),
    this.stage.addBeep()
}
,
World.prototype.login = function(t) {
    socket.open(),
    socket.emit("login", {
        ticket: t
    })
}
,
World.prototype.logout = function() {
    sessionStorage.clear(),
    socket.disconnect()
}
,
World.prototype.joinRoom = function(t) {
    socket.emit("joinRoom", {
        roomId: t
    })
}
,
World.prototype.sendMessage = function(t) {
    if ("/" === (t = t.trim()).substr(0, 1))
        this.sendCode(t);
    else {
        var e = {
            i: this.player.playerId,
            n: this.player.nickname,
            m: t
        };
        this.emit("M", e),
        this.stage.room.addMessage(e),
        socket.emit("sendMessage", {
            message: t
        })
    }
}
,
World.prototype.sendCode = function(t) {
    var e = t.split(" ")
      , i = e.shift().substr(1).toLowerCase();
    switch (i) {
    case "nicknames":
        this.stage.room.toggleNicknames();
        break;
    case "balloons":
        this.stage.room.toggleBalloons();
        break;
    case "join":
        var o = e[0];
        o && this.joinRoom(o.toLowerCase());
        break;
    case "darkmode":
        toggleDarkmode && toggleDarkmode();
    default:
        socket.emit("code", {
            code: i,
            options: e
        })
    }
}
,
World.prototype.sendMove = function(t, e) {
    socket && socket.emit("click", {
        x: t,
        y: e
    }),
    this.player && this.stage.room && this.stage.room.movePlayer({
        i: this.player.playerId,
        x: t,
        y: e
    })
}
,
World.prototype.sendTrigger = function() {
    socket && socket.emit("trigger")
}
,
Crumb.prototype.get = function(t) {
    return this[t]
}
,
console.info("-----------------------------------"),
console.info("[BOX CRITTERS]"),
console.info("A new world created by RocketSnail"),
console.info("-----------------------------------"),
console.info("https://twitter.com/rocketsnail"),
console.info("https://rocketsnail.com"),
console.info("-----------------------------------"),
Map.prototype.getTile = function(t, e) {
    var i = Math.floor(t / this.tileSize)
      , o = Math.floor(e / this.tileSize);
    if (this.tileMap && this.tileMap[o])
        return this.tileMap[o][i]
}
,
Map.prototype.getTrigger = function(t) {
    if (0 < t)
        return this.triggers[t]
}
,
Map.prototype.getLayer = function(t) {
    var e = this.getTrigger(t);
    return null != e.z ? e.z : 0
}
,
Map.prototype.new = function(t, e) {
    for (var i = Math.floor(t / this.tileSize), o = Math.floor(e / this.tileSize), s = [], a = 0; a < o; a++) {
        s[a] = [];
        for (var r = 0; r < i; r++)
            s[a][r] = 0
    }
    this.tileMap = s
}
,
Player.prototype = Object.create(GameObject.prototype),
Player.prototype.getPlayerId = function() {
    return localStorage.getItem("playerId")
}
,
Player.prototype.getCrumb = function() {
    return {
        i: this.playerId,
        n: this.nickname,
        c: this.critterId
    }
}
,
Player.prototype.updateData = function(t) {
    t.gear && (this.gear = t.gear),
    t.inventory && this.inventory.push(t.inventory),
    t.critterId && (this.critterId = t.critterId),
    t.coins && (this.coins = t.coins)
}
,
Player.prototype.getCoins = function() {
    return this.coins
}
,
Player.prototype.updateCoins = function(t) {
    this.coins = t,
    this.emit("updateCoins", t)
}
,
Player.prototype.updateGear = function(t) {
    socket.emit("updateGear", t)
}
,
Player.prototype.addItem = function(t) {
    var e = this.getItemFromInventory(t);
    e && (this.gear[e.slot] = e.itemId)
}
,
Player.prototype.removeItem = function(t) {
    delete this.gear[t]
}
,
Player.prototype.isItemActive = function(t) {
    for (var e in this.gear)
        if (this.gear[e] == t)
            return !0;
    return !1
}
,
Player.prototype.getItemFromInventory = function(t) {
    for (var e = 0; e < this.inventory.length; e++)
        if (this.inventory[e].itemId == t)
            return this.inventory[e]
}
,
Room.prototype.addPlayer = function(t) {
    var e = t.i;
    this.players[e] || (this.players[e] = t)
}
,
Room.prototype.getPlayer = function(t) {
    return this.players[t]
}
,
Room.prototype.removePlayer = function(t) {
    this.getPlayer(t) && (delete this.players[t],
    this.event.emit("removePlayer", t))
}
,
Room.prototype.updatePlayer = function(t) {}
,
AssetContainer.prototype = Object.create(createjs.Container.prototype),
AssetContainer.prototype.showEdit = function() {
    this.edit.visible = !0;
    var n = this;
    this.on("pressmove", function(t) {
        if (n.edit.visible)
            if (n.editReg)
                ;
            else {
                var e = 1 / world.stage.scaleX
                  , i = 1 / world.stage.scaleY
                  , o = t.stageX * e
                  , s = t.stageY * i
                  , a = Math.floor(o - world.stage.room.x)
                  , r = Math.floor(s - world.stage.room.y);
                n.x = a,
                n.y = r,
                n.data.x = a,
                n.data.y = r
            }
    }),
    this.on("pressup", function(t) {
        n.edit.visible
    })
}
,
BalloonContainer.prototype = Object.create(createjs.Container.prototype),
BalloonContainer.prototype.showMessage = function(t) {
    var e = t.m
      , i = new createjs.Container
      , o = new createjs.Text(e,"12px Arial","#000000");
    o.textAlign = "center",
    o.lineWidth = 100;
    var s = o.getBounds()
      , a = createBalloon(100, s.height);
    i.addChild(a, o),
    i.y = 0 - s.height - 80,
    this.addChild(i);
    a = this;
    setTimeout(function() {
        a.removeChild(i)
    }, 5e3)
}
,
BeepContainer.prototype = Object.create(createjs.Container.prototype),
BeepContainer.prototype.show = function(t) {
    t && t.alert && this.alert(t.alert),
    t && t.news && this.message(t.news),
    t && t.item && this.grant(t.item)
}
,
BeepContainer.prototype.alert = function(t, e) {
    console.info("alert", t);
    var i = new boot.Message({
        text: t
    },{
        style: "warning",
        width: 340,
        height: 100
    });
    i.setTransform(250, 20),
    i.on("click", function() {
        i.close()
    }),
    this.addChild(i)
}
,
BeepContainer.prototype.message = function(t) {
    var e = new boot.Message(t,{
        style: "light"
    });
    e.setTransform(250, 20),
    this.addChild(e),
    e.on("click", function() {
        e.close()
    })
}
,
BeepContainer.prototype.grant = function(t) {
    console.info("grant", t);
    var e = this
      , i = new createjs.Graphics;
    i.beginFill("black"),
    i.drawRect(0, 0, this.width, this.height);
    var o = new createjs.Shape(i);
    o.alpha = .6,
    o.on("click", function() {
        e.removeAllChildren()
    }),
    this.addChild(o);
    var s = new BeepItem(t);
    this.addChild(s.mc)
}
,
CritterContainer.prototype = Object.create(createjs.MovieClip.prototype),
CritterContainer.prototype.addItem = function(t, e) {
    this.removeItem(t),
    this.slots[t] && this.slots[t].addItem(e, this.direction),
    this.backs[t] && this.backs[t].addItem(e, this.direction)
}
,
CritterContainer.prototype.removeItem = function(t) {
    this.slots[t] && this.slots[t].removeItem(),
    this.backs[t] && this.backs[t].removeItem()
}
,
CritterContainer.prototype.updateGear = function(t) {
    for (var e in this.slots)
        this.removeItem(e);
    for (var e in t)
        this.addItem(e, t[e])
}
,
CritterContainer.prototype.updateDirection = function(t) {
    for (var e in void 0 === t && (t = this.direction),
    1 < t && t < 7 ? (this.isForward || (this.isForward = !0,
    this.updateDepth()),
    this.face.sprite.gotoAndStop("face" + t),
    this.face.visible = !0) : (this.isForward && (this.isForward = !1,
    this.updateDepth()),
    this.face.visible = !1),
    this.slots) {
        this.slots[e].updateDirection(t)
    }
    for (var e in this.backs) {
        this.backs[e].updateDirection(t)
    }
    this.skin.sprite.gotoAndStop("body" + t),
    this.hasTail && this.tail.sprite.gotoAndStop("tail" + t),
    this.hasEars && this.ears.sprite.gotoAndStop("ears" + t),
    this.direction = t
}
,
CritterContainer.prototype.updateDepth = function() {
    if (this.isForward)
        var t = this.forward;
    else
        t = this.backward;
    for (var e = 0; e < t.length; e++) {
        var i = t[e];
        this.bodyContainer.setChildIndex(i, e)
    }
}
,
CritterContainer.prototype.updateState = function(t) {
    "move" == t ? (this.state = t,
    this.gotoAndPlay(0)) : (this.state = t,
    this.gotoAndStop(0))
}
,
LayerContainer.prototype = Object.create(createjs.Container.prototype),
LayerContainer.prototype.addSprite = function(t, e) {
    var i = new AssetContainer(t);
    null != t.frame && (o = new createjs.Sprite(this.room.spritesheet)).gotoAndStop(t.frame);
    t.symbol && (o = new createjs.Sprite(this.room.symbols)).gotoAndPlay(t.symbol);
    t.sprite && (o = new createjs.Sprite(this.room.spritesheet)).gotoAndPlay(t.sprite);
    if (t.image)
        var o = new createjs.Bitmap(t.image);
    t.framerate && (o.framerate = t.framerate),
    i.addChild(o, i.edit),
    e.addChild(i)
}
,
LayerContainer.prototype.addGroup = function(t, e) {
    for (var i = new AssetContainer(t), o = t.group.length, s = 0; s < o; s++)
        this.addSprite(t.group[s], i);
    i.addChild(i.edit),
    e.addChild(i)
}
,
LayerContainer.prototype.addEffect = function(t, e, i) {
    if (world.getData("effects").animations[t]) {
        var o = new createjs.Sprite(this.room.effects);
        o.gotoAndPlay(t),
        o.x = e,
        o.y = i,
        o.on("animationend", function(t) {
            t.target.parent.removeChild(o)
        }),
        this.addChild(o)
    }
}
,
LayerContainer.prototype.updateSprite = function(e, i, o) {
    this.children.forEach(function(t) {
        t.name == e && null != t[i] && (t[i] = o)
    })
}
,
MapContainer.prototype = Object.create(createjs.Container.prototype),
MapContainer.prototype.edit = function(t) {
    this.removeAllChildren(),
    this.activeTile = t;
    for (var e = this.data.tileMap, i = 0; i < e.length; i++)
        for (var o = 0; o < e[i].length; o++)
            this.addTile(o, i, e[i][o])
}
,
MapContainer.prototype.addTile = function(t, e, i) {
    var o = new createjs.Graphics;
    o.beginStroke("white").beginFill(this.fills[i]).drawRect(0, 0, this.data.tileSize, this.data.tileSize);
    var s = new createjs.Shape(o);
    s.setTransform(t * this.data.tileSize, e * this.data.tileSize),
    s.alpha = .4;
    var a = this;
    s.on("click", function() {
        a.removeChild(this),
        a.addTile(t, e, a.activeTile)
    }),
    a.data.tileMap[e][t] = i,
    a.addChild(s)
}
,
MascotContainer.prototype = Object.create(createjs.MovieClip.prototype),
MascotContainer.prototype.updateDirection = function(t) {
    void 0 === t ? t = this.currentDirection : this.currentDirection = t,
    this.sprite.gotoAndPlay("wait" + t)
}
,
MascotContainer.prototype.addItem = function() {}
,
MascotContainer.prototype.removeItem = function() {}
,
MascotContainer.prototype.updateGear = function() {}
,
MascotContainer.prototype.updateState = function(t) {
    "move" == t ? this.sprite.gotoAndPlay("move" + this.currentDirection) : this.updateDirection()
}
,
MenuContainer.prototype = Object.create(createjs.Container.prototype),
MonsterContainer.prototype = Object.create(createjs.MovieClip.prototype),
MonsterContainer.prototype.updateDirection = function(t) {
    void 0 === t ? t = this.currentDirection : this.currentDirection = t,
    this.sprite.gotoAndStop("wait" + t)
}
,
MonsterContainer.prototype.addItem = function() {}
,
MonsterContainer.prototype.removeItem = function() {}
,
MonsterContainer.prototype.updateGear = function() {}
,
MonsterContainer.prototype.updateState = function(t) {
    "move" == t ? this.sprite.gotoAndPlay("move" + this.currentDirection) : this.updateDirection()
}
,
MonsterContainer.prototype.remove = function() {
    this.sprite.gotoAndPlay("done")
}
,
NicknameContainer.prototype = Object.create(createjs.Container.prototype),
PlayerContainer.prototype = Object.create(createjs.Container.prototype),
PlayerContainer.prototype.updateDirection = function(t) {
    this.direction = t,
    this.critter.updateDirection(t)
}
,
PlayerContainer.prototype.updateRotation = function(t) {
    this.character.rotation = t
}
,
PlayerContainer.prototype.updateState = function(t) {
    this.critter.updateState(t)
}
,
PlayerContainer.prototype.updateGear = function(t) {
    this.critter.updateGear(t)
}
,
PlayerContainer.prototype.updateLayer = function(t) {
    this.z = t
}
,
PlayerContainer.prototype.remove = function() {
    this.parent.removeChild(this)
}
,
PlayerContainer.prototype.moveTo = function(t, e, i) {
    if (!this.isMoving || this.targetX != t || this.targetY != e) {
        void 0 === i && (i = Math.floor(calculateAngle(this.x, this.y, t, e))),
        this.isMoving = !0,
        this.targetX = t,
        this.targetY = e;
        var o = findDirection(i);
        this.updateDirection(o),
        this.updateState("move");
        var s = calculateDistance(this.x, this.y, t, e) * this.speed
          , a = this;
        this.tween = createjs.Tween.get(this, {
            override: !0
        }).to({
            x: t,
            y: e
        }, s, createjs.Ease.linear).call(function() {
            this.isMoving = !1,
            this.updateState("wait"),
            this.nickname.x = this.x,
            this.nickname.y = this.y,
            this.balloon.x = this.x,
            this.balloon.y = this.y,
            a.handleStop()
        }).addEventListener("change", function() {
            a.nickname.x = a.x,
            a.nickname.y = a.y,
            a.balloon.x = a.x,
            a.balloon.y = a.y,
            a.handleMove()
        })
    }
}
,
Player.prototype.handleMove = function() {}
,
Player.prototype.handleStop = function() {}
;
var artwork = artwork || {};
function RoomContainer(t) {
    if (createjs.Container.call(this),
    this.data = t,
    this.name = t.name,
    this.width = t.width,
    this.height = t.height,
    this.scaleX = 1,
    this.scaleY = 1,
    this.maxLayer = 0,
    this.startx = t.startx || Math.floor(this.width / 2),
    this.starty = t.starty || Math.floor(this.height / 2),
    this.startz = t.startz || 0,
    this.focusX = 0,
    this.focusY = 0,
    this.layers = [],
    this.foreground = new createjs.Container,
    this.playground = new createjs.Container,
    this.background = new createjs.Container,
    this.addChild(this.background),
    this.addChild(this.playground),
    this.addChild(this.foreground),
    this.balloons = new createjs.Container,
    this.nicknames = new createjs.Container,
    this.addChild(this.nicknames),
    this.addChild(this.balloons),
    this.map = new MapContainer(t.map),
    this.addChild(this.map),
    t.background && this.addBackground(t.background),
    t.foreground && this.addForeground(t.foreground),
    world.data && world.data.symbols && (this.symbols = new createjs.SpriteSheet(world.getData("symbols"))),
    world.data && world.data.effects && (this.effects = new createjs.SpriteSheet(world.getData("effects"))),
    this.spritesheet = new createjs.SpriteSheet(t.spritesheet),
    t.layers && this.addLayers(t.layers),
    this.players = {},
    this.background.on("click", function(t) {
        var e = Math.floor(t.localX)
          , i = Math.floor(t.localY);
        world.sendMove(e, i)
    }),
    t.players)
        for (var e = t.players.length, i = 0; i < e; i++)
            this.addPlayer(t.players[i]);
    "small" == world.settings.view ? this.zoom(1.5) : this.zoom(1)
}
function SlotContainer(t) {
    createjs.Container.call(this),
    this.type = t || "front"
}
function StageContainer(t, e) {
    createjs.Stage.call(this, t),
    this.width = 850,
    this.height = 480,
    this.room,
    this.menu,
    this.gear,
    this.beep;
    var i = this;
    createjs.Ticker.framerate = 60,
    createjs.Ticker.on("tick", function(t) {
        i.update(t)
    })
}
artwork.edit = new createjs.Bitmap("/media/ui/edit_btn.png").setTransform(-10, -10, .5, .5),
artwork.crosshair = new createjs.Shape((new createjs.Graphics).setStrokeStyle(1).beginStroke("black").moveTo(-10, 0).lineTo(10, 0).moveTo(0, -10).lineTo(0, 10)),
RoomContainer.prototype = Object.create(createjs.Container.prototype),
RoomContainer.prototype.addBackground = function(t) {
    var e = new createjs.Bitmap(t);
    e.hitArea = new createjs.Shape((new createjs.Graphics).f("#FF0000").drawRect(0, 0, this.width, this.height)),
    this.background.addChild(e)
}
,
RoomContainer.prototype.addForeground = function(t) {
    var e = new createjs.Bitmap(t);
    e.hitArea = new createjs.Shape((new createjs.Graphics).f("#FF0000").drawRect(0, 0, 0, 0)),
    this.foreground.addChild(e)
}
,
RoomContainer.prototype.addLayers = function(t) {
    this.layers = [];
    for (var e = 0; e < t.length; e++) {
        var i = new LayerContainer(e,this,t[e]);
        this.playground.addChild(i),
        this.layers[e] = i,
        this.maxLayer = e
    }
}
,
RoomContainer.prototype.addEffect = function(t) {
    this.layers[t.z] && this.layers[t.z].addEffect(t.e, t.x, t.y)
}
,
RoomContainer.prototype.addPlayer = function(t) {
    var e = t.i;
    if (t.x = t.x || this.startx,
    t.y = t.y || this.starty,
    t.z = t.z || this.startz,
    null == this.players[e]) {
        if (world.player.playerId == e)
            var i = !0;
        else
            i = !1;
        var o = new PlayerContainer(t,i);
        this.layers[o.z].addChild(o),
        (this.players[e] = o).balloon = new BalloonContainer(t),
        this.balloons.addChild(o.balloon),
        o.nickname = new NicknameContainer(t),
        this.nicknames.addChild(o.nickname),
        o.isLocal && this.focus(o.x, o.y - 80);
        var s = this;
        o.handleMove = function() {
            this.isLocal && s.focus(this.x, this.y - 80);
            var t = world.room.map.getTile(this.x, this.y);
            if (this.currentTile != t) {
                this.currentTile = t;
                var e = world.room.map.getTrigger(t);
                e && (e.z != this.z && (this.updateLayer(e.z),
                s.swapLayer(this, e.z)),
                this.isLocal && e.hide && s.hideSprites(e.hide),
                this.isLocal && e.show && s.showSprites(e.show))
            }
            var i = t - 1;
            0 < t && i <= s.maxLayer && this.z != i && (this.updateLayer(i),
            s.swapLayer(this, i))
        }
        ,
        o.handleStop = function() {
            this.isLocal && (s.focus(this.x, this.y),
            world.sendTrigger({
                x: this.x,
                y: this.y
            }))
        }
    }
}
,
RoomContainer.prototype.getPlayer = function(t) {
    return this.players[t]
}
,
RoomContainer.prototype.removePlayer = function(t) {
    var e = t.i
      , i = this.getPlayer(e);
    i && (this.balloons.removeChild(i.balloon),
    this.nicknames.removeChild(i.nickname),
    i.remove(),
    delete this.players[e])
}
,
RoomContainer.prototype.updatePlayer = function(t) {
    var e = this.getPlayer(t.i);
    e && t.g && e.updateGear(t.g)
}
,
RoomContainer.prototype.getLayer = function(t) {
    return this.layers[t]
}
,
RoomContainer.prototype.swapLayer = function(t, e) {
    var i = this.getLayer(e);
    i && i.addChild(t)
}
,
RoomContainer.prototype.addMessage = function(t) {
    var e = this.getPlayer(t.i);
    e && e.balloon.showMessage(t)
}
,
RoomContainer.prototype.movePlayer = function(t) {
    var e = this.getPlayer(t.i);
    e && e.moveTo(t.x, t.y, t.r)
}
,
RoomContainer.prototype.addAnimations = function() {
    var t = this.data.spritesheet.animations;
    for (var e in t)
        this.layers[0].addSprite({
            sprite: e,
            x: this.startx,
            y: this.starty
        }, this.layers[0])
}
,
RoomContainer.prototype.hideSprites = function(t) {
    if (t) {
        var i = this.layers;
        t.forEach(function(e) {
            i.forEach(function(t) {
                t.updateSprite(e, "visible", !1)
            })
        })
    }
}
,
RoomContainer.prototype.showSprites = function(t) {
    if (t) {
        var i = this.layers;
        t.forEach(function(e) {
            i.forEach(function(t) {
                t.updateSprite(e, "visible", !0)
            })
        })
    }
}
,
RoomContainer.prototype.focus = function(t, e) {
    t = t || this.focusX,
    e = e || this.focusY;
    var i = t * this.scaleX
      , o = e * this.scaleY
      , s = world.stage
      , a = s.width / 2
      , r = s.height / 2
      , n = this.width * this.scaleX
      , h = this.height * this.scaleY;
    n > s.width ? this.x = a < i ? i < n - a ? a - i : s.width - n : 0 : this.x = 0,
    h > s.height ? this.y = r < o ? o < h - r ? r - o : s.height - h : 0 : this.y = 0,
    this.focusX = t,
    this.focusY = e
}
,
RoomContainer.prototype.zoom = function(t) {
    this.scaleX = t,
    this.scaleY = t,
    this.focus()
}
,
RoomContainer.prototype.toggleNicknames = function() {
    this.nicknames.visible ? this.nicknames.visible = !1 : this.nicknames.visible = !0
}
,
RoomContainer.prototype.toggleBalloons = function() {
    this.balloons.visible ? this.balloons.visible = !1 : this.balloons.visible = !0
}
,
RoomContainer.prototype.edit = function() {
    this.layers.forEach(function(t) {
        t.children.forEach(function(t) {
            t.edit && t.showEdit()
        })
    })
}
,
SlotContainer.prototype = Object.create(createjs.Container.prototype),
SlotContainer.prototype.addItem = function(t, e) {
    var i = world.getItemData(t);
    i ? i && i[this.type] && (this.removeItem(),
    this.item = i,
    this.sprite = new createjs.Sprite(world.itemSS,0),
    this.addChild(this.sprite),
    this.updateDirection(e)) : console.error("Item not found", t)
}
,
SlotContainer.prototype.removeItem = function() {
    this.removeAllChildren(),
    delete this.item,
    delete this.sprite
}
,
SlotContainer.prototype.updateDirection = function(t) {
    if (this.sprite && this.item[this.type])
        if (0 < this.item[this.type][t]) {
            var e = this.item[this.type][t];
            this.sprite.gotoAndStop(e),
            this.visible = !0
        } else
            this.sprite.gotoAndStop(0),
            this.visible = !1
}
,
StageContainer.prototype = Object.create(createjs.Stage.prototype),
StageContainer.prototype.addRoom = function(t) {
    this.removeChild(this.room),
    this.room = new RoomContainer(t),
    this.addChild(this.room)
}
,
StageContainer.prototype.addMenu = function(t) {
    this.removeChild(this.menu),
    this.menu = new MenuContainer(t),
    this.addChild(this.menu)
}
,
StageContainer.prototype.addBeep = function(t) {
    this.removeChild(this.beep),
    this.beep = new BeepContainer(850,480),
    this.addChild(this.beep)
}
;
var uxData = {
    images: ["/media/ux/ux.png"],
    frames: [[1, 1, 85, 108, 0, 0, 0], [1, 111, 104, 86, 0, 0, 0], [88, 1, 84, 84, 0, 0, 0], [107, 87, 84, 84, 0, 0, 0], [107, 173, 40, 40, 0, 0, 0], [149, 173, 40, 40, 0, 0, 0]],
    animations: {
        stats: {
            frames: [0]
        },
        box: {
            frames: [1]
        },
        item_active: {
            frames: [2]
        },
        item: {
            frames: [3]
        },
        close: {
            frames: [4]
        },
        open_btn: {
            frames: [5]
        }
    }
}
  , uxSS = new createjs.SpriteSheet(uxData);
function Inventory(e) {
    createjs.Container.call(this);
    var i = this;
    this.player = e;
    var t = new Background
      , o = new CritterContainer(e.critterId);
    o.setTransform(660, 140);
    for (var s = [], a = {}, r = e.inventory.length, n = 0; n < r; n++) {
        var h = e.inventory[n]
          , c = new boot.Item("/media/icons/" + h.itemId + ".png");
        c.data = h,
        e.gear[h.slot] == h.itemId && (a[h.slot] = c,
        o.addItem(h.slot, h.itemId),
        c.setActive(!0)),
        c.click(function() {
            var t = this.data.slot;
            this.isActive ? (o.removeItem(t),
            delete a[t],
            this.setActive(!1)) : (o.addItem(t, this.data.itemId),
            a[t] && a[t].setActive(!1),
            (a[t] = this).setActive(!0))
        }),
        s.push(c)
    }
    var l = new boot.Grid(600,400,6,4,s);
    l.setTransform(20, 20);
    var d = new boot.Icon("close");
    d.setTransform(790, 20),
    d.click(function() {
        for (var t in e.gear = {},
        a)
            e.gear[t] = a[t].data.itemId;
        world.player.updateGear(e.gear),
        i.close()
    });
    var p = new boot.Button("Next Page");
    p.setTransform(140, 420),
    p.click(function() {
        l.nextPage()
    });
    var f = new boot.Button("Last Page");
    f.setTransform(20, 420),
    f.click(function() {
        l.lastPage()
    }),
    this.addChild(t, l, o, p, f, d)
}
function Background() {
    createjs.Container.call(this);
    var t = new createjs.Graphics;
    t.beginFill("black"),
    t.drawRect(0, 0, 850, 480);
    var e = new createjs.Shape(t);
    e.alpha = .6,
    e.on("click", function() {}),
    this.addChild(e)
}
function CoinsWidget() {
    createjs.Container.call(this);
    var t = world.player.getCoins()
      , e = new createjs.Bitmap("/media/ui/coins_background.png")
      , i = new createjs.Text(t,"60px Luckiest Guy","#FFC636");
    i.setTransform(100, 32),
    this.addChild(e, i),
    world.player.on("updateCoins", function(t) {
        i.text = t
    })
}
function Beep(t, e) {
    createjs.Container.call(this),
    this.width = t || 850,
    this.height = t || 480,
    this.addChild(this.messages, this.screens)
}
Inventory.prototype = Object.create(createjs.Container.prototype),
Inventory.prototype.close = function() {
    this.parent.removeChild(this)
}
,
Background.prototype = Object.create(createjs.Container.prototype),
CoinsWidget.prototype = Object.create(createjs.Container.prototype),
Beep.prototype = Object.create(createjs.Container.prototype),
Beep.prototype.handleSocket = function(t) {
    t.on("beep", function(t) {
        t.warn && this.addMessage(t.warn),
        t.item && this.addItem(t.item),
        t.message && this.addMessage(t.message)
    })
}
,
Beep.prototype.addMessage = function(t) {
    var e = new boot.Message(t);
    e.center(this),
    e.y = 20,
    e.click(function() {
        this.close()
    }),
    this.addChild(e)
}
,
Beep.prototype.showScreen = function(t) {
    this.removeAllChildren();
    var e = this
      , i = new boot.Background(this);
    i.click(function() {
        e.removeAllChildern()
    }),
    this.addChild(i)
}
;
var boot = boot || {};
!function() {
    function t() {
        createjs.Container.call(this),
        this.dropzone = !1,
        this.draggable = !1,
        this.isDragged = !1,
        this.drag = {
            offsetX: 0,
            offsetY: 0,
            startParent: this.parent,
            startX: 0,
            startY: 0
        },
        this.on("pressmove", this.handleDrag),
        this.on("pressup", this.handleDrop)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).handleDrag = function(t) {
        this.draggable && (this.isDragged || (this.isDragged = !0,
        this.drag.startParent = this.parent,
        this.drag.startX = this.x,
        this.drag.startY = this.y,
        this.drag.offsetX = Math.floor(t.localX),
        this.drag.offsetY = Math.floor(t.localY),
        this.stage.addChild(this),
        this.dispatchEvent("drag")),
        this.x = t.stageX - this.drag.offsetX,
        this.y = t.stageY - this.drag.offsetY)
    }
    ,
    t.prototype.handleDrop = function(t) {
        if (this.draggable && this.isDragged) {
            this.dispatchEvent("drop");
            for (var e = this.stage.getObjectsUnderPoint(this.x, this.y), i = e.length, o = 0; o < i; o++)
                if (e[o].parent.dropzone) {
                    e[o].parent.dispatchEvent("drop");
                    break
                }
            this.drag.startParent.addChild(this),
            this.x = this.drag.startX,
            this.y = this.drag.startY,
            this.isDragged = !1,
            this.dispatchEvent("drop")
        }
    }
    ,
    boot.Container = t
}(),
(boot = boot || {}).Data = function(t, e) {
    if ("string" == typeof t)
        var i = {
            text: t
        };
    else
        i = t;
    return t.style ? i.style = new boot.Style(t.style) : i.style = new boot.Style(e),
    i
}
;
boot = boot || {};
!function() {
    function t(t) {
        createjs.Container.call(this),
        this.background = new createjs.Sprite(uxSS,"item"),
        this.icon = new createjs.Bitmap(t),
        this.icon.setTransform(2, 2, .5, .5),
        this.isActive = !1,
        this.addChild(this.background, this.icon)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).click = function(t) {
        this.on("click", t)
    }
    ,
    t.prototype.setActive = function(t) {
        t ? (this.background.gotoAndStop("item_active"),
        this.isActive = !0) : (this.background.gotoAndStop("item"),
        this.isActive = !1)
    }
    ,
    boot.Item = t
}();
boot = boot || {};
!function() {
    var e = {
        primary: {
            fill: "#007bff",
            text: "#ffffff"
        },
        secondary: {
            fill: "#6c757d",
            text: "#ffffff"
        },
        success: {
            fill: "#28a745",
            text: "#ffffff"
        },
        warning: {
            fill: "#ffc107",
            text: "#212529"
        },
        danger: {
            fill: "#dc3545",
            text: "#ffffff"
        },
        light: {
            fill: "#f8f9fa",
            text: "#212529"
        },
        dark: {
            fill: "#343a40",
            text: "#ffffff"
        }
    }
      , i = {
        sm: {
            font_size: .875,
            mx: .5,
            my: .5
        },
        md: {
            font_size: 1,
            mx: 1,
            my: .625
        },
        lg: {
            font_size: 1.25,
            mx: 1.25,
            my: .75
        }
    };
    boot.Style = function(t) {
        t ? "string" == typeof t && (t = {
            theme: t
        }) : t = {},
        this.theme = t.theme || "primary",
        this.size = t.size || "md",
        this.base = t.base || 16,
        this.radius = .25 * this.base,
        this.font_size = i[this.size].font_size * this.base,
        this.font_family = "Arial",
        this.font = this.font_size + "px " + this.font_family,
        this.colour = t.colour || e[this.theme].text,
        this.fill = t.fill || e[this.theme].fill,
        this.mx = t.mx || i[this.size].mx * this.font_size,
        this.my = t.my || i[this.size].my * this.font_size
    }
}();
boot = boot || {};
!function() {
    function t(t) {
        createjs.Container.call(this);
        var e = t.width
          , i = t.height
          , o = new createjs.Graphics;
        o.beginFill("black"),
        o.drawRect(0, 0, e, i);
        var s = new createjs.Shape(o);
        s.alpha = .6,
        s.on("click", function() {}),
        this.addChild(s)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).click = function(t) {
        this.on("click", t)
    }
    ,
    boot.Background = t
}();
boot = boot || {};
!function() {
    function t(t, e) {
        createjs.Container.call(this);
        var i = (t = new boot.Data(t,e)).text
          , o = t.style.font
          , s = t.style.font_size
          , a = t.style.colour
          , r = t.style.fill
          , n = t.style.radius
          , h = t.style.mx
          , c = t.style.my
          , l = new createjs.Text(i,o,a);
        l.textBaseline = "middle",
        l.x = h,
        l.y = c + s / 2 + 2,
        l.snapToPixel = !0;
        var d = l.getBounds()
          , p = Math.floor(d.width) + 2 * h
          , f = s + 2 * c
          , y = new createjs.Shape;
        y.graphics.beginFill(r).drawRoundRect(0, 0, p, f, n),
        this.addChild(y, l),
        this.setBounds(0, 0, p, f)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).click = function(t) {
        this.on("click", t)
    }
    ,
    boot.Button = t
}();
boot = boot || {};
!function() {
    function t(t) {
        boot.Container.call(this);
        var e = new createjs.Bitmap("/media/cards/spiral_bg.png");
        e.setTransform(10, 10),
        this.addChild(e);
        var i = new createjs.Bitmap("/media/icons/viking.png");
        i.setTransform(20, 20),
        this.addChild(i);
        var o = new createjs.Bitmap("/media/cards/card_common.png");
        this.addChild(o);
        var s = new createjs.Text("Viking Helmet","20px Luckiest Guy","black");
        s.textAlign = "center",
        s.setTransform(100, 200),
        this.addChild(s);
        var a = new createjs.Text("Description goes here","12px Arial","black");
        a.textAlign = "center",
        a.setTransform(100, 220),
        this.addChild(a)
    }
    (t.prototype = Object.create(boot.Container.prototype)).click = function(t) {
        this.on("click", t)
    }
    ,
    boot.Card = t
}();
boot = boot || {};
!function() {
    function t() {
        createjs.Container.call(this);
        var t = new createjs.Bitmap("/media/ui/close_btn.png");
        t.setTransform(0, 0, .5, .5),
        this.addChild(t)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).click = function(t, e) {
        e = e || this;
        this.on("click", t.bind(e))
    }
    ,
    boot.Close = t
}();
boot = boot || {};
!function() {
    function t(t) {
        createjs.Container.call(this);
        var e = new createjs.Shape;
        e.graphics.beginFill("green").drawRoundRect(0, 0, 200, 200, 5),
        this.addChild(e)
    }
    t.prototype = Object.create(createjs.Container.prototype),
    boot.Dropzone = t
}();
boot = boot || {};
!function() {
    function t(t, e, i, o, s) {
        createjs.Container.call(this),
        this.setBounds(2, 2, t, e),
        this.width = t,
        this.height = e,
        this.columns = i,
        this.rows = o,
        this.tileWidth = Math.floor(t / i),
        this.tileHeight = Math.floor(e / o),
        this.lastTileX = 0,
        this.lastTileY = 0,
        this.maxItems = this.columns * this.rows,
        this.currentPage = 0,
        s && Array.isArray(s) ? (this.list = s,
        this.update()) : this.list = []
    }
    (t.prototype = Object.create(createjs.Container.prototype)).update = function(t) {
        this.removeAllChildren();
        for (var e = t || 0, i = 0; i < this.rows; i++)
            for (var o = 0; o < this.columns; o++) {
                var s = this.list[e];
                s && (s.x = o * this.tileWidth,
                s.y = i * this.tileHeight,
                this.addChild(s),
                this.lastTileX = o,
                this.lastTileY = i),
                e++
            }
    }
    ,
    t.prototype.updateList = function(t) {
        this.list = t,
        this.update(this.currentPage * this.maxItems)
    }
    ,
    t.prototype.addItem = function(t) {
        this.list.push(t),
        this.update(this.currentPage * this.maxItems)
    }
    ,
    t.prototype.nextPage = function() {
        var t = Math.floor(this.list.length / this.maxItems)
          , e = this.currentPage + 1;
        e <= t && (this.currentPage = e,
        this.update(e * this.maxItems))
    }
    ,
    t.prototype.lastPage = function() {
        var t = this.currentPage - 1;
        0 <= t && (this.currentPage = t,
        this.update(t * this.maxItems))
    }
    ,
    boot.Grid = t
}();
boot = boot || {};
!function() {
    function t(t) {
        createjs.Container.call(this);
        var e = new createjs.Sprite(uxSS,t);
        this.addChild(e)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).click = function(t) {
        this.on("click", t)
    }
    ,
    boot.Icon = t
}();
boot = boot || {};
!function() {
    function t(t, e, i) {
        createjs.Container.call(this),
        this.setBounds(2, 2, t, e),
        this.width = t,
        this.height = e,
        this.gutter = i || 10,
        this.nextY = 0
    }
    (t.prototype = Object.create(createjs.Container.prototype)).addItem = function(t) {
        t.y = this.nextY,
        t.on("removed", this.update, this),
        this.addChild(t),
        this.nextY += t.height + 10
    }
    ,
    t.prototype.update = function() {
        this.nextY = 0,
        this.children.forEach(function(t) {
            t.y = this.nextY,
            this.nextY += t.height + 10
        }, this)
    }
    ,
    boot.List = t
}();
boot = boot || {};
!function() {
    function t(t, e) {
        boot.Container.call(this);
        e = (t = new boot.Data(t,e || "light")).style;
        this.height = 20;
        if (t.name ? this.name = t.name : this.name = "message",
        t.title) {
            var i = new createjs.Text(t.title,"24px Luckiest Guy",e.colour);
            i.snapToPixel = !0,
            i.setTransform(20, 20),
            i.lineWidth = 300,
            this.addChild(i),
            this.height += 34
        }
        if (t.image) {
            var o = new createjs.Bitmap(t.image);
            o.setTransform(20, height, .5, .5),
            this.addChild(o),
            this.height += 330
        }
        if (t.text) {
            var s = new createjs.Text(t.text,e.font,e.colour);
            s.snapToPixel = !0,
            s.setTransform(20, this.height),
            s.lineWidth = 300;
            var a = s.getBounds();
            this.height += a.height,
            this.addChild(s)
        }
        this.height += 20;
        var r = new createjs.Shape;
        r.graphics.beginFill(e.fill).drawRoundRect(0, 0, 360, this.height, 4),
        r.shadow = new createjs.Shadow("rgba(0, 0, 0, 0.8)",0,2,4),
        this.addChildAt(r, 0);
        var n = new boot.Close;
        n.setTransform(330, 10),
        n.click(this.close, this),
        this.addChild(n)
    }
    (t.prototype = Object.create(boot.Container.prototype)).center = function(t) {
        var e = t.width;
        t.height;
        this.x = e / 2 - 180
    }
    ,
    t.prototype.click = function(t) {
        this.on("click", t)
    }
    ,
    t.prototype.close = function() {
        this.parent.removeChild(this)
    }
    ,
    boot.Message = t
}();
boot = boot || {};
!function() {
    function t(t) {
        createjs.Container.call(this);
        var e = (t = new boot.Style(t)).width || 200
          , i = t.height || t.base
          , o = t.radius
          , s = new createjs.Shape;
        s.graphics.beginFill("#f8f9fa").drawRoundRect(0, 0, e, i, o);
        var a = new createjs.Shape;
        a.graphics.beginFill(t.fill).drawRect(0, 0, e, i),
        a.mask = s,
        a.scaleX = 0,
        this.mc = a,
        this.addChild(s, a)
    }
    (t.prototype = Object.create(createjs.Container.prototype)).update = function(t) {
        var e = t / 100;
        this.mc.scaleX = e
    }
    ,
    t.prototype.center = function() {}
    ,
    boot.ProgressBar = t
}();
boot = boot || {};
!function() {
    function t(t) {
        createjs.Container.call(this),
        this.width = 480,
        this.height = 480;
        var e = new createjs.Graphics;
        e.setStrokeStyle(2).beginStroke("black"),
        e.drawRect(0, 0, this.width, this.height);
        var i = new createjs.Shape(e);
        this.addChild(i);
        var o = this;
        t.forEach(function(t) {
            if ("button" == t.type) {
                var e = new boot.Button(t.data.name,t.style);
                e.setTransform(t.x, t.y),
                o.addChild(e),
                e.click(function() {})
            }
            var i;
            "message" == t.type && ((i = new boot.Message(t.data,t.style)).setTransform(t.x, t.y),
            o.addChild(i));
            "alert" == t.type && ((i = new boot.Message(t.data,{
                theme: "warning"
            })).setTransform(t.x, t.y),
            o.addChild(i))
        })
    }
    t.prototype = Object.create(createjs.Container.prototype),
    boot.Screen = t
}();
