class Camera {
    constructor(pos, lookAt, up){
        this.position = pos
        this.new_pos = [0,0,0]
        this.forward = m4.normalize(m4.subtractVectors(lookAt, pos));
        this.right = m4.normalize(m4.cross(this.forward, up));
        this.up = m4.normalize(m4.cross(this.right, this.forward));
    }
    // Returns the projection matrix
    getPosition(){
        return this.position
    }

    
    rotateUp(step){ 
        let rotation = m4.axisRotation(this.right, (step / 2));
        this.forward = m4.transformPoint(rotation, this.forward)
        this.up = m4.transformPoint(rotation, this.up)

        this.forward = m4.normalize(this.forward);
        this.up = m4.normalize(this.up)
    }

    rotate(step){ 
        let rotation = m4.axisRotation(this.up, step);
        this.forward = m4.transformPoint(rotation,this.forward);
        this.right = m4.transformPoint(rotation,this.right);

        this.forward = m4.normalize(this.forward);
        this.right = m4.normalize(this.right);
    }

    moveRight(d){ 
        this.new_pos[0] = this.position[0] + (this.right[0] * d);
        this.new_pos[1] = this.position[1] + (this.right[1] * d);
        this.new_pos[2] = this.position[2] + (this.right[2] * d);

        if(this.new_pos[0] < RoomBoundaries.width && this.new_pos[0] > -RoomBoundaries.width){
            this.position[0] += (this.right[0] * d);
        }
        if(this.new_pos[1] < RoomBoundaries.height && this.new_pos[1] > -RoomBoundaries.height){
            this.position[1] += (this.right[1] * d);
        }
        if(this.new_pos[2] < RoomBoundaries.length && this.new_pos[2] > -RoomBoundaries.length){
            this.position[2] += (this.right[2] * d);
        }
        // this.position[0] += + (this.right[0] * dist);
        // this.position[1] += + (this.right[1] * dist);
        // this.position[2] += + (this.right[2] * dist);
    }

    moveUp(d){ 
        // dont allow to move outside the room
        this.new_pos[0] = this.position[0] + (this.up[0] * d);
        this.new_pos[1] = this.position[1] + (this.up[1] * d);
        this.new_pos[2] = this.position[2] + (this.up[2] * d);
        if(this.new_pos[0] < RoomBoundaries.width && this.new_pos[0] > -RoomBoundaries.width){
            this.position[0] += (this.up[0] * d);
        }
        if(this.new_pos[1] < RoomBoundaries.height && this.new_pos[1] > 0.1){
            this.position[1] += (this.up[1] * d);
        }
        if(this.new_pos[2] < RoomBoundaries.length && this.new_pos[2] > -RoomBoundaries.length){
            this.position[2] += (this.up[2] * d);
        }

        // this.position[0] += (this.up[0] * dist);
        // this.position[1] += (this.up[1] * dist);
        // this.position[2] += (this.up[2] * dist);
    }

    moveForward(d){
        
        // dont allow to move outside the room
        this.new_pos[0] = this.position[0] + (this.forward[0] * d);
        this.new_pos[1] = this.position[1] + (this.forward[1] * d);
        this.new_pos[2] = this.position[2] + (this.forward[2] * d);

        if(this.new_pos[0] < RoomBoundaries.width && this.new_pos[0] > -RoomBoundaries.width){
            this.position[0] += (this.forward[0] * d);
        }
        if(this.new_pos[1] < RoomBoundaries.height && this.new_pos[1] > 0.1){
            this.position[1] += (this.forward[1] * d);
        }
        if(this.new_pos[2] < RoomBoundaries.length && this.new_pos[2] > -RoomBoundaries.length){
            this.position[2] += (this.forward[2] * d);
        }

        // this.position[0] += (this.forward[0] * d) * ((this.position[0] + (this.forward[0] * d)) < RoomBoundaries.width );
        // this.position[1] += (this.forward[1] * d) * ((this.position[1] + (this.forward[1] * d)) < RoomBoundaries.length );
        // this.position[2] += (this.forward[2] * d) * ((this.position[2] + (this.forward[2] * d)) < RoomBoundaries.height );
        // console.log(this.position);
    }

    reset(){
        this.up=[0,1,0];
        this.forward[1] = 0;
        this.right = m4.normalize(m4.cross(this.forward, this.up));
    }

    getViewMatrix(){
        const look = m4.addVectors(this.position, this.forward);
        const cameraMatrix = m4.lookAt(this.position, look, this.up);
        return m4.inverse(cameraMatrix); // ViewMatrix
    };
}

//draw text
function makeTextCanvas() {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.font = "15px hidef";

    makeKeyCanvas();
    return ctx.canvas;
}

function makeChessCanvas() {
    
    chessCtx.canvas.width = chessWidth;
    chessCtx.canvas.height = chessHeight;
    chessCtx.font = "15px hidef";

    makeChessFenCanvas();
    return chessCtx.canvas;
}

