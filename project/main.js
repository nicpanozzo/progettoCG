let canvas = document.getElementById("canvas");

let gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported!");
    throw new Error("WebGL not supported!");
}
if (!gl.getExtension('WEBGL_depth_texture')) {
    throw new Error('need WEBGL_depth_texture');
}
// gl.enable(gl.DEPTH_TEST);

let program = webglUtils.createProgramInfo(gl, ["base-vertex-shader", "base-fragment-shader"]);

let blurProgram = webglUtils.createProgramInfo(gl, ["blur-vertex-shader", "blur-fragment-shader"]);

let poschess = [1,1,2.5];


//light used for the room
let light = {
    posLightOff : [16,5,6],
    dirLightOff : [1,0,2],
    posLightOn : [0,8,0],
    dirLightOn : [0.4,0.9,.1],
    position: [0,8.8,0],
    direction : [-1,1,0],//[4,1,0.2],
    color : [.90, .90, 1.0],
};

//insert object
let obj_list = [];
let always_on_obj = [];
let outside_obj = [];
let transparent_obj = [];

let bed = []
bed.path = "./obj/bed/bed.obj"
bed.mtl = "./obj/bed/bed.mtl"
bed.position = [0, 0, 1]

let glass = []
glass.path = "./obj/glass/glass.obj"
glass.mtl = "./obj/glass/glass.mtl"
glass.position = [0, 0, 0]

let room = []
// room.path = "./obj/room/room.obj"
// room.mtl = "./obj/room/room.mtl"
// room.position = [0, 0, 0]
room.path = "./obj/myroom/myroom.obj"
room.mtl = "./obj/myroom/myroom.mtl"
room.position = [0, 0, 0]

let chessset = []
chessset.path = "./obj/chessset/chessset.obj"
chessset.mtl = "./obj/chessset/chessset.mtl"
chessset.position = poschess //[0, 0, 1]

let woodentable = []
woodentable.path = "./obj/woodentable/woodentable.obj"
woodentable.mtl = "./obj/woodentable/woodentable.mtl"
woodentable.position = [1,1,0] //[0, 0, 1]
// woodentable.rotate = true;  
    

let brain = []
brain.path = "./obj/brain/brain.obj"
brain.mtl = "./obj/brain/brain.mtl"
brain.position = [0, 0, 4]
brain.vrotate = true;

let lancettedx = []
lancettedx.path = "./obj/lancettedx/lancettedx.obj"
lancettedx.mtl = "./obj/lancettedx/lancettedx.mtl"
lancettedx.position = [0, 0, 0]
lancettedx.vrotate = -0.042;

let lancettadxL = []
lancettadxL.path = "./obj/lancettadxL/lancettadxL.obj"
lancettadxL.mtl = "./obj/lancettadxL/lancettadxL.mtl"
lancettadxL.position = [0, 0, 0]
lancettadxL.vrotate = -0.5;

let orologio = []
orologio.path = "./obj/orologio/orologio.obj"
orologio.mtl = "./obj/orologio/orologio.mtl"
orologio.position = [0, 0, 0]
// orologio.rotate = true;

let chessclock = []
chessclock.path = "./obj/chessclock/chessclock.obj"
chessclock.mtl = "./obj/chessclock/chessclock.mtl"
chessclock.position = [0, 0, 0]

let lamp = []
lamp.path = "./obj/lamp/lamp.obj"
lamp.mtl = "./obj/lamp/lamp.mtl"
lamp.position = [1, 0, 0]


let lampada = []
lampada.path = "./obj/lampada/lampada.obj"
lampada.mtl = "./obj/lampada/lampada.mtl"
lampada.position = [0, 0, 0]


let calendario = []
calendario.path = "./obj/calendario/calendario.obj"
calendario.mtl = "./obj/calendario/calendario.mtl"
calendario.position = [0, 0, 0]

