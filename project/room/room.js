class Room {
    constructor(obj_list,always_on_obj,outside_obj, transparent_obj){
        this.mesh_list = []; // Array used to store all the mesh used in the room
        this.always_on_mesh = []; // Array used to store all the mesh used in the room
        this.outside_obj = []; // Array used to store all the mesh used in the room
        this.transparent_obj = []; // Array used to store all the mesh used in the room

        obj_list.forEach(obj => {
            this.mesh_list.push(new Mesh(obj, gl));
        });
        always_on_obj.forEach(obj => {
            this.always_on_mesh.push(new Mesh(obj, gl));
        });
        outside_obj.forEach(obj => {
            this.outside_obj.push(new Mesh(obj, gl));
        });
        transparent_obj.forEach(obj => {
            this.transparent_obj.push(new Mesh(obj, gl));
        });
        this.shadows = Shadows()
        // this.camera = new Camera([4,3,7], [0, 3, 0], [0, 1, 0]);
        this.camera = new Camera([2.7949888383038175, 3.041971353994448, 2.8521434998139608],[0, -1, 0], [0, 1, 0]);
        
        this.camera.reset()
        this.keys = {};
    }

    // Compute the projection matrix
    projectionMatrix(){
        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        return m4.perspective(degToRad(60), aspect, 0.1, 200);
    }

    // Move the camera using keyboard
    key_controller(){
        let mov = 0.05;

        if (this.keys["w"]){
            this.camera.moveForward(mov)
        }
        if (this.keys["s"]){
            this.camera.moveForward(-mov)
        }
        if (this.keys["a"]){
            this.camera.moveRight(-mov)
        }
        if (this.keys["d"]){
            this.camera.moveRight(mov)
        }
        if (this.keys["q"]){
            this.camera.moveUp(mov)
        }
        if (this.keys["e"]) {
            this.camera.moveUp(-mov)
        }
        if (this.keys["ArrowUp"]){
            this.camera.rotateUp(mov)
        }
        if (this.keys["ArrowDown"]){
            this.camera.rotateUp(-mov)
        }
        if (this.keys["ArrowLeft"]){
            this.camera.rotate(mov)
        }
        if (this.keys["ArrowRight"]){
            this.camera.rotate(-mov)
        }
        if (this.keys["r"]){
            this.camera.reset()
        }
        // console.log(this.camera.getPosition());

    }
}