function makeChessFenCanvas() {
    // chessCtx.clearRect(0, 0, width, height);
    console.log(ctx);
    console.log(chessCtx);
    function drawFEN() {
        chessCtx.clearRect(0, 0, chessWidth, chessHeight);
        tileSize = chessWidth / 8;
        // Draw the board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isEvenRow = row % 2 === 0;
                const isEvenCol = col % 2 === 0;
                
                if ((isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)) {
                    chessCtx.fillStyle = 'white';
                } else {
                    chessCtx.fillStyle = 'black';
                }
                
                chessCtx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }

        const fen = '8/1Q6/2nkp2R/3pRP2/2P3b1/4P3/3R1p1B/4QB1K';  
        
        
        const rows = fen.split('/');
        // draw pieces
        const pieces = {
            'k': '♔',
            'q': '♕',
            'r': '♖',
            'b': '♗',
            'n': '♘',
            'p': '♙',
            'K': '♚',
            'Q': '♛',
            'R': '♜',
            'B': '♝',
            'N': '♞',
            'P': '♟'
        };
        for (let row = 0; row < rows.length; row++) {
            const currentRow = rows[row];
            let col = 0;

            for (let i = 0; i < currentRow.length; i++) {
                var char = currentRow[i];

                if (!isNaN(char)) {
                    col += parseInt(char);
                } else {
                    const isEvenRow = row % 2 === 0;
                    const isEvenCol = col % 2 === 0;
                    const tileColor = (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol) ? 'white' : 'black';
                    
                    chessCtx.fillStyle = tileColor;
                    chessCtx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

                    const pieceColor = char === char.toUpperCase() ? 'white' : 'black';
                    var color = pieceColor;
                    
                    char = char.toUpperCase();
                     // Draw chess piece
                    // check if char is Capital
                    // chessCtx.fillStyle = color == 'white' && char === char.toUpperCase() ? 'black' : 'white';
                    // // draw a circle in the middle of the tile
                    // chessCtx.beginPath();
                    // chessCtx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, tileSize / 2.5, 0, 2 * Math.PI);
                    // chessCtx.fill();

                    chessCtx.fillStyle = color == 'black' ? 'white' : 'black';
                    chessCtx.font = '26px Arial';
                    chessCtx.textAlign = 'center';
                    chessCtx.textBaseline = 'middle';
                    chessCtx.fillText(pieces[char], col * tileSize + tileSize / 2, row * tileSize + tileSize / 2);

                    chessCtx.fillStyle = color;
                    chessCtx.font = '20px Arial';
                    chessCtx.textAlign = 'center';
                    chessCtx.textBaseline = 'middle';
                    chessCtx.fillText(pieces[char], col * tileSize + tileSize / 2, row * tileSize + tileSize / 2);


                    col++;
                }
            }
        }
        
    



    }
    drawFEN();
}
//Canvas 2D 
//draw buttons
function makeKeyCanvas() {
    ctx.clearRect(0, 0, width, height);

    var buttons = [];
    buttons.push(makeButton(1, 55,80, 30, 30, 'S', 'white', 'black', 'black', function () { scene.camera.moveForward(-0.1); }))
    buttons.push(makeButton(2, 40, 40, 30, 30, 'W', 'white', 'black', 'black', function () { scene.camera.moveForward(0.1); }))
    buttons.push(makeButton(3, 95, 80, 30, 30, 'D', 'white', 'black', 'black', function () { scene.camera.moveRight(0.1); }))
    buttons.push(makeButton(4, 15, 80, 30, 30, 'A', 'white', 'black', 'black', function () { scene.camera.moveRight(-0.1); }))
    buttons.push(makeButton(5, 0, 40, 30, 30, 'Q', 'black', 'black', 'white', function () { scene.camera.moveUp(0.1); }))
    buttons.push(makeButton(6, 80, 40, 30, 30, 'E', 'black', 'black', 'white', function () { scene.camera.moveUp(-0.1); }))
    buttons.push(makeButton(6, 120, 40, 30, 30, 'R', 'red', 'black', 'white', function () { scene.camera.reset(); }))

    drawAll();
    cameraCanvas.addEventListener("click", function (e) {
        onPressed(e);

    });

    function onPressed(e) {
        console.log('e:',e);
        buttons.forEach(function (button) {
            if (ctx.isPointInPath(button, e.offsetX, e.offsetY)) {
                button.clickFn();
            }
        });
    }

    cameraCanvas.addEventListener('touchstart', function (e) {
        onPressed(e);
    });

    function makeButton(id, x, y, w, h, label, fill, stroke, labelcolor, clickFn, releaseFn) {
        var button = new Path2D();
        button.rect(x, y, w, h);
        button.x = x;
        button.y = y;
        button.w = w;
        button.h = h;
        button.id = id;
        button.label = label;
        button.fill = fill;
        button.stroke = stroke;
        button.labelcolor = labelcolor;
        button.clickFn = clickFn;
        button.releaseFn = releaseFn;
        return button;
    }

    function drawAll() {
        for (var i = 0; i < buttons.length; i++) {
            drawButton(buttons[i], false);
        }
        
    }

    

   

    function drawButton(b, isDown) {
        ctx.clearRect(b.x - 1, b.y - 1, b.w + 2, b.h + 2);
        ctx.fillStyle = b.fill;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = b.stroke;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = b.labelcolor;
        ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2);
        if (isDown) {
            ctx.beginPath();
            ctx.moveTo(b.x, b.y + b.h);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(b.x + b.w, b.y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }

    


}

RoomBoundaries = {
    width: 4.8,
    length: 8.5,
    height: 8.3
}