let cestino = []
cestino.path = "./obj/cestino/cestino.obj"
cestino.mtl = "./obj/cestino/cestino.mtl"
cestino.position = [0, 0, 0]

let portaOggetti = []
portaOggetti.path = "./obj/portaOggetti/portaOggetti.obj"
portaOggetti.mtl = "./obj/portaOggetti/portaOggetti.mtl"
portaOggetti.position = [0, 0, 0]

let bookshelf = []
bookshelf.path = "./obj/bookshelf/bookshelf_random.obj"
bookshelf.mtl = "./obj/bookshelf/bookshelf_random.mtl"
bookshelf.position = [0, 0, 0]

let paintigs = []
paintigs.path = "./obj/paintings/paintings.obj"
paintigs.mtl = "./obj/paintings/paintings.mtl"
paintigs.position = [0, 0, 0]

let esterni = []
esterni.path = "./obj/esterni/esterni.obj"
esterni.mtl = "./obj/esterni/esterni.mtl"
esterni.position = [0, 0, 0]

// obj_list.push(bed);
obj_list.push(room);
// obj_list.push(chessset);
obj_list.push(woodentable);
// obj_list.push(brain);
obj_list.push(lancettedx);
obj_list.push(lancettadxL);
transparent_obj.push(glass);
// obj_list.push(orologio);
// obj_list.push(lampadario);
// obj_list.push(calendario);
// obj_list.push(lamp);
// obj_list.push(cestino);
obj_list.push(bookshelf);
obj_list.push(chessclock);
obj_list.push(paintigs);

always_on_obj.push(lampada);
outside_obj.push(esterni);

let scene = new Room(obj_list,always_on_obj,outside_obj, transparent_obj);
window.addEventListener('keydown', (e) => {scene.keys[e.key] = true;});
window.addEventListener('keyup', (e) => {scene.keys[e.key] = false;});

mouse = [];
function mouseDown(e) {
    mouse.drag = true;
    mouse.old_x = e.pageX;
    mouse.old_y = e.pageY;
    e.preventDefault();
}
function mouseUp(){
    mouse.drag=false;
}

function mouseMove(e) {
    if (!mouse.drag){
        return false;
    }
    let dX=-(e.pageX-mouse.old_x)*2*Math.PI/canvas.width;
    scene.camera.rotate(-dX * 0.2);
    let dY=-(e.pageY-mouse.old_y)*2*Math.PI/canvas.height;
    scene.camera.rotateUp(-dY * 0.2);

    mouse.old_x=e.pageX;
    mouse.old_y=e.pageY;
    e.preventDefault();
}

canvas.addEventListener('touchstart',mouseDown,false);
canvas.addEventListener('touchmove',mouseMove,false);
canvas.addEventListener('touchend',mouseUp,false);
canvas.addEventListener('touchend',mouseUp,false);
canvas.addEventListener('mouseout',mouseUp,false);
canvas.onmousedown=mouseDown;
canvas.onmouseup=mouseUp;
canvas.mouseout=mouseUp;
canvas.onmousemove=mouseMove;


// check changes on radio buttons
$('input[type=radio][name=shadows]').change(function() {
    scene.shadows.enable = this.value;
    console.log(scene.shadows.enable);
    // if (this.value == 'allot') {
    //     // ...
    // }
    // else if (this.value == 'transfer') {
    //     // ...
    // }
});

// Canvas 2d context
let cameraCanvas = document.getElementById('canvas2d');
ctx = cameraCanvas.getContext('2d');

let cameraColumn = document.getElementById('canvas_column');
let width = cameraColumn.getBoundingClientRect().width;
let height = cameraColumn.getBoundingClientRect().height;
makeTextCanvas(width, height);

let chessCanvas = document.getElementById("canvas2d-chess");
chessCtx = chessCanvas.getContext('2d');
let chessWidth = width + 100;
let chessHeight = height + 100;
makeChessCanvas(chessWidth, chessHeight);

function degToRad(d) {
    return d * Math.PI / 180;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}

render(scene);